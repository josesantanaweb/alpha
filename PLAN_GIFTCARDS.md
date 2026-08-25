# Plan de Integración de Gift Cards

> **Relación con `PLAN_DESCUENTOS.md`**: los cupones y las gift cards son **conceptos distintos** y se implementan por separado, pero comparten el mismo punto de integración en el checkout (`Checkout.tsx` + `createOrder`). Este plan asume que **NO** existe aún el módulo `discounts`; la fase de checkout está escrita para funcionar de forma independiente.
>
> **Diferencia clave**: un cupón es un descuento de un solo uso (sin saldo persistente). Una gift card es **saldo persistente con moneda propia** que se puede gastar en varias compras hasta agotarse. Por eso la gift card NO es un caso de `Coupon` — necesita su propio modelo con `balance` y un ledger de redenciones.
>
> **Decisión de diseño**: NO se agrega un "wallet" al `User`. El saldo vive en `GiftCard.balance`. Esto evita introducir un concepto global de balance de usuario y mantiene el alcance acotado a "código canjeable con saldo".

---

## Fase 1: Modelo de Datos (Prisma)

**Archivo a modificar:** `prisma/schema.prisma`

### 1.1. Nuevos modelos

```prisma
model GiftCard {
  id           String               @id @default(uuid())
  code         String               @unique @db.VarChar(50)
  currency     Currency             // reutiliza el enum existente (VES | USD)
  initialValue Decimal              @db.Decimal(10, 2)
  balance      Decimal              @db.Decimal(10, 2)
  expiresAt    DateTime?
  isActive     Boolean              @default(true)
  redeemedAt   DateTime?
  redeemedBy   String?              // userId del dueño (opcional, informativo)
  createdAt    DateTime             @default(now())
  updatedAt    DateTime             @updatedAt

  redemptions GiftCardRedemption[]
}

model GiftCardRedemption {
  id         String   @id @default(uuid())
  giftCardId String
  giftCard   GiftCard @relation(fields: [giftCardId], references: [id], onDelete: Cascade)
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  amount     Decimal  @db.Decimal(10, 2)
  createdAt  DateTime @default(now())
}
```

> `Currency` ya existe en el schema. Reutilizarlo en vez de crear uno nuevo.

### 1.2. Nuevos campos en `Order`

Agregar campos dedicados para auditoría separada (NO mezclar todo en `discount`):

```prisma
model Order {
  // ...campos existentes
  discount        Decimal  @default(0) @db.Decimal(10, 2) // descuento de perfumes (existe)
  couponDiscount  Decimal? @default(0) @db.Decimal(10, 2) // cupón (ver PLAN_DESCUENTOS)
  giftCardAmount  Decimal  @default(0) @db.Decimal(10, 2) // monto pagado con gift card
  giftCardCode    String?  @db.VarChar(50)
  giftCardId      String?
}
```

### 1.3. Relación inversa en `Order`

```prisma
model Order {
  // ...
  giftCardRedemptions GiftCardRedemption[]
}
```

Luego ejecutar: `pnpm prisma db push`.

---

## Fase 2: Módulo `giftCards`

**Archivos a crear:**

| Archivo | Propósito |
|---|---|
| `src/modules/giftCards/types.ts` | Tipo `GiftCardData` + `ValidateGiftCardResult` |
| `src/modules/giftCards/schema.ts` | Zod: `ValidateGiftCardSchema`, `CreateGiftCardSchema` |
| `src/modules/giftCards/actions.ts` | `validateGiftCard`, `createGiftCard` (admin), `redeemGiftCard` |
| `src/modules/giftCards/hooks/use-validate-gift-card.ts` | React Query hook |
| `src/modules/giftCards/hooks/index.ts` | Barrel export |

### Lógica clave de `actions.ts`

```ts
validateGiftCard(code, currency): ApiResult<ValidateGiftCardResult>
// 1. Buscar GiftCard por code
// 2. Validar: isActive, expiresAt, currency === currency del pedido
// 3. Devolver { code, currency, balance, applicableAmount: balance }
```

- `redeemGiftCard(giftCardId, orderId, amount)` — **solo se llama dentro de la transacción** de `createOrder` (Fase 4). Nunca se expone como acción pública independiente.

---

## Fase 3: API Routes

**Archivos a crear:**

| Archivo | Método | Propósito |
|---|---|---|
| `src/app/api/gift-cards/validate/route.ts` | `GET ?code=XXX&currency=USD` | Validar gift card en tiempo real |
| `src/app/api/gift-cards/route.ts` | `GET` / `POST` | Listar / Crear gift cards (admin) |

> La validación es pública (como la de cupones). La redención NO tiene endpoint propio: ocurre dentro del `POST /api/orders`.

---

## Fase 4: Integración con Checkout + Orders

> Este es el punto de solapamiento con `PLAN_DESCUENTOS.md`. La Fase 4 de ambos planes toca los mismos archivos; coordinar para no pisarse.

### 4.1. `src/modules/orders/schema.ts`

```ts
export const CreateOrderSchema = z.object({
  // ...campos existentes
  giftCardCode: z.string().optional(),
  // ...totales del cliente (subtotal/discount/shipping/total) siguen existiendo
});
```

### 4.2. `src/modules/orders/actions.ts` — `createOrder`

Dentro de la transacción existente, **después** de calcular `itemsTotal` y `shipping`:

```ts
// 1. Si viene giftCardCode, validarla (isActive, no expirada, currency coincide, balance > 0)
// 2. giftCardAmount = min(balance, itemsTotal)
// 3. total = itemsTotal + shipping - couponDiscount - giftCardAmount
// 4. En el $transaction:
//    - Decrementar saldo con update condicional para evitar sobregiro por concurrencia:
//      tx.giftCard.updateMany({
//        where: { id: giftCard.id, balance: { gte: giftCardAmount } },
//        data: { balance: { decrement: giftCardAmount } },
//      })
//    - Si updateMany.count === 0 → abortar (saldo insuficiente / carrera)
//    - tx.giftCardRedemption.create({ giftCardId, orderId, amount })
```

**Reglas:**
- `giftCardAmount` no puede superar `itemsTotal + shipping`. Si el saldo sobra, queda en la tarjeta para otra compra.
- El monto de gift card **nunca** se confía al cliente: siempre se recalcula contra `GiftCard.balance` en el server.
- Si `giftCardAmount < total`, el resto se paga por el método normal. Si cubre todo, el pedido queda pagado en su totalidad.

### 4.3. `src/modules/checkout/components/Checkout.tsx`

- Leer `giftCardCode` + resultado de validación del estado local.
- Mostrar un input de gift card junto al de cupón (reusar un componente compartido de "código").
- Pasar `giftCardCode` al payload de `createOrder`.
- Mostrar en el resumen una línea "Gift card" con `- giftCardAmount`.

---

## Fase 5: UI — Formulario de Gift Card

**Archivos a crear/modificar:**

| Archivo | Cambio |
|---|---|
| `src/modules/checkout/components/GiftCardForm.tsx` | Input de código + validación en vivo (`useValidateGiftCard`) |
| `src/modules/checkout/components/CheckoutOrderSummary.tsx` | Línea de gift card aplicada |
| `src/modules/checkout/components/Checkout.tsx` | Wiring del estado `giftCardCode` |

> Nota: no existe aún el componente de cupón (`DiscountCodeForm` según `PLAN_DESCUENTOS.md`). Idealmente se extrae un `CodeField` compartido para cupón + gift card.

---

## Fase 6: Seed Data

**Archivo a modificar:** `prisma/seed.ts`

| Código | Moneda | Valor | Saldo | Expira |
|---|---|---|---|---|
| AURA-GIFT-50 | USD | 50 | 50 | 2026-12-31 |
| AURA-GIFT-20 | USD | 20 | 20 | - |
| AURA-GIFT-100VES | VES | 100 | 100 | - |

---

## Fase 7: Backlog (fuera de alcance inmediato)

- Venta/emisión de gift cards como producto en el catálogo (hoy solo admin las crea).
- Envío de gift card por email / diseño imprimible.
- Gift card parcialmente usada visible en la cuenta del usuario (requiere relacionarla con `redeemedBy`).
- Cross-currency: canjear gift card USD en un pedido VES (requiere tasa de cambio).

---

## Orden de implementación recomendado

1. **Fase 1** → `prisma/schema.prisma` + `pnpm prisma db push`
2. **Fase 2** → módulo `giftCards` (types → schema → actions → hooks)
3. **Fase 3** → API routes (para testear con curl/postman)
4. **Fase 4** → integrar con `createOrder` (transacción + decremento condicional)
5. **Fase 5** → conectar UI del formulario de gift card
6. **Fase 6** → seed data

> Si se implementa junto con cupones (`PLAN_DESCUENTOS.md`), coordinar la Fase 4 de ambos planes porque tocan `orders/schema.ts`, `orders/actions.ts` y `Checkout.tsx` a la vez.

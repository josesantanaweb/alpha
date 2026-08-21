# Plan de Integración de Códigos de Descuento (Cupones)

## Fase 1: Modelo de Datos (Prisma)

**Archivo a modificar:** `prisma/schema.prisma`

Agregar al schema:

```prisma
enum DiscountType { PERCENTAGE  FIXED }

model Coupon {
  id         String       @id @default(uuid())
  code       String       @unique @db.VarChar(50)
  type       DiscountType
  value      Decimal      @db.Decimal(10, 2)
  minPurchase Decimal?    @db.Decimal(10, 2)
  maxUses    Int?
  usedCount  Int          @default(0)
  expiresAt  DateTime?
  isActive   Boolean      @default(true)
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
}
```

Luego ejecutar: `pnpm prisma db push`

---

## Fase 2: Módulo `discounts`

**Archivos a crear:**

| Archivo | Propósito |
|---|---|
| `src/modules/discounts/types.ts` | Enum `DiscountType` + tipo `CouponData` |
| `src/modules/discounts/schema.ts` | Zod: `ApplyCouponSchema`, `CreateCouponSchema` |
| `src/modules/discounts/actions.ts` | `validateCoupon(code, subtotal)`, `applyCoupon(userId, code, subtotal)`, CRUD admin |
| `src/modules/discounts/hooks/use-validate-coupon.ts` | React Query hook |
| `src/modules/discounts/index.ts` | Barrel export |

### Lógica clave de `actions.ts`:

```ts
validateCoupon(code: string, subtotal: number): ApiResult<CouponData>
// 1. Buscar cupón por code
// 2. Validar: isActive, expiresAt, maxUses vs usedCount, minPurchase
// 3. Calcular descuento: si PERCENTAGE => subtotal * value/100, si FIXED => value
// 4. Devolver CouponData + discountAmount calculado
```

---

## Fase 3: Integración con Cart

**Archivos a modificar:**

| Archivo | Cambio |
|---|---|
| `src/modules/cart/types.ts` | Agregar `appliedCoupon?: { code: string; discountAmount: number; discountType: DiscountType }` a `CartData` |
| `src/modules/cart/store.ts` | Agregar `appliedCoupon` al estado Zustand + acciones `applyCoupon(code, data)`, `removeCoupon()` |
| `src/modules/cart/hooks/use-cart.ts` | Exponer `appliedCoupon`, `applyCoupon()`, `removeCoupon()` |

---

## Fase 4: Integración con Checkout + Orders

**Archivos a modificar:**

| Archivo | Cambio |
|---|---|
| `src/modules/checkout/Checkout.tsx` | Leer `appliedCoupon` del hook cart, pasar `couponCode` al crear orden, ajustar cálculo de `discount` y `total` |
| `src/modules/orders/schema.ts` | Agregar `couponCode: z.string().optional()` a `CreateOrderSchema` |
| `src/modules/orders/actions.ts` | En `createOrder()`: si hay `couponCode`, llamar `validateCoupon()`, incluir descuento en `order.discount`, incrementar `Coupon.usedCount` en la transacción. Calcular `total = subtotal + shipping - discountTotal` |

---

## Fase 5: API Routes

**Archivos a crear:**

| Archivo | Método | Propósito |
|---|---|---|
| `src/app/api/discounts/validate/route.ts` | `GET ?code=XXX&subtotal=NN` | Validar cupón en tiempo real |
| `src/app/api/discounts/route.ts` | `GET` / `POST` | Listar / Crear cupones (admin) |

---

## Fase 6: UI — Completar DiscountCodeForm

**Archivos a modificar:**

| Archivo | Cambio |
|---|---|
| `src/modules/cart/components/DiscountCodeForm.tsx` | Conectar con hook de validación real, mostrar estados: aplicando, aplicado, error, monto de descuento |
| `src/modules/cart/components/CartCheckoutPanel.tsx` | Pasar `applyCoupon`/`removeCoupon` real desde hook cart, mostrar badge de cupón aplicado |

---

## Fase 7: Seed Data

**Archivo a modificar:** `prisma/seed.ts`

Agregar cupones de ejemplo:

| Código | Tipo | Valor | Min | Usos | Expira |
|---|---|---|---|---|---|
| BIENVENIDO10 | PERCENTAGE | 10 | - | 100 | - |
| AURA50 | FIXED | 50 | 200 | 50 | - |
| VERANO2026 | PERCENTAGE | 15 | 100 | 30 | 2026-09-21 |

---

## Orden de implementación recomendado

1. **Fase 1** → `prisma/schema.prisma` + `pnpm prisma db push`
2. **Fase 2** → módulo `discounts` (types → schema → actions → hooks → index)
3. **Fase 5** → API routes (para poder testear con curl/postman)
4. **Fase 3** → integrar con cart store/hooks
5. **Fase 4** → integrar con checkout y orders
6. **Fase 6** → conectar UI de DiscountCodeForm
7. **Fase 7** → seed data
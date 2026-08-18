# Checkout → Backend Integration ✅ COMPLETADO

## Contexto

El módulo de checkout (`src/modules/checkout/`) ya tiene la UI completa: selector de método de entrega, formulario de contacto, dirección, selector de moneda/método de pago. El `handleSubmit` actual solo hace `console.log`. El modelo `Order` en Prisma existe pero le faltan campos clave que el frontend ya maneja.

## Cambios en el Schema ✅

El `Order` actual le faltan:
- `currency` — "VES" | "USD"  
- `paymentMethod` — "MOBILE_PAYMENT" | "BINANCE" | "ZINLI"  
- `deliveryMethod` — "DELIVERY" | "PICKUP"  
- `contactName`, `contactEmail`, `contactPhone` — datos de contacto del comprador  
- `city` — ciudad del envío  

Además se agregan los enums `Currency`, `PaymentMethod` y `DeliveryMethod`.

## Proposed Changes

### Prisma Schema ✅

#### [MODIFY] schema.prisma ✅
- Agregar enums `Currency`, `PaymentMethod`, `DeliveryMethod`
- Extender modelo `Order` con los campos faltantes
- Correr `pnpm prisma db push`

---

### Backend — Orders module ✅

#### [NEW] `src/modules/orders/schema.ts` ✅
Zod schema `CreateOrderSchema` que valida el body del POST. Todos los enum usan UPPERCASE.

#### [NEW] `src/modules/orders/actions.ts` ✅
- `createOrder(userId, data)` — transacción que:
  1. Lee el cart del usuario
  2. Valida stock de cada item (perfume y decant)
  3. Crea el `Order` + `OrderItem[]`
  4. Vacía el carrito
  5. Retorna `ApiResult<OrderWithItems>`
- `getOrders(userId)` — lista las órdenes del usuario
- `getOrderById(userId, orderId)` — detalle de una orden

#### [NEW] `src/modules/orders/types.ts` ✅
Tipos TypeScript para `OrderWithItems`.

#### [NEW] `src/modules/orders/index.ts` ✅
Barrel re-export.

#### [NEW] `src/app/api/orders/route.ts` ✅
- `GET` — lista las órdenes del usuario autenticado
- `POST` — crea una orden (llama `createOrder`)

#### [NEW] `src/app/api/orders/[id]/route.ts` ✅
- `GET` — detalle de una orden específica

---

### Client — lib/api + constants ✅

#### [MODIFY] routes.ts ✅
Agregar `ORDERS: "/api/orders"` a `API_ROUTES`.

#### [NEW] `src/lib/api/orders.ts` ✅
Fetch helpers: `createOrder(token, payload)`, `getOrders(token)`, `getOrder(token, orderId)`.

---

### Client — Checkout module ✅

#### [MODIFY] `src/modules/checkout/types.ts` ✅
Enums UPPERCASE con const objects: `DeliveryMethod`, `PaymentCurrency`, `PaymentProvider`.

#### [MODIFY] Componentes del checkout ✅
Todos los componentes usan `DeliveryMethod.DELIVERY`, `PaymentProvider.MOBILE_PAYMENT`, etc.

### Client — Checkout module (pendiente)

#### [NEW] `src/modules/checkout/hooks/use-create-order.ts`
`useMutation` de React Query que llama `createOrder` de `@/lib/api/orders`.

#### [MODIFY] Checkout.tsx
Reemplazar el `console.log` con la llamada real: `useCreateOrder`, manejo de loading state, redirect a `/account` con mensaje de éxito.

---

### Docs (pendiente)

#### [MODIFY] aura-api.json
Agregar colección "Orders" con los 3 endpoints (GET `/orders`, POST `/orders`, GET `/orders/:id`).

#### [MODIFY] overview.md
Actualizar sección de módulos para incluir `orders`.

#### [MODIFY] business-rules.md
Actualizar reglas de órdenes con lo implementado.

#### [MODIFY] [business-rules.md](file:///Users/josesantana/Documents/Repositorios/aura/docs/business-rules.md)
Agregar reglas de negocio del checkout: validación de stock, cálculo de envío, métodos de pago soportados.

## Verification Plan

### Automated
```bash
pnpm prisma db push   # aplica el schema
pnpm build            # verifica tipos y compilación
```

### Manual
- Iniciar sesión, llenar el checkout y confirmar que se crea la orden en DB
- Verificar que el carrito se vacíe tras la orden
- Revisar que pickup no cobra envío y delivery aplica la tarifa correcta

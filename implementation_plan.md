# Checkout → Backend Integration

## Contexto

El módulo de checkout (`src/modules/checkout/`) ya tiene la UI completa: selector de método de entrega, formulario de contacto, dirección, selector de moneda/método de pago. El `handleSubmit` actual solo hace `console.log`. El modelo `Order` en Prisma existe pero le faltan campos clave que el frontend ya maneja.

## Cambios en el Schema

El `Order` actual le faltan:
- `paymentCurrency` — "ves" | "usd"  
- `paymentMethod` — "pago_movil" | "binance" | "zinli"  
- `deliveryMethod` — "delivery" | "pickup"  
- `contactName`, `contactEmail`, `contactPhone` — datos de contacto del comprador  
- `shippingCity` — separado del address de texto libre  

Además se agregan los enums `PaymentCurrency`, `PaymentMethod` y `DeliveryMethod`.

## Proposed Changes

### Prisma Schema

#### [MODIFY] [schema.prisma](file:///Users/josesantana/Documents/Repositorios/aura/prisma/schema.prisma)
- Agregar enums `PaymentCurrency`, `PaymentMethod`, `DeliveryMethod`
- Extender modelo `Order` con los campos faltantes
- Correr `pnpm prisma db push`

---

### Backend — Orders module

#### [NEW] `src/modules/orders/schema.ts`
Zod schema `CreateOrderSchema` que valida el body del POST.

#### [NEW] `src/modules/orders/actions.ts`
- `createOrder(userId, data)` — transacción que:
  1. Lee el cart del usuario
  2. Valida stock de cada item
  3. Crea el `Order` + `OrderItem[]`
  4. Vacía el carrito
  5. Retorna `ApiResult<Order>`
- `getOrders(userId)` — lista las órdenes del usuario
- `getOrderById(userId, orderId)` — detalle de una orden

#### [NEW] `src/modules/orders/types.ts`
Tipos TypeScript para `OrderWithItems`.

#### [NEW] `src/modules/orders/index.ts`
Barrel re-export.

#### [NEW] `src/app/api/orders/route.ts`
- `GET` — lista las órdenes del usuario autenticado
- `POST` — crea una orden (llama `createOrder`)

#### [NEW] `src/app/api/orders/[id]/route.ts`
- `GET` — detalle de una orden específica

---

### Client — lib/api + constants

#### [MODIFY] [routes.ts](file:///Users/josesantana/Documents/Repositorios/aura/src/constants/routes.ts)
Agregar `ORDERS: "/api/orders"` a `API_ROUTES`.

#### [NEW] `src/lib/api/orders.ts`
Fetch helpers: `createOrder(token, payload)`, `getOrders(token)`.

---

### Client — Checkout module

#### [NEW] `src/modules/checkout/schema.ts`
Re-export del CreateOrderSchema para uso client-side.

#### [NEW] `src/modules/checkout/hooks/use-create-order.ts`
`useMutation` de React Query que llama `createOrder` de `@/lib/api/orders`.

#### [MODIFY] [Checkout.tsx](file:///Users/josesantana/Documents/Repositorios/aura/src/modules/checkout/Checkout.tsx)
Reemplazar el `console.log` con la llamada real: `useCreateOrder`, manejo de loading state, redirect a `/account` con mensaje de éxito.

---

### Docs

#### [MODIFY] [aura-api.json](file:///Users/josesantana/Documents/Repositorios/aura/docs/aura-api.json)
Agregar colección "Orders" con los 3 endpoints (GET `/orders`, POST `/orders`, GET `/orders/:id`).

#### [MODIFY] [overview.md](file:///Users/josesantana/Documents/Repositorios/aura/docs/overview.md)
Actualizar sección de módulos para incluir `orders`.

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

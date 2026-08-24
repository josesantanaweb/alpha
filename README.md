# Aura

E-commerce de perfumes (decants y frascos) construido con Next.js App Router, Prisma y PostgreSQL.

## Requisitos

- Node.js 20+
- pnpm
- PostgreSQL

## Comandos

```bash
pnpm dev
pnpm build
pnpm lint
pnpm prisma:db:push
pnpm prisma:seed
```

## Estado actual del carrito

- Vista de carrito maquetada y funcional en frontend.
- Fuente de datos actual: mock local en `src/modules/cart/data/cart.mock.json`.
- Los items del carrito usan datos reales de catálogo (nombre, imagen, precio).
- Botones `+` y `-` actualizan cantidad en tiempo real.
- Si se reduce desde cantidad 1, el item se elimina del carrito.
- Se calcula dinámicamente: subtotal, descuento, envío y total.
- Barra de progreso de envío gratis conectada al total del carrito.
- Regla actual de envío:
	- Umbral envío gratis: 200 USD
	- Si no alcanza el umbral: envío fijo de 5 USD

## Pendiente (carrito backend)

- Reemplazar mock local por datos de API

## API del carrito

Todas las rutas requieren autenticación Bearer.

- `GET /api/cart`: obtiene el carrito del usuario.
- `POST /api/cart/add`: agrega un item. Body: `perfumeId`, `quantity` opcional y `decantId` opcional.
- `DELETE /api/cart/remove/:itemId`: elimina un item del carrito del usuario.

## Estructura (resumen)

- `src/app/` rutas App Router y API routes
- `src/modules/` lógica por dominio (vertical slice). Cada módulo organiza su código en subcarpetas (`components/`, `hooks/`, `actions.ts`, `types.ts`, `utils/`) usando barrel exports únicamente en las subcarpetas (evitando `index.ts` en la raíz del módulo para prevenir conflictos entre Server y Client components).
- `src/modules/shared/` utilidades y componentes compartidos (`components/`, `hooks/`, `stores/`, `types/`, `utils/`)
- `prisma/` schema, migraciones y seed

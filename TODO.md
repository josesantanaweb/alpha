# 🚀 Aura — Product Roadmap & Task Board

---

## 🎨 Diseño

### Páginas nuevas / por diseñar
- [ ] Pantalla de cuenta de usuario (historial de pedidos, perfil, direcciones)
- [ ] Pantalla de checkout completa (paso a paso, formulario,confirmación, estado del pedido)
- [ ] Página 404 personalizada
- [ ] Página de error global (500 / error genérico)

---

## 🖥️ Frontend

### Reviews (nuevo módulo)
- [ ] Crear `modules/reviews/` (components, hooks, types)
- [ ] Listar reviews en la página de detalle de perfume
- [ ] Formulario para agregar/editar reviews del usuario autenticado
- [ ] Validación de una sola review por usuario por perfume

### Catálogo y navegación
- [ ] Filtro por notas olfativas al hacer clic en las notas del perfume (navegar a explorer con el filtro aplicado)
- [ ] Agregar botones de "volver atrás" a las pantallas que lo requieran
- [ ] Scroll infinito (infinite scroll) o "cargar más" en el grid de perfumes

### Carrito y checkout
- [ ] Conectar mutaciones del carrito al backend para usuarios autenticados (actualmente solo usa Zustand local)
- [ ] Sincronizar carrito de invitado → carrito del servidor al hacer login

### Cuenta de usuario
- [ ] Página de perfil con edición de datos (nombre, avatar)
- [ ] Historial de pedidos en la cuenta
- [ ] Formulario de cambio de contraseña

### Detalle
- [X] Integrar seleccionador de medidas

### General
- [ ] Mejorar accesibilidad (roles ARIA, navegación por teclado, focus management)
- [ ] Optimizar carga de imágenes (lazy loading, blur placeholders, next/image)
- [ ] Página de "términos y condiciones" y "política de privacidad"

---

## ⚙️ Backend

### Órdenes (nuevo módulo)
- [ ] Crear `modules/orders/` (actions, schema, types)
- [ ] Endpoint `POST /api/orders` — crear orden desde checkout
- [ ] Endpoint `GET /api/orders` — listar órdenes del usuario autenticado
- [ ] Endpoint `GET /api/orders/[id]` — detalle de una orden
- [ ] Endpoint `PUT /api/orders/[id]/status` — actualizar estado de la orden (admin)
- [ ] Transacción atómica: crear orden + items + validar y descontar stock

### Reviews (nuevo módulo)
- [ ] Crear `modules/reviews/` (actions, schema, types)
- [ ] Endpoint `GET /api/reviews?perfumeId=` — listar reviews por perfume
- [ ] Endpoint `POST /api/reviews` — crear review (usuario autenticado)
- [ ] Endpoint `PUT /api/reviews/[id]` — editar review (solo autor)
- [ ] Endpoint `DELETE /api/reviews/[id]` — eliminar review (autor o admin)
- [ ] Recalcular `perfume.rating` y `perfume.reviewCount` al crear/editar/eliminar review

### Auth
- [ ] Flujo de recuperación de contraseña (reset password vía email)
- [ ] Verificación de email al registrarse
- [ ] Refresh token para sesiones persistentes (hoy solo JWT simple)

### Infraestructura y mejoras
- [ ] Rate limiting en endpoints de votación comunitaria
- [ ] Búsqueda full-text (PostgreSQL tsvector o integración con Meilisearch/Typesense)
- [ ] Corregir bug en `prisma/seed.ts`: `db.timeOfDay` no coincide con el modelo Prisma `TimeOfDay`
- [ ] Limpieza periódica de carritos abandonados (cron job)
- [ ] Logs estructurados para debugging en producción

---

## ✅ Completado

<details>
<summary>Ver historial de tareas completadas</summary>

### 22/07/2026
- [X] ~~Eliminar tagID filter~~
- [X] ~~Agregar las estaciones faltantes (otoño, primavera)~~
- [X] ~~Eliminar 1 de las longevidades, mantener solo 4~~
- [X] ~~Eliminar 1 de las puntuaciones, mantener solo 4~~
- [X] ~~Integrar módulo de notas olfativas~~
- [X] ~~Integrar módulo de estelas~~

### 23/07/2026
- [X] ~~Modificar conexión de Supabase~~
- [X] ~~Agregar tamaño de 100ml y estado active~~
- [X] ~~Funcionalidad de botón atrás~~
- [X] ~~Botón de agregar al carrito y favoritos~~

### 25/07/2026
- [X] ~~Agregar video presentación en el login y registro~~
- [X] ~~Mejorar los mensajes de error de login~~
- [X] ~~Botón de agregar al carrito y favoritos~~

### 26/07/2026
- [X] ~~Skeleton pantalla de favoritos~~
- [X] ~~Agregar el ícono de mostrar contraseña~~
- [X] ~~Integrar login de Google~~
- [X] ~~Integrar registro de usuarios~~

### 31/07/2026
- [X] ~~Lógica de agregar items al carrito (frontend con mock local)~~
- [X] ~~Maquetar vista del carrito~~

### 02/08/2026
- [X] ~~Implementar endpoints backend del carrito (`GET /api/cart`, `POST /api/cart/add`, `DELETE /api/cart/remove/:itemId`)~~

### 03/08/2026
- [X] ~~Corregir filtro por medida y tipo en la página explorer~~
- [ ] ~~Agregar redireccion a los botones de ver todos~~

</details>

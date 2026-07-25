# Reglas de Negocio

> Documento vivo. Se actualiza a medida que se agregan nuevas funcionalidades.

---

## 1. Suscripción Aura

### Propósito
Los usuarios pueden pagar un importe mensual configurable para acceder a beneficios exclusivos dentro de la plataforma. Este modelo busca fidelizar clientes y generar ingresos recurrentes.

### Importe
- El importe mensual es **configurable desde el panel de administración** (no hardcodeado).
- Puede ser modificado en cualquier momento. Los cambios aplican para las nuevas suscripciones o renovaciones, no afectan a períodos ya pagados.

### Beneficios (por definir)
Los beneficios asociados a la suscripción se definirán en una etapa posterior. Ejemplos potenciales:
- Envío gratuito en todos los pedidos
- Descuento exclusivo en decants
- Acceso anticipado a nuevos lanzamientos
- Muestras gratis en cada pedido
- Precio especial en frascos completos

### Estado del usuario
- Un usuario puede tener estado **suscrito** o **no suscrito**.
- El estado se refleja en el perfil del usuario y en la experiencia de compra.
- La suscripción se renueva automáticamente cada mes.

### Integración
- El pago se procesará a través de un proveedor de pagos (por definir: Stripe, Mercado Pago, etc.).
- La lógica de negocio vivirá en `src/modules/subscription/`.
- La suscripción estará vinculada al modelo `User` en Prisma.

### Pendiente
- [ ] Definir tabla de beneficios
- [ ] Integrar proveedor de pagos
- [ ] Crear flujo de suscripción desde el frontend
- [ ] Panel de administración para configurar importe

---

## 2. Autenticación y Sesión

### Duración de sesión
- El token JWT tiene una expiración de **1 minuto** (`AUTH_TOKEN_EXPIRATION=1m`).
- Al expirar, el usuario es redirigido al home y debe iniciar sesión nuevamente.

### Protección de rutas
- Las rutas `/login` y `/register` son **inaccesibles** para usuarios con sesión activa (redirigen a `/`).
- La ruta `/account` es **inaccesible** para usuarios sin sesión (redirige a `/login`).

### Favoritos
- Los favoritos están **vinculados a la cuenta del usuario** y se persisten en la base de datos PostgreSQL mediante la relación muchos a muchos `@relation("FavoritePerfumes")` en el modelo Prisma.
- Requieren autenticación mediante Bearer token (`GET /api/favorites`, `POST /api/favorites`, `DELETE /api/favorites`).
- Si un usuario no autenticado intenta agregar o alternar un favorito, es redirigido automáticamente a la pantalla de `/login`.
- El hook `useFavorites()` en React Query proporciona actualizaciones optimistas en la UI y sincronización del estado.


---

## 3. Carrito de Compras

### Propósito
Cada usuario autenticado tiene un carrito donde acumula productos antes de comprar.

### Reglas
- Un usuario puede tener **un solo carrito** activo (relación 1:1).
- El carrito se crea automáticamente cuando el usuario agrega el primer producto.
- Cada item del carrito referencia un **Perfume** (obligatorio) y opcionalmente un **Decant** (si eligió un tamaño específico).
- Si se elimina el usuario, se elimina su carrito en cascada.

### Estado
- El carrito no tiene estado (siempre está "activo").
- Al crear una orden, el carrito se vacía (no se elimina, se limpian los items).

### Pendiente
- [ ] Agregar endpoint `POST /api/cart/add`
- [ ] Agregar endpoint `DELETE /api/cart/remove/:itemId`
- [ ] Agregar endpoint `GET /api/cart`
- [ ] Sincronizar carrito localStorage ↔ servidor para usuarios no autenticados

---

## 4. Órdenes

### Propósito
Registrar las compras realizadas por los usuarios.

### Flujo
1. El usuario revisa su carrito y procede al checkout.
2. Se calculan subtotal, descuento, envío y total.
3. Se crea la orden con estado `PENDING`.
4. El usuario completa el pago → estado `CONFIRMED`.
5. El administrador prepara el envío → estado `SHIPPED`.
6. El usuario recibe → estado `DELIVERED`.
7. El usuario o admin pueden cancelar → estado `CANCELLED`.

### Reglas
- Cada item de la orden guarda el **precio en el momento de la compra** (no el precio actual del perfume).
- Una orden puede tener items de tipo **Perfume** (fraseo completo) o **Decant** (fracción).
- El `shippingAddress` se captura durante el checkout.
- El campo `notes` permite al usuario agregar instrucciones especiales.

### Pendiente
- [ ] Definir cálculo de envío (¿gratis para suscriptores?)
- [ ] Integrar proveedor de pagos
- [ ] Crear módulo `orders` con actions y API routes
- [ ] Panel de administración para cambiar estados

### Tipos de perfume
- `ARABIC` — Perfumes árabes/aceites
- `DESIGNER` — Perfumes de diseñador (Dior, Chanel, etc.)
- `DECANT` — Decants (fracciones de ml)
- `NICHE` — Perfumes de nicho

### Géneros
- `MALE` — Hombre
- `FEMALE` — Mujer
- `UNISEX` — Unisex

### Métricas comunitarias
Cada perfume puede tener votos de la comunidad en 4 dimensiones:
- **Longevidad**: scarce, weak, moderate, long, veryLong
- **Estela (Sillage)**: soft, moderate, heavy, huge
- **Temporada (Season)**: winter, spring, summer, autumn + day/night
- **Sentimiento (Feeling)**: love, like, indifferent, dislike, hate

---

## Plantilla para nuevas reglas

```markdown
## N. [Nombre de la Regla]

### Propósito
[Descripción breve]

### Reglas
- [Regla 1]
- [Regla 2]

### Integración
[Módulo/s involucrados]

### Pendiente
- [ ] [Tarea pendiente]
```
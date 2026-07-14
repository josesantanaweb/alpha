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
- Actualmente los favoritos se almacenan en **localStorage** (sin vinculación con el usuario).
- Pendiente: migrar a favoritos persistentes vinculados a la cuenta del usuario.

---

## 3. Productos

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
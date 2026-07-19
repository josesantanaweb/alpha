# Aura — Documentación del Proyecto

## Descripción General

**Aura** es un e-commerce de venta de perfumes (decants y frascos originales). La plataforma permite descubrir, explorar y comprar fragancias de diseñador, nicho y árabes. Cada perfume cuenta con métricas comunitarias (longevidad, estela, temporada, sentimiento) que ayudan al usuario a decidir antes de comprar.

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.4 |
| UI | React | 19.2.4 |
| Lenguaje | TypeScript (strict) | ^5 |
| ORM | Prisma | ^7.8.0 |
| DB Adapter | @prisma/adapter-pg | ^7.8.0 |
| Base de datos | PostgreSQL | — |
| Estilos | Tailwind CSS | v4 |
| Animaciones | Framer Motion | ^12.38.0 |
| Cliente HTTP | @tanstack/react-query | ^5.101.1 |
| Estado global | Zustand | ^5.0.12 |
| Validación | Zod | ^3.25.76 |
| Iconos | Lucide React | ^1.20.0 |
| Utilidades | clsx + tailwind-merge | — |
| Fechas | date-fns | ^4.1.0 |
| Uploads | AWS S3 SDK | ^3.1085.0 |
| Package manager | pnpm | — |
| Linter | ESLint + Prettier | — |

---

## Arquitectura

### Estructura de Carpetas

```
src/
├── app/                    # App Router (Next.js)
│   ├── api/                # API Routes (REST)
│   │   ├── auth/           # Auth (login, register, me, google)
│   │   ├── banners/
│   │   ├── categories/
│   │   ├── decants/
│   │   ├── designers/
│   │   ├── feelings/
│   │   ├── longevities/
│   │   ├── notes/
│   │   ├── perfumes/
│   │   ├── seasons/
│   │   ├── sillages/
│   │   ├── tags/
│   │   ├── uploads/
│   │   └── vibes/
│   ├── (auth)/             # Route group: login, register (sin Header/BottomNav)
│   ├── (main)/             # Route group: páginas principales (con Header/BottomNav)
│   │   ├── account/        # Perfil del usuario
│   │   ├── explorer/       # Página de exploración
│   │   ├── favorites/      # Página de favoritos
│   │   └── page.tsx        # Home page
│   └── layout.tsx          # Layout raíz (solo providers)
├── components/
│   ├── layout/             # AppLayout, Header, BottomNav
│   ├── providers/          # QueryProvider, AuthInitializer
│   ├── shared/             # Componentes de dominio reutilizables
│   └── ui/                 # Primitivas (Button, Input, Logo...)
├── constants/              # Assets, config, rutas
├── hooks/                  # React Query hooks
├── lib/
│   ├── api/                # Fetch helpers (cliente)
│   │   ├── auth.ts         # Login, logout, initialize
│   │   ├── banners.ts
│   │   ├── categories.ts
│   │   ├── designers.ts
│   │   ├── perfumes.ts
│   │   ├── tags.ts
│   │   └── vibes.ts
│   ├── auth.ts             # JWT (jose) sign/verify
│   ├── cn.ts               # clsx + tailwind-merge
│   ├── db.ts               # Prisma singleton
│   ├── pagination.ts       # Paginación reutilizable
│   └── s3.ts               # Cliente S3
├── modules/                # Lógica de negocio (feature-based)
│   ├── account/            # Perfil de usuario
│   ├── auth/               # Auth (login, register, schemas)
│   ├── banners/
│   ├── categories/
│   ├── decants/
│   ├── designers/
│   ├── explorer/
│   ├── favorites/
│   ├── feelings/
│   ├── home/
│   ├── longevities/
│   ├── notes/
│   ├── perfumes/
│   ├── seasons/
│   ├── sillages/
│   ├── tags/
│   ├── uploads/
│   └── vibes/
├── stores/                 # Zustand stores
│   ├── auth.ts             # Sesión de usuario (token persistido)
│   └── app.ts              # Estado global de UI (hideBottomNav)
└── types/                  # Tipos globales (ApiResult)
```

### Patrón de Módulo

Cada feature en `src/modules/<name>/` sigue la misma estructura de 3 archivos:

```
modules/<name>/
├── actions.ts   # Server-side business logic → ApiResult<T>
├── schema.ts    # Zod validation schemas
└── index.ts     # Barrel re-export
```

### Flujo de Datos

```
Componente (cliente)
  → React Query hook (hooks/use*.ts)
    → Fetch helper (lib/api/*.ts)
      → API Route (app/api/*/route.ts)
        → Module Action (modules/*/actions.ts)
          → Prisma (lib/db.ts)
            → PostgreSQL
```

**Auth flow:**
```
Login/Register
  → lib/api/auth.ts (login)
    → POST /api/auth/login
      → modules/auth/actions.ts
        → bcrypt → Prisma → JWT
  → stores/auth.ts (persist token via Zustand middleware)
  → AuthInitializer (on mount: GET /api/auth/me → rehydrate user)
```

- **Todas** las llamadas a Prisma pasan por `modules/*/actions.ts` — nunca se llama a `db` directamente desde componentes.
- Las API routes son wrappers HTTP delgados que llaman a las acciones del módulo.
- La respuesta siempre sigue la forma `ApiResult<T>` (ver abajo).
- El estado global se maneja con **Zustand** (`stores/`), no con React Context.
- Las acciones de negocio (login, logout) viven en `lib/api/*.ts`, no en el store.

---

## Modelo de Datos

### Entidades Principales

| Modelo | Descripción |
|---|---|---|
| **User** | Usuario con email, password (hash), nombre, avatar, googleId |
| **Perfume** | Fragancia con nombre, tipo, género, precio, stock, etc. |
| **Decant** | Variante de tamaño/volumen de un perfume (ej. 5ml, 10ml) |
| **Designer** | Marca/fabricante (Dior, Versace, Xerjoff...) |
| **Category** | Categoría del perfume |
| **Note** | Nota olfativa (con etapa: TOP, HEART, BASE) |
| **Tag** | Etiquetas/Tags |
| **Review** | Reseñas de usuarios |
| **Banner** | Banners del slider del home |
| **Vibe** | Vibes para la sección "Find Your Vibe" |

### Métricas Comunitarias (1:1 con Perfume)

| Modelo | Votos |
|---|---|
| **Longevity** | scarce, weak, moderate, long, veryLong |
| **Sillage** | soft, moderate, heavy, huge |
| **Season** | winter, spring, summer, autumn + day/night |
| **Feeling** | love, like, indifferent, dislike, hate |

### Enums

```prisma
enum PerfumeType { ARABIC, DESIGNER, NICHE }
enum Gender      { MALE, FEMALE, UNISEX }
enum NoteStage   { TOP, HEART, BASE }
```

---

## API

### Formato de Respuesta

Toda respuesta de API sigue el tipo `ApiResult<T>`:

```typescript
type ApiResult<T> =
  | { success: true;  status: number; data: T; message?: string }
  | { success: false; status: number; data?: never; message: string; errors?: Record<string, string[]> }
```

### Endpoints (REST)

| Método | Ruta | Descripción |
|---|---|---|---|
| POST   | /api/auth/login | Iniciar sesión (email + password) → { user, token } |
| POST   | /api/auth/register | Registrar usuario → { user, token } |
| GET    | /api/auth/me | Obtener perfil del usuario autenticado (Bearer token) |
| GET    | /api/auth/google | Redirect a Google OAuth |
| GET    | /api/auth/google/callback | Callback de Google OAuth → { user, token } |
| GET    | /api/banners | Listar banners activos |
| GET/POST | /api/categories | CRUD categorías |
| GET/POST | /api/decants | CRUD decants |
| GET/POST | /api/designers | CRUD diseñadores |
| GET/POST | /api/feelings | CRUD sentimientos |
| GET/POST | /api/longevities | CRUD longevidad |
| GET/POST | /api/notes | CRUD notas |
| GET/POST | /api/perfumes | CRUD perfumes (con filtros: search, gender, type...) |
| GET/POST | /api/seasons | CRUD temporadas |
| GET/POST | /api/sillages | CRUD estelas |
| GET/POST | /api/tags | CRUD tags |
| POST   | /api/uploads | Subir imágenes a S3 |
| GET    | /api/vibes | Listar vibes |

Cada endpoint tiene rutas `/[id]` para GET (singular), PUT y DELETE.

---

## Componentes Compartidos

### Layout
- `AppLayout` — Layout principal con Header y BottomNav
- `Header` — Barra superior
- `BottomNav` — Navegación inferior móvil

### Shared (Dominio)
- `PerfumeBox` — Card de perfume (imagen, precio, rating, descuento)
- `BestSellers` — Sección de más vendidos
- `CategoryButton` — Botón de categoría
- `SearchInput` — Input de búsqueda
- `DesignerMarquee` — Carrusel infinito de logos de diseñadores (framer-motion)
- `GenderCards` — Cards Hombre/Mujer con animación hover + link a explorer
- `TrustBadges` — Badges de confianza (autenticidad, envío, descubre)
- `ProgressBar` — Barra de progreso animada
- `Rating` — Estrellas de rating
- `LikeButton` — Botón de favorito con animación
- `Discount` — Badge de descuento
- `PerfumeBadge` — Badge contextual en la card del perfume
- `PerfumePrice` — Precio del perfume (con descuento: original tachado + precio final)
- `AddToCartButton` — Botón añadir al carrito
- `Tabs` — Pestañas navegables
- `FilterGender` — Filtro por género en el explorador
- `FilterCategories` — Filtro por tipo de perfume (Árabe/Diseñador/Nicho)
- `FilterDesigner` — Filtro por diseñador

---

## Rutas del Frontend

| Ruta | Página | Descripción |
|---|---|---|---|
| `/` | Home | Landing page con slider, diseñadores, géneros, badges, best sellers |
| `/explorer` | Explorer | Listado/grid de perfumes con filtros |
| `/explorer?gender=MALE` | Explorer (filtrado) | Perfumes filtrados por género |
| `/explorer?type=ARABIC` | Explorer (filtrado) | Perfumes filtrados por tipo (ARABIC/DESIGNER/NICHE) |
| `/explorer?designer=Dior` | Explorer (filtrado) | Perfumes filtrados por nombre del diseñador |
| `/favorites` | Favorites | Perfumes guardados como favoritos |
| `/login` | Login | Inicio de sesión (sin Header/BottomNav) |
| `/register` | Register | Registro de usuario (sin Header/BottomNav) |
| `/account` | Account | Perfil del usuario (requiere autenticación) |

---

## Hooks (React Query)

| Hook | Endpoint |
|---|---|
| `useBanners()` | GET /api/banners |
| `useCategories()` | GET /api/categories |
| `useDesigners()` | GET /api/designers |
| `useFavorites()` | Zustand store (local) |
| `usePerfumes(params)` | GET /api/perfumes?search=&gender=&type=&designer=... |
| `useTags()` | GET /api/tags |
| `useVibes()` | GET /api/vibes |
| `useDebounce(value, delay)` | Utilidad |

---

## Zustand Stores

| Store | Archivo | Estado | Persistencia |
|---|---|---|---|
| `useAuth` | `stores/auth.ts` | `user`, `token`, `isLoading` | `token` en localStorage (clave `aura_auth`) |
| `useApp` | `stores/app.ts` | `hideBottomNav` | No |

Las stores solo contienen estado y setters simples (`setSession`, `clearSession`). La lógica de negocio (llamadas HTTP) vive en `lib/api/*.ts`.

---

## Autenticación

### Flujo
1. El usuario inicia sesión en `/login` → `lib/api/auth.ts:login()` → `POST /api/auth/login`
2. El servidor valida credenciales con bcrypt y devuelve `{ user, token }` (JWT con expiración de 1 minuto)
3. `login()` guarda el token en el store de Zustand, que lo persiste automáticamente en localStorage
4. En cada carga de página, `AuthInitializer` monta → `lib/api/auth.ts:initialize()` → `GET /api/auth/me` con el token persistido
5. Si el token expiró (401), se limpia la sesión y se redirige al home

### Protección de rutas
- `GuestGuard` — Login/Register: si hay sesión activa, redirige a `/`
- `AuthGuard` — Account: si no hay sesión, redirige a `/login`

### Header
- Muestra el nombre del usuario si está autenticado
- El ícono de usuario navega a `/account` (logueado) o `/login` (invitado)

---

## Convenciones del Proyecto

- **Idioma**: Español para mensajes de usuario y textos de error.
- **Formato**: Prettier con semicolons, double-quotes, trailing commas, plugin tailwindcss.
- **Código sin comentarios**: No se añaden comentarios a menos que sea estrictamente necesario.
- **Estilos**: Tailwind CSS v4 con `cn()` (clsx + tailwind-merge) para clases condicionales.
- **Path alias**: `@/*` → `./src/*`

---

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo en :3000 |
| `pnpm build` | Build de producción (prisma generate + next build) |
| `pnpm lint` | ESLint |
| `pnpm prisma db push` | Sincronizar schema a PostgreSQL |
| `npx tsx ./prisma/seed.ts` | Seed de la base de datos |
| `pnpm prisma:studio` | Prisma Studio (UI) |

---

## Configuración

- **Base de datos**: PostgreSQL, configurado vía `DATABASE_URL` en `.env`
- **S3**: AWS SDK para uploads de imágenes
- **Imágenes remotas**: Permitidos dominios `static.flashscore.com` e `i.ibb.co`

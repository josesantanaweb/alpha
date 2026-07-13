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
│   ├── explorer/           # Página de exploración
│   ├── favorites/          # Página de favoritos
│   ├── layout.tsx          # Layout raíz
│   └── page.tsx            # Home page (shell)
├── components/
│   ├── layout/             # AppLayout, Header, BottomNav
│   ├── providers/          # React context providers
│   ├── shared/             # Componentes de dominio reutilizables
│   └── ui/                 # Primitivas (Button, Input, Logo...)
├── constants/              # Assets, config, rutas
├── hooks/                  # React Query hooks
├── lib/                    # Utilidades compartidas
│   ├── api/                # Fetch helpers (cliente)
│   ├── cn.ts               # clsx + tailwind-merge
│   ├── db.ts               # Prisma singleton
│   ├── pagination.ts       # Paginación reutilizable
│   └── s3.ts               # Cliente S3
├── modules/                # Lógica de negocio (feature-based)
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

- **Todas** las llamadas a Prisma pasan por `modules/*/actions.ts` — nunca se llama a `db` directamente desde componentes.
- Las API routes son wrappers HTTP delgados que llaman a las acciones del módulo.
- La respuesta siempre sigue la forma `ApiResult<T>` (ver abajo).

---

## Modelo de Datos

### Entidades Principales

| Modelo | Descripción |
|---|---|
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
enum PerfumeType { ARABIC, DESIGNER, DECANT, NICHE }
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
|---|---|---|
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
- `AddToCartButton` — Botón añadir al carrito
- `Tabs` — Pestañas navegables

---

## Rutas del Frontend

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Landing page con slider, diseñadores, géneros, badges, best sellers |
| `/explorer` | Explorer | Listado/grid de perfumes con filtros |
| `/explorer?gender=MALE` | Explorer (filtrado) | Perfumes filtrados por género |
| `/favorites` | Favorites | Perfumes guardados como favoritos |

---

## Hooks (React Query)

| Hook | Endpoint |
|---|---|
| `useBanners()` | GET /api/banners |
| `useCategories()` | GET /api/categories |
| `useFavorites()` | Zustand store (local) |
| `usePerfumes(params)` | GET /api/perfumes?search=&gender=... |
| `useTags()` | GET /api/tags |
| `useVibes()` | GET /api/vibes |
| `useDebounce(value, delay)` | Utilidad |

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
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build (TypeScript + lint check) |
| `pnpm lint` | ESLint — next/core-web-vitals + typescript + prettier |
| `pnpm prisma db push` | Sync Prisma schema → local PostgreSQL (no migrations) |
| `npx tsx ./prisma/seed.ts` | Seed the DB (requires `DATABASE_URL` in `.env`) |

> No test scripts, no CI/CD.

---

## Project: Aura

**Aura** is a premium perfume e-commerce store built on **Next.js 16 App Router**.  
Language: TypeScript 5 (strict). Package manager: **pnpm**.

---

## Architecture

### Module pattern — vertical slices (`src/modules/<name>/`)

Every feature domain lives in its own folder. The internal structure is:

```
src/modules/<name>/
  actions.ts        ← server-side DB logic, returns ApiResult<T>
  schema.ts         ← Zod validation schemas
  types.ts          ← domain-specific TypeScript types and const enums
  store.ts          ← Zustand store (only if the module needs client-local state)
  hooks/            ← React Query wrappers (one file per query/mutation)
  components/       ← domain-specific React components
  components/index.ts  ← barrel re-export for components (Avoid root index.ts to prevent mixing client/server)
```

### Existing modules

| Module | Description |
|---|---|
| `auth` | JWT login / register / Google OAuth |
| `perfumes` | Perfume catalog CRUD, detail page, filtering |
| `designers` | Brand / maison management |
| `accords` | Accord taxonomy |
| `notes` | Olfactive notes (TOP / HEART / BASE) |
| `tags` | Tag taxonomy |
| `decants` | Decant sizes and pricing per perfume |
| `banners` | Home promotional banners |
| `vibes` | Mood/vibe categories |
| `home` | Home page data assembly |
| `explorer` | Search, filter, sort catalog |
| `favorites` | User ↔ Perfume many-to-many favorites |
| `cart` | Guest + authenticated cart (Zustand + backend sync) |
| `checkout` | Order creation flow |
| `orders` | Order history and status |
| `reviews` | Star ratings and review comments |
| `feelings` | Community vote: love / like / dislike / hate |
| `longevities` | Community vote: longevity (weak → veryLong) |
| `sillages` | Community vote: sillage projection (soft → huge) |
| `seasons` | Community vote: season (winter / spring / summer / autumn) |
| `posts` | Blog / editorial posts |
| `uploads` | Image upload utility |
| `account` | User profile and settings |
| `shared` | Generic infrastructure (see below) |

### Shared infrastructure (`src/modules/shared/`)

```
shared/
  components/
    ui/         ← primitives: Button, Input, Logo, Badge, Modal, Skeleton
    layout/     ← AppLayout, Header, BottomNav
    *.tsx       ← reusable generic components: CategoryButton, LikeButton, Rating, etc.
  hooks/        ← technical hooks: useDebounce, useIntersectionObserver
  stores/       ← global UI state: useUIStore (drawer, modal open/close)
  types/        ← global TypeScript types: ApiResult<T>, PaginationParams
  utils/        ← cn() utility (clsx + tailwind-merge)
```

### Data flow

```
[Page / Server Component]
    └─ calls module actions.ts  ←→  Prisma (@/lib/db)

[Client Component]
    └─ React Query hook (modules/<name>/hooks/)
          └─ fetch wrapper (src/lib/api/)
                └─ Next.js API route (src/app/api/<name>/route.ts)
                      └─ module actions.ts  ←→  Prisma
```

- **`@/lib/db.ts`** — exports a **Prisma singleton** using `@prisma/adapter-pg`. Import only from `actions.ts`.
- **Never** call `db` directly from React components or hooks.
- Server Actions must begin with `import 'server-only';`.

### Key directories

```
src/
  app/
    api/<name>/route.ts   ← REST endpoints (ApiResult shape)
    (routes)/page.tsx     ← thin page shells delegating to modules
  modules/                ← all feature slices
  lib/
    db.ts                 ← Prisma singleton
    api/                  ← client-side fetch helpers
```

### Path alias

```
@/* → ./src/*
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 — strict mode |
| Database | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Styling | Tailwind CSS v4 (PostCSS plugin) |
| State — server | @tanstack/react-query v5 |
| State — client | Zustand |
| Validation | Zod |
| Animation | Framer Motion |
| Icons | Lucide React |
| Linting | ESLint (next/core-web-vitals + typescript + prettier) |
| Formatting | Prettier — semicolons, double quotes, trailing commas, tailwindcss plugin |

---

## Design System

Dark-mode premium theme:

| Token | Value |
|---|---|
| Background | `#0B0B0E` |
| Surface / Cards | `#1E1E24` with subtle borders |
| Accent | `#D4AF37` (gold / amber) |
| Text primary | White / near-white |
| Text secondary | `#A0A0A8` |

Use `cn()` (from `@/modules/shared/utils`) for conditional class merging.

---

## Conventions

### General
- **User-facing text and error strings → Spanish.**
- All Prisma calls go through `actions.ts` — never from components or hooks.
- `ApiResult<T>` shape for every API response and server action:
  ```ts
  { success: boolean; status: number; data?: T; message?: string; errors?: Record<string, string[]> }
  ```
- New features follow: `modules/<name>/` → `app/api/<name>/route.ts` → hooks → components.
- **NEVER use a root `index.ts` in modules.** This prevents accidentally mixing server actions (`actions.ts`) with client components, which breaks Next.js App Router builds. Use barrel exports only in subdirectories (e.g., `components/index.ts`, `hooks/index.ts`, `utils/index.ts`) and import from them explicitly.
- **Constants live in the `constants` folder.** Do not define magic numbers or literals inline where they are used; move them to `src/constants/` (re-exported from `@/constants`) and import them.
- **Utils live in their own util file.** Utility functions (formatting, helpers, etc.) must NOT be declared in the same file where they are used. Put them in a `utils/` subdirectory (e.g., `modules/shared/utils/` or `modules/<name>/utils/`) and import them from there.

### Component file naming — kebab-case

**Component files use kebab-case** (e.g., `account-header.tsx`, `account-menu-item.tsx`, `social-links.tsx`) instead of PascalCase.

- File names are lowercase, hyphen-separated kebab-case. No PascalCase file names for components.
- The **exported component name stays PascalCase** (e.g., `export const AccountHeader = ...`).
- Component-specific render files that only render one component still follow this pattern (`account-page.tsx`).
- Barrel imports/exports reference the kebab-case file path verbatim.
- This is a **progressive migration**: existing PascalCase component files (e.g., `AccountHeader.tsx`) will be renamed to kebab-case over time. New components must use kebab-case from the start.

### Enum Convention — UPPERCASE everywhere

**All enum values MUST be UPPERCASE** across Prisma, Zod, actions, and frontend.

#### Frontend (types.ts) — const object + type union

```ts
export const DeliveryMethod = {
  DELIVERY: "DELIVERY",
  PICKUP: "PICKUP",
} as const;

export type DeliveryMethod = (typeof DeliveryMethod)[keyof typeof DeliveryMethod];
```

Import as a value (not `import type`):

```ts
import { DeliveryMethod } from "../types";
isActive={value === DeliveryMethod.DELIVERY}
```

#### Backend — Zod enum

```ts
export const DeliveryMethodEnum = z.enum(["DELIVERY", "PICKUP"]);
```

#### Prisma schema

```prisma
enum DeliveryMethod { DELIVERY  PICKUP }
enum Currency       { VES       USD }
enum PaymentMethod  { MOBILE_PAYMENT  BINANCE  ZINLI  CASH }
enum OrderStatus    { PENDING  CONFIRMED  SHIPPED  DELIVERED  CANCELLED }
enum PerfumeType    { ARABIC  DESIGNER  NICHE }
enum Gender         { MALE  FEMALE  UNISEX }
enum NoteStage      { TOP  HEART  BASE }
```

#### ❌ NEVER lowercase

`"delivery"`, `"pickup"`, `"ves"`, `"usd"`, `"mobile_payment"`, `"pago_movil"`, `"efectivo"`

#### ✅ Always UPPERCASE

`"DELIVERY"`, `"PICKUP"`, `"VES"`, `"USD"`, `"MOBILE_PAYMENT"`, `"BINANCE"`, `"ZINLI"`, `"CASH"`

---

## Favorites Module

- Stored in DB via `User ↔ Perfume` many-to-many `@relation("FavoritePerfumes")`.
- `src/modules/favorites/actions.ts` — `create()`, `remove()`, `getUserFavorites()`, `getByIds()`.
- `src/app/api/favorites/route.ts` — GET / POST / DELETE, all require Bearer token.
- `src/modules/favorites/hooks/use-favorites.ts` — optimistic updates via `useMutation`.
- Returns: `{ ids, perfumes, ready, add, remove, toggle, isFavorite }`.
- Unauthenticated `toggle/add/remove` → redirect to `/login`.

---

## Community Votes (UserVote)

Votes are deduplicated per `(userId, perfumeId, category)`. Categories:

| category | fields |
|---|---|
| `season` | `winter`, `spring`, `summer`, `autumn` |
| `timeOfDay` | `day`, `night` |
| `longevity` | `weak`, `moderate`, `long`, `veryLong` |
| `sillage` | `soft`, `moderate`, `heavy`, `huge` |
| `projection` | `soft`, `moderate`, `heavy`, `huge` |
| `feeling` | `love`, `like`, `dislike`, `hate` |

---

## Cart

- Guest cart: Zustand local state only.
- Authenticated cart: synced to backend (`GET /api/cart`, `POST /api/cart/add`, `DELETE /api/cart/remove/:itemId`).
- On login: merge guest cart → server cart.
- `CartItem` supports both full-bottle (`perfumeId` only) and decant (`perfumeId + decantId`).

---

## Orders

Enum chain: `PENDING → CONFIRMED → SHIPPED → DELIVERED` (or `CANCELLED`).  
Fields: `deliveryMethod`, `currency`, `paymentMethod`, `contactName/Email/Phone`, `city`, `address`, `subtotal`, `discount`, `shipping`, `total`.  
Order creation must be a Prisma transaction: create order + items + validate/decrement stock atomically.

---

## Reviews

- One review per `(userId, perfumeId)` — enforced by `@@unique`.
- Creating/editing/deleting a review must recalculate `perfume.rating` and `perfume.reviewCount`.
- Review has: `title?`, `comment` (Text), `rating` (Int 1–5).
- Lazy-validation pattern: eligibility is checked only when the user clicks the button, not on page load.

---

## Auth

- JWT-based (access token in Authorization header).
- Google OAuth via `googleId` field on User.
- Password field is null for Google users.
- Pending: refresh tokens, password reset flow, email verification.

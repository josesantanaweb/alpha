<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `pnpm dev` — dev server on :3000
- `pnpm build` — production build
- `pnpm lint` — eslint (next/core-web-vitals + typescript + prettier)
- `pnpm prisma db push` — sync schema to local PostgreSQL
- `npx tsx ./prisma/seed.ts` — seed the DB (requires `DATABASE_URL` in `.env`)

No test scripts, no CI/CD.

## Architecture

**Aura** — perfume e-commerce store, Next.js App Router.

### Module pattern (`src/modules/<name>/`)
Each feature follows vertical-slice architecture:
- `components/` — domain-specific React components
- `hooks/` — React Query wrappers exclusive to this module
- `store.ts` — Zustand store (optional, for modules that need local state)
- `actions.ts` — server-side business logic returning `ApiResult<T>` (discriminated union)
- `schema.ts` — Zod validation schemas
- `types.ts` — TypeScript types specific to this domain
- `index.ts` — barrel re-export

Shared infrastructure lives in `src/modules/shared/`:
- `shared/components/ui/` — primitives (Button, Input, Logo, Badge)
- `shared/components/layout/` — AppLayout, Header, BottomNav
- `shared/components/` — generic reusable components (CategoryButton, LikeButton, Rating, etc.)
- `shared/hooks/` — technical hooks (useDebounce)
- `shared/stores/` — global UI state (useUIStore)
- `shared/types/` — global TypeScript types (ApiResult, PaginationParams)
- `shared/utils/` — cn() utility (clsx + tailwind-merge)

### Data flow
- Server: modules → direct Prisma calls (via `@/lib/db`)
- Client: React Query hooks (per-module `hooks/`) → fetch wrappers (`src/lib/api/`) → API routes → modules
- `@/lib/db.ts` exports a Prisma singleton using `@prisma/adapter-pg`

### Key directories
- `src/modules/` — business logic (one folder per feature, vertical slices)
- `src/modules/shared/` — generic infrastructure (UI, utils, types, stores)
- `src/modules/perfumes/` — perfume domain (components, hooks, actions, schema, types)
- `src/modules/auth/` — auth domain (components, hooks, store, actions, schema)
- `src/app/api/` — REST API routes
- `src/app/page.tsx` — thin page shells delegating to modules
- `src/lib/api/` — client-side fetch helpers

### Path alias
`@/*` → `./src/*`

## Tech stack
- Next.js 16, React 19, TypeScript 5 (strict)
- Prisma 7 (`@prisma/adapter-pg` for PostgreSQL)
- Tailwind CSS v4 (PostCSS plugin)
- @tanstack/react-query, zustand, zod, framer-motion
- Prettier (semicolons, double-quotes, trailing commas, tailwindcss plugin)
- ESLint with prettier integration
- pnpm (see `pnpm-lock.yaml`)

## Conventions
- Spanish for user-facing messages and error strings
- All Prisma calls happen through module actions — never call `db` directly from components
- API routes return `ApiResult<T>` shape: `{ success, status, data, message?, errors? }`
- New features follow the `modules/<name>/` → `api/<name>/` → hooks → components pattern

## Favorites
- Favorites are stored in the DB via the `User` ↔ `Perfume` many-to-many relation (`@relation("FavoritePerfumes")`)
- `src/modules/favorites/actions.ts` — `create(userId, perfumeId)`, `remove(userId, perfumeId)`, `getUserFavorites(userId)` (returns `PerfumeWithRelations[]`), `getByIds(ids)`
- `src/app/api/favorites/route.ts` — `GET` (returns array of perfume objects with designer & accords), `POST` (add), `DELETE` (remove). All require Bearer token auth.
- `src/modules/favorites/hooks/use-favorites.ts` — React Query hook that fetches favorites from the API when logged in. Uses optimistic updates via `useMutation`. If user is not authenticated, `toggle`/`add`/`remove` redirect to `/login`.
- `useFavorites()` returns `{ ids: string[], perfumes: PerfumeWithRelations[], ready: boolean, add, remove, toggle, isFavorite }`

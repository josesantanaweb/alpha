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
Each feature has three files:
- `actions.ts` — server-side business logic returning `ApiResult<T>` (discriminated union)
- `schema.ts` — Zod validation schemas
- `index.ts` — barrel re-export

API routes (`src/app/api/<name>/route.ts`) are thin HTTP wrappers calling module actions.

### Data flow
- Server: modules → direct Prisma calls (via `@/lib/db`)
- Client: React Query hooks (`src/hooks/`) → fetch wrappers (`src/lib/api/`) → API routes → modules
- `@/lib/db.ts` exports a Prisma singleton using `@prisma/adapter-pg`

### Key directories
- `src/modules/` — business logic (one folder per feature)
- `src/app/api/` — REST API routes
- `src/app/page.tsx` — thin page shells delegating to modules
- `src/components/ui/` — primitives (Button, Input, Logo)
- `src/components/shared/` — composed domain components (PerfumeBox, CategoryButton, BestSellers, etc.)
- `src/components/layout/` — AppLayout, Header, BottomNav
- `src/components/providers/` — React context providers (QueryClient)
- `src/hooks/` — React Query wrappers
- `src/lib/api/` — client-side fetch helpers
- `src/lib/cn.ts` — `cn()` utility (clsx + tailwind-merge)
- `src/types/api.ts` — `ApiResult<T>` generic type
- `src/constants/` — assets, config, routes

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

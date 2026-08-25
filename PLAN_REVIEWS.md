# Plan de Mejoras — Módulo de Reviews

Diagnóstico y propuestas de mejora sobre `src/modules/reviews/`, sus hooks, componentes y rutas API asociadas (`src/app/api/reviews/`).

---

## Fase 1: Bugs y deuda técnica (prioridad alta)

| Archivo | Problema | Propuesta |
|---|---|---|
| `components/ReviewCard.tsx` | Cuando `review` es `undefined` renderiza datos falsos hardcodeados ("Jose Santana", comentario de ejemplo, rating 5) en vez de nada. Esto es resto de desarrollo (mock/storybook) que puede filtrarse a producción. | Quitar todos los fallbacks fake. Si no hay `review`, no renderizar (el listado ya usa `ReviewCardSkeleton` para loading). |
| `components/RatingAverage.tsx` | Defaults `rating = 4.3`, `reviewCount = 400` — datos de mentira que aparecen si el padre olvida pasar props. | Quitar defaults falsos; hacer las props requeridas o usar `0`. |
| `components/RatingBreakdown.tsx` | Fallback `percentage = distribution?.[stars] ?? 50` — si `distribution` no llega, muestra barras al 50% en vez de vacías. | Usar `?? 0` como fallback real, no un valor inventado. |
| `components/ReviewCard.tsx` | `onEdit?.(review!)` usa non-null assertion. Si `isOwner` es `true` sin `review`, rompe en runtime. | Reestructurar el guard: `if (!review) return null;` al inicio del componente, así TS ya sabe que `review` existe en el resto del archivo. |
| `components/RatingSummary.tsx` | Solo maneja `isLoading`; si `useReviews` falla (`isError`), no se muestra nada — ni error ni contenido. | Agregar rama `isError` con mensaje + botón de reintento (`refetch`). |

---

## Fase 2: Consistencia de arquitectura (prioridad media)

| Tema | Situación actual | Propuesta |
|---|---|---|
| **Query keys repetidas** | La key `["reviews", { perfumeId }]` se repite manualmente en `use-create-review.ts`, `use-update-review.ts`, `use-delete-review.ts` y `["reviews", params]` en `use-reviews-query.ts`. Funciona por *partial matching* de React Query, pero es implícito y frágil ante refactors. | Crear un query-key factory: `export const reviewsKeys = { all: (perfumeId: string) => ["reviews", perfumeId] as const, list: (params: GetReviewsParams) => [...reviewsKeys.all(params.perfumeId), params] as const }` y usarlo en los 4 hooks. |
| **Validación duplicada** | `ReviewForm.tsx` reimplementa a mano las reglas de `CreateReviewSchema`/`UpdateReviewSchema` (`rating === 0`, `comment.length < 10`). Si el schema cambia en el server, el cliente queda desincronizado. | Reusar `CreateReviewSchema.safeParse()` en el submit del form para validar con el mismo esquema del backend y mapear `error.flatten().fieldErrors` a los `errors` del state. |
| **Tipo `GetReviewsResponse` duplicado** | Existe una versión en `modules/reviews/types.ts` (sin `userReview`) y otra en `lib/api/reviews.ts` (con `userReview`), con riesgo de que se desincronicen. | Definir un único tipo canónico (ej. en `types.ts`) que incluya `userReview`, y que `lib/api/reviews.ts` solo lo importe. |
| **Star rating duplicado 3 veces** | `ReviewCard`, `ReviewForm` y `RatingAverage` reimplementan el render de 5 estrellas con ligeras variaciones (tamaño, interactividad). | Extraer `shared/components/StarRating.tsx` con props `value`, `size`, `readOnly`, `onChange` y reusarlo en los 3 lugares. |

---

## Fase 3: UX (prioridad media)

| Mejora | Detalle |
|---|---|
| **Paginación de reseñas** | El backend ya calcula `nextPage` en `getByPerfume`, pero el frontend solo pide `limit: 10` y nunca pagina. Agregar botón "Ver más reseñas" que incremente `offset` (o usar `useInfiniteQuery`). |
| **Optimistic updates** | Crear/editar/eliminar solo invalida queries → refetch completo → flash de skeletons. Aplicar el mismo patrón optimista que `useFavorites` (`onMutate` + rollback en `onError`) para que el cambio se vea instantáneo. |
| **Confirmación de borrado** | `ReviewCard` usa `window.confirm()`, que rompe la estética dark/premium del resto de la app. Se necesita un componente `Modal` (mencionado en las convenciones de `shared/components/ui` pero no existe aún) para un diálogo de confirmación propio. |
| **Contador de caracteres** | El `Textarea` del comentario permite hasta 1000 caracteres pero no muestra cuántos lleva el usuario. Agregar contador `comment.length / 1000`. |
| **Indicador de "editado"** | El modelo `Review` solo tiene `createdAt`. Si el usuario edita su reseña, no queda rastro. Agregar `updatedAt DateTime @updatedAt` en `prisma/schema.prisma` y mostrar "(editado)" en `ReviewCard` si `updatedAt !== createdAt`. |
| **Accesibilidad en selección de estrellas** | Las estrellas clickeables son `<Star onClick>` sin rol de botón, sin `aria-label`, no navegables por teclado. Envolver cada una en `<button type="button" aria-label="Calificar con N estrellas">`. |
| **Empty state consistente** | El mensaje "No hay reseñas aún" es un `<p>` suelto; ya existe `shared/components/EmptyState`, evaluar una variante liviana (sin botones de "Explorar catálogo") para reutilizar estilos. |

---

## Fase 4: Backend / Prisma (prioridad baja)

| Mejora | Detalle |
|---|---|
| `updatedAt` en `Review` | Ver Fase 3 — requiere `pnpm prisma db push` tras el cambio de schema. |
| Manejo explícito de 401 | `useCreateReview.onError` solo redirige a login si `!user` (sesión nunca existió). Si el token expiró (usuario cree estar logueado pero el server responde 401), no se limpia la sesión ni se redirige. Detectar status 401 en los helpers de `lib/api/reviews.ts` y llamar `clearSession()` + redirect. |
| Verified purchase / anti-spam | No hay validación de que el usuario haya comprado el perfume antes de reseñar. Backlog: cruzar con `Order` para mostrar badge "Compra verificada" (no bloquea reseñas de igual forma, solo informativo). |

---

## Fase 5: Backlog (fuera de alcance inmediato)

- Votos "¿Te fue útil esta reseña?" (like/dislike por review) → ver **Fase 6**.
- Reporte de contenido inapropiado / moderación admin.
- Ordenar reseñas por "más útiles", "mejor calificación", "más recientes" → ver **Fase 7**.
- Tests unitarios de `actions.ts` (validación, `syncPerfumeRating`, permisos de owner) y tests de integración de los hooks de mutación.

---

## Fase 6: Votos de utilidad ("¿Te fue útil esta reseña?")

> Estado actual: `ReviewCard` ya tiene los botones `HelpfulButton` (👍 Útil / 👎 No útil) en `shared/components/HelpfulButton.tsx`, pero son puramente decorativos — no tienen `onClick`, no cuentan votos y no persisten nada.

### 1. Prisma schema

- Nuevo modelo `ReviewVote` (un voto por usuario por review, igual patrón que `UserVote`):
  ```prisma
  model ReviewVote {
    id        String   @id @default(uuid())
    reviewId  String
    review    Review   @relation(fields: [reviewId], references: [id], onDelete: Cascade)
    userId    String
    user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    isHelpful Boolean
    createdAt DateTime @default(now())

    @@unique([reviewId, userId])
  }
  ```
- Agregar contadores desnormalizados a `Review` (mismo patrón que `perfume.rating`/`reviewCount`):
  ```prisma
  model Review {
    // ...campos existentes
    helpfulCount    Int @default(0)
    notHelpfulCount Int @default(0)
    votes           ReviewVote[]
  }
  ```
- Agregar la relación inversa `reviewVotes ReviewVote[]` en `User`.
- Ejecutar `pnpm prisma db push`.

### 2. Zod schema (`modules/reviews/schema.ts`)

```ts
export const VoteReviewSchema = z.object({
  isHelpful: z.boolean(),
});
```

### 3. Backend (`modules/reviews/actions.ts`)

- `syncReviewVoteCounts(reviewId)`: agrupa `ReviewVote` por `isHelpful` y actualiza `helpfulCount`/`notHelpfulCount` en `Review` (igual que `syncPerfumeRating`).
- `voteReview(reviewId, userId, isHelpful)`:
  - Si no existe voto → `create`.
  - Si existe voto con el mismo `isHelpful` → **toggle off**: `delete` (el usuario quita su voto al volver a hacer click).
  - Si existe voto con `isHelpful` distinto → `update` (cambia de Útil a No útil o viceversa).
  - Llamar `syncReviewVoteCounts(reviewId)` al final.
  - Retornar `{ helpfulCount, notHelpfulCount, userVote: boolean | null }`.

### 4. API route

- Nuevo archivo `src/app/api/reviews/[id]/vote/route.ts`:
  - `POST` — requiere Bearer token (igual patrón que `favorites`). Body `{ isHelpful: boolean }` validado con `VoteReviewSchema`. Llama a `voteReview`.

### 5. Incluir el voto del usuario en el listado

- En `getByPerfume` (actions.ts) y en la ruta `GET /api/reviews`, hacer un query adicional (solo si hay usuario autenticado) para traer los `ReviewVote` del usuario sobre las reviews de la página actual, y anexar `userVote: boolean | null` a cada `ReviewWithUser`.
- Actualizar `ReviewWithUser` / `GetReviewsResponse` en `types.ts` para incluir `helpfulCount`, `notHelpfulCount` y `userVote`.

### 6. Frontend

- `lib/api/reviews.ts` → `voteReview(token, reviewId, isHelpful)`.
- Nuevo hook `modules/reviews/hooks/use-vote-review.ts`:
  - `useMutation` con **optimistic update** (`onMutate` incrementa/decrementa contadores localmente vía `queryClient.setQueriesData` sobre `reviewsKeys.all(perfumeId)`, `onError` hace rollback) — mismo patrón sugerido en Fase 3 para create/update/delete.
  - Si no hay usuario autenticado → redirigir a `/login` (patrón `useFavorites`/`useCreateReview`).
- `HelpfulButton` (`shared/components/HelpfulButton.tsx`): agregar prop `count?: number` para mostrar el número junto al label.
- `ReviewCard.tsx`: pasar `review.helpfulCount`, `review.notHelpfulCount`, `review.userVote` y conectar `onClick` de cada `HelpfulButton` a `useVoteReview`. `active` = `userVote === true` (Útil) / `userVote === false` (No útil).

### 7. Orden de implementación sugerido

1. Schema + `db push`.
2. `actions.ts` (`voteReview`, `syncReviewVoteCounts`) + Zod schema.
3. API route `[id]/vote`.
4. Extender `getByPerfume` con `userVote` por review.
5. `lib/api/reviews.ts` + hook `use-vote-review.ts`.
6. Conectar `HelpfulButton` en `ReviewCard`.

---

## Fase 7: Ordenar reseñas (sort)

> Estado actual: `ReviewSortMenu` ya existe (`components/ReviewSortMenu.tsx`) con las 3 opciones (Recientes / Mejor calificación / Más útiles) y el enum `ReviewSort` en `types.ts`, pero es 100% cosmético — cambiar la opción no afecta el `orderBy` del backend ni la query.

> ⚠️ La opción **"Más útiles"** depende de que la **Fase 6** esté implementada (necesita `helpfulCount` en `Review`). Si se implementa esta fase antes, dejar esa opción con fallback a `createdAt desc` temporalmente.

### 1. Types (`modules/reviews/types.ts`)

- Agregar `sort?: ReviewSort` a `GetReviewsParams`.

### 2. Backend (`modules/reviews/actions.ts`)

- En `getByPerfume`, mapear `sort` a `orderBy` de Prisma:
  ```ts
  const orderBy: Prisma.ReviewOrderByWithRelationInput =
    sort === ReviewSort.RATING
      ? { rating: "desc" }
      : sort === ReviewSort.HELPFUL
        ? { helpfulCount: "desc" } // requiere Fase 6
        : { createdAt: "desc" };
  ```
- Usar `orderBy` en el `db.review.findMany`.

### 3. API route (`src/app/api/reviews/route.ts`)

- Leer `searchParams.get("sort")`, validar contra los valores de `ReviewSort` (default `RECENT` si es inválido o ausente), pasarlo a `getByPerfume`.

### 4. Frontend

- `lib/api/reviews.ts` → `getReviews`: agregar `sort` a los `searchParams` si está presente.
- `hooks/reviews-keys.ts`: no requiere cambios (ya incluye el objeto `params` completo en la key, así que `sort` queda cubierto automáticamente).
- `RatingSummary.tsx`:
  - Pasar `sort` al `getReviews({ perfumeId, limit, offset, sort })` dentro de `useQueries`.
  - Al cambiar de `sort`, **resetear la paginación**: `fetchedOffsets` debe volver a `[0]` (si no, se mezclan páginas ya cargadas con el orden viejo). Crear un `handleSortChange` que haga `setSort(value); setFetchedOffsets([0]);` y pasarlo a `ReviewSortMenu` en vez de `setSort` directo.

### 5. Orden de implementación sugerido

1. (Si aplica) Completar Fase 6 primero para que "Más útiles" tenga datos reales.
2. `types.ts` — agregar `sort` a `GetReviewsParams`.
3. `actions.ts` — `orderBy` dinámico.
4. Ruta API — leer y validar `sort`.
5. `lib/api/reviews.ts` — enviar `sort` en la request.
6. `RatingSummary.tsx` — wiring de `sort` + reset de `fetchedOffsets` al cambiar de orden.

---

## Orden recomendado de ejecución

1. Fase 1 (bugs) — bajo riesgo, alto impacto en calidad percibida.
2. Fase 2 (query keys + validación con Zod) — reduce deuda antes de seguir creciendo el módulo.
3. Fase 3 (UX) — mejoras visibles para el usuario final.
4. Fase 6 (votos de utilidad) — habilita datos reales para "Más útiles".
5. Fase 7 (sort) — depende de Fase 6 para la opción "Más útiles".
6. Fase 4 y 5 — iterativo, según prioridad de negocio.

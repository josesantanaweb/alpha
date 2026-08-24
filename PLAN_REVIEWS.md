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

- Votos "¿Te fue útil esta reseña?" (like/dislike por review).
- Reporte de contenido inapropiado / moderación admin.
- Ordenar reseñas por "más útiles", "mejor calificación", "más recientes".
- Tests unitarios de `actions.ts` (validación, `syncPerfumeRating`, permisos de owner) y tests de integración de los hooks de mutación.

---

## Orden recomendado de ejecución

1. Fase 1 (bugs) — bajo riesgo, alto impacto en calidad percibida.
2. Fase 2 (query keys + validación con Zod) — reduce deuda antes de seguir creciendo el módulo.
3. Fase 3 (UX) — mejoras visibles para el usuario final.
4. Fase 4 y 5 — iterativo, según prioridad de negocio.

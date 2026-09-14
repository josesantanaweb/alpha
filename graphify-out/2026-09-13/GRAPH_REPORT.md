# Graph Report - aura  (2026-09-13)

## Corpus Check
- 395 files · ~142,502 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1439 nodes · 3292 edges · 100 communities (88 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `825bb686`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- blog-list.tsx
- auth/actions.ts
- cn
- experience.tsx
- checkout.tsx
- filter-sheet.tsx
- formatPrice
- verifyToken
- isPrismaError
- perfumes/actions.ts
- reviews/types.ts
- shared/components/index.ts
- cart.tsx
- seed.ts
- package.json
- rating-summary.tsx
- order-card.tsx
- react
- dependencies
- config.ts
- seasons/actions.ts
- api/auth.ts
- push/actions.ts
- accords/actions.ts
- parsePaginationParams
- designers/actions.ts
- feelings/actions.ts
- longevities/actions.ts
- use-cart.ts
- sillages/actions.ts
- tags/actions.ts
- payment-preference-selector.tsx
- compilerOptions
- devDependencies
- admin-sidebar.tsx
- perfume.tsx
- caveman/SKILL.md
- caveman-commit
- @prisma/client
- orders/actions.ts
- framer-motion
- Aura
- uploads/actions.ts
- constants/index.ts
- decants/actions.ts
- notes/actions.ts
- use-create-order.ts
- types/index.ts
- home.tsx
- useAuth
- bottom-nav.tsx
- find-your-vibe-item.tsx
- db.ts
- scripts
- perfumes/[id]/vote/route.ts
- use-favorites.ts
- categories-filter.tsx
- Module Pattern (Vertical Slices)
- Projection Vote Icon: Afable (Soft)
- PWA App Branding
- order-item-card.tsx
- Decant Size Option
- Olfactive Notes Vocabulary
- use-push-subscription.ts
- orders.tsx
- filter-designer.tsx
- Cart Module
- Orders Module
- Dior Brand Logo
- Aura Logo (SVG)
- Longevity Community Vote Scale
- generate-icons.mjs
- Graphify Knowledge Graph Rules
- Auth Module (JWT)
- actions.ts DB Layer
- Dont-Like Feeling Vote Icon
- Heavy Sillage Vote Icon
- Next.js Logo
- Community Votes (UserVote)
- eslint.config.mjs
- opencode.json
- graphify.js
- Night Mood Asset
- postcss.config.mjs
- Instagram Icon
- TikTok Social Icon
- PWA Maskable App Icon
- ui/index.ts
- admin-sidebar-submenu.test.tsx
- reviews/actions.ts
- review-card.tsx
- order-status-badge.tsx
- rating-average.tsx
- textarea.tsx
- review-form.tsx
- @vitejs/plugin-react

## God Nodes (most connected - your core abstractions)
1. `react` - 141 edges
2. `isPrismaError()` - 56 edges
3. `@prisma/client` - 50 edges
4. `lucide-react` - 45 edges
5. `cn()` - 41 edges
6. `useAuth` - 40 edges
7. `parsePaginationParams()` - 30 edges
8. `verifyToken()` - 28 edges
9. `getTokenFromHeaders()` - 27 edges
10. `ROUTES` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Dark Mode Premium Design System` --semantically_similar_to--> `Dark Mode Premium Design System`  [INFERRED] [semantically similar]
  .opencode/agents/frontend.md → AGENTS.md
- `Server/Client Boundary Rules` --semantically_similar_to--> `No Root index.ts Rule`  [INFERRED] [semantically similar]
  .opencode/agents/reviewer.md → AGENTS.md
- `Graphify Knowledge Graph Rules` --semantically_similar_to--> `Graphify Knowledge Graph`  [INFERRED] [semantically similar]
  .agents/rules/graphify.md → AGENTS.md
- `Copilot Graphify Instructions` --semantically_similar_to--> `Graphify Knowledge Graph Rules`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → .agents/rules/graphify.md
- `Copilot Graphify Instructions` --semantically_similar_to--> `Graphify Knowledge Graph`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → AGENTS.md

## Import Cycles
- 2-file cycle: `src/modules/home/components/slider-home/index.ts -> src/modules/home/components/slider-home/slider-home.tsx -> src/modules/home/components/slider-home/index.ts`
- 3-file cycle: `src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/top-bar.tsx -> src/modules/shared/components/index.ts`
- 3-file cycle: `src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/header.tsx -> src/modules/shared/components/index.ts`
- 5-file cycle: `src/modules/cart/components/cart-item.tsx -> src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/app-layout.tsx -> src/modules/cart/components/index.ts -> src/modules/cart/components/cart-item.tsx`
- 5-file cycle: `src/modules/cart/components/cart.tsx -> src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/app-layout.tsx -> src/modules/cart/components/index.ts -> src/modules/cart/components/cart.tsx`

## Hyperedges (group relationships)
- **Checkout and Order Creation Flow** — _opencode_agents_checkout_checkout, _opencode_agents_checkout_cart, _opencode_agents_checkout_orders, _opencode_agents_backend_atomic_transaction [EXTRACTED 0.90]
- **Decant Size Selection Assets** — public_images_5ml_decant_5ml, public_images_10ml_decant_10ml, public_images_decants_decant_size_option [EXTRACTED 1.00]
- **Promotional Banner Assets** — public_images_banner1_promo_banner, public_images_banner2_promo_banner, public_images_banners_promotional_banner [EXTRACTED 1.00]
- **PWA App Icon Set** — public_icons_icon_192_app_icon, public_icons_icon_512_app_icon, public_icons_icon_maskable_512_maskable_app_icon, public_icons_apple_touch_icon_apple_touch_icon, public_icons_pwa_app_branding [EXTRACTED 1.00]
- **Sillage Vote Scale Icons** — public_images_sillage_soft_sillage_vote, public_images_sillage_moderate_sillage_vote, public_images_sillage_heavy_sillage_vote, public_images_sillage_huge_sillage_vote [EXTRACTED 1.00]
- **Aura Brand Marketing Assets** — public_images_logo_svg_logo, public_images_men_png_men_segment, public_images_women_png_women_segment, public_images_night_png_night_mood, public_images_sexy_png_sexy_mood, public_images_presentation_png_presentation [INFERRED 0.85]
- **Aura Community Vote Icon Set (projection, season, time-of-day)** — public_images_projection_afable_projection_vote, public_images_projection_huge_projection_vote, public_images_projection_moderate_projection_vote, public_images_projection_strong_projection_vote, public_images_season_autumn_season_vote, public_images_season_spring_season_vote, public_images_season_summer_season_vote, public_images_season_winter_season_vote, public_images_time_of_day_day_time_of_day_vote, public_images_time_of_day_night_time_of_day_vote [INFERRED 0.85]
- **Community Voting System** — agents_community_votes, _opencode_agents_database_community_metrics, _opencode_agents_database_uservote [INFERRED 0.85]
- **Designer Brand Logo Catalog** — public_images_designers_dior_brand_logo, public_images_designers_gucci_brand_logo, public_images_designers_louis_vuitton_brand_logo, public_images_designers_tom_ford_brand_logo, public_images_designers_versace_brand_logo, public_images_designers_xerjoff_brand_logo [INFERRED 0.85]
- **Community Feeling Vote Scale** — public_images_felling_dont_like_icon, public_images_felling_hate_icon, public_images_felling_like_icon, public_images_felling_love_icon [INFERRED 0.85]
- **Projection Vote Scale (afable, huge, moderate, strong)** — public_images_projection_afable_projection_vote, public_images_projection_huge_projection_vote, public_images_projection_moderate_projection_vote, public_images_projection_strong_projection_vote [INFERRED 0.85]
- **Server vs Client State Management Split** — _opencode_agents_frontend_react_query, _opencode_agents_frontend_zustand, _opencode_agents_reviewer_state_split [INFERRED 0.85]
- **Longevity Vote Scale Icons** — public_images_longevity_weak_icon, public_images_longevity_moderate_icon, public_images_longevity_long_icon, public_images_longevity_very_long_icon [INFERRED 0.95]
- **Olfactive Notes Vocabulary Icons** — public_images_notes_esclarea_icon, public_images_notes_jasmine_icon, public_images_notes_mandarina_icon, public_images_notes_moscada_icon, public_images_notes_tabaco_icon, public_images_notes_vainilla_icon [INFERRED 0.95]
- **Season Vote Scale (autumn, spring, summer, winter)** — public_images_season_autumn_season_vote, public_images_season_spring_season_vote, public_images_season_summer_season_vote, public_images_season_winter_season_vote [INFERRED 0.95]
- **Framework and Platform Tech Badges** — public_next_svg_next_js_logo, public_vercel_svg_vercel_logo, public_next_svg_framework_concept, public_vercel_svg_deployment_platform [INFERRED 0.95]

## Communities (100 total, 8 thin omitted)

### Community 0 - "blog-list.tsx"
Cohesion: 0.11
Nodes (20): metadata, PageProps, PageProps, getPostBySlug(), getPosts(), GetPostsParams, PostsPageResult, BlogDetail() (+12 more)

### Community 1 - "auth/actions.ts"
Cohesion: 0.17
Nodes (15): jose, GET(), GET(), POST(), GET(), POST(), getSecret(), signToken() (+7 more)

### Community 2 - "cn"
Cohesion: 0.17
Nodes (12): Tab, Tabs(), TabsProps, Avatar(), AvatarProps, Badge(), BadgeProps, Dropdown() (+4 more)

### Community 3 - "experience.tsx"
Cohesion: 0.11
Nodes (22): Experience(), ExperienceProps, StatBar(), StatBarProps, FEELING_OPTIONS, LONGEVITY_OPTIONS, PROJECTION_OPTIONS, SEASON_OPTIONS (+14 more)

### Community 4 - "checkout.tsx"
Cohesion: 0.15
Nodes (21): CartItemData, CheckoutOrderSummary(), CheckoutOrderSummaryProps, ContactForm(), ContactFormProps, DeliveryMethodSelector(), DeliveryMethodSelectorProps, OrderSuccessModal() (+13 more)

### Community 5 - "filter-sheet.tsx"
Cohesion: 0.17
Nodes (12): FilterGender(), FilterGenderProps, GENDERS, FilterPrice(), FilterPriceProps, FilterSheet(), FilterSheetProps, FilterSizes() (+4 more)

### Community 6 - "formatPrice"
Cohesion: 0.13
Nodes (15): CartItem(), CartItemProps, CartProgress(), CartProgressProps, QuantityStepper(), QuantityStepperProps, OrderItemSummary(), OrderItemSummaryProps (+7 more)

### Community 7 - "verifyToken"
Cohesion: 0.22
Nodes (15): POST(), DELETE(), RouteParams, authenticate(), GET(), authenticate(), POST(), getTokenFromHeaders() (+7 more)

### Community 8 - "isPrismaError"
Cohesion: 0.14
Nodes (21): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), GET(), RouteParams (+13 more)

### Community 9 - "perfumes/actions.ts"
Cohesion: 0.06
Nodes (40): zod, GET(), DELETE(), GET(), PUT(), RouteParams, DELETE(), GET() (+32 more)

### Community 10 - "reviews/types.ts"
Cohesion: 0.23
Nodes (13): @tanstack/react-query, deleteReview(), updateReview(), voteReview(), reviewsKeys, useDeleteReview(), useVoteReview(), VoteVariables (+5 more)

### Community 11 - "shared/components/index.ts"
Cohesion: 0.11
Nodes (17): lucide-react, AdminNavbarProps, BackButton(), AnimState, CartButton(), CartButtonProps, transitions, variants (+9 more)

### Community 12 - "cart.tsx"
Cohesion: 0.15
Nodes (13): Cart(), CartCheckoutPanel(), CartCheckoutPanelProps, CartDrawer(), CartHeader(), CartItemSkeleton(), CartItemSkeletonProps, DiscountCodeForm() (+5 more)

### Community 13 - "seed.ts"
Cohesion: 0.11
Nodes (16): DECANT_CONFIGS, INITIAL_ACCORDS, INITIAL_BANNERS, INITIAL_DESIGNERS, INITIAL_PERFUME_STATS, INITIAL_PERFUMES, INITIAL_POSTS, INITIAL_VIBES (+8 more)

### Community 14 - "package.json"
Cohesion: 0.07
Nodes (28): name, private, version, date-fns, dotenv, eslint, eslint-config-next, @ianvs/prettier-plugin-sort-imports (+20 more)

### Community 15 - "rating-summary.tsx"
Cohesion: 0.14
Nodes (14): getReviews(), RatingAverageSkeleton(), RatingBreakdown(), RatingBreakdownProps, RatingBreakdownSkeleton(), RatingSummary(), RatingSummaryProps, ReviewCardSkeleton() (+6 more)

### Community 16 - "order-card.tsx"
Cohesion: 0.24
Nodes (10): OrderCard(), OrderCardProps, ORDER_TRACKING_STATUS, OrderTrackingModal(), OrderTrackingModalProps, TRACKING_STEPS, OrderWithItems, ORDER_TRACKING_STATUS (+2 more)

### Community 17 - "react"
Cohesion: 0.10
Nodes (20): react, NewPerfume, NewPerfumesProps, BestSellerPerfume, BestSellers(), BestSellersProps, PerfumeBadge(), PerfumeBadgeProps (+12 more)

### Community 18 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, @aws-sdk/client-s3, bcryptjs, @boxicons/react, class-variance-authority, clsx, date-fns, framer-motion (+13 more)

### Community 19 - "config.ts"
Cohesion: 0.29
Nodes (6): FREE_SHIPPING_THRESHOLD, PAGINATION_PAGE_SIZE, RELATIVE_DATE_THRESHOLD_DAYS, SHIPPING_FEE, SOCIAL_URLS, WHATSAPP_NUMBER

### Community 20 - "seasons/actions.ts"
Cohesion: 0.24
Nodes (11): DELETE(), GET(), PUT(), RouteParams, getOne(), remove(), update(), CreateSeasonInput (+3 more)

### Community 21 - "api/auth.ts"
Cohesion: 0.07
Nodes (27): nextConfig, next, lato, metadata, viewport, ASSETS, completeGoogleLogin(), initialize() (+19 more)

### Community 22 - "push/actions.ts"
Cohesion: 0.16
Nodes (14): web-push, authenticate(), DELETE(), configureWebPush(), ensureConfigured(), PushSubscriptionDto, sendPushNotification(), EXPIRED_STATUS_CODES (+6 more)

### Community 23 - "accords/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 24 - "parsePaginationParams"
Cohesion: 0.19
Nodes (15): GET(), POST(), GET(), POST(), GET(), POST(), parseNonNegativeInt(), parsePaginationParams() (+7 more)

### Community 25 - "designers/actions.ts"
Cohesion: 0.24
Nodes (11): DELETE(), GET(), PUT(), RouteParams, getOne(), remove(), update(), CreateDesignerInput (+3 more)

### Community 26 - "feelings/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 27 - "longevities/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 28 - "use-cart.ts"
Cohesion: 0.20
Nodes (13): getCart(), CartWithItems, useCart(), GuestCartStore, useCartStore, CartData, CartProduct, GuestCartItem (+5 more)

### Community 29 - "sillages/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 30 - "tags/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 31 - "payment-preference-selector.tsx"
Cohesion: 0.18
Nodes (14): PaymentMethodSelector(), PaymentMethodSelectorProps, PaymentNotice(), PaymentNoticeProps, PaymentPreferenceSelector(), PaymentPreferenceSelectorProps, UsdPaymentOptions(), UsdPaymentOptionsProps (+6 more)

### Community 32 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 33 - "devDependencies"
Cohesion: 0.07
Nodes (28): devDependencies, dotenv, eslint, eslint-config-next, eslint-config-prettier, @ianvs/prettier-plugin-sort-imports, jsdom, msw (+20 more)

### Community 34 - "admin-sidebar.tsx"
Cohesion: 0.10
Nodes (24): clsx, zustand, AdminBrand(), AdminBrandProps, AdminNavbar(), AdminPerfume, AdminPerfumesTable(), AdminPerfumesTableProps (+16 more)

### Community 35 - "perfume.tsx"
Cohesion: 0.07
Nodes (26): BOTTLE_ML, AccordBarProps, Accords(), AccordsProps, PerfumeAccordData, toCartProduct(), AboutPerfume(), AboutPerfumeProps (+18 more)

### Community 36 - "caveman/SKILL.md"
Cohesion: 0.17
Nodes (10): caveman, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Intensity (+2 more)

### Community 37 - "caveman-commit"
Cohesion: 0.18
Nodes (9): caveman-commit, Example output, How to invoke, See also, What it does, Auto-Clarity, Boundaries, Examples (+1 more)

### Community 38 - "@prisma/client"
Cohesion: 0.27
Nodes (6): @prisma/client, API_ROUTES, getActiveBanners(), getTags(), useBanners(), useTags()

### Community 39 - "orders/actions.ts"
Cohesion: 0.20
Nodes (13): authenticate(), GET(), authenticate(), GET(), POST(), createOrder(), CURRENCY_MAP, DELIVERY_METHOD_MAP (+5 more)

### Community 40 - "framer-motion"
Cohesion: 0.18
Nodes (10): framer-motion, SliderHomeDots(), SliderHomeDotsProps, SliderHomeSkeleton(), SliderHomeSlide(), SliderHomeSlideProps, SliderHome(), SliderHomeProps (+2 more)

### Community 41 - "Aura"
Cohesion: 0.14
Nodes (14): Prisma Schema Rules, Dark Mode Premium Design System, Reviews Module, Aura, Dark Mode Premium Design System, UPPERCASE Enum Convention, Favorites Module, Prisma Singleton (db) (+6 more)

### Community 42 - "uploads/actions.ts"
Cohesion: 0.22
Nodes (10): @aws-sdk/client-s3, POST(), s3, generateKey(), upload(), UploadResult, validateFiles(), ALLOWED_MIME_TYPES (+2 more)

### Community 43 - "constants/index.ts"
Cohesion: 0.13
Nodes (15): ACCOUNT_HELP_MENU, ACCOUNT_MANAGER_MENU, AccountMenuItem, SOCIAL_LINKS, SocialLink, getAccords(), logout(), useAccords() (+7 more)

### Community 44 - "decants/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 45 - "notes/actions.ts"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 46 - "use-create-order.ts"
Cohesion: 0.18
Nodes (8): createOrder(), Checkout(), useCreateOrder(), CreateOrderInput, DeliveryMethodEnum, orderItemSchema, PaymentCurrencyEnum, PaymentProviderEnum

### Community 47 - "types/index.ts"
Cohesion: 0.22
Nodes (8): GET(), GetPostsParams, GetPerfumesParams, ApiError, ApiResult, ApiSuccess, PaginationParams, getActive()

### Community 48 - "home.tsx"
Cohesion: 0.13
Nodes (13): PageProps, getPerfumes(), GetPerfumesParams, Explorer(), ExplorerProps, AuraPlus(), ITEMS, Designers (+5 more)

### Community 49 - "useAuth"
Cohesion: 0.28
Nodes (7): ROUTES, createReview(), AuthState, useAuth, useCreateReview(), AdminGuard(), AuthGuard()

### Community 50 - "bottom-nav.tsx"
Cohesion: 0.18
Nodes (11): @boxicons/react, BottomNav(), NavButton, NavButtonProps, NavIcon, TabItem, TABS, SearchInputProps (+3 more)

### Community 51 - "find-your-vibe-item.tsx"
Cohesion: 0.27
Nodes (6): getActiveVibes(), FindYourVibe(), FindYourVibeItem(), FindYourVibeItemProps, FindYourVibeSkeleton(), useVibes()

### Community 52 - "db.ts"
Cohesion: 0.23
Nodes (11): @prisma/adapter-pg, authenticate(), DELETE(), GET(), POST(), POST(), db, create() (+3 more)

### Community 53 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, dev, lint, prisma:db:push, prisma:generate, prisma:migrate, prisma:migrate:deploy (+5 more)

### Community 54 - "perfumes/[id]/vote/route.ts"
Cohesion: 0.48
Nodes (6): authenticate(), GET(), POST(), VALID_CATEGORIES, getUserVotes(), vote()

### Community 55 - "use-favorites.ts"
Cohesion: 0.25
Nodes (8): addFavorite(), getFavorites(), removeFavorite(), Favorites(), useFavorites(), PerfumeWithRelations, FavoriteButton(), FavoriteButtonProps

### Community 56 - "categories-filter.tsx"
Cohesion: 0.27
Nodes (6): CategoriesFilter(), CategoriesFilterProps, CategoryFilterItem, CategoriesFilterSkeleton(), CategoryButton(), CategoryButtonProps

### Community 57 - "Module Pattern (Vertical Slices)"
Cohesion: 0.20
Nodes (10): Documentation System, React Query (Server State), Zustand (Client State), Feature Planning Workflow, Server/Client Boundary Rules, Zustand vs React Query Split, Testing Stack, Kebab-case Component Naming (+2 more)

### Community 58 - "Projection Vote Icon: Afable (Soft)"
Cohesion: 0.36
Nodes (10): Projection Vote Icon: Afable (Soft), Projection Vote Icon: Huge, Projection Vote Icon: Moderate, Projection Vote Icon: Strong, Season Vote Icon: Autumn (Leaf), Season Vote Icon: Spring (Sprout), Season Vote Icon: Summer (Flower), Season Vote Icon: Winter (Snowflake) (+2 more)

### Community 59 - "PWA App Branding"
Cohesion: 0.31
Nodes (9): Apple Touch Icon, PWA App Icon 192px, PWA App Icon 512px, Maskable PWA App Icon 512px, PWA App Branding, Promotional Banner 1, Promotional Banner 2, Promotional Banner (+1 more)

### Community 60 - "order-item-card.tsx"
Cohesion: 0.29
Nodes (4): OrderItem, OrderItemCard(), OrderItemCardProps, GENDER_LABELS

### Community 61 - "Decant Size Option"
Cohesion: 0.33
Nodes (7): Decant Bottle 10ml, Decant Bottle 5ml, Decant Size Option, Empty Search Illustration, Empty State UI Pattern, Google Logo, Google OAuth Login

### Community 62 - "Olfactive Notes Vocabulary"
Cohesion: 0.29
Nodes (7): Esclarea (Clary Sage) Olfactive Note Icon, Jasmine Olfactive Note Icon, Mandarina (Tangerine) Olfactive Note Icon, Moscada (Musk) Olfactive Note Icon, Olfactive Notes Vocabulary, Tabaco (Tobacco) Olfactive Note Icon, Vainilla (Vanilla) Olfactive Note Icon

### Community 63 - "use-push-subscription.ts"
Cohesion: 0.29
Nodes (7): authHeaders(), subscribePush(), unsubscribePush(), PushNotificationManager(), getVapidPublicKey(), usePushSubscription, urlBase64ToUint8Array()

### Community 64 - "orders.tsx"
Cohesion: 0.15
Nodes (11): getOrders(), OrderCardSkeleton(), OrderCardSkeletonProps, OrdersPage(), OrdersPageProps, StatusKey, TAB_LABELS, OrdersTab (+3 more)

### Community 65 - "filter-designer.tsx"
Cohesion: 0.33
Nodes (5): getDesigners(), useDesigners(), DesignerMarquee(), FilterDesigner(), FilterDesignerProps

### Community 66 - "Cart Module"
Cohesion: 0.33
Nodes (6): Cart Module (guest/auth), Checkout Flow, Cart Module, Orders Module, Shipping Rules, Cart Mock Frontend State

### Community 67 - "Orders Module"
Cohesion: 0.47
Nodes (6): Orders Module, Discount Coupons, discounts Module, Checkout Integration Point, Gift Cards, GiftCard Redemption Ledger

### Community 68 - "Dior Brand Logo"
Cohesion: 0.33
Nodes (6): Dior Brand Logo, Gucci Brand Logo, Louis Vuitton Brand Logo, Tom Ford Brand Logo, Versace Brand Logo, Xerjoff Brand Logo

### Community 69 - "Aura Logo (SVG)"
Cohesion: 0.47
Nodes (6): Aura Brand Identity, Aura Logo (SVG), Gender Segment Marketing Concept, Men Gender Segment Asset, Brand Presentation Asset, Women Gender Segment Asset

### Community 70 - "Longevity Community Vote Scale"
Cohesion: 0.70
Nodes (5): Longevity Level: Long Icon, Longevity Level: Moderate Icon, Longevity Community Vote Scale, Longevity Level: VeryLong Icon, Longevity Level: Weak Icon

### Community 71 - "generate-icons.mjs"
Cohesion: 0.40
Nodes (4): sharp, __dirname, jobs, OUT

### Community 72 - "Graphify Knowledge Graph Rules"
Cohesion: 0.67
Nodes (4): Graphify Knowledge Graph Rules, Graphify Workflow, Copilot Graphify Instructions, Graphify Knowledge Graph

### Community 73 - "Auth Module (JWT)"
Cohesion: 0.50
Nodes (4): Auth Module (JWT), Google OAuth, JWT Security Rules, Auth Module

### Community 74 - "actions.ts DB Layer"
Cohesion: 0.50
Nodes (4): actions.ts DB Layer, Atomic Transactions, ApiResult<T>, REST API

### Community 75 - "Dont-Like Feeling Vote Icon"
Cohesion: 1.00
Nodes (4): Dont-Like Feeling Vote Icon, Hate Feeling Vote Icon, Like Feeling Vote Icon, Love Feeling Vote Icon

### Community 76 - "Heavy Sillage Vote Icon"
Cohesion: 0.67
Nodes (4): Heavy Sillage Vote Icon, Huge Sillage Vote Icon, Moderate Sillage Vote Icon, Soft Sillage Vote Icon

### Community 77 - "Next.js Logo"
Cohesion: 0.50
Nodes (4): Web Framework Concept, Next.js Logo, Deployment Platform Concept, Vercel Logo

### Community 78 - "Community Votes (UserVote)"
Cohesion: 1.00
Nodes (3): Community Metrics Models, UserVote Model, Community Votes (UserVote)

### Community 82 - "Night Mood Asset"
Cohesion: 0.67
Nodes (3): Night Mood Asset, Night Time-of-Day Concept, Sexy Mood Asset

### Community 90 - "ui/index.ts"
Cohesion: 0.19
Nodes (7): EmptyState(), EmptyStateProps, Button, ButtonProps, buttonVariants, Slider(), SliderProps

### Community 91 - "admin-sidebar-submenu.test.tsx"
Cohesion: 0.33
Nodes (5): @testing-library/react, @testing-library/user-event, vitest, { pathname, push }, submenu

### Community 92 - "reviews/actions.ts"
Cohesion: 0.13
Nodes (25): authenticate(), DELETE(), PUT(), RouteParams, authenticate(), POST(), RouteParams, authenticate() (+17 more)

### Community 93 - "review-card.tsx"
Cohesion: 0.48
Nodes (5): ReviewCard(), ReviewCardProps, ReviewList(), ReviewListProps, ReviewWithVote

### Community 95 - "order-status-badge.tsx"
Cohesion: 0.50
Nodes (3): OrderStatusBadge(), OrderStatusBadgeProps, STATUS_CONFIG

### Community 96 - "rating-average.tsx"
Cohesion: 0.33
Nodes (4): RatingAverage(), RatingAverageProps, StarRating(), StarRatingProps

### Community 97 - "textarea.tsx"
Cohesion: 0.50
Nodes (4): class-variance-authority, Textarea, TextareaProps, textareaVariants

### Community 98 - "review-form.tsx"
Cohesion: 0.60
Nodes (4): ReviewForm(), ReviewFormProps, useUpdateReview(), ReviewWithUser

## Knowledge Gaps
- **399 isolated node(s):** `$schema`, `plugin`, `eslintConfig`, `nextConfig`, `name` (+394 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 451 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `blog-list.tsx`, `cn`, `experience.tsx`, `checkout.tsx`, `filter-sheet.tsx`, `formatPrice`, `perfumes/actions.ts`, `shared/components/index.ts`, `cart.tsx`, `package.json`, `rating-summary.tsx`, `order-card.tsx`, `api/auth.ts`, `use-cart.ts`, `payment-preference-selector.tsx`, `admin-sidebar.tsx`, `perfume.tsx`, `framer-motion`, `constants/index.ts`, `use-create-order.ts`, `home.tsx`, `useAuth`, `bottom-nav.tsx`, `find-your-vibe-item.tsx`, `use-favorites.ts`, `categories-filter.tsx`, `order-item-card.tsx`, `use-push-subscription.ts`, `orders.tsx`, `filter-designer.tsx`, `ui/index.ts`, `review-card.tsx`, `order-status-badge.tsx`, `rating-average.tsx`, `textarea.tsx`, `review-form.tsx`?**
  _High betweenness centrality (0.259) - this node is a cross-community bridge._
- **Why does `@prisma/client` connect `@prisma/client` to `blog-list.tsx`, `auth/actions.ts`, `experience.tsx`, `verifyToken`, `perfumes/actions.ts`, `reviews/types.ts`, `seed.ts`, `package.json`, `order-card.tsx`, `react`, `seasons/actions.ts`, `push/actions.ts`, `accords/actions.ts`, `designers/actions.ts`, `feelings/actions.ts`, `longevities/actions.ts`, `sillages/actions.ts`, `tags/actions.ts`, `perfume.tsx`, `orders/actions.ts`, `framer-motion`, `constants/index.ts`, `decants/actions.ts`, `notes/actions.ts`, `types/index.ts`, `home.tsx`, `find-your-vibe-item.tsx`, `db.ts`, `use-favorites.ts`, `categories-filter.tsx`, `orders.tsx`, `filter-designer.tsx`, `reviews/actions.ts`, `order-status-badge.tsx`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **Why does `isPrismaError()` connect `isPrismaError` to `verifyToken`, `perfumes/actions.ts`, `decants/actions.ts`, `notes/actions.ts`, `db.ts`, `seasons/actions.ts`, `accords/actions.ts`, `parsePaginationParams`, `designers/actions.ts`, `feelings/actions.ts`, `longevities/actions.ts`, `reviews/actions.ts`, `sillages/actions.ts`, `tags/actions.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `eslintConfig` to the rest of the system?**
  _399 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `blog-list.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `experience.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._
- **Should `formatPrice` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
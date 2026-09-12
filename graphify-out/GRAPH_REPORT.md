# Graph Report - aura  (2026-09-11)

## Corpus Check
- 440 files · ~139,785 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1385 nodes · 3217 edges · 90 communities (80 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Blog Editorial Pages
- Database Seed Catalog
- Checkout Shop Components
- Admin Panel UI
- Checkout Flow
- Perfume Filter Controls
- App Root Configuration
- Cart API Routes
- Blog Posts API
- Perfumes API Routes
- Reviews Hooks & Form
- Shared Icon Buttons
- Main Layout & Cart Drawer
- Reviews Rating Display
- Project Package Metadata
- Banners API Routes
- Orders Page & Creation
- Perfume Catalog Components
- Dependencies & SDK
- Account Menu Constants
- Seasons API Routes
- Cart Module State
- Web Push Notifications
- Accords API Routes
- Catalog List Endpoints
- Designers API Routes
- Feelings API Routes
- Longevities API Routes
- Reviews CRUD Actions
- Sillages API Routes
- Tags API Routes
- Cart Item Components
- TypeScript Configuration
- Dev Tooling Dependencies
- Prisma DB Layer
- Perfume Product Display
- Payment Method Selector
- Perfume Experience Votes
- Home Slider Carousel
- Orders API Routes
- Perfume Grid Components
- Project Documentation
- S3 Upload Service
- Account Settings UI
- Decants API Routes
- Notes API Routes
- Accord Bars UI
- Order Validation Schema
- Explorer Catalog Search
- Home Page Sections
- Review List Components
- Vibes & Moods UI
- Favorites API Routes
- Package Scripts
- Banners & Tags Hooks
- Favorites Hook State
- Category Filter UI
- State Management Docs
- Vote Icon Assets
- PWA Branding Icons
- Vote Model Types
- Decant & Google Assets
- Olfactive Notes Icons
- Reviews Vote Endpoint
- Favorites Page UI
- Designers Marquee
- Cart & Orders Concepts
- Discounts & Gift Cards
- Designer Brand Logos
- Aura Brand & Gender Marketing
- Longevity Vote Icons
- Icon Generation Script
- Graphify Tooling Docs
- Auth JWT Concepts
- DB Actions Layer
- Feeling Vote Icons
- Sillage Vote Icons
- Web Platform Logos
- UserVote Metrics
- ESLint Configuration
- opencode Plugin Config
- Graphify Internal Plugin
- Night & Sexy Moods
- PostCSS Configuration
- Instagram Social Icon
- TikTok & WhatsApp Icons
- PWA Source Icons

## God Nodes (most connected - your core abstractions)
1. `react` - 143 edges
2. `isPrismaError()` - 56 edges
3. `@prisma/client` - 50 edges
4. `lucide-react` - 43 edges
5. `cn()` - 41 edges
6. `useAuth` - 40 edges
7. `parsePaginationParams()` - 29 edges
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
- `Copilot Graphify Instructions` --semantically_similar_to--> `Graphify Knowledge Graph`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → AGENTS.md
- `Copilot Graphify Instructions` --semantically_similar_to--> `Graphify Knowledge Graph Rules`  [INFERRED] [semantically similar]
  .github/copilot-instructions.md → .agents/rules/graphify.md

## Import Cycles
- 2-file cycle: `src/modules/home/components/slider-home/index.ts -> src/modules/home/components/slider-home/slider-home.tsx -> src/modules/home/components/slider-home/index.ts`
- 3-file cycle: `src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/header.tsx -> src/modules/shared/components/index.ts`
- 3-file cycle: `src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/top-bar.tsx -> src/modules/shared/components/index.ts`
- 5-file cycle: `src/modules/cart/components/cart-item.tsx -> src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/app-layout.tsx -> src/modules/cart/components/index.ts -> src/modules/cart/components/cart-item.tsx`
- 5-file cycle: `src/modules/cart/components/cart.tsx -> src/modules/shared/components/index.ts -> src/modules/shared/components/layout/index.ts -> src/modules/shared/components/layout/app-layout.tsx -> src/modules/cart/components/index.ts -> src/modules/cart/components/cart.tsx`

## Hyperedges (group relationships)
- **Checkout and Order Creation Flow** — _opencode_agents_checkout_checkout, _opencode_agents_checkout_cart, _opencode_agents_checkout_orders, _opencode_agents_backend_atomic_transaction [EXTRACTED 0.90]
- **Server vs Client State Management Split** — _opencode_agents_frontend_react_query, _opencode_agents_frontend_zustand, _opencode_agents_reviewer_state_split [INFERRED 0.85]
- **Community Voting System** — agents_community_votes, _opencode_agents_database_community_metrics, _opencode_agents_database_uservote [INFERRED 0.85]
- **PWA App Icon Set** — public_icons_icon_192_app_icon, public_icons_icon_512_app_icon, public_icons_icon_maskable_512_maskable_app_icon, public_icons_apple_touch_icon_apple_touch_icon, public_icons_pwa_app_branding [EXTRACTED 1.00]
- **Decant Size Selection Assets** — public_images_5ml_decant_5ml, public_images_10ml_decant_10ml, public_images_decants_decant_size_option [EXTRACTED 1.00]
- **Promotional Banner Assets** — public_images_banner1_promo_banner, public_images_banner2_promo_banner, public_images_banners_promotional_banner [EXTRACTED 1.00]
- **Aura Brand Marketing Assets** — public_images_logo_svg_logo, public_images_men_png_men_segment, public_images_women_png_women_segment, public_images_night_png_night_mood, public_images_sexy_png_sexy_mood, public_images_presentation_png_presentation [INFERRED 0.85]
- **Framework and Platform Tech Badges** — public_next_svg_next_js_logo, public_vercel_svg_vercel_logo, public_next_svg_framework_concept, public_vercel_svg_deployment_platform [INFERRED 0.95]
- **Designer Brand Logo Catalog** — public_images_designers_dior_brand_logo, public_images_designers_gucci_brand_logo, public_images_designers_louis_vuitton_brand_logo, public_images_designers_tom_ford_brand_logo, public_images_designers_versace_brand_logo, public_images_designers_xerjoff_brand_logo [INFERRED 0.85]
- **Community Feeling Vote Scale** — public_images_felling_dont_like_icon, public_images_felling_hate_icon, public_images_felling_like_icon, public_images_felling_love_icon [INFERRED 0.85]
- **Longevity Vote Scale Icons** — public_images_longevity_weak_icon, public_images_longevity_moderate_icon, public_images_longevity_long_icon, public_images_longevity_very_long_icon [INFERRED 0.95]
- **Olfactive Notes Vocabulary Icons** — public_images_notes_esclarea_icon, public_images_notes_jasmine_icon, public_images_notes_mandarina_icon, public_images_notes_moscada_icon, public_images_notes_tabaco_icon, public_images_notes_vainilla_icon [INFERRED 0.95]
- **Projection Vote Scale (afable, huge, moderate, strong)** — public_images_projection_afable_projection_vote, public_images_projection_huge_projection_vote, public_images_projection_moderate_projection_vote, public_images_projection_strong_projection_vote [INFERRED 0.85]
- **Season Vote Scale (autumn, spring, summer, winter)** — public_images_season_autumn_season_vote, public_images_season_spring_season_vote, public_images_season_summer_season_vote, public_images_season_winter_season_vote [INFERRED 0.95]
- **Aura Community Vote Icon Set (projection, season, time-of-day)** — public_images_projection_afable_projection_vote, public_images_projection_huge_projection_vote, public_images_projection_moderate_projection_vote, public_images_projection_strong_projection_vote, public_images_season_autumn_season_vote, public_images_season_spring_season_vote, public_images_season_summer_season_vote, public_images_season_winter_season_vote, public_images_time_of_day_day_time_of_day_vote, public_images_time_of_day_night_time_of_day_vote [INFERRED 0.85]
- **Sillage Vote Scale Icons** — public_images_sillage_soft_sillage_vote, public_images_sillage_moderate_sillage_vote, public_images_sillage_heavy_sillage_vote, public_images_sillage_huge_sillage_vote [EXTRACTED 1.00]

## Communities (90 total, 7 thin omitted)

### Community 0 - "Blog Editorial Pages"
Cohesion: 0.05
Nodes (44): metadata, PageProps, PageProps, RELATIVE_DATE_THRESHOLD_DAYS, getPostBySlug(), getPosts(), GetPostsParams, PostsPageResult (+36 more)

### Community 1 - "Database Seed Catalog"
Cohesion: 0.05
Nodes (45): DECANT_CONFIGS, INITIAL_ACCORDS, INITIAL_BANNERS, INITIAL_DESIGNERS, INITIAL_PERFUME_STATS, INITIAL_PERFUMES, INITIAL_POSTS, INITIAL_VIBES (+37 more)

### Community 2 - "Checkout Shop Components"
Cohesion: 0.08
Nodes (30): @boxicons/react, class-variance-authority, OrderItemSummary(), OrderItemSummaryProps, SizeOption(), SizeOptionProps, EmptyState(), EmptyStateProps (+22 more)

### Community 3 - "Admin Panel UI"
Cohesion: 0.09
Nodes (25): clsx, zustand, NavBrand(), NavBrandProps, AdminNavbar(), AdminNavbarProps, AdminPerfume, AdminPerfumesTable() (+17 more)

### Community 4 - "Checkout Flow"
Cohesion: 0.13
Nodes (22): CartItemData, Checkout(), CheckoutOrderSummary(), CheckoutOrderSummaryProps, ContactForm(), ContactFormProps, DeliveryMethodSelector(), DeliveryMethodSelectorProps (+14 more)

### Community 5 - "Perfume Filter Controls"
Cohesion: 0.12
Nodes (18): react, FilterDesigner(), FilterDesignerProps, FilterGender(), FilterGenderProps, GENDERS, FilterPrice(), FilterPriceProps (+10 more)

### Community 6 - "App Root Configuration"
Cohesion: 0.11
Nodes (16): nextConfig, next, lato, metadata, viewport, initialize(), authHeaders(), subscribePush() (+8 more)

### Community 7 - "Cart API Routes"
Cohesion: 0.16
Nodes (22): jose, POST(), DELETE(), RouteParams, authenticate(), GET(), authenticate(), GET() (+14 more)

### Community 8 - "Blog Posts API"
Cohesion: 0.12
Nodes (23): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), GET(), RouteParams (+15 more)

### Community 9 - "Perfumes API Routes"
Cohesion: 0.12
Nodes (23): DELETE(), GET(), PUT(), RouteParams, authenticate(), GET(), POST(), VALID_CATEGORIES (+15 more)

### Community 10 - "Reviews Hooks & Form"
Cohesion: 0.19
Nodes (17): @tanstack/react-query, createReview(), updateReview(), voteReview(), ReviewForm(), ReviewFormProps, reviewsKeys, useCreateReview() (+9 more)

### Community 11 - "Shared Icon Buttons"
Cohesion: 0.11
Nodes (18): lucide-react, BackButton(), AnimState, CartButton(), CartButtonProps, transitions, variants, HelpfulButton() (+10 more)

### Community 12 - "Main Layout & Cart Drawer"
Cohesion: 0.16
Nodes (12): Cart(), CartCheckoutPanel(), CartCheckoutPanelProps, CartDrawer(), CartHeader(), CartItemSkeleton(), CartItemSkeletonProps, DiscountCodeForm() (+4 more)

### Community 13 - "Reviews Rating Display"
Cohesion: 0.12
Nodes (16): getReviews(), RatingAverage(), RatingAverageProps, RatingAverageSkeleton(), RatingBreakdown(), RatingBreakdownProps, RatingBreakdownSkeleton(), RatingSummary() (+8 more)

### Community 14 - "Project Package Metadata"
Cohesion: 0.09
Nodes (22): name, private, version, date-fns, dotenv, eslint, eslint-config-next, @ianvs/prettier-plugin-sort-imports (+14 more)

### Community 15 - "Banners API Routes"
Cohesion: 0.16
Nodes (17): GET(), DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create() (+9 more)

### Community 16 - "Orders Page & Creation"
Cohesion: 0.17
Nodes (10): ROUTES, createOrder(), getOrders(), AuthState, useAuth, useCreateOrder(), OrdersPage(), useOrders() (+2 more)

### Community 17 - "Perfume Catalog Components"
Cohesion: 0.13
Nodes (14): NewPerfume, NewPerfumesProps, PerfumeBadge(), PerfumeBadgeProps, PerfumeBox(), PerfumeBoxPerfume, PerfumeBoxProps, PerfumeBoxSkeleton() (+6 more)

### Community 18 - "Dependencies & SDK"
Cohesion: 0.10
Nodes (21): dependencies, @aws-sdk/client-s3, bcryptjs, @boxicons/react, class-variance-authority, clsx, date-fns, framer-motion (+13 more)

### Community 19 - "Account Menu Constants"
Cohesion: 0.13
Nodes (12): ACCOUNT_HELP_MENU, ACCOUNT_MANAGER_MENU, SOCIAL_LINKS, SocialLink, ASSETS, SOCIAL_URLS, API_ROUTES, getAccords() (+4 more)

### Community 20 - "Seasons API Routes"
Cohesion: 0.19
Nodes (16): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), isPrismaError(), create() (+8 more)

### Community 21 - "Cart Module State"
Cohesion: 0.20
Nodes (13): getCart(), CartWithItems, useCart(), GuestCartStore, useCartStore, CartData, CartProduct, GuestCartItem (+5 more)

### Community 22 - "Web Push Notifications"
Cohesion: 0.16
Nodes (14): web-push, authenticate(), DELETE(), configureWebPush(), ensureConfigured(), PushSubscriptionDto, sendPushNotification(), EXPIRED_STATUS_CODES (+6 more)

### Community 23 - "Accords API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 24 - "Catalog List Endpoints"
Cohesion: 0.20
Nodes (15): GET(), POST(), GET(), POST(), GET(), POST(), parseNonNegativeInt(), parsePaginationParams() (+7 more)

### Community 25 - "Designers API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 26 - "Feelings API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 27 - "Longevities API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 28 - "Reviews CRUD Actions"
Cohesion: 0.21
Nodes (16): authenticate(), DELETE(), PUT(), RouteParams, create(), remove(), syncPerfumeRating(), syncReviewVoteCounts() (+8 more)

### Community 29 - "Sillages API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 30 - "Tags API Routes"
Cohesion: 0.19
Nodes (15): DELETE(), GET(), PUT(), RouteParams, GET(), POST(), create(), getAll() (+7 more)

### Community 31 - "Cart Item Components"
Cohesion: 0.15
Nodes (13): CartItem(), CartItemProps, CartProgress(), CartProgressProps, QuantityStepper(), QuantityStepperProps, OrderSummary(), OrderSummaryProps (+5 more)

### Community 32 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 33 - "Dev Tooling Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, dotenv, eslint, eslint-config-next, eslint-config-prettier, @ianvs/prettier-plugin-sort-imports, prettier, prettier-plugin-tailwindcss (+10 more)

### Community 34 - "Prisma DB Layer"
Cohesion: 0.16
Nodes (10): @prisma/adapter-pg, GET(), db, cartInclude, AddCartItemInput, AddCartItemSchema, ApiError, ApiResult (+2 more)

### Community 35 - "Perfume Product Display"
Cohesion: 0.15
Nodes (13): BOTTLE_ML, toCartProduct(), AboutPerfume(), AboutPerfumeProps, Experience(), PerfumeImage(), PerfumeImageProps, Perfume() (+5 more)

### Community 36 - "Payment Method Selector"
Cohesion: 0.18
Nodes (13): PaymentMethodSelector(), PaymentMethodSelectorProps, PaymentNotice(), PaymentNoticeProps, PaymentPreferenceSelector(), PaymentPreferenceSelectorProps, UsdPaymentOptions(), UsdPaymentOptionsProps (+5 more)

### Community 37 - "Perfume Experience Votes"
Cohesion: 0.20
Nodes (13): ExperienceProps, StatBar(), StatBarProps, FEELING_OPTIONS, LONGEVITY_OPTIONS, PROJECTION_OPTIONS, SEASON_OPTIONS, SILLAGE_OPTIONS (+5 more)

### Community 38 - "Home Slider Carousel"
Cohesion: 0.18
Nodes (10): framer-motion, SliderHomeDots(), SliderHomeDotsProps, SliderHomeSkeleton(), SliderHomeSlide(), SliderHomeSlideProps, SliderHome(), SliderHomeProps (+2 more)

### Community 39 - "Orders API Routes"
Cohesion: 0.18
Nodes (13): authenticate(), GET(), POST(), FREE_SHIPPING_THRESHOLD, PAGINATION_PAGE_SIZE, SHIPPING_FEE, WHATSAPP_NUMBER, createOrder() (+5 more)

### Community 40 - "Perfume Grid Components"
Cohesion: 0.16
Nodes (11): BestSellerPerfume, BestSellers(), BestSellersProps, GridPerfume, PerfumeGrid(), PerfumeGridProps, Similar(), SimilarPerfume (+3 more)

### Community 41 - "Project Documentation"
Cohesion: 0.13
Nodes (15): Nocturn Tagline, Prisma Schema Rules, Dark Mode Premium Design System, Reviews Module, Aura, Dark Mode Premium Design System, UPPERCASE Enum Convention, Favorites Module (+7 more)

### Community 42 - "S3 Upload Service"
Cohesion: 0.22
Nodes (10): @aws-sdk/client-s3, POST(), s3, generateKey(), upload(), UploadResult, validateFiles(), ALLOWED_MIME_TYPES (+2 more)

### Community 43 - "Account Settings UI"
Cohesion: 0.26
Nodes (8): AccountMenuItem, logout(), AccountHeader(), AccountMenuItem(), AccountMenuItemProps, AccountMenuSection(), AccountMenuSectionProps, Account()

### Community 44 - "Decants API Routes"
Cohesion: 0.24
Nodes (11): DELETE(), GET(), PUT(), RouteParams, getOne(), remove(), update(), CreateDecantInput (+3 more)

### Community 45 - "Notes API Routes"
Cohesion: 0.24
Nodes (11): DELETE(), GET(), PUT(), RouteParams, getOne(), remove(), update(), CreateNoteInput (+3 more)

### Community 46 - "Accord Bars UI"
Cohesion: 0.14
Nodes (9): AccordBarProps, Accords(), AccordsProps, PerfumeAccordData, Notes(), NotesProps, STAGE_TITLE, CollapsibleSection() (+1 more)

### Community 47 - "Order Validation Schema"
Cohesion: 0.15
Nodes (11): zod, CreateOrderInput, CreateOrderSchema, DeliveryMethodEnum, orderItemSchema, PaymentCurrencyEnum, PaymentProviderEnum, CreateVibeInput (+3 more)

### Community 48 - "Explorer Catalog Search"
Cohesion: 0.24
Nodes (6): PageProps, getPerfumes(), GetPerfumesParams, Explorer(), ExplorerProps, usePerfumes()

### Community 49 - "Home Page Sections"
Cohesion: 0.26
Nodes (6): AuraPlus(), ITEMS, Blog(), Designers, Home(), NewPerfumes()

### Community 50 - "Review List Components"
Cohesion: 0.23
Nodes (10): deleteReview(), ReviewCard(), ReviewCardProps, ReviewList(), ReviewListProps, useDeleteReview(), ReviewWithVote, StarRating() (+2 more)

### Community 51 - "Vibes & Moods UI"
Cohesion: 0.27
Nodes (6): getActiveVibes(), FindYourVibe(), FindYourVibeItem(), FindYourVibeItemProps, FindYourVibeSkeleton(), useVibes()

### Community 52 - "Favorites API Routes"
Cohesion: 0.33
Nodes (9): authenticate(), DELETE(), GET(), POST(), POST(), create(), getByIds(), getUserFavorites() (+1 more)

### Community 53 - "Package Scripts"
Cohesion: 0.18
Nodes (11): scripts, build, dev, lint, prisma:db:push, prisma:generate, prisma:migrate, prisma:migrate:deploy (+3 more)

### Community 54 - "Banners & Tags Hooks"
Cohesion: 0.29
Nodes (5): @prisma/client, getActiveBanners(), getTags(), useBanners(), useTags()

### Community 55 - "Favorites Hook State"
Cohesion: 0.38
Nodes (7): addFavorite(), getFavorites(), removeFavorite(), useFavorites(), PerfumeWithRelations, FavoriteButton(), FavoriteButtonProps

### Community 56 - "Category Filter UI"
Cohesion: 0.27
Nodes (6): CategoriesFilter(), CategoriesFilterProps, CategoryFilterItem, CategoriesFilterSkeleton(), CategoryButton(), CategoryButtonProps

### Community 57 - "State Management Docs"
Cohesion: 0.20
Nodes (10): Documentation System, React Query (Server State), Zustand (Client State), Feature Planning Workflow, Server/Client Boundary Rules, Zustand vs React Query Split, Testing Stack, Kebab-case Component Naming (+2 more)

### Community 58 - "Vote Icon Assets"
Cohesion: 0.36
Nodes (10): Projection Vote Icon: Afable (Soft), Projection Vote Icon: Huge, Projection Vote Icon: Moderate, Projection Vote Icon: Strong, Season Vote Icon: Autumn (Leaf), Season Vote Icon: Spring (Sprout), Season Vote Icon: Summer (Flower), Season Vote Icon: Winter (Snowflake) (+2 more)

### Community 59 - "PWA Branding Icons"
Cohesion: 0.31
Nodes (9): Apple Touch Icon, PWA App Icon 192px, PWA App Icon 512px, Maskable PWA App Icon 512px, PWA App Branding, Promotional Banner 1, Promotional Banner 2, Promotional Banner (+1 more)

### Community 60 - "Vote Model Types"
Cohesion: 0.25
Nodes (8): VoteParams, VoteCategory, Feeling, Longevity, Projection, Season, Sillage, TimeOfDay

### Community 61 - "Decant & Google Assets"
Cohesion: 0.33
Nodes (7): Decant Bottle 10ml, Decant Bottle 5ml, Decant Size Option, Empty Search Illustration, Empty State UI Pattern, Google Logo, Google OAuth Login

### Community 62 - "Olfactive Notes Icons"
Cohesion: 0.29
Nodes (7): Esclarea (Clary Sage) Olfactive Note Icon, Jasmine Olfactive Note Icon, Mandarina (Tangerine) Olfactive Note Icon, Moscada (Musk) Olfactive Note Icon, Olfactive Notes Vocabulary, Tabaco (Tobacco) Olfactive Note Icon, Vainilla (Vanilla) Olfactive Note Icon

### Community 63 - "Reviews Vote Endpoint"
Cohesion: 0.48
Nodes (6): authenticate(), GET(), POST(), SORT_VALUES, getByPerfume(), getUserReview()

### Community 64 - "Favorites Page UI"
Cohesion: 0.38
Nodes (3): Favorites(), FilterButton(), SearchInput()

### Community 65 - "Designers Marquee"
Cohesion: 0.48
Nodes (3): getDesigners(), useDesigners(), DesignerMarquee()

### Community 66 - "Cart & Orders Concepts"
Cohesion: 0.33
Nodes (6): Cart Module (guest/auth), Checkout Flow, Cart Module, Orders Module, Shipping Rules, Cart Mock Frontend State

### Community 67 - "Discounts & Gift Cards"
Cohesion: 0.47
Nodes (6): Orders Module, Discount Coupons, discounts Module, Checkout Integration Point, Gift Cards, GiftCard Redemption Ledger

### Community 68 - "Designer Brand Logos"
Cohesion: 0.33
Nodes (6): Dior Brand Logo, Gucci Brand Logo, Louis Vuitton Brand Logo, Tom Ford Brand Logo, Versace Brand Logo, Xerjoff Brand Logo

### Community 69 - "Aura Brand & Gender Marketing"
Cohesion: 0.47
Nodes (6): Aura Brand Identity, Aura Logo (SVG), Gender Segment Marketing Concept, Men Gender Segment Asset, Brand Presentation Asset, Women Gender Segment Asset

### Community 70 - "Longevity Vote Icons"
Cohesion: 0.70
Nodes (5): Longevity Level: Long Icon, Longevity Level: Moderate Icon, Longevity Community Vote Scale, Longevity Level: VeryLong Icon, Longevity Level: Weak Icon

### Community 71 - "Icon Generation Script"
Cohesion: 0.40
Nodes (4): sharp, __dirname, jobs, OUT

### Community 72 - "Graphify Tooling Docs"
Cohesion: 0.67
Nodes (4): Graphify Knowledge Graph Rules, Graphify Workflow, Copilot Graphify Instructions, Graphify Knowledge Graph

### Community 73 - "Auth JWT Concepts"
Cohesion: 0.50
Nodes (4): Auth Module (JWT), Google OAuth, JWT Security Rules, Auth Module

### Community 74 - "DB Actions Layer"
Cohesion: 0.50
Nodes (4): actions.ts DB Layer, Atomic Transactions, ApiResult<T>, REST API

### Community 75 - "Feeling Vote Icons"
Cohesion: 1.00
Nodes (4): Dont-Like Feeling Vote Icon, Hate Feeling Vote Icon, Like Feeling Vote Icon, Love Feeling Vote Icon

### Community 76 - "Sillage Vote Icons"
Cohesion: 0.67
Nodes (4): Heavy Sillage Vote Icon, Huge Sillage Vote Icon, Moderate Sillage Vote Icon, Soft Sillage Vote Icon

### Community 77 - "Web Platform Logos"
Cohesion: 0.50
Nodes (4): Web Framework Concept, Next.js Logo, Deployment Platform Concept, Vercel Logo

### Community 78 - "UserVote Metrics"
Cohesion: 1.00
Nodes (3): Community Metrics Models, UserVote Model, Community Votes (UserVote)

### Community 82 - "Night & Sexy Moods"
Cohesion: 0.67
Nodes (3): Night Mood Asset, Night Time-of-Day Concept, Sexy Mood Asset

## Knowledge Gaps
- **363 isolated node(s):** `$schema`, `plugin`, `eslintConfig`, `nextConfig`, `name` (+358 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 413 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Perfume Filter Controls` to `Blog Editorial Pages`, `Database Seed Catalog`, `Checkout Shop Components`, `Admin Panel UI`, `Checkout Flow`, `App Root Configuration`, `Perfumes API Routes`, `Reviews Hooks & Form`, `Shared Icon Buttons`, `Main Layout & Cart Drawer`, `Reviews Rating Display`, `Project Package Metadata`, `Orders Page & Creation`, `Perfume Catalog Components`, `Account Menu Constants`, `Cart Module State`, `Cart Item Components`, `Perfume Product Display`, `Payment Method Selector`, `Perfume Experience Votes`, `Home Slider Carousel`, `Perfume Grid Components`, `Account Settings UI`, `Accord Bars UI`, `Explorer Catalog Search`, `Home Page Sections`, `Review List Components`, `Vibes & Moods UI`, `Favorites Hook State`, `Category Filter UI`, `Favorites Page UI`, `Designers Marquee`?**
  _High betweenness centrality (0.304) - this node is a cross-community bridge._
- **Why does `@prisma/client` connect `Banners & Tags Hooks` to `Blog Editorial Pages`, `Database Seed Catalog`, `Blog Posts API`, `Perfumes API Routes`, `Reviews Hooks & Form`, `Project Package Metadata`, `Banners API Routes`, `Perfume Catalog Components`, `Account Menu Constants`, `Seasons API Routes`, `Web Push Notifications`, `Accords API Routes`, `Designers API Routes`, `Feelings API Routes`, `Longevities API Routes`, `Reviews CRUD Actions`, `Sillages API Routes`, `Tags API Routes`, `Prisma DB Layer`, `Perfume Experience Votes`, `Home Slider Carousel`, `Orders API Routes`, `Perfume Grid Components`, `Decants API Routes`, `Notes API Routes`, `Accord Bars UI`, `Explorer Catalog Search`, `Vibes & Moods UI`, `Favorites Hook State`, `Category Filter UI`, `Designers Marquee`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **Why does `zod` connect `Order Validation Schema` to `Database Seed Catalog`, `Prisma DB Layer`, `Blog Posts API`, `Perfumes API Routes`, `Decants API Routes`, `Notes API Routes`, `Project Package Metadata`, `Banners API Routes`, `Seasons API Routes`, `Web Push Notifications`, `Accords API Routes`, `Designers API Routes`, `Feelings API Routes`, `Longevities API Routes`, `Reviews CRUD Actions`, `Sillages API Routes`, `Tags API Routes`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `$schema`, `plugin`, `eslintConfig` to the rest of the system?**
  _363 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Blog Editorial Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.05352112676056338 - nodes in this community are weakly interconnected._
- **Should `Database Seed Catalog` be split into smaller, more focused modules?**
  _Cohesion score 0.05109126984126984 - nodes in this community are weakly interconnected._
- **Should `Checkout Shop Components` be split into smaller, more focused modules?**
  _Cohesion score 0.0821256038647343 - nodes in this community are weakly interconnected._
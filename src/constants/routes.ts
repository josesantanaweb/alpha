export const ROUTES = {
  HOME: "/",
  EXPLORER: "/explorer",
  FAVORITES: "/favorites",
  ACCOUNT: "/account",
  ORDERS: "/orders",
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: "/admin",
  BLOG: "/blog",
};

export const API_ROUTES = {
  AUTH: {
    ME: "/api/auth/me",
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GOOGLE: "/api/auth/google",
  },
  FAVORITES: "/api/favorites",
  CART: "/api/cart",
  ORDERS: "/api/orders",
  PERFUMES: "/api/perfumes",
  ACCORDS: "/api/accords",
  DESIGNERS: "/api/designers",
  TAGS: "/api/tags",
  VIBES: "/api/vibes",
  BANNERS: {
    ACTIVE: "/api/banners/active",
  },
  POSTS: "/api/posts",
  REVIEWS: "/api/reviews",
  PUSH: {
    SUBSCRIBE: "/api/push/subscribe",
    UNSUBSCRIBE: "/api/push/unsubscribe",
  },
};

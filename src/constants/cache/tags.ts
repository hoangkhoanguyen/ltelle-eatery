/**
 * Cache Tags Constants
 * 
 * Tag structure: <domain>:<entity>:<scope>:<identifier>
 * Examples:
 * - products:all
 * - products:item:123
 * - products:category:456
 * - configs:ui:layout
 */

export const CACHE_TAGS = {
  // Products
  PRODUCTS: {
    ALL: 'products:all',
    LIST: 'products:list',
    ADMIN_LIST: 'products:admin:list',
    BY_ID: (id: number) => `products:item:${id}`,
    BY_SLUG: (slug: string) => `products:slug:${slug}`,
    BY_CATEGORY: (categoryId: number) => `products:category:${categoryId}`,
    BY_CATEGORY_SLUG: (categorySlug: string) => `products:category-slug:${categorySlug}`,
    DETAILS: 'products:details',
    RELATED: 'products:related',
  },
  
  // Categories
  CATEGORIES: {
    ALL: 'categories:all',
    ACTIVE: 'categories:active',
    ADMIN_LIST: 'categories:admin:list',
    BY_ID: (id: number) => `categories:item:${id}`,
    BY_SLUG: (slug: string) => `categories:slug:${slug}`,
    WITH_PRODUCTS: 'categories:with-products',
  },
  
  // Orders
  ORDERS: {
    ALL: 'orders:all',
    ADMIN_LIST: 'orders:admin:list',
    BY_ID: (id: number) => `orders:item:${id}`,
    BY_STATUS: (status: string) => `orders:status:${status}`,
    BY_CUSTOMER: (phone: string) => `orders:customer:${phone}`,
    STATISTICS: 'orders:statistics',
  },
  
  // Configs
  CONFIGS: {
    ALL: 'configs:all',
    UI: 'configs:ui',
    APP: 'configs:app',
    BY_KEY: (key: string, type: string) => `configs:${type}:${key}`,
    BY_TYPE: (type: string) => `configs:type:${type}`,
  },
  
  // Customers
  CUSTOMERS: {
    ALL: 'customers:all',
    ADMIN_LIST: 'customers:admin:list',
    BY_ID: (id: number) => `customers:item:${id}`,
    BY_PHONE: (phone: string) => `customers:phone:${phone}`,
  },

  // Reservations
  RESERVATIONS: {
    ALL: 'reservations:all',
    ADMIN_LIST: 'reservations:admin:list',
    BY_ID: (id: number) => `reservations:item:${id}`,
    BY_DATE: (date: string) => `reservations:date:${date}`,
    BY_STATUS: (status: string) => `reservations:status:${status}`,
  },

  // Global/Layout
  LAYOUT: {
    WEB: 'layout:web',
    ADMIN: 'layout:admin',
    NAVIGATION: 'layout:navigation',
  },
} as const;

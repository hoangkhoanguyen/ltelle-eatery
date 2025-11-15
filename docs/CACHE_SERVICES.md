# Cache Services Documentation

> Hướng dẫn sử dụng cached services cho user-facing pages

---

## 📦 **Cached Services**

### **Products**

```typescript
import {
  getProductsByCategorySlugCached,
  getProductBySlugCached,
  getProductDetailsBySlugCached,
  getRelatedProductsCached,
  getProductDetailsForQuickCartByIdCached,
} from "@/services/cached";

// Menu page - Get products by category
const products = await getProductsByCategorySlugCached("all");
const categoryProducts = await getProductsByCategorySlugCached("appetizers");

// Product card display - Get product by slug
const productCard = await getProductBySlugCached("pizza-margherita");

// Product detail page
const product = await getProductDetailsBySlugCached("pizza-margherita");

// Related products
const relatedProducts = await getRelatedProductsCached([1, 2, 3]);

// Quick cart modal - Get product details for adding to cart
const quickCartProduct = await getProductDetailsForQuickCartByIdCached(123);
```

### **Configs**

```typescript
import { getConfigsByKeyCached } from "@/services/cached";

// Get config by key
const menuConfig = await getConfigsByKeyCached("menu-navigation", "ui");
const themeConfig = await getConfigsByKeyCached("theme-settings", "ui");
```

---

## 🔄 **Revalidation**

### **Tự động revalidate khi:**

1. **Product Create/Update** → Revalidate:

   - `PRODUCTS.ALL` (menu)
   - `PRODUCTS.BY_SLUG(slug)` (detail)
   - `PRODUCTS.BY_CATEGORY(categoryId)` (category menu)

2. **Config Update** → Revalidate:

   - `CONFIGS.BY_KEY(key)` (specific config)

3. **Image Upload/Delete** → Revalidate:
   - `PRODUCTS.ALL` (menu với images)

### **Manual revalidation:**

```typescript
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/constants/cache";

// Revalidate all products
revalidateTag(CACHE_TAGS.PRODUCTS.ALL);

// Revalidate specific product
revalidateTag(CACHE_TAGS.PRODUCTS.BY_SLUG("pizza-margherita"));

// Revalidate specific config
revalidateTag(CACHE_TAGS.CONFIGS.BY_KEY("menu-navigation"));
```

---

## ⚠️ **Lưu ý**

### **✅ SỬ DỤNG cached services khi:**

- Hiển thị dữ liệu cho user (menu, product detail, etc.)
- Dữ liệu ít thay đổi hoặc có thể chấp nhận độ trễ
- Muốn tăng performance

### **❌ KHÔNG SỬ DỤNG cached services khi:**

- Admin pages (luôn cần real-time data)
- Cart validation (luôn cần check chính xác)
- Authentication/Authorization
- Dữ liệu cần 100% real-time

---

## 🏗️ **Cấu trúc files**

```
src/
  lib/
    cache.ts              # Cache helper functions
  services/
    cached/
      index.ts           # Export all cached services
      products.ts        # Cached product services
      configs.ts         # Cached config services
  constants/
    cache/
      tags.ts            # Cache tags definitions
      revalidation.ts    # Revalidation strategies
```

---

## 📝 **Example: Product Detail Page**

```typescript
// app/(web)/dish/[slug]/page.tsx

import { getProductDetailsBySlugCached } from "@/services/cached";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // ✅ Sử dụng cached version cho user-facing page
  const product = await getProductDetailsBySlugCached(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
```

---

## 🔧 **Custom Cache Function**

Nếu cần tạo cached function mới:

```typescript
import { createDynamicCachedFunction } from "@/lib/cache";
import { CACHE_TAGS } from "@/constants/cache";

export const myCustomCachedFunction = createDynamicCachedFunction(
  myOriginalFunction,
  // Cache key parts
  (param1, param2) => ["my-cache-key", param1, param2],
  // Cache tags for revalidation
  (param1) => [CACHE_TAGS.MY_TAG],
  // Optional: revalidate time in seconds (false = no auto revalidate)
  false,
);
```

# Revalidation Impact Analysis

> Phân tích những nơi sẽ bị ảnh hưởng với từng action thay đổi dữ liệu dựa vào logic business

## 📋 **PRODUCT ACTIONS**

### **1. CREATE PRODUCT**

**Nơi bị ảnh hưởng:**

- ✅ **Admin product list** - Hiển thị product mới
- ✅ **Menu category tương ứng** - Product xuất hiện trong category của nó
- ✅ **Menu "All products"** - Product xuất hiện trong danh sách tất cả
- ✅ **Product selection dropdowns** - Admin forms có thể chọn product mới

### **2. UPDATE PRODUCT**

**Nơi bị ảnh hưởng:**

- ✅ **Admin product list** - Thông tin product thay đổi
- ✅ **Product detail page** - Thông tin chi tiết thay đổi
- ✅ **Menu category hiện tại** - Nếu thay đổi thông tin hiển thị
- ✅ **Menu category mới** - Nếu chuyển sang category khác
- ✅ **Menu category cũ** - Nếu chuyển khỏi category này
- ✅ **Menu "All products"** - Thông tin product thay đổi
- ✅ **Related products** - Nếu product này là related của sản phẩm khác
- ✅ **Cart items** - Nếu product đang trong cart của users

### **3. CHANGE PRODUCT STATUS (Active/Inactive)**

**Nơi bị ảnh hưởng:**

- ✅ **Menu category của product** - Product xuất hiện/biến mất
- ✅ **Menu "All products"** - Product xuất hiện/biến mất
- ✅ **Product detail page** - Có thể không accessible
- ✅ **Cart validation** - Product không thể add vào cart nếu inactive
- ✅ **Related products** - Không hiển thị nếu inactive

---

## 📋 **CATEGORY ACTIONS**

### **1. CREATE CATEGORY**

**Nơi bị ảnh hưởng:**

- ✅ **Admin category list** - Category mới xuất hiện
- ✅ **Category selection dropdowns** - Admin forms có category mới
- ❌ **Menu navigation** - KHÔNG ảnh hưởng (sử dụng configs, không lấy từ DB)

### **2. UPDATE CATEGORY**

**Nơi bị ảnh hưởng:**

- ✅ **Admin category list** - Thông tin category thay đổi
- ✅ **Menu category page** - Thông tin hiển thị thay đổi
- ✅ **All products trong category** - Breadcrumb, category info thay đổi
- ❌ **Menu navigation** - KHÔNG ảnh hưởng (sử dụng configs, không lấy từ DB)

---

## 📋 **ORDER ACTIONS**

### **1. CREATE ORDER**

**Nơi bị ảnh hưởng:**

- ✅ **Admin order list** - Order mới xuất hiện
- ✅ **Order statistics/dashboard** - Số liệu thống kê thay đổi

### **2. UPDATE ORDER STATUS**

**Nơi bị ảnh hưởng:**

- ✅ **Admin order list** - Status hiển thị thay đổi
- ✅ **Order detail page** - Status và history thay đổi
- ✅ **Order statistics** - Số liệu theo status thay đổi

### **3. UPDATE ORDER INFO**

**Nơi bị ảnh hưởng:**

- ✅ **Admin order list** - Thông tin order thay đổi
- ✅ **Order detail page** - Chi tiết thay đổi

---

## 📋 **RESERVATION ACTIONS**

### **1. CREATE RESERVATION**

**Nơi bị ảnh hưởng:**

- ✅ **Admin reservation list** - Reservation mới xuất hiện

### **2. UPDATE RESERVATION STATUS**

**Nơi bị ảnh hưởng:**

- ✅ **Admin reservation list** - Status thay đổi
- ✅ **Reservation detail page** - Status thay đổi

### **3. UPDATE RESERVATION INFO**

**Nơi bị ảnh hưởng:**

- ✅ **Admin reservation list** - Thông tin thay đổi
- ✅ **Reservation detail page** - Chi tiết thay đổi

---

## 📋 **IMAGE ACTIONS**

### **1. UPLOAD PRODUCT IMAGE**

**Nơi bị ảnh hưởng:**

- ✅ **Product detail page** - Image gallery thay đổi
- ✅ **Menu category của product** - Product card image thay đổi
- ✅ **Menu "All products"** - Product card image thay đổi
- ✅ **Admin product forms** - Image gallery thay đổi
- ✅ **Cart items** - Product image thay đổi
- ✅ **Related products** - Image thay đổi

### **2. DELETE PRODUCT IMAGE**

**Nơi bị ảnh hưởng:**

- ✅ **Giống như UPLOAD IMAGE** - Nhưng image biến mất thay vì xuất hiện

---

## 📋 **ADDON ACTIONS**

### **1. CREATE/UPDATE PRODUCT ADDON**

**Nơi bị ảnh hưởng:**

- ✅ **Product detail page** - Danh sách addon thay đổi
- ✅ **Cart customization** - Options addon thay đổi
- ✅ **Order items** - Addon options thay đổi

---

## 📋 **CONFIG ACTIONS**

### **1. UPDATE CONFIGS**

**Nơi bị ảnh hưởng:**

- ✅ **Website layout/theme** - Nếu update UI configs
- ✅ **Business settings** - Nếu update app configs
- ✅ **Tất cả pages** - Nếu configs ảnh hưởng global
- ✅ **Menu navigation** - Configs quyết định categories hiển thị trong menu

---

## 🎯 **Nguyên tắc chung:**

### **1. Phạm vi ảnh hưởng theo loại action:**

- **Create** → Chỉ ảnh hưởng **danh sách/tổng hợp**
- **Update** → Ảnh hưởng **chi tiết item** + **danh sách có item đó**
- **Status change** → Ảnh hưởng **visibility** ở mọi nơi hiển thị item

### **2. Cross-reference effects:**

- Item A thay đổi có thể ảnh hưởng nơi hiển thị Item B
- Ví dụ: Product update → ảnh hưởng related products, cart items

### **3. Business logic notes:**

- **Menu navigation**: Sử dụng configs, không query trực tiếp từ DB categories
- **Product visibility**: Chỉ hiển thị products có `isActive = true`
- **Cart validation**: Products phải active mới có thể thêm vào cart

---

## 📝 **Cách sử dụng document này:**

1. **Khi implement revalidation**: Tham khảo để biết cần revalidate những gì
2. **Khi debug cache issues**: Kiểm tra xem có đủ revalidation không
3. **Khi thêm features mới**: Cập nhật document nếu có thêm dependencies

---

_Document này được tạo dựa vào business logic thực tế, không phụ thuộc vào implementation hiện tại._

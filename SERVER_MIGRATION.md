# Custom Server với Socket.IO - TypeScript

## ✅ Đã chuyển đổi thành công

Project đã được chuyển từ `server.js` sang `server.ts` với TypeScript.

## 📝 Những gì đã thay đổi

### 1. **server.ts** (thay thế server.js)
- Custom Next.js server với TypeScript
- Tích hợp Socket.IO sẵn
- Path: `/api/socket`

### 2. **package.json**
```json
"scripts": {
  "dev": "tsx watch server.ts",          // Development với hot reload
  "start": "NODE_ENV=production tsx server.ts",  // Production
  "build": "next build"                   // Build Next.js
}
```

### 3. **Dockerfile**
- Compile `server.ts` → `server.js` trong build stage
- Production chạy `node server.js` (compiled)
- Không cần tsx trong production image

### 4. **.gitignore**
- Ignore `/server.js` (file compiled)

## 🚀 Cách sử dụng

### Development
```bash
npm run dev
```
→ Chạy với tsx watch (auto reload khi sửa server.ts)

### Build
```bash
npm run build
```
→ Build Next.js app

### Production (local test)
```bash
npm start
```
→ Chạy production mode

### Docker Build & Run
```bash
# Build image
docker build -t ltelle-eatery .

# Run container
docker run -p 3000:3000 ltelle-eatery
```

## 🔌 Socket.IO

Server đã tích hợp Socket.IO sẵn:
- **Path**: `/api/socket`
- **CORS**: Enabled (*)

### Test Socket.IO connection

Frontend code:
```tsx
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  path: "/api/socket"
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});
```

## 📂 File Structure

```
├── server.ts           # Custom server (TypeScript)
├── server.js          # Compiled (ignored in git)
├── package.json       # Updated scripts
├── Dockerfile         # Updated để compile TS
└── .gitignore         # Ignore server.js
```

## ⚠️ Lưu ý

1. **Development**: Dùng `npm run dev` (tsx watch)
2. **Production**: Dockerfile tự động compile TypeScript
3. **server.js**: Được generate từ server.ts, không commit vào git
4. **Socket.IO**: Sẵn sàng sử dụng ngay

## 🐛 Troubleshooting

### Socket.IO 404 Error
- Đảm bảo dùng path: `/api/socket`
- Check CORS settings nếu deploy khác domain

### Dev server không reload
- tsx watch tự động reload khi sửa server.ts
- Nếu không reload, restart `npm run dev`

### Docker build lỗi
- Đảm bảo có file `server.ts`
- Check TypeScript compile command trong Dockerfile

## 🎯 Next Steps

Bây giờ bạn có thể:
1. ✅ Develop với TypeScript + hot reload
2. ✅ Build Docker image production
3. ✅ Sử dụng Socket.IO ngay
4. 🔜 Thêm Socket.IO events theo nhu cầu

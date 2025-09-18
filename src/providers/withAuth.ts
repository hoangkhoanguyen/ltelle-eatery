// import { validateToken } from "@/lib/utils/validate";
// import { JWTPayload } from "@/types/global";
// import { NextRequest, NextResponse } from "next/server";

// type Handler<T = any> = (
//   payload: JWTPayload,
//   ...args: any[]
// ) => Promise<NextResponse<T>>;

// export function withAuth(handler: Handler) {
//   return async (...args: any[]) => {
//     const req = args[0] as NextRequest;
//     const payload = await validateToken(req);

//     return await handler(payload, ...args);
//   };
// }

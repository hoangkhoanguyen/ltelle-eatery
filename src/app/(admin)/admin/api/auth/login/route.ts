import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/services/auth";
import { createUnauthorizedResponse } from "@/lib/auth-responses";
import { withError } from "@/providers/withError";

async function loginHandler(request: NextRequest) {
  // Parse request body
  const body = await request.json();
  const { emailOrUsername, password } = body;

  // Validate required fields
  if (!emailOrUsername || !password) {
    return createUnauthorizedResponse("Email/username và mật khẩu là bắt buộc");
  }

  // Call service function
  const result = await loginUser({ emailOrUsername, password });

  // Return response based on result
  if (result.success) {
    return NextResponse.json(
      {
        success: true,
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
        message: "Đăng nhập thành công",
      },
      {
        status: 200,
        headers: {
          // Set refresh token as HttpOnly cookie
          "Set-Cookie": `refreshToken=${
            result.refreshToken
          }; HttpOnly; Secure; SameSite=Strict; Max-Age=${
            7 * 24 * 60 * 60
          }; Path=/`, // 7 days
        },
      },
    );
  } else {
    // Map service error codes to auth error responses
    let errorMessage = result.error || "Đăng nhập thất bại";

    switch (result.code) {
      case "MISSING_CREDENTIALS":
        errorMessage = "Email/username và mật khẩu là bắt buộc";
        break;
      case "INVALID_CREDENTIALS":
        errorMessage = "Email/username hoặc mật khẩu không đúng";
        break;
      case "ACCOUNT_DISABLED":
        errorMessage = "Tài khoản đã bị vô hiệu hóa";
        break;
      case "INTERNAL_ERROR":
        errorMessage = "Đã xảy ra lỗi hệ thống";
        break;
    }

    return createUnauthorizedResponse(errorMessage);
  }
}

// Apply withError wrapper
export const POST = withError(loginHandler);

// OPTIONS method for CORS support
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

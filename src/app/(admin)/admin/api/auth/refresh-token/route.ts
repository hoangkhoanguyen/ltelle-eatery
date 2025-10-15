import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/services/auth";
import {
  createUnauthorizedResponse,
  getAuthErrorCodeFromServiceCode,
  createAuthErrorResponse,
} from "@/lib/auth-responses";
import { withError } from "@/providers/withError";
import { setAuthCookies } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { refreshToken } = body;

    // Validate required fields
    if (!refreshToken) {
      return createUnauthorizedResponse("Refresh token là bắt buộc");
    }

    // Call service function
    const result = await refreshAccessToken({ refreshToken });

    // Return response based on result
    if (result.success) {
      // Set cookies using utility function
      await setAuthCookies(result.accessToken!, result.refreshToken!);

      return NextResponse.json(
        {
          success: true,
          data: {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
          },
          message: "Làm mới token thành công",
        },
        { status: 200 },
      );
    } else {
      // Use auth error utility with proper code mapping
      const authErrorCode = getAuthErrorCodeFromServiceCode(result.code);
      return createAuthErrorResponse(authErrorCode, result.error);
    }
  } catch (error) {
    console.error("Error in refresh token API:", error);

    return createUnauthorizedResponse("Đã xảy ra lỗi server");
  }
}

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

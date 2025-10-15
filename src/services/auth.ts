import { getDb } from "@/db/drizzle";
import { refreshTokens, users } from "@/db/schemas";
import {
  NewRefreshTokenDB,
  NewUserDB,
  RefreshTokenDB,
  UserDB,
} from "@/db/schemas";
import { eq, and, or, ilike, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import {
  comparePassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth";
import { getEnv } from "@/lib/env";

// Interface cho login credentials
export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

// Interface cho register user
export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secretCode: string;
}

// Interface cho register response
export interface RegisterResponse {
  success: boolean;
  user?: Omit<UserDB, "password">;
  error?: string;
  code?: string;
}

// Interface cho login response
export interface LoginResponse {
  success: boolean;
  user?: Omit<UserDB, "password">;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  code?: string;
}

// Hàm login chính
export async function loginUser(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  try {
    const { emailOrUsername, password } = credentials;

    // 1. Validate input
    if (!emailOrUsername || !password) {
      return {
        success: false,
        error: "Email/username và mật khẩu không được để trống",
        code: "MISSING_CREDENTIALS",
      };
    }

    // 2. Tìm user theo email hoặc username
    const user = await getUserByEmailOrUsername(emailOrUsername);
    if (!user) {
      return {
        success: false,
        error: "Email/username hoặc mật khẩu không đúng",
        code: "INVALID_CREDENTIALS",
      };
    }

    // 3. Verify password với bcrypt
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Email/username hoặc mật khẩu không đúng",
        code: "INVALID_CREDENTIALS",
      };
    }

    // 4. Check user status
    if (!user.isActive) {
      return {
        success: false,
        error: "Tài khoản đã bị vô hiệu hóa",
        code: "ACCOUNT_DISABLED",
      };
    }

    // 5. Generate tokens với JWT
    const accessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      role: user.role,
      isActive: user.isActive,
    });

    const refreshTokenStr = await signRefreshToken({
      userId: user.id,
    });

    // 6. Save refresh token to database
    await createRefreshToken({
      userId: user.id,
      refreshToken: refreshTokenStr,
      isValid: true,
    });

    // 7. Return success response (exclude password from user data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      accessToken,
      refreshToken: refreshTokenStr,
    };
  } catch (error) {
    console.error("Error during login:", error);
    return {
      success: false,
      error: "Đã xảy ra lỗi trong quá trình đăng nhập",
      code: "INTERNAL_ERROR",
    };
  }
}

// Interface cho refresh token request
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Interface cho refresh token response
export interface RefreshTokenResponse {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  code?: string;
}

// Hàm refresh access token
export async function refreshAccessToken(
  request: RefreshTokenRequest,
): Promise<RefreshTokenResponse> {
  try {
    const { refreshToken } = request;

    // 1. Validate input
    if (!refreshToken) {
      return {
        success: false,
        error: "Refresh token không được để trống",
        code: "MISSING_REFRESH_TOKEN",
      };
    }

    // 2. Verify refresh token signature
    const verificationResult = await verifyRefreshToken(refreshToken);
    if (!verificationResult.isValid || !verificationResult.payload) {
      return {
        success: false,
        error: verificationResult.isExpired
          ? "Refresh token đã hết hạn"
          : "Refresh token không hợp lệ",
        code: verificationResult.isExpired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      };
    }

    // 3. Check refresh token in database với userId để tăng bảo mật
    const tokenRecord = await getTokenInfoByToken(
      refreshToken,
      verificationResult.payload.userId,
    );
    if (!tokenRecord) {
      return {
        success: false,
        error: "Refresh token không tồn tại hoặc không thuộc về user này",
        code: "TOKEN_NOT_FOUND",
      };
    }

    // 4. Check if token is still valid in database
    if (!tokenRecord.isValid) {
      return {
        success: false,
        error: "Refresh token đã bị vô hiệu hóa",
        code: "TOKEN_REVOKED",
      };
    }

    // 5. Get user info
    const user = await getUserById(verificationResult.payload.userId);
    if (!user) {
      return {
        success: false,
        error: "Người dùng không tồn tại",
        code: "USER_NOT_FOUND",
      };
    }

    // 6. Check user status
    if (!user.isActive) {
      return {
        success: false,
        error: "Tài khoản đã bị vô hiệu hóa",
        code: "ACCOUNT_DISABLED",
      };
    }

    // 7. Generate new access token
    const newAccessToken = await signAccessToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      role: user.role,
      isActive: user.isActive,
    });

    // 8. Generate new refresh token (for token rotation)
    const newRefreshToken = await signRefreshToken({
      userId: user.id,
    });

    // 9. Update refresh token vào record cũ (token rotation)
    await updateRefreshToken(tokenRecord.id, {
      refreshToken: newRefreshToken,
      isValid: true,
    });

    return {
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    console.error("Error during token refresh:", error);
    return {
      success: false,
      error: "Đã xảy ra lỗi trong quá trình làm mới token",
      code: "INTERNAL_ERROR",
    };
  }
}

// Helper function để tìm user theo email hoặc username
export async function getUserByEmailOrUsername(
  emailOrUsername: string,
): Promise<UserDB | null> {
  try {
    const db = getDb();
    const user = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrUsername),
          eq(users.username, emailOrUsername),
        ),
      )
      .limit(1);

    return user[0] || null;
  } catch (error) {
    throw new Error(`Lỗi khi tìm user: ${error}`);
  }
}

// Tạo user mới
export async function createUser(userData: NewUserDB) {
  try {
    const db = getDb();
    const [newUser] = await db
      .insert(users)
      .values({
        ...userData,
      })
      .returning();

    return newUser;
  } catch (error) {
    throw new Error(`Lỗi khi tạo user: ${error}`);
  }
}

// Đăng ký user mới với validation
export async function registerUser(
  userData: RegisterUserData,
): Promise<RegisterResponse> {
  try {
    const { username, email, password, firstName, lastName, secretCode } =
      userData;

    // 1. Validate input
    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !secretCode
    ) {
      return {
        success: false,
        error: "Tất cả các trường đều bắt buộc",
        code: "MISSING_FIELDS",
      };
    }

    // 2. Validate secret code
    const env = getEnv();
    if (secretCode !== env.REGISTER_SECRET_CODE) {
      return {
        success: false,
        error: "Secret code không đúng",
        code: "INVALID_SECRET_CODE",
      };
    }

    // 3. Kiểm tra email đã tồn tại
    const existingEmailUser = await getUserByEmail(email);
    if (existingEmailUser) {
      return {
        success: false,
        error: "Email đã được sử dụng",
        code: "EMAIL_EXISTS",
      };
    }

    // 4. Kiểm tra username đã tồn tại
    const existingUsernameUser = await getUserByUsername(username);
    if (existingUsernameUser) {
      return {
        success: false,
        error: "Username đã được sử dụng",
        code: "USERNAME_EXISTS",
      };
    }

    // 5. Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Tạo user mới
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "admin", // Mặc định role là admin
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 7. Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Error in registerUser:", error);
    return {
      success: false,
      error: "Đã xảy ra lỗi khi tạo tài khoản",
      code: "INTERNAL_ERROR",
    };
  }
}

// Lấy user theo ID
export async function getUserById(id: number) {
  try {
    const db = getDb();
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user[0] || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy user theo ID: ${error}`);
  }
}

// Lấy user theo email
export async function getUserByEmail(email: string) {
  try {
    const db = getDb();
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy user theo email: ${error}`);
  }
}

// Lấy user theo username
export async function getUserByUsername(username: string) {
  try {
    const db = getDb();
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    return user[0] || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy user theo username: ${error}`);
  }
}

// Cập nhật user
export async function updateUser(
  id: number,
  userData: Partial<
    Pick<
      UserDB,
      | "avatar"
      | "firstName"
      | "lastName"
      | "email"
      | "password"
      | "phone"
      | "isActive"
      | "role"
    >
  >,
) {
  try {
    const db = getDb();
    const [updatedUser] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updatedUser;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật user: ${error}`);
  }
}

// Lấy danh sách users với phân trang và tìm kiếm
export async function getUsers(
  options: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
  } = {},
) {
  try {
    const { page = 1, limit = 10, search, role, isActive } = options;
    const offset = (page - 1) * limit;

    // Tạo điều kiện where
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(users.username, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.firstName, `%${search}%`),
          ilike(users.lastName, `%${search}%`),
        ),
      );
    }

    if (role) {
      conditions.push(eq(users.role, role));
    }

    if (typeof isActive === "boolean") {
      conditions.push(eq(users.isActive, isActive));
    }

    const whereCondition =
      conditions.length > 0 ? and(...conditions) : undefined;

    // Lấy users
    const db = getDb();
    const usersList = await db
      .select()
      .from(users)
      .where(whereCondition)
      .limit(limit)
      .offset(offset)
      .orderBy(users.createdAt);

    // Đếm tổng số users
    const [totalCount] = await db
      .select({ count: sql`count(*)` })
      .from(users)
      .where(whereCondition);

    return {
      users: usersList,
      total: Number(totalCount.count),
      page,
      limit,
      totalPages: Math.ceil(Number(totalCount.count) / limit),
    };
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách users: ${error}`);
  }
}

export async function createRefreshToken(data: NewRefreshTokenDB) {
  try {
    const db = getDb();
    const [newToken] = await db
      .insert(refreshTokens)
      .values({
        ...data,
      })
      .returning();

    return newToken;
  } catch (error) {
    throw new Error(`Lỗi khi insert refresh token: ${error}`);
  }
}

export async function getTokenInfoByToken(token: string, userId?: number) {
  try {
    const db = getDb();

    // Nếu có userId, thêm điều kiện để tăng bảo mật
    const whereConditions = [eq(refreshTokens.refreshToken, token)];
    if (userId !== undefined) {
      whereConditions.push(eq(refreshTokens.userId, userId));
    }

    const [tokenInfo] = await db
      .select()
      .from(refreshTokens)
      .where(and(...whereConditions))
      .limit(1);

    return tokenInfo || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy refresh token: ${error}`);
  }
}

export async function updateRefreshToken(
  id: number,
  data: Partial<Pick<RefreshTokenDB, "isValid" | "refreshToken">>,
) {
  try {
    const db = getDb();
    const [updatedRefreshToken] = await db
      .update(refreshTokens)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(refreshTokens.id, id))
      .returning();

    return updatedRefreshToken;
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật refresh token: ${error}`);
  }
}

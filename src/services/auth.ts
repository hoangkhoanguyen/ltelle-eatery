import { db } from "@/db/drizzle";
import { refreshTokens, users } from "@/db/schemas";
import {
  NewRefreshTokenDB,
  NewUserDB,
  RefreshTokenDB,
  UserDB,
} from "@/types/auth";
import { eq, and, or, ilike, sql } from "drizzle-orm";

// Tạo user mới
export async function createUser(userData: NewUserDB) {
  try {
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

// Lấy user theo ID
export async function getUserById(id: number) {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return user[0] || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy user theo ID: ${error}`);
  }
}

// Lấy user theo email
export async function getUserByEmail(email: string) {
  try {
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

export async function getTokenInfoByToken(token: string) {
  try {
    const [tokenInfo] = await db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.refreshToken, token))
      .limit(1);

    return tokenInfo || null;
  } catch (error) {
    throw new Error(`Lỗi khi lấy refresh token theo ID: ${error}`);
  }
}

export async function updateRefreshToken(
  id: number,
  data: Partial<Pick<RefreshTokenDB, "isValid">>,
) {
  try {
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

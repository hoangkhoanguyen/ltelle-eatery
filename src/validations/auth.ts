import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { error: "Username is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .max(255, {
        error: "Mật khẩu quá dài",
      })
      .min(6, { error: "Mật khẩu phải ít nhất 6 kí tự" }),
    newPassword: z
      .string()
      .max(255, {
        error: "Mật khẩu quá dài",
      })
      .min(6, { error: "Mật khẩu phải ít nhất 6 kí tự" }),
    confirmNewPassword: z
      .string()
      .max(255, {
        error: "Mật khẩu quá dài",
      })
      .min(6, { error: "Mật khẩu phải ít nhất 6 kí tự" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Mật khẩu xác nhận không khớp",
  });

import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => twMerge(clsx(args));

export function getErrorCode(error: Error) {
  try {
    const errObj: { code: number; message: string } = JSON.parse(error.message);
    return errObj.code;
  } catch {
    return undefined;
  }
}

export function generateSlug(title: string) {
  if (!title) return "";

  // 1. Chuyển chữ hoa thành chữ thường
  let slug = title.toLowerCase();

  // 2. Loại bỏ dấu tiếng Việt
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 3. Thay khoảng trắng và ký tự đặc biệt bằng dấu -
  slug = slug.replace(/[^a-z0-9]+/g, "-");

  // 4. Loại bỏ dấu - thừa ở đầu và cuối
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

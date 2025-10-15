import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";
import { withError } from "@/providers/withError";
import { withAuth } from "@/providers/withAuth";
import { createInvalidInputs, createResponse } from "@/lib/api/response";
import { AccessTokenPayload } from "@/lib/auth";

const MAX_SIZE = 700 * 1024; // 500KB
const UPLOAD_PATH = "/uploads/img";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "img");

const compressFile = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  let compressed: Buffer;
  let quality = 80;

  while (true) {
    compressed = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true }) // nén JPG
      .toBuffer();

    if (compressed.length <= MAX_SIZE || quality <= 30) {
      break;
    }

    quality -= 10;
  }

  return compressed;
};

function getUniqueFileName(originalName: string): string {
  const ext = path.extname(originalName); // ".jpg"
  const base = path.basename(originalName, ext); // "my-image"
  let finalName = originalName;
  let filePath = path.join(UPLOAD_DIR, finalName);

  while (fs.existsSync(filePath)) {
    const randomStr = crypto.randomBytes(4).toString("hex"); // ví dụ: "a1b2c3d4"
    finalName = `${base}-${randomStr}${ext}`;
    filePath = path.join(UPLOAD_DIR, finalName);
  }

  return finalName;
}

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

async function uploadImage(payload: AccessTokenPayload, req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    throw createInvalidInputs("No file uploaded");
  }

  const fileName = getUniqueFileName(file.name);
  const filePath = path.join(UPLOAD_DIR, fileName);

  const compressed = await compressFile(file);

  // Lưu file
  fs.writeFileSync(filePath, compressed);

  return NextResponse.json({
    message: "Upload thành công",
    url: `${UPLOAD_PATH}/${fileName}`,
    size: compressed.length,
  });
}

async function getAllImages(payload: AccessTokenPayload) {
  try {
    const uploadDir = UPLOAD_DIR;
    const files = fs.readdirSync(uploadDir);
    const images = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file),
    );

    const fileInfos = images.map((file) => {
      const filePath = path.join(uploadDir, file);
      const stat = fs.statSync(filePath);

      return {
        name: file,
        url: `${UPLOAD_PATH}/${file}`,
        mtime: stat.mtime.getTime(), // ms
      };
    });

    fileInfos.sort((a, b) => b.mtime - a.mtime);

    return createResponse({
      images: fileInfos.map(({ url }) => url),
    });
  } catch (error) {
    console.error("Error reading images:", error);
    return NextResponse.json({ error: "Cannot read images" }, { status: 500 });
  }
}

export const POST = withError(withAuth(uploadImage));
export const GET = withError(withAuth(getAllImages));

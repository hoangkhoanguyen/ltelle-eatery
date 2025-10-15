import { deleteAuthCookies } from "@/lib/auth";
import { NextResponse } from "next/server";

export const POST = async () => {
  await deleteAuthCookies();
  return NextResponse.json({ success: true });
};

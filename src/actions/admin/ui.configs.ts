"use server";
import { NewUIConfigDB } from "@/db/schemas";
import { initUIConfig, updateUIConfigByKey } from "@/services/ui-configs";
import { Config } from "@/types/configs";
import { revalidateTag } from "next/cache";

export async function initUIConfigsAction(data: NewUIConfigDB) {
  try {
    await initUIConfig(data);
    revalidateTag(`ui-${data.key}`);
    return {
      success: true,
      message: "UI Config initialized successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to initialize UI Config",
    };
  }
}

export async function updateUIConfigsAction({
  key,
  value,
}: {
  key: string;
  value: Config;
}) {
  try {
    await updateUIConfigByKey({ key, value });
    revalidateTag(`ui-${key}`);
    return {
      success: true,
      message: "UI Config updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update UI Config",
    };
  }
}

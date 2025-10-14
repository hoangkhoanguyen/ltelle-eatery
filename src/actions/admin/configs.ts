"use server";
import { ConfigDB, NewConfigDB } from "@/db/schemas";
import { initConfig, updateConfigByKey } from "@/services/configs";
import { adminRoutes } from "@/constants/route";
import { revalidatePath } from "next/cache";

export async function initConfigsAction(data: NewConfigDB) {
  try {
    await initConfig(data);

    // Revalidate the admin settings page
    revalidatePath(adminRoutes.settings(data.config_type, data.key));

    return {
      success: true,
      message: "Khởi tạo cấu hình thành công",
    };
  } catch (error) {
    console.log("Error initializing configs:", error);
    return {
      success: false,
      error: "Không thể khởi tạo cấu hình",
    };
  }
}

export async function updateConfigsAction({
  key,
  value,
  config_type,
}: {
  key: string;
  value: ConfigDB["value"];
  config_type: string;
}) {
  try {
    await updateConfigByKey({ key, config_type, value });

    // Revalidate the admin settings page
    revalidatePath(adminRoutes.settings(config_type, key));

    return {
      success: true,
      message: "Cập nhật cấu hình thành công",
    };
  } catch (error) {
    console.log("Error updating configs:", error);
    return {
      success: false,
      error: "Không thể cập nhật cấu hình",
    };
  }
}

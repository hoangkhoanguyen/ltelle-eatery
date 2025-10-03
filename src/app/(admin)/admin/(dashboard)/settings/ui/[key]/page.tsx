import InitUISetting from "@/components/admin/features/ui-settings/InitUISetting";
import UISetting from "@/components/admin/features/ui-settings/UISetting";
import { getUIConfigsByKey } from "@/services/ui-configs";
import React from "react";

const page = async ({ params }: { params: Promise<{ key: string }> }) => {
  const { key } = await params;

  const config = await getUIConfigsByKey(key);

  if (!config) {
    return <InitUISetting configKey={key} />;
  }

  return <UISetting data={config} />;
};

export default page;

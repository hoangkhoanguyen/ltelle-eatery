import React from "react";
import SettingsTextInput from "./SettingsTextInput";
import { Button } from "@/components/admin/ui/button";

const SettingsImageInput = () => {
  return (
    <div className="flex flex-col items-stretch gap-3">
      <div className="flex items-center gap-3">
        <SettingsTextInput className="w-auto flex-1" />
        <Button color="info">Thư viện</Button>
      </div>
      <SettingsTextInput />
    </div>
  );
};

export default SettingsImageInput;

import React, { FC } from "react";
import SettingsTextInput from "./SettingsTextInput";
import { Button } from "@/components/admin/ui/button";

const SettingsImageInput: FC<{
  url: string;
  alt: string;
  urlError?: string;
  altError?: string;
  onChangeUrl: (url: string) => void;
  onChangeAlt: (alt: string) => void;
}> = ({ url, alt, onChangeUrl, onChangeAlt, urlError, altError }) => {
  return (
    <div className="flex flex-col items-stretch gap-3">
      <div className="flex items-center gap-3">
        <SettingsTextInput
          className="flex-1"
          placeholder="Nhập URL ảnh"
          value={url}
          onChange={onChangeUrl}
          errorMessage={urlError}
        />
        <span className="text-sm text-gray-700">or</span>
        <Button color="info">Chọn từ Thư viện</Button>
      </div>
      <SettingsTextInput
        value={alt}
        onChange={onChangeAlt}
        placeholder="Nhập mô tả ảnh"
        errorMessage={altError}
      />
    </div>
  );
};

export default SettingsImageInput;

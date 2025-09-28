import React from "react";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsTextInput from "./elements/SettingsTextInput";
import SettingsNumberInput from "./elements/SettingsNumberInput";
import SettingsListInput from "./elements/SettingsListInput";
import SettingsImageInput from "./elements/SettingsImageInput";
import WithActive from "./elements/WithActive";

const SettingsItem = () => {
  return (
    <SettingsCard title="Header">
      <SettingsInput
        label="Phone"
        required
        description="Số điện thoại hiển thị trên header"
      >
        {/* <SettingsTextInput />
        <br />
        <SettingsNumberInput />
        <br /> */}
        <SettingsListInput onAdd={() => {}}>
          {[]}
          <WithActive>
            <SettingsTextInput />
          </WithActive>
          <SettingsNumberInput />
          <SettingsImageInput />
        </SettingsListInput>
      </SettingsInput>
    </SettingsCard>
  );
};

export default SettingsItem;

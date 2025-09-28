import { Button, IconButton } from "@/components/admin/ui/button";
import Icon from "@/components/common/Icon";
import React, { FC, ReactNode } from "react";

const SettingsListInput: FC<{
  children: ReactNode[];
  onAdd: (index: number) => void;
  canAdd?: boolean;
}> = ({ children, onAdd, canAdd }) => {
  return (
    <div className="flex flex-col gap-2 items-stretch">
      {children.length > 0 ? (
        children.map((child, index) => (
          <div key={index} className={"flex items-start gap-2"}>
            <div className="flex-1">{child}</div>
            {canAdd && (
              <IconButton icon="ph:plus" onClick={() => onAdd(index)} />
            )}
          </div>
        ))
      ) : (
        <>
          {canAdd && (
            <Button className="rounded-lg" onClick={() => onAdd(0)}>
              <Icon icon={"ph:plus"} />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SettingsListInput;

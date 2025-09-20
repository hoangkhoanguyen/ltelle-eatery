import Icon from "@/components/common/Icon";
import React, { FC } from "react";

const AdjustButton: FC<{ icon: string; onClick?(): void }> = ({
  icon,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="text-web-content-2 flex-1 h-full aspect-square flex justify-center items-center"
  >
    <Icon icon={icon} />
  </button>
);

export const QuantityButtons = () => {
  return (
    <div className="flex items-center h-[52px] bg-web-background-1 border border-web-content-3 rounded-lg overflow-hidden">
      <AdjustButton icon="ph:minus" />
      <span className="text-web-content-1 flex-1 h-full aspect-square flex justify-center items-center box-content border-x border-web-content-3">
        1
      </span>
      <AdjustButton icon="ph:plus" />
    </div>
  );
};

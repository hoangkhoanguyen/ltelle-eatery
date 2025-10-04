import Icon from "@/components/common/Icon";
import React, { FC } from "react";

export const HeaderContacts: FC<{ phone: string; openHours: string }> = ({
  phone,
  openHours,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4.5">
      <HeaderContactItem icon="ph:phone-light" content={phone} />
      <HeaderContactItem
        icon="ph:clock-light"
        content={`Open Daily: ${openHours}`}
      />
    </div>
  );
};

function HeaderContactItem({
  content,
  icon,
}: {
  icon: string;
  content: string;
}) {
  return (
    <div className="flex items-center gap-0.5">
      <Icon icon={icon} className="text-web-secondary-1 h-4.5 w-4.5" />
      <span className="text-web-caption-mobile lg:text-web-caption text-web-content-1">
        {content}
      </span>
    </div>
  );
}

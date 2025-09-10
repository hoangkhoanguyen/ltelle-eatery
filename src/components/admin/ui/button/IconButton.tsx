import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";

import React, { ButtonHTMLAttributes, FC } from "react";

export const IconButton: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & { icon: string }
> = ({ icon, className, ...rest }) => {
  return (
    <button
      className={cn(
        "text-primary dark:hover:bg-gray-300 hover:bg-gray-100 duration-200 rounded p-1",
        className,
      )}
      {...rest}
    >
      <Icon icon={icon} />
    </button>
  );
};

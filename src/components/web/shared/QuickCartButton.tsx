import Icon from "@/components/common/Icon";
import React from "react";

const QuickCartButton = () => {
  return (
    <button className="text-web-content-1 flex items-center gap-3 px-4 py-3 bg-web-secondary-1 rounded-lg">
      <Icon icon={"ph:plus-circle"} className="text-2xl" />
      <span className="text-web-button-mobile lg:text-web-button hidden @xs:block">
        Quick cart
      </span>
    </button>
  );
};

export default QuickCartButton;

import Icon from "@/components/common/Icon";
import React from "react";

const MobileMenu = () => {
  return (
    <>
      <button className="lg:hidden text-web-content-1 text-[44px]">
        <Icon icon={"ph:list"} />
      </button>
    </>
  );
};

export default MobileMenu;

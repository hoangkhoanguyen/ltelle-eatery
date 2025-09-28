import React, { FC, PropsWithChildren } from "react";

const SettingsCard: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="card p-5 bg-white">
      <p className="card-title">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default SettingsCard;

import React from "react";

export const Stats = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center gap-y-3">
      <StatItem label="Years of Excellence" nums="2+" />
      <StatItem label="Happy Guest" nums="500+" />
      <StatItem label="Signature Dishes" nums="12+" />
    </div>
  );
};

function StatItem({ label, nums }: { nums: string; label: string }) {
  return (
    <div className="flex flex-col items-center lg:gap-2">
      <span className="text-web-h1-mobile md:text-web-h1 text-web-background-1">
        {nums}
      </span>
      <span className="text-web-caption-mobile md:text-web-caption text-web-background-1">
        {label}
      </span>
    </div>
  );
}

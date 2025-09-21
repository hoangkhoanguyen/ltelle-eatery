import { webRoutes } from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={webRoutes.home()} className="grid grid-cols-[48px_1fr] gap-1">
      <Image
        src={"/assets/static/header-logo.svg"}
        alt="L'Telle Eatery - French Cusine - Ha Giang"
        width={48}
        height={48}
      />
      <div>
        <p className="text-[28px] leading-[100%] font-normal text-web-primary font-brand">
          L&#39;Telle Eatery
        </p>
        <p className="text-web-caption-mobile xl:text-web-caption text-web-content-1">
          French Cusine &bull; Ha Giang
        </p>
      </div>
    </Link>
  );
}

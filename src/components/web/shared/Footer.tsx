import Icon from "@/components/common/Icon";
import { webRoutes } from "@/constants/route";
import { splitTextByNewLine } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Footer: FC<{ configs: any }> = ({ configs }) => {
  console.log("social", configs.socials);
  return (
    <footer className="bg-[#101828]">
      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-5">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col gap-5">
              <Link href={webRoutes.home()} className="flex items-center gap-1">
                <div className="w-12 aspect-square rounded-full bg-web-secondary-2 flex justify-center items-center">
                  <Image
                    src={"/assets/static/logo.svg"}
                    alt="L'Telle Eatery - French Cusine - Ha Giang"
                    height={37}
                    width={37}
                  />
                </div>
                <div>
                  <p className="text-[28px] leading-[100%] font-normal text-web-secondary-2 font-brand">
                    L&#39;Telle Eatery
                  </p>
                  <p className="text-web-caption-mobile lg:text-web-caption text-web-secondary-2">
                    French Cusine &bull; Ha Giang
                  </p>
                </div>
              </Link>

              <p className="text-web-caption-mobile lg:text-web-caption text-web-background-1">
                {configs.description}
              </p>

              <div className="flex gap-5">
                {configs.socials.map((social: any, index: number) => (
                  <Link key={index} href={social.href}>
                    <MediaIcon icon={social.icon} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <p className="mb-5 text-web-background-1 text-web-h4-mobile lg:text-web-h4 capitalize">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2">
              {configs.quick_links.map((item: any, index: number) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-web-background-1 text-web-label-mobile lg:text-web-label duration-200 hover:text-web-secondary-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <p className="mb-5 text-web-background-1 text-web-h4-mobile lg:text-web-h4 capitalize">
              Our Services
            </p>
            <ul className="flex flex-col gap-2">
              {configs.services.map((item: any, index: number) => (
                <li key={index}>
                  <span className="text-web-background-1 text-web-label-mobile lg:text-web-label">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="flex flex-col gap-5 lg:ps-20">
              <p className="text-web-background-1 text-web-h4-mobile lg:text-web-h4 capitalize">
                Contact Information
              </p>

              <div className="flex flex-col gap-2">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <Icon
                    icon="ph:map-pin"
                    className="text-web-secondary-1 text-xl mt-1 flex-shrink-0"
                  />
                  <div>
                    {splitTextByNewLine(configs.contact.address).map(
                      (line, idx) => (
                        <p
                          key={idx}
                          className="text-web-background-1 text-web-caption-mobile lg:text-web-caption"
                        >
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                  {/* <p className="text-web-background-1 text-web-caption-mobile lg:text-web-caption">
                    08 Mai Hac De Street,
                    <br />
                    Nguyen Trai Ward,
                    <br />
                    Ha Giang Province
                    <br />
                    Vietnam 08000
                  </p> */}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <Icon
                    icon="ph:phone"
                    className="text-web-secondary-1 text-xl flex-shrink-0"
                  />
                  <a
                    href={`tel:${configs.contact.phone}`}
                    className="text-web-background-1 text-web-caption-mobile lg:text-web-caption hover:text-web-secondary-1 transition-colors"
                  >
                    {configs.contact.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <Icon
                    icon="ph:envelope-simple"
                    className="text-web-secondary-1 text-xl flex-shrink-0"
                  />
                  <Link
                    href={`mailto:${configs.contact.email}`}
                    className="text-web-background-1 text-web-caption-mobile lg:text-web-caption hover:text-web-secondary-1 transition-colors"
                  >
                    {configs.contact.email}
                  </Link>
                </div>
              </div>

              <div className="bg-[#7188B4]/60 rounded flex flex-col gap-2 py-2 px-5">
                <p className="text-web-secondary-1 text-web-subtitle-mobile lg:text-web-subtitle">
                  Contact Information
                </p>
                <div className="text-web-background-1 text-web-caption-mobile lg:text-web-caption">
                  {configs.opening_hours.map((line: any, idx: any) => (
                    <p key={idx}>{line.text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6">
            <div className="h-[1px] bg-web-background-1"></div>
          </div>

          <div className="col-span-1 lg:col-span-6">
            <div className="flex flex-col lg:flex-row justify-between gap-2.5">
              <p className="text-web-background-3 text-web-h4-mobile lg:text-web-h4 text-start md:text-center lg:text-start">
                &copy; 2025 L&#39;TELLE EATER Restaurant. All rights reserved.
              </p>
              <div className="text-start md:text-center lg:text-end">
                <p className="text-web-background-3 text-web-h4-mobile lg:text-web-h4">
                  Designed for international travelers
                </p>
                <p className="text-web-background-3 text-web-caption-mobile lg:text-web-caption">
                  French cuisine • Vietnamese hospitality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function MediaIcon({ icon }: { icon: string }) {
  return (
    <div className="py-2.5 px-4.5 bg-web-background-1 rounded">
      <Icon icon={icon} className="text-web-content-1 text-2xl" />
    </div>
  );
}

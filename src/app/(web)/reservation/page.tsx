import Content from "@/components/web/features/reservation/Content";
import { getEnv } from "@/lib/env";
import { getUIConfigsByKeyCached } from "@/services/configs";
import Image from "next/image";
import React from "react";

// export const dynamic = "force-dynamic";

const page = async () => {
  console.log("env", getEnv());
  // Delay function for 2 minutes (120000 ms)
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(120000);
  const configsDb = await getUIConfigsByKeyCached("reservation_page");
  console.log("configsDb", configsDb);
  await delay(120000);

  const configs = configsDb?.value || ({} as any);

  return (
    <div className="bg-web-background-3">
      <section>
        <div className="w-full aspect-[21/9] relative">
          <Image
            src={configs.hero?.banner.url || ""}
            alt={configs.hero?.banner.alt || ""}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 z-10 justify-center items-center hidden lg:flex">
            <h1 className="flex flex-col items-center text-web-h1-mobile lg:text-web-h1">
              {configs.hero?.title.map((item: any, index: number) => (
                <span
                  className={
                    index % 2 === 0
                      ? "text-web-background-1"
                      : "text-web-secondary-1"
                  }
                  key={index}
                >
                  {item.text}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </section>
      <Content configs={configs.booking} />
    </div>
  );
};

export default page;

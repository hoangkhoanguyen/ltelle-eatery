import Icon from "@/components/common/Icon";
import ReservationForm from "@/components/web/features/reservation/ReservationForm";
import SectionSubTitleFromConfigs from "@/components/web/shared/SectionSubTitleFromConfigs";
import SectionTitleFromConfigs from "@/components/web/shared/SectionTitleFromConfigs";
import { Button } from "@/components/web/ui/button";
import { getUIConfigsByKey } from "@/services/ui-configs";
import Image from "next/image";
import React from "react";

const page = async () => {
  const configsDb = await getUIConfigsByKey("reservation_page");

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

      <section>
        <div className="container">
          <div className="flex flex-col gap-5 items-center py-10 text-center">
            <p className="text-web-secondary-3 text-web-subtitle-mobile uppercase lg:text-web-subtitle text-center">
              <SectionSubTitleFromConfigs
                sub_title={configs.booking.sub_title}
              />
            </p>
            <h2 className="text-web-h2-mobile capitalize lg:text-web-h2 flex flex-row gap-x-2 flex-wrap justify-center items-center">
              <SectionTitleFromConfigs title={configs.booking.title} />
            </h2>
            <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2">
              {configs.booking.description}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-10 pb-10">
            <div className="col-span-1 xl:col-span-3">
              <ReservationForm configs={configs.booking} />
            </div>
            <div className="col-span-1 xl:col-span-2">
              <div className="grid grid-cols-1 gap-10">
                <div className="reservation-card-shadow p-5 bg-white rounded-xl">
                  <div className="flex flex-row items-center gap-2 mb-10">
                    <div className="rounded-full bg-web-secondary-1 text-web-content-1 p-2.5">
                      <Icon icon={"ph:clock"} className="text-2xl" />
                    </div>
                    <h3 className="text-web-h3-mobile lg:text-web-h3 text-web-content-1">
                      Reservation Information
                    </h3>
                  </div>
                  <ul>
                    {configs.booking.reservation_info.map(
                      (info: any, index: number) => (
                        <li key={index}>
                          <div className="flex flex-row items-start gap-2">
                            <div className="rounded-full w-9 aspect-square bg-web-secondary-2 text-web-content-1 flex justify-center items-center">
                              <Icon icon={info.icon} className="text-lg" />
                            </div>
                            <div className="flex flex-col gap-2.5 pt-1">
                              <h4 className="text-web-h4-mobile lg:text-web-h4 text-web-content-1">
                                {info.title}
                              </h4>
                              <ul className="flex flex-col items-stretch">
                                {info.items.map((item: any, idx: number) => (
                                  <li key={idx}>
                                    <p className="text-web-body-mobile lg:text-web-body text-web-content-2">
                                      {item.text}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="p-5 bg-web-primary rounded-xl">
                  <p className="text-web-caption-mobile lg:text-web-caption text-web-background-1 mb-2.5">
                    Need Assistance?
                  </p>
                  <p className="text-web-body-mobile lg:text-web-body text-web-background-3 mb-12">
                    Get in touch with our reservations team
                  </p>
                  <div className="flex flex-row items-center gap-2 mb-10">
                    <div className="w-[52px] aspect-square rounded-full flex justify-center items-center bg-web-secondary-1 text-web-content-1">
                      <Icon icon={"ph:phone"} className="text-2xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-web-background-1 text-web-h4-mobile lg:text-web-h4">
                        {configs.booking.contact.phone}
                      </p>
                      <p className="text-web-background-3 text-web-body-mobile lg:text-web-body">
                        Call us directly
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 mb-10">
                    <div className="w-[52px] aspect-square rounded-full flex justify-center items-center bg-web-secondary-1 text-web-content-1">
                      <Icon icon={"ph:envelope"} className="text-2xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-web-background-1 text-web-h4-mobile lg:text-web-h4">
                        {configs.booking.contact.email}
                      </p>
                      <p className="text-web-background-3 text-web-body-mobile lg:text-web-body">
                        Email for special requests
                      </p>
                    </div>
                  </div>
                  <Button
                    className="capitalize w-full text-web-background-1 text-web-button-mobile lg:text-web-button py-3 rounded-lg"
                    variant="secondary1"
                    startIcon={<Icon icon="ph:phone" className="text-2xl" />}
                  >
                    call now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;

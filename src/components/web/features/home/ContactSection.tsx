import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { Button } from "../../ui/button";

const openingHoursConfigs = [
  {
    title: "Restaurant Hours",
    items: [
      { label: "Tuesday - Sunday", value: "11:00 AM - 10:00 PM" },
      { label: "Last Order", value: "09:30 PM" },
      { label: "Kitchen Closes", value: "9:45 PM" },
      { label: "Monday", value: "Closed" },
    ],
  },
  {
    title: "Delivery Hours",
    items: [
      { label: "Lunch Delivery", value: "11:30 AM - 2:30 PM" },
      { label: "Dinner Delivery", value: "6:00 PM - 9:30 PM" },
      { label: "Pickup Available", value: "All Day" },
    ],
  },
];

export const ContactSection = () => {
  return (
    <section className="bg-web-background-2 pt-10 pb-10 md:pb-12 lg:pb-14">
      <div className="container mx-auto px-3 md:px-5">
        <h3 className="text-web-secondary-1 text-center text-web-subtitle-mobile uppercase mb-5 lg:text-web-subtitle">
          visit us
        </h3>

        <h2 className="text-web-h2-mobile text-center capitalize lg:text-web-h2 mb-5">
          <span className="text-web-content-1">Find Us in</span>{" "}
          <span className="text-web-secondary-1">Beautiful</span>{" "}
          <span className="text-web-content-1">Ha Giang</span>
        </h2>
        <p className="text-web-subtitle-mobile lg:text-web-subtitle mb-10 text-center block mx-auto max-w-3xl text-web-content-2">
          Located in the heart of Ha Giang with stunning views of the
          surrounding limestone mountains. Easily accessible from major hotels
          and tourist attractions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <div className="col-span-1">
            <Card>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-10">
                  <CardTitle icon="ph:map-pin" title="Location" />

                  <div className="w-full">
                    <p className="text-web-caption-mobile lg:text-web-caption text-web-content-2">
                      08 Mai Hac De Street,
                      <br /> Nguyen Trai Ward, Ha Giang Province <br /> Vietnam
                      08000
                    </p>
                  </div>
                </div>

                <Button
                  as="a"
                  href="https://google.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="white"
                  startIcon={
                    <Icon
                      icon="ph:navigation-arrow"
                      className="rotate-90 text-lg"
                    />
                  }
                  className="border-web-content-3 text-web-label-mobile lg:text-web-label"
                >
                  Get Directions
                </Button>
              </div>
            </Card>
          </div>
          <div className="col-span-1">
            <Card>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-10">
                  <CardTitle icon="ph:phone" title="Contact" />

                  <div className="w-full flex flex-col gap-5">
                    <div>
                      <p className="text-web-content-2 text-web-h4-mobile lg:text-web-h4">
                        Phone
                      </p>
                      <p className="text-web-content-2 text-web-caption-mobile lg:text-web-caption">
                        +84 123 456 178
                      </p>
                    </div>
                    <div>
                      <p className="text-web-content-2 text-web-h4-mobile lg:text-web-h4">
                        Email
                      </p>
                      <p className="text-web-content-2 text-web-caption-mobile lg:text-web-caption">
                        info@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  as="a"
                  href="https://google.com"
                  target="_blank"
                  rel="noreferrer"
                  variant="white"
                  startIcon={<Icon icon="ph:chat-circle" className="text-lg" />}
                  className="border-web-content-3 text-web-label-mobile lg:text-web-label"
                >
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <Card>
              <div className="mb-10">
                <CardTitle icon="ph:clock" title="Opening Hours" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {openingHoursConfigs.map((config, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-stretch gap-5"
                  >
                    <p className="text-web-content-2 text-web-h4-mobile lg:text-web-h4">
                      {config.title}
                    </p>
                    <ul className="text-web-content-2 text-web-caption-mobile lg:text-web-caption flex flex-col gap-2">
                      {config.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center"
                        >
                          <span>{item.label}</span>
                          <span>{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "py-5 px-5 md:px-10 border border-web-content-3 rounded-lg bg-web-secondary-2 h-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 lg:gap-1">
      <Icon icon={icon} className="text-2xl text-web-secondary-1" />
      <p className="text-web-subtitle-mobile lg:text-web-subtitle text-web-content-2">
        {title}
      </p>
    </div>
  );
}

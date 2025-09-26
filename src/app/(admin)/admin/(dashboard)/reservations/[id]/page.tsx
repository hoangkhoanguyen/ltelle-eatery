import ReservationInformation from "@/components/admin/features/reservations/ReservationInformation";
import ReservationInternalNote from "@/components/admin/features/reservations/ReservationInternalNote";
import ReservationNote from "@/components/admin/features/reservations/ReservationNote";
import ReservationStatuses from "@/components/admin/features/reservations/ReservationStatuses";
import Header from "@/components/admin/shared/header/Header";
import Icon from "@/components/common/Icon";
import { ReservationStatus } from "@/types/reservations";
import React from "react";

const page = () => {
  return (
    <>
      <Header title="Reservation Details" />
      <div className="container py-5">
        <div className="grid gap-5">
          <ReservationStatuses
            historyStatus={[ReservationStatus.scheduled]}
            orderId={1}
            status={ReservationStatus.confirmed}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card p-5 bg-blue-100 flex flex-col items-center gap-0 justify-center">
              <Icon
                icon="flat-color-icons:calendar"
                className="text-5xl mb-3"
              />
              <p className="text-sm leading-none text-blue-500">Date</p>
              <p className="text-lg text-blue-600 font-semibold">2023-10-10</p>
            </div>
            <div className="card p-5 bg-green-100 flex flex-col items-center gap-0 justify-center">
              <Icon icon="noto:alarm-clock" className="text-5xl mb-3" />
              <p className="text-sm leading-none text-green-500">Time</p>
              <p className="text-lg text-green-600 font-semibold">12:00 PM</p>
            </div>
            <div className="card p-5 bg-orange-100 flex flex-col items-center gap-0 justify-center">
              <Icon
                icon="fluent-color:people-interwoven-28"
                className="text-5xl mb-3"
              />
              <p className="text-sm leading-none text-orange-500">People</p>
              <p className="text-lg text-orange-600 font-semibold">4</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-1 md:col-span-2">
              <ReservationInformation />
            </div>
            <div className="col-span-1">
              <div className="grid gap-5">
                <ReservationNote />
                <ReservationInternalNote
                  data={{
                    id: 1,
                    internalNote: "This is an internal note",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

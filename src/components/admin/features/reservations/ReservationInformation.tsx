import React from "react";

const ReservationInformation = () => {
  return (
    <>
      <div className="card p-5 bg-white @container h-full">
        <p className="card-title">Reservation Information</p>
        <div className="mt-4 grid grid-cols-1 @sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="text-base text-gray-700 font-semibold">John Doe</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Customer Phone</p>
            <p className="text-base text-gray-700 font-semibold">
              123-456-7890
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer Whatsapp</p>
            <p className="text-base text-gray-700 font-semibold">
              john.doe@example.com
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Reservation Code</p>
            <p className="text-base text-gray-700 font-semibold">ABC123</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationInformation;

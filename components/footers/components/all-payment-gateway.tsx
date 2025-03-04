import React from "react";
import SSLImg from "@/assets/paymentMethodLogo/SSLCommerz-Pay-With-logo-All-Size-03.webp";
import BkashImg from "@/assets/paymentMethodLogo/bkashLogo.png";
import NagedImg from "@/assets/paymentMethodLogo/nagad-logo.png";
import AmarPayImg from "@/assets/paymentMethodLogo/amar-pay.png";

const AllPaymantGateway = ({ headersetting }: any) => {
  const isAnyPaymentActive =
    headersetting?.amarpay === "active" ||
    headersetting?.bkash === "active" ||
    headersetting?.nagad === "active" ||
    headersetting?.online === "active";
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      {isAnyPaymentActive && <p className="text-sm sm:text-base">We Accept:</p>}
      {headersetting?.amarpay === "active" && (
        <img src={AmarPayImg?.src} alt="Amar Pay" className="w-1/3 " />
      )}
      {headersetting?.bkash === "active" && (
        <img src={BkashImg?.src} alt="Bkash" className="w-12 sm:w-16" />
      )}
      {headersetting?.nagad === "active" && (
        <img src={NagedImg?.src} alt="Nagad" className="w-12 sm:w-16" />
      )}
      {headersetting?.online === "active" && (
        <img src={SSLImg?.src} alt="SSL Payment" className="mt-0 md:-mt-5" />
      )}
    </div>
  );
};

export default AllPaymantGateway;

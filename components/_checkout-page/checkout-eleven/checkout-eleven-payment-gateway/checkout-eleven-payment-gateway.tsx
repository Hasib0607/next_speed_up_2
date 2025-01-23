"use client";
import React from "react";
import bkashLogo from "@/assets/paymentMethodLogo/bkashLogo.png";
import { useSelector } from "react-redux";
import { useGetModuleStatusQuery } from "@/redux/features/modules/modulesApi";

const CheckOutElevenPaymentGateway = ({
  selectPayment,
  setSelectPayment,
}: any) => {
   const module_id = 106;

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const home = useSelector((state: any) => state?.home);
    const { design, headersetting } = home || {};

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    const handleSelect = (e: string) => {
        setSelectPayment(e);
    };
  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="col-span-6 sm:col-span-4">
            <div className="flex flex-col gap-2 justify-between pb-3">
              <label
                htmlFor="email-address"
                className="block text-xl font-semibold text-gray-700"
              >
                Payment{" "}
                <span className="text-sm">
                  ( Please Select Your Payment Method )
                </span>
              </label>
              {store_id === 4736 && (
                <label
                  htmlFor="email-address"
                  className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                >
                  ১৫০ টাকা এডভ্যান্স পেমেন্ট করতে এই বক্স এ ক্লিক করুন
                </label>
              )}
              {store_id === 4812 && (
                <label
                  htmlFor="email-address"
                  className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                >
                  ২০০ টাকা অগ্ৰীম পেমেন্ট অথবা সম্পূর্ণ পেমেন্ট করে আপনার
                  অর্ডারটি নিশ্চিত করুন।
                </label>
              )}
            </div>

            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              {headersetting?.online === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "online"
                        ? design?.header_color
                        : "#fff",
                    color:
                      selectPayment === "online" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {"SSL Commarce"}
                    </h3>
                  </div>
                  <input
                    className=" hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"online"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}

              {headersetting?.bkash === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "bkash" ? design?.header_color : "#fff",
                    color:
                      selectPayment === "bkash" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-center border border-gray-300 lg:cursor-pointer`}
                >
                  <div className="flex justify-center ">
                    <div>
                      {headersetting?.bkash_text || (
                        <img
                          src={bkashLogo.src}
                          className=" max-h-8 "
                          alt="bkashLogo"
                        />
                      )}
                    </div>
                  </div>
                  <input
                    className="hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"bkash"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}

              {headersetting?.cod === "active" && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "cod" ? design?.header_color : "#fff",
                    color:
                      selectPayment === "cod" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headersetting?.cod_text || "Cash On Delivery"}
                    </h3>
                  </div>

                  <input
                    className="hidden checked:focus:bg-black checked:focus:border-black checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"cod"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}

              {activeModule && (
                <label
                  style={{
                    backgroundColor:
                      selectPayment === "ap" ? design?.header_color : "#fff",
                    color: selectPayment === "ap" ? design?.text_color : "#000",
                  }}
                  className={`p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300`}
                >
                  <div className="flex justify-between lg:cursor-pointer">
                    <h3 className="font-semibold tracking-wider">
                      {headersetting?.ap_text || "Advance Payment"}
                    </h3>
                  </div>

                  <input
                    className="
                              hidden
                              checked:focus:bg-black
                              checked:focus:border-black
                              checked:focus:ring-black"
                    name="address_type"
                    type="radio"
                    value={"ap"}
                    onChange={(e) => setSelectPayment(e.target.value)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutElevenPaymentGateway;

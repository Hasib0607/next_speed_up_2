"use client";
import { getDiscount } from "@/helpers/getDiscount";
import { numberParser } from "@/helpers/numberParser";
import { checkOutApi, useCheckCouponAvailabilityQuery } from "@/redux/features/checkOut/checkOutApi";
import { AppDispatch } from "@/redux/store";
import { btnhover } from "@/site-settings/style";
import { subTotal } from "@/utils/_cart-utils/cart-utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckOutElevenDiscount = ({
  setCouponDis,
  setShippingArea,
  setCoupon,
  setCouponResult,
}: any) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

      const dispatch: AppDispatch = useDispatch();

    const home = useSelector((state: any) => state?.home);
    const { design, headersetting } = home || {};

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const cartList = useSelector((state: any) => state.cart.cartList);

    const [loading, setLoading] = useState(false);
    const [couponAvailable, setCouponAvailable] = useState(false);

  const {
          data: couponData,
          isLoading: couponLoading,
          isSuccess: couponSuccess,
          refetch: couponRefetch,
      } = useCheckCouponAvailabilityQuery({ store_id });
  
      const setDiscount = (res: any) => {
          setCoupon(res?.code);
          const sTotal = subTotal(cartList);
          const minPurchase = numberParser(res?.min_purchase);
          const maxPurchase = numberParser(res?.max_purchase);
          const total = numberParser(sTotal);
  
          if (maxPurchase >= total && minPurchase <= total) {
              const result: any = getDiscount(
                  total,
                  res?.discount_amount,
                  res?.discount_type
              );
              const dis = numberParser(total - result);
              return dis;
          } else if (!numberParser(res?.max_purchase) && minPurchase <= total) {
              const result: any = getDiscount(
                  total,
                  res?.discount_amount,
                  res?.discount_type
              );
              const dis = numberParser(total - result);
              return dis;
          } else {
              toast.warning(
                  `Please purchase minimum ${res?.min_purchase}tk ${
                      res?.max_purchase && `to maximum ${res?.max_purchase}tk`
                  }`,
                  { toastId: res.id }
              );
              return 0;
          }
      };
  
      const onSubmit = ({ coupon_code }: any) => {
          setLoading(true);
          if (coupon_code != '') {
              dispatch(
                  checkOutApi.endpoints.checkCouponValidation.initiate(
                      {
                          store_id,
                          coupon_code,
                      },
                      { forceRefetch: true }
                  )
              )
                  .unwrap()
                  .then((res: any) => {
                      const couponValidation = res?.data || {};
                      if (res?.status) {
                          setCouponResult(couponValidation);
                          const result = setDiscount(couponValidation);
                          setCouponDis(result);
                          toast.success(
                              'Successfully Applied Coupon',
                              couponValidation?.id
                          );
                          reset();
                          setLoading(false);
                      }
                  })
                  .catch((couponValidationError: any) => {
                      const { status } = couponValidationError || {};
                      const { message } = couponValidationError?.data || {};
                      if (status == 404) {
                          setLoading(false);
                          toast.error(message, { toastId: message });
                      }
                  });
          }
      };
  
      const shippingPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
          const inputValue = parseInt(e.target.value) as number;
          setShippingArea(inputValue);
      };
  
      useEffect(() => {
          if (
              headersetting?.shipping_area_1 &&
              (store_id === 3601 || store_id === 3904 || store_id === 5519)
          ) {
              setShippingArea(parseInt(headersetting?.shipping_area_1_cost));
          }
      }, [
          headersetting?.shipping_area_1,
          headersetting?.shipping_area_1_cost,
          setShippingArea,
          store_id,
      ]);
  
      // get coupon status
      useEffect(() => {
          const isCoupon = couponData?.status || false;
          if (couponSuccess) {
              setCouponAvailable(isCoupon);
          }
      }, [couponData, couponSuccess]);

  return (
    <>
      <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 xl:col-span-3">
              <div className="flex flex-col gap-4 items-start pb-3">
                <label
                  htmlFor="shippingArea"
                  className="block text-xl font-semibold text-gray-700"
                >
                  Shipping Area
                </label>
                <div className="flex flex-col gap-2">
                  {/* Shipping Area 1 */}
                  {headersetting?.shipping_area_1 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea1"
                        name="shippingArea"
                        value={parseInt(headersetting?.shipping_area_1_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                        defaultChecked
                      />
                      <label
                        htmlFor="shippingArea1"
                        className="text-lg font-semibold"
                      >
                        {headersetting?.shipping_area_1}
                      </label>
                    </div>
                  )}

                  {/* Shipping Area 2 */}
                  {headersetting?.shipping_area_2 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea2"
                        name="shippingArea"
                        value={parseInt(headersetting?.shipping_area_2_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                      />
                      <label
                        htmlFor="shippingArea2"
                        className="text-lg font-semibold"
                      >
                        {headersetting?.shipping_area_2}
                      </label>
                    </div>
                  )}

                  {/* Shipping Area 3 */}
                  {headersetting?.shipping_area_3 && (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="shippingArea3"
                        name="shippingArea"
                        value={parseInt(headersetting?.shipping_area_3_cost)}
                        onChange={shippingPrice}
                        className="mr-2"
                      />
                      <label
                        htmlFor="shippingArea3"
                        className="text-lg font-semibold"
                      >
                        {headersetting?.shipping_area_3}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {store_id !== 6433 && couponAvailable && (
              <div className="col-span-6 xl:col-span-3">
                <div className="flex flex-wrap gap-x-1 xl:justify-between items-center pb-3">
                  <label
                    htmlFor="name"
                    className="block text-xl font-semibold text-gray-700"
                  >
                    Discount
                  </label>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-1 flex-wrap justify-start items-start"
                  >
                    <div className="flex flex-col">
                      <input
                        {...register("code", { required: true })}
                        type={"text"}
                        className="border border-gray-400 py-2 px-2 rounded-sm"
                      />
                      {errors.code && (
                        <span className="text-red-500">Field is empty</span>
                      )}
                    </div>
                    <input
                      type={"submit"}
                      value={"Apply"}
                      style={{
                        backgroundColor: design?.header_color,
                        color: design?.text_color,
                      }}
                      className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer ${btnhover}`}
                    />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutElevenDiscount;

'use client';

import {
    checkOutApi,
    useCheckCouponAvailabilityQuery,
} from '@/redux/features/checkOut/checkOutApi';

import { AppDispatch } from '@/redux/store';

import { getDiscount } from '@/helpers/getDiscount';
import { numberParser } from '@/helpers/numberParser';
import { btnhover } from '@/site-settings/style';
import { subTotal } from '@/utils/_cart-utils/cart-utils';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Discount = ({
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
            <div
                className={`${
                    design?.template_id === '34'
                        ? 'bg-thirty-one border border-white'
                        : 'bg-white'
                }  shadow sm:rounded-md sm:overflow-hidden my-5`}
            >
                <div className={`px-4 py-5  space-y-6 sm:p-6`}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="">
                            <div className="flex flex-col justify-start gap-4 items-start pb-3">
                                <label
                                    htmlFor="name"
                                    className="block text-xl font-semibold text-gray-700"
                                >
                                    {design?.template_id === '29' ||
                                    store_id === 3601 ||
                                    store_id === 3904 ||
                                    store_id === 5519
                                        ? 'শিপিং এরিয়া'
                                        : 'Shipping Area'}
                                </label>
                                <div className="flex flex-col gap-2">
                                    {/* Radio button for Shipping Area 1 */}
                                    {headersetting?.shipping_area_1 && (
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="shippingArea1"
                                                name="shippingArea"
                                                value={parseInt(
                                                    headersetting?.shipping_area_1_cost
                                                )}
                                                onChange={(e) =>
                                                    shippingPrice(e)
                                                }
                                                // checked={
                                                //   store_id === 3601 ||
                                                //   store_id === 3904 ||
                                                //   store_id === 5519
                                                // }
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="shippingArea1"
                                                className="text-lg font-semibold"
                                            >
                                                {headersetting?.shipping_area_1}
                                            </label>
                                        </div>
                                    )}

                                    {/* Radio button for Shipping Area 2 */}
                                    {headersetting?.shipping_area_2 && (
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="shippingArea2"
                                                name="shippingArea"
                                                value={parseInt(
                                                    headersetting?.shipping_area_2_cost
                                                )}
                                                onChange={(e) =>
                                                    shippingPrice(e)
                                                }
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

                                    {/* Radio button for Shipping Area 3 */}
                                    {headersetting?.shipping_area_3 && (
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="shippingArea3"
                                                name="shippingArea"
                                                value={parseInt(
                                                    headersetting?.shipping_area_3_cost
                                                )}
                                                onChange={(e) =>
                                                    shippingPrice(e)
                                                }
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

                        {store_id !== 3601 &&
                            store_id !== 3904 &&
                            store_id !== 4633 &&
                            store_id !== 5519 &&
                            store_id !== 6357 &&
                            couponAvailable && (
                                <div className="">
                                    <div className="flex sm:flex-row flex-col gap-4 justify-between items-start sm:items-center pb-3 ">
                                        <label
                                            htmlFor="name"
                                            className="block text-xl font-semibold text-gray-700"
                                        >
                                            {design?.template_id === '29'
                                                ? 'ডিসকাউন্ট'
                                                : 'Discount'}
                                        </label>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="flex flex-wrap gap-2 justify-center items-start"
                                        >
                                            <div className="flex flex-col justify-center">
                                                <input
                                                    {...register(
                                                        'coupon_code',
                                                        {
                                                            required: true,
                                                        }
                                                    )}
                                                    type={'text'}
                                                    className="border border-gray-400 text-black h-10 p-2 rounded-sm"
                                                />
                                            </div>
                                            {loading ? (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            design?.header_color,
                                                        color: design?.text_color,
                                                    }}
                                                    className={`flex justify-center items-center py-2 w-20 h-10 font-semibold rounded-sm text-lg lg:cursor-pointer ${btnhover}`}
                                                >
                                                    <RotatingLines
                                                        width="20"
                                                        strokeColor="#6495ED"
                                                        strokeWidth="6"
                                                    />
                                                </div>
                                            ) : (
                                                <input
                                                    type={'submit'}
                                                    value={'Apply'}
                                                    style={{
                                                        backgroundColor:
                                                            design?.header_color,
                                                        color: design?.text_color,
                                                    }}
                                                    className={`w-20 h-10 py-2 font-semibold rounded-sm text-lg lg:cursor-pointer  ${btnhover}`}
                                                />
                                            )}
                                        </form>
                                    </div>
                                    {errors.code && (
                                        <span className="text-red-500">
                                            Field is empty
                                        </span>
                                    )}
                                </div>
                            )}
                    </div>
                </div>
                {store_id === 5377 && (
                    <div className="px-4 pb-10 space-y-2">
                        <p className="text-red-600 text-sm font-bold">
                            <FaRegArrowAltCircleRight className="inline mr-1 text-xl" />{' '}
                            এডভান্স পেমেন্ট আবশ্যক (ফেক অর্ডার প্রতিরোধ করতে)
                            আমাদের গ্যাজেট আইটেম গুলো অর্ডারের ক্ষেত্রে আংশিক
                            পেমেন্ট করতে হয়। Cash On Delivery (COD) এর ক্ষেত্রে
                            অবশ্যই প্রতি অর্ডারে ২০০৳ - ১০০০৳ টাকা প্রদান করতে
                            হয়। যদি চান ফুল পেমেন্ট ও করতে পারবেন।
                        </p>
                        <p className="text-red-600 text-sm font-bold">
                            <FaRegArrowAltCircleRight className="inline mr-1 text-xl" />{' '}
                            আপনার প্রদানকৃত এডভান্স টাকা টোটাল বিল থেকে মাইনাস
                            করা হবে। বাকি টাকা ডেলিভারি ম্যানকে দিয়ে পন্য বুঝে
                            নিবেন।
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Discount;

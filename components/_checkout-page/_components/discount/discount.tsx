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
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Discount = ({
    design,
    appStore,
    headersetting,
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

    const store_id = appStore?.id || null;

    const cartList = useSelector((state: any) => state.cart.cartList);

    const [loading, setLoading] = useState(false);
    const [couponAvailable, setCouponAvailable] = useState(false);
    const [selectedShippingArea, setSelectedShippingArea] = useState<
        string | null
    >(null);

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

    const getAreaIdByCost = (cost: number): string | null => {
        if (cost === headersetting?.shipping_area_1_cost) return '1';
        if (cost === headersetting?.shipping_area_2_cost) return '2';
        if (cost === headersetting?.shipping_area_3_cost) return '3';
        return null;
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCost = numberParser(e.target.value);
        const areaId = getAreaIdByCost(selectedCost);
        if (areaId) {
            setSelectedShippingArea(areaId);
            setShippingArea(selectedCost);
        }
    };

    useEffect(() => {
        if (headersetting?.selected_shipping_area) {
            setSelectedShippingArea(headersetting?.selected_shipping_area);
            const initialAreaCost =
                headersetting?.[
                    `shipping_area_${headersetting.selected_shipping_area}_cost`
                ];
            if (initialAreaCost) {
                setShippingArea(initialAreaCost);
            }
        }
    }, [headersetting, setShippingArea]);

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
                    <div className="grid grid-cols-6 gap-6 items-center">
                        <div className="col-span-6 xl:col-span-3">
                            <div className="flex flex-col gap-4 items-start pb-3">
                                <label
                                    htmlFor="shippingArea"
                                    className="block text-xl font-semibold text-gray-700"
                                >
                                    Shipping Area
                                </label>
                                <div className="flex flex-col gap-2">
                                    {/* Radio button for Shipping Area 1 */}
                                    {headersetting?.shipping_area_1 && (
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="shippingArea1"
                                                name="shippingArea"
                                                value={
                                                    headersetting?.shipping_area_1_cost
                                                }
                                                checked={
                                                    selectedShippingArea === '1'
                                                }
                                                onChange={handleShippingChange}
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
                                                value={
                                                    headersetting?.shipping_area_2_cost
                                                }
                                                checked={
                                                    selectedShippingArea === '2'
                                                }
                                                onChange={handleShippingChange}
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
                                                value={
                                                    headersetting?.shipping_area_3_cost
                                                }
                                                checked={
                                                    selectedShippingArea === '3'
                                                }
                                                onChange={handleShippingChange}
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

                        <div className="col-span-6 xl:col-span-3">
                            {store_id !== 6433 && couponAvailable && (
                                <div className="">
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
                                            <div className="flex flex-col justify-center">
                                                <input
                                                    {...register(
                                                        'coupon_code',
                                                        {
                                                            required: true,
                                                        }
                                                    )}
                                                    type={'text'}
                                                    className="border border-gray-400 py-2 px-2 rounded-sm"
                                                />
                                            </div>
                                            {loading ? (
                                                <div
                                                    style={{
                                                        backgroundColor:
                                                            design?.header_color,
                                                        color: design?.text_color,
                                                    }}
                                                    className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer ${btnhover}`}
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
                                                    className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer ${btnhover}`}
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
                </div>
            </div>
        </>
    );
};

export default Discount;

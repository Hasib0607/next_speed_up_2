'use client';

import {
    checkOutApi,
    useCheckCouponAvailabilityQuery,
} from '@/redux/features/checkOut/checkOutApi';
import { TWENTY_EIGHT } from '@/consts';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { AppDispatch, RootState } from '@/redux/store';
import { numberParser } from '@/helpers/numberParser';
import { btnhover } from '@/site-settings/style';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setDiscount } from '@/helpers/setDiscount';
import { setSelectedShippingArea } from '@/redux/features/filters/shippingAreaFilterSlice';

const Discount = ({
    design,
    appStore,
    headersetting,
    setCouponDis,
    shippingArea,
    setShippingArea,
    shippingColOne,
    shippingOff,
    select,
    bn,
}: any) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const dispatch: AppDispatch = useDispatch();
    const store_id = appStore?.id || null;

    const cartList = useSelector((state: RootState) => state.cart.cartList);
    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );
    //
    const { selectedShippingArea } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );
    // console.log('selectedShippingArea', selectedShippingArea);
    // console.log('shippingArea', shippingArea);

    const sTotal = subTotal(cartList);
    const total = numberParser(sTotal);

    const [loading, setLoading] = useState(false);
    const [couponAvailable, setCouponAvailable] = useState(false);

    const {
        data: couponData,
        isLoading: couponLoading,
        isSuccess: couponSuccess,
        refetch: couponRefetch,
    } = useCheckCouponAvailabilityQuery({ store_id });

    const onSubmit = ({ coupon_code }: any) => {
        setLoading(true);
        if (coupon_code != '') {
            dispatch(
                checkOutApi.endpoints.checkCouponValidation.initiate(
                    {
                        store_id,
                        coupon_code,
                        total,
                        selectedShippingArea,
                        selectedPayment,
                    },
                    { forceRefetch: true }
                )
            )
                .unwrap()
                .then((res: any) => {
                    const couponValidation = res?.data || {};
                    if (res?.status) {
                        const result = setDiscount(
                            couponValidation,
                            total,
                            shippingArea
                        );
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
                    if (status == 404) {
                        setCouponDis(0);
                        setLoading(false);
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

    const getCostByAreaId = (id: string): number | null => {
        if (id === '1') return headersetting?.shipping_area_1_cost;
        if (id === '2') return headersetting?.shipping_area_2_cost;
        if (id === '3') return headersetting?.shipping_area_3_cost;
        return null;
    };

    const handleShippingSelectChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const areaId = e.target.value;
        const selectedCost = getCostByAreaId(areaId);
        if (areaId) {
            dispatch(setSelectedShippingArea(areaId));
            setShippingArea(selectedCost);
        }
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCost = numberParser(e.target.value);
        const areaId = getAreaIdByCost(selectedCost);
        if (areaId) {
            dispatch(setSelectedShippingArea(areaId));
            setShippingArea(selectedCost);
        }
    };

    useEffect(() => {
        if (headersetting?.selected_shipping_area) {
            dispatch(
                setSelectedShippingArea(headersetting?.selected_shipping_area)
            );
            const initialAreaCost =
                headersetting?.[
                    `shipping_area_${headersetting?.selected_shipping_area}_cost`
                ];
            if (initialAreaCost >= 0) {
                setShippingArea(initialAreaCost);
            }
        }
    }, [headersetting, setShippingArea, dispatch]);

    // set auto coupon
    useEffect(() => {
        if (total > 0 && selectedShippingArea !== null) {
            dispatch(
                checkOutApi.endpoints.couponAutoApply.initiate(
                    {
                        store_id,
                        total,
                        selectedShippingArea,
                        selectedPayment,
                    },
                    { forceRefetch: true }
                )
            )
                .unwrap()
                .then((res: any) => {
                    const autoCouponValidation = res?.data || {};
                    if (res?.status) {
                        const result = setDiscount(
                            autoCouponValidation,
                            total,
                            shippingArea
                        );
                        setCouponDis(result);
                    }
                })
                .catch((couponAutoValidationError: any) => {
                    const { status } = couponAutoValidationError || {};
                    if (status == 404) {
                        setCouponDis(0);
                    }
                });
        }
    }, [
        setCouponDis,
        dispatch,
        store_id,
        total,
        shippingArea,
        selectedShippingArea,
        selectedPayment,
    ]);

    // get coupon status
    useEffect(() => {
        const isCoupon = couponData?.status || false;
        if (couponSuccess) {
            setCouponAvailable(isCoupon);
        }
    }, [couponData, couponSuccess]);

    return (
        <div
            className={`${
                design?.template_id === '34'
                    ? 'bg-thirty-one border border-white'
                    : 'bg-white'
            }  shadow sm:rounded-md sm:overflow-hidden my-5`}
        >
            <div className="px-4 py-5 space-y-6 sm:p-6">
                <div
                    className={
                        select
                            ? 'grid sm:flex flex-wrap justify-between items-center grid-cols-6 gap-6'
                            : shippingColOne
                              ? 'grid grid-cols-1 gap-6'
                              : 'grid grid-cols-6 gap-6 items-center'
                    }
                >
                    {!shippingOff && (
                        <div className="col-span-6 xl:col-span-3">
                            <div className="flex flex-col gap-4 items-start">
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
                    )}

                    {select && (
                        <div className="col-span-6 sm:col-span-3">
                            <div className="flex justify-between gap-4 items-center pb-3">
                                <label
                                    htmlFor="shippingArea"
                                    className="block text-xl font-semibold text-gray-700"
                                >
                                    Shipping Area
                                </label>
                                <div>
                                    <select
                                        id="shippingArea"
                                        name="shippingArea"
                                        onChange={(e: any) =>
                                            handleShippingSelectChange(e)
                                        }
                                        value={selectedShippingArea || ''}
                                        className="mt-1 block sm:w-full w-36 py-2 font-semibold border capitalize border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    >
                                        <option value={'0'}>
                                            --Select Area--
                                        </option>
                                        {headersetting?.shipping_area_1 && (
                                            <option value={'1'}>
                                                {headersetting?.shipping_area_1}
                                            </option>
                                        )}
                                        {headersetting?.shipping_area_2 && (
                                            <option value={'2'}>
                                                {headersetting?.shipping_area_2}
                                            </option>
                                        )}
                                        {headersetting?.shipping_area_3 && (
                                            <option value={'3'}>
                                                {headersetting?.shipping_area_3}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="col-span-6 xl:col-span-3">
                        {store_id !== 3601 &&
                            store_id !== 3904 &&
                            store_id !== 4633 &&
                            store_id !== 5519 &&
                            store_id !== 6357 &&
                            store_id !== 6433 &&
                            couponAvailable && (
                                <div className="">
                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                        <label
                                            htmlFor="name"
                                            className="block text-xl font-semibold text-gray-700"
                                        >
                                            {bn ? 'কুপন কোড' : 'Discount'}
                                        </label>
                                        <form
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="flex gap-2 flex-wrap justify-start "
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
                                                    value={
                                                        design?.checkout_page ===
                                                        TWENTY_EIGHT
                                                            ? 'অ্যাপ্লাই'
                                                            : 'Apply'
                                                    }
                                                    style={{
                                                        backgroundColor:
                                                            design?.header_color,
                                                        color: design?.text_color,
                                                    }}
                                                    className={`px-4 py-2 font-semibold rounded-sm lg:cursor-pointer h-auto ${btnhover}`}
                                                />
                                            )}
                                        </form>
                                    </div>
                                    {errors.code && (
                                        <span className="pt-3 text-red-500">
                                            Field is empty
                                        </span>
                                    )}
                                </div>
                            )}
                        {store_id === 5377 && (
                            <div className="px-4 pb-10 space-y-2">
                                <p className="text-red-600 text-sm font-bold">
                                    <FaRegArrowAltCircleRight className="inline mr-1 text-xl" />{' '}
                                    এডভান্স পেমেন্ট আবশ্যক (ফেক অর্ডার প্রতিরোধ
                                    করতে) আমাদের গ্যাজেট আইটেম গুলো অর্ডারের
                                    ক্ষেত্রে আংশিক পেমেন্ট করতে হয়। Cash On
                                    Delivery (COD) এর ক্ষেত্রে অবশ্যই প্রতি
                                    অর্ডারে ২০০৳ - ১০০০৳ টাকা প্রদান করতে হয়।
                                    যদি চান ফুল পেমেন্ট ও করতে পারবেন।
                                </p>
                                <p className="text-red-600 text-sm font-bold">
                                    <FaRegArrowAltCircleRight className="inline mr-1 text-xl" />{' '}
                                    আপনার প্রদানকৃত এডভান্স টাকা টোটাল বিল থেকে
                                    মাইনাস করা হবে। বাকি টাকা ডেলিভারি ম্যানকে
                                    দিয়ে পন্য বুঝে নিবেন।
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discount;

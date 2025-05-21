'use client';

import { TWENTY_EIGHT } from '@/consts';
import { RootState } from '@/redux/store';
import { btnhover } from '@/site-settings/style';
import { RotatingLines } from 'react-loader-spinner';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { useAppSelector } from '@/redux/features/rtkHooks/rtkHooks';
import useDiscountCalculation from '@/hooks/discount/useDiscountCalculation';
import { numberParser } from '@/helpers/numberParser';

const Discount = ({
    design,
    headersetting,
    shippingColOne,
    shippingOff,
    select,
    bn,
}: any) => {
    const store_id = numberParser(headersetting?.store_id) || null;

    const {
        shippingMethods,
        couponAvailable,
        loading,
        handleShippingChange,
        handleShippingSelectChange,
        register,
        handleSubmit,
        onSubmit,
        errors
    } = useDiscountCalculation({ headersetting });

    const { selectedShippingArea } = useAppSelector(
        (state: RootState) => state.shippingAreaFilter
    );

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
                                    {bn ? 'শিপিং এরিয়া' : 'Shipping Area'}
                                </label>
                                <div className="flex flex-col gap-2">
                                    {/* Radio button for Shipping Area 1 */}
                                    {Array.isArray(shippingMethods) &&
                                        shippingMethods?.length > 0 &&
                                        shippingMethods?.map((item: any) => (
                                            <div
                                                className="flex items-center"
                                                key={item.id}
                                            >
                                                <input
                                                    type="radio"
                                                    name="shippingArea"
                                                    value={item.cost}
                                                    checked={
                                                        selectedShippingArea ===
                                                        item.id
                                                    }
                                                    onChange={() =>
                                                        handleShippingChange(
                                                            item
                                                        )
                                                    }
                                                    className="mr-2"
                                                />
                                                <label
                                                    htmlFor="shippingArea1"
                                                    className="text-lg font-semibold"
                                                >
                                                    {item.area}
                                                </label>
                                            </div>
                                        ))}
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
                                    {bn ? 'শিপিং এরিয়া' : 'Shipping Area'}
                                </label>
                                <div>
                                    <select
                                        id="shippingArea"
                                        name="shippingArea"
                                        onChange={(e: any) =>
                                            handleShippingSelectChange(e)
                                        }
                                        value={selectedShippingArea ?? 0}
                                        className="mt-1 block sm:w-full w-36 py-2 font-semibold border capitalize border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                    >
                                        <option value={0}>
                                            --Select Area--
                                        </option>
                                        {Array.isArray(shippingMethods) &&
                                            shippingMethods?.length > 0 &&
                                            shippingMethods?.map(
                                                (item: any) => (
                                                    <option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.area}
                                                    </option>
                                                )
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

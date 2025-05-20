'use client';

import { RootState } from '@/redux/store';
import { btnhover } from '@/site-settings/style';
import { RotatingLines } from 'react-loader-spinner';
import { useAppSelector } from '@/redux/features/rtkHooks/rtkHooks';
import useDiscountCalculation from '@/hooks/discount/useDiscountCalculation';
import { numberParser } from '@/helpers/numberParser';

const DiscountSeven = ({
    design,
    headersetting,
    bookingStatus,
    className,
}: any) => {
    const store_id = numberParser(headersetting?.store_id) || null;

    const {
        shippingMethods,
        couponAvailable,
        loading,
        handleShippingSelectChange,
        register,
        handleSubmit,
        onSubmit,
        errors,
    } = useDiscountCalculation({ headersetting });

    const { selectedShippingArea } = useAppSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    return (
        <div
            className={
                className
                    ? className
                    : 'grid sm:flex flex-wrap justify-between items-center grid-cols-6 gap-6'
            }
        >
            {!bookingStatus && (
                <div className="col-span-6 sm:col-span-3">
                    <div className="flex justify-between gap-4 items-center pb-3">
                        <label
                            htmlFor="name"
                            className="block sm:text-xl text-base font-semibold text-gray-700"
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
                                value={selectedShippingArea ?? 0}
                                className="mt-1 block sm:w-full w-36 py-2 font-semibold border capitalize border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                                <option value={0}>--Select Area--</option>
                                {Array.isArray(shippingMethods) &&
                                    shippingMethods?.length > 0 &&
                                    shippingMethods?.map((item: any) => (
                                        <option value={item.id} key={item.id}>
                                            {item.area}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {store_id !== 3601 && store_id !== 3904 && couponAvailable && (
                <div className="">
                    <div className="flex sm:flex-row flex-col gap-4 justify-between items-start sm:items-center pb-3 ">
                        <label
                            htmlFor="name"
                            className="block sm:text-xl font-semibold text-gray-700 pb-2 sm:pb-0"
                        >
                            {'Discount'}
                        </label>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex items-start gap-y-2"
                        >
                            <div className="flex flex-col justify-center">
                                <input
                                    {...register('coupon_code', {
                                        required: true,
                                    })}
                                    type={'text'}
                                    className="border border-gray-400 py-2 px-2 rounded-sm w-full"
                                />
                            </div>
                            {loading ? (
                                <div
                                    style={{
                                        backgroundColor: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                    className={`px-4 py-2 ml-2 font-semibold rounded-sm lg:cursor-pointer text-lg ${btnhover}`}
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
                                        backgroundColor: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                    className={`px-4 py-2 ml-2 font-semibold rounded-sm lg:cursor-pointer text-lg ${btnhover}`}
                                />
                            )}
                        </form>
                    </div>
                    {errors.code && (
                        <span className="text-red-500">Field is empty</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default DiscountSeven;

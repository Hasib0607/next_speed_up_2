'use client';

import { RootState } from '@/redux/store';
import { btnhover } from '@/site-settings/style';
import { RotatingLines } from 'react-loader-spinner';
import BDT from '@/utils/bdt';
import useDiscountCalculation from '@/hooks/discount/useDiscountCalculation';
import { useAppSelector } from '@/redux/features/rtkHooks/rtkHooks';

const DiscountFortyThree = ({
    design,
    headersetting,
    shippingColOne,
    shippingOff,
    select,
}: any) => {
    const {
        shippingMethods,
        couponAvailable,
        loading,
        handleShippingChange,
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
                select
                    ? 'grid sm:flex flex-wrap justify-between items-center grid-cols-6 gap-6'
                    : shippingColOne
                      ? 'grid grid-cols-1 gap-6'
                      : 'grid grid-cols-6 gap-6 items-center'
            }
        >
            <div className="col-span-6">
                {!shippingOff && (
                    <div className="col-span-6 xl:col-span-3">
                        <div className="flex flex-col gap-4 items-start">
                            <label
                                htmlFor="shippingArea"
                                className="block text-xl font-semibold text-gray-700"
                            >
                                Shipping Area
                            </label>
                            <div className="w-full flex flex-col gap-2">
                                {/* Buttons for Shipping Area  */}
                                {Array.isArray(shippingMethods) &&
                                    shippingMethods?.length > 0 &&
                                    shippingMethods?.map((item: any) => (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleShippingChange(item)
                                            }
                                            className={`w-full flex items-center justify-between px-4 py-2 font-semibold border rounded-lg transition-colors ${
                                                selectedShippingArea === item.id
                                                    ? 'bg-[var(--header-color)] border-[var(--header-color)]'
                                                    : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                            key={item.id}
                                        >
                                            <span>{item.area}</span>
                                            <span className="block font-semibold mt-1">
                                                <BDT />
                                                {item.cost}
                                            </span>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {couponAvailable && (
                    <div className="mt-6">
                        <div className="flex flex-wrap justify-between items-center gap-4">
                            <label
                                htmlFor="name"
                                className="block text-xl font-semibold text-gray-700"
                            >
                                {'Discount'}
                            </label>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex gap-2 flex-wrap justify-start "
                            >
                                <div className="flex flex-col justify-center">
                                    <input
                                        {...register('coupon_code', {
                                            required: true,
                                        })}
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
            </div>
        </div>
    );
};

export default DiscountFortyThree;

'use client';

import { classNames } from '@/helpers/littleSpicy';
import useDiscountCalculation from '@/hooks/discount/useDiscountCalculation';
import { btnhover } from '@/site-settings/style';
import { RotatingLines } from 'react-loader-spinner';

const DiscountFortyFour = ({ headersetting, className }: any) => {
    const {
        couponAvailable,
        loading,
        register,
        handleSubmit,
        onSubmit,
        errors,
    } = useDiscountCalculation({ headersetting });

    return (
        <div className={className ? className : 'flex flex-wrap justify-start'}>
            {couponAvailable && (
                <div className="">
                    <div className="flex flex-col gap-4 w-full">
                        <p className="block text-sm font-semibold text-gray-900 pb-2 sm:pb-0">
                            {'Got any Coupon Code?'}
                        </p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex gap-2"
                        >
                            <div className="flex justify-center w-80">
                                <input
                                    {...register('coupon_code', {
                                        required: true,
                                    })}
                                    type={'text'}
                                    className="border border-gray-400 py-2 px-2 rounded w-full"
                                />
                            </div>
                            <div
                                className={classNames(
                                    'center px-4 py-2 w-48 font-normal rounded text-[var(--text-color)] bg-[var(--header-color)] lg:cursor-pointer text-base',
                                    `${btnhover}`
                                )}
                            >
                                {loading ? (
                                    <RotatingLines
                                        width="20"
                                        strokeColor="#6495ED"
                                        strokeWidth="6"
                                    />
                                ) : (
                                    <input
                                        type={'submit'}
                                        value={'Add Coupon'}
                                    />
                                )}
                            </div>
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

export default DiscountFortyFour;

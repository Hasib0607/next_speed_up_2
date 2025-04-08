'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import nagadLogo from '@/assets/paymentMethodLogo/nagad-logo.png';
import paypalLogo from '@/assets/paymentMethodLogo/nagad-logo.png';
import stripeLogo from '@/assets/paymentMethodLogo/nagad-logo.png';
import { classNames } from '@/helpers/littleSpicy';
import { setSelectPayment } from '@/redux/features/filters/paymentFilterSlice';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import { useEffect } from 'react';

const PaymentGatewayFortyThree = ({
    design,
    appStore,
    headersetting,
    className,
    btnStyleClass,
}: any) => {
    const store_id = appStore?.id || null;
    const module_id = 106;

    const dispatch: AppDispatch = useAppDispatch();

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });

    const activeModule = moduleIdDetailsData?.status || false;

    const selectedPayment = useAppSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );

    const handleSelect = (e: string) => {
        dispatch(setSelectPayment(e));
    };

    useEffect(() => {
        if (headersetting?.cod === 'active') {
            dispatch(setSelectPayment('cod'));
        }
    }, [headersetting, dispatch]);

    const btnStyle =
        btnStyleClass ??
        'p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300';

    return (
        <div
            className={
                className ? className : 'col-span-6 sm:col-span-4 ml-2 md:ml-5'
            }
        >
            <div className="flex justify-between items-center pb-3">
                {
                    <label
                        htmlFor="email-address"
                        className="block text-xl font-semibold text-gray-700"
                    >
                        Payment{' '}
                        {!selectedPayment && (
                            <span className="text-sm text-red-500">
                                ( Please Select Your Payment Method ) *
                            </span>
                        )}
                    </label>
                }
            </div>

            <div className="flex gap-2 flex-wrap">
                {headersetting?.paypal === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'paypal'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('paypal')}
                    >
                        <div className="flex justify-center items-center w-auto min-w-20">
                            <div className="flex gap-2 w-auto">
                                {headersetting?.paypal_text ===
                                'paypal Payment Img' ? (
                                    <Image
                                        src={paypalLogo.src}
                                        className="h-6 md:h-8 object-cover"
                                        alt="paypalLogo"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <p className="font-semibold tracking-wider">
                                        {headersetting?.paypal_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {headersetting?.stripe === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'stripe'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('stripe')}
                    >
                        <div className="flex justify-center items-center w-auto min-w-20">
                            <div className="flex gap-2 w-auto">
                                {headersetting?.stripe_text ===
                                'stripe Payment Img' ? (
                                    <Image
                                        src={stripeLogo.src}
                                        className="h-6 md:h-8 object-cover"
                                        alt="stripeLogo"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <p className="font-semibold tracking-wider">
                                        {headersetting?.stripe_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {headersetting?.merchant_bkash === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'merchant_bkash'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('merchant_bkash')}
                    >
                        <div className="flex justify-center items-center w-auto min-w-20">
                            <div className="flex gap-2 w-auto">
                                {headersetting?.merchant_bkash_text ===
                                'bKash Payment Img' ? (
                                    <Image
                                        src={bkashLogo.src}
                                        className="h-6 md:h-8 object-cover"
                                        alt="bkashLogo"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <p className="font-semibold tracking-wider">
                                        {headersetting?.merchant_bkash_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {headersetting?.merchant_nagad === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'merchant_nagad'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('merchant_nagad')}
                    >
                        <div className="flex justify-center items-center w-auto min-w-20">
                            <div className="flex gap-2 w-auto">
                                {headersetting?.merchant_nagad_text ===
                                'nagad Payment Img' ? (
                                    <Image
                                        src={nagadLogo.src}
                                        className="h-6 md:h-8 object-cover"
                                        alt="nagadLogo"
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <p className="font-semibold tracking-wider">
                                        {headersetting?.merchant_nagad_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {headersetting?.uddoktapay === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'uddoktapay'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('uddoktapay')}
                    >
                        <p className="font-semibold tracking-wider">
                            {headersetting?.uddoktapay_text}
                        </p>
                    </div>
                )}

                {headersetting?.amarpay === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'amarpay'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('amarpay')}
                    >
                        <p className="font-semibold tracking-wider">
                            {headersetting?.amarpay_text}
                        </p>
                    </div>
                )}

                {headersetting?.online === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'online'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('online')}
                    >
                        <p className="font-semibold tracking-wider">
                            SSL Commerz
                        </p>
                    </div>
                )}

                {headersetting?.bkash === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'bkash'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('bkash')}
                    >
                        <div className="flex justify-center items-center w-auto min-w-20">
                            <div className="flex gap-2 w-auto">
                                {headersetting?.bkash_text ===
                                'bKash Payment Img' ? (
                                    <img
                                        src={bkashLogo.src}
                                        className="h-6 md:h-8"
                                        alt="bkashLogo"
                                    />
                                ) : (
                                    <p className="font-semibold tracking-wider">
                                        {headersetting?.bkash_text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {headersetting?.cod === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'cod'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('cod')}
                    >
                        <p className="font-semibold tracking-wider">
                            {headersetting?.cod_text}
                        </p>
                    </div>
                )}

                {activeModule && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'ap'
                                ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                : `bg-[#fff] text-[#000]`
                        )}
                        onClick={() => handleSelect('ap')}
                    >
                        <div className="flex justify-between items-center lg:cursor-pointer">
                            <h3 className="font-semibold tracking-wider">
                                {headersetting?.ap_text}
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentGatewayFortyThree;

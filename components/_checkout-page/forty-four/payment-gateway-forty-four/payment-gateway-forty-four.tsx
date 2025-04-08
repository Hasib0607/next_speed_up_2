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

const PaymentGatewayFortyFour = ({
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
        'p-5 center rounded min-w-max transition-all lg:cursor-pointer border border-gray-300 font-semibold tracking-wider shadow-md ring-0 hover:ring-1 ring-inset ring-green-500 delay-75';

    return (
        <div className={className ? className : 'col-span-6 sm:col-span-4'}>
            <div className="flex justify-between items-center mb-5">
                <p className="block text-sm font-semibold text-gray-700">
                    Payment Options{' '}
                </p>
            </div>

            <div className="flex gap-2 flex-wrap">
                {headersetting?.paypal === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'paypal'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('paypal')}
                    >
                        {headersetting?.paypal_text === 'paypal Payment Img' ? (
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
                )}

                {headersetting?.stripe === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'stripe'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('stripe')}
                    >
                        {headersetting?.stripe_text === 'stripe Payment Img' ? (
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
                )}
                {headersetting?.merchant_bkash === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'merchant_bkash'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('merchant_bkash')}
                    >
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
                            <p>{headersetting?.merchant_bkash_text}</p>
                        )}
                    </div>
                )}
                {headersetting?.merchant_nagad === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'merchant_nagad'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('merchant_nagad')}
                    >
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
                            <p>{headersetting?.merchant_nagad_text}</p>
                        )}
                    </div>
                )}
                {headersetting?.uddoktapay === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'uddoktapay'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('uddoktapay')}
                    >
                        {headersetting?.uddoktapay_text ===
                        'bKash Payment Img' ? (
                            <img
                                src={bkashLogo.src}
                                className="h-6 md:h-8"
                                alt="bkashLogo"
                            />
                        ) : (
                            <p>{headersetting?.uddoktapay_text}</p>
                        )}
                    </div>
                )}

                {headersetting?.amarpay === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'amarpay'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('amarpay')}
                    >
                        {headersetting?.amarpay_text === 'bKash Payment Img' ? (
                            <img
                                src={bkashLogo.src}
                                className="h-6 md:h-8"
                                alt="bkashLogo"
                            />
                        ) : (
                            <p>{headersetting?.amarpay_text}</p>
                        )}
                    </div>
                )}

                {headersetting?.online === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'online'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('online')}
                    >
                        {headersetting?.ssl_text === 'bKash Payment Img' ? (
                            <img
                                src={bkashLogo.src}
                                className="h-6 md:h-8"
                                alt="bkashLogo"
                            />
                        ) : (
                            <p>SSL Commerz</p>
                        )}
                    </div>
                )}

                {headersetting?.bkash === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            'w-36',
                            selectedPayment === 'bkash'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('bkash')}
                    >
                        {headersetting?.bkash_text === 'bKash Payment Img' ? (
                            <img
                                src={bkashLogo.src}
                                className="h-6 md:h-8"
                                alt="bkashLogo"
                            />
                        ) : (
                            <p>{headersetting?.bkash_text}</p>
                        )}
                    </div>
                )}

                {headersetting?.cod === 'active' && (
                    <div
                        className={classNames(
                            btnStyle,
                            'w-36',
                            selectedPayment === 'cod'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('cod')}
                    >
                        {headersetting?.cod_text === 'bKash Payment Img' ? (
                            <img
                                src={bkashLogo.src}
                                className="h-6 md:h-8"
                                alt="bkashLogo"
                            />
                        ) : (
                            <p>{headersetting?.cod_text}</p>
                        )}
                    </div>
                )}

                {activeModule && (
                    <div
                        className={classNames(
                            btnStyle,
                            selectedPayment === 'ap'
                                ? `bg-[var(--header-color)] text-[var(--text-color)] hover:ring-0`
                                : `inset-1 text-[#000]`
                        )}
                        onClick={() => handleSelect('ap')}
                    >
                        <div className="flex justify-between items-center lg:cursor-pointer">
                            <p>{headersetting?.ap_text}</p>
                        </div>
                    </div>
                )}
            </div>
            {headersetting?.custom_writing && (
                <em>
                    <p className="mt-2 text-sm">
                        <span className="font-semibold">Note: </span>{' '}
                        {headersetting?.custom_writing}
                    </p>
                </em>
            )}
        </div>
    );
};

export default PaymentGatewayFortyFour;

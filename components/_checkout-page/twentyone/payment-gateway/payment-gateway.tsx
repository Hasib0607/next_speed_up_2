'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import { TWENTY_EIGHT } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';

import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { customizeCheckout } from '@/utils/customizeDesign';

const PaymentGateway = ({
    design,
    appStore,
    headersetting,
    selectPayment,
    setSelectPayment,
}: any) => {
    const store_id = appStore?.id || null;
    const module_id = 106;

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    const checkoutData = customizeCheckout.find((item) => item.id == store_id);

    const handleSelect = (e: string) => {
        setSelectPayment(e);
    };

    const btnStyle =
        'py-2 px-5 rounded-full space-y-2 w-full sm:w-max transition-colors duration-300 relative flex justify-center items-center border border-gray-300 lg:cursor-pointer';

    return (
        <>
            <div className="col-span-6 sm:col-span-4">
                <div className="flex justify-between items-center pb-3">
                    {design?.checkout_page === TWENTY_EIGHT ||
                    design?.template_id === '29' ? (
                        <label
                            htmlFor="payment-gateway"
                            className="block text-md md:text-xl font-semibold text-gray-700"
                        >
                            পেমেন্ট{' '}
                            <span className="text-xs md:text-sm">
                                (আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন)
                            </span>
                        </label>
                    ) : (
                        <label
                            htmlFor="payment-gateway"
                            className="block text-md md:text-xl font-semibold text-gray-700"
                        >
                            Payment{' '}
                            <span className="text-xs md:text-sm">
                                (Please Select Your Payment Method.)
                            </span>
                        </label>
                    )}
                </div>
                <div className="flex gap-2 flex-wrap">
                    {headersetting?.uddoktapay === 'active' && (
                        <div
                            className={classNames(
                                btnStyle,
                                selectPayment === 'uddoktapay'
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
                                selectPayment === 'amarpay'
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
                                selectPayment === 'online'
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
                                selectPayment === 'bkash'
                                    ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                    : `bg-[#fff] text-[#000]`
                            )}
                            onClick={() => handleSelect('bkash')}
                        >
                            <div className="flex justify-center items-center w-auto min-w-20">
                                {checkoutData?.full_payment ? (
                                    checkoutData?.full_payment
                                ) : (
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
                                )}
                            </div>
                        </div>
                    )}

                    {headersetting?.cod === 'active' && (
                        <div
                            className={classNames(
                                btnStyle,
                                selectPayment === 'cod'
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
                                selectPayment === 'ap'
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
        </>
    );
};

export default PaymentGateway;

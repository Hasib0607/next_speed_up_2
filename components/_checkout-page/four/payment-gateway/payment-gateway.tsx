'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import { TWENTY_EIGHT } from '@/consts';

import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { customizeCheckout } from '@/utils/customizeDesign';
import { useSelector } from 'react-redux';

const PaymentGateway = ({ selectPayment, setSelectPayment }: any) => {
    const module_id = 106;

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const home = useSelector((state: any) => state?.home);
    const { design, headersetting } = home || {};

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

    return (
        <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="col-span-6 sm:col-span-4">
                    <div className="flex justify-between items-center pb-3">
                        <label
                            htmlFor="email-address"
                            className="block text-xl font-semibold text-gray-700"
                        >
                            Payment{' '}
                            <span className="text-sm">
                                ( Please Select Your Payment Method )
                            </span>
                        </label>
                    </div>
                    {store_id === 3274 && (
                        <div className="mb-2 text-sm text-red-500">
                            <h1>
                                অর্ডার কনফার্ম করতে ডেলিভারি চার্জ বিকাশে সেন্ড
                                মানি করুন। রেফেরেন্সে আপনার অর্ডার নাম্বারটি
                                দিন।{' '}
                            </h1>
                            <p>
                                বিকাশ :{' '}
                                <span className="font-bold">01867255123</span>{' '}
                                (personal).
                            </p>
                        </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                        {headersetting?.amarpay === 'active' && (
                            <div
                                style={{
                                    backgroundColor:
                                        selectPayment === 'amarpay'
                                            ? design?.header_color
                                            : '#fff',
                                    color:
                                        selectPayment === 'amarpay'
                                            ? design?.text_color
                                            : '#000',
                                }}
                                className="p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300"
                                onClick={() => handleSelect('amarpay')}
                            >
                                <p className="font-semibold tracking-wider">
                                    {headersetting?.amarpay_text}
                                </p>
                            </div>
                        )}

                        {headersetting?.online === 'active' && (
                            <div
                                style={{
                                    backgroundColor:
                                        selectPayment === 'online'
                                            ? design?.header_color
                                            : '#fff',
                                    color:
                                        selectPayment === 'online'
                                            ? design?.text_color
                                            : '#000',
                                }}
                                className="p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300"
                                onClick={() => handleSelect('online')}
                            >
                                <p className="font-semibold tracking-wider">
                                    SSL Commerz
                                </p>
                            </div>
                        )}

                        {headersetting?.bkash === 'active' && (
                            <div
                                style={{
                                    backgroundColor:
                                        selectPayment === 'bkash'
                                            ? design?.header_color
                                            : '#fff',
                                    color:
                                        selectPayment === 'bkash'
                                            ? design?.text_color
                                            : '#000',
                                }}
                                className="p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300"
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
                                style={{
                                    backgroundColor:
                                        selectPayment === 'cod'
                                            ? design?.header_color
                                            : '#fff',
                                    color:
                                        selectPayment === 'cod'
                                            ? design?.text_color
                                            : '#000',
                                }}
                                className="p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300"
                                onClick={() => handleSelect('cod')}
                            >
                                <p className="font-semibold tracking-wider">
                                    {design?.template_id === '29'
                                        ? 'ক্যাশ অন ডেলিভারি'
                                        : headersetting?.cod_text}
                                </p>
                            </div>
                        )}

                        {activeModule && (
                            <div
                                style={{
                                    backgroundColor:
                                        selectPayment === 'ap'
                                            ? design?.header_color
                                            : '#fff',
                                    color:
                                        selectPayment === 'ap'
                                            ? design?.text_color
                                            : '#000',
                                }}
                                className="p-5 rounded w-max transition-colors duration-300 lg:cursor-pointer flex justify-between border border-gray-300"
                                onClick={() => handleSelect('ap')}
                            >
                                <div className="flex justify-between items-center lg:cursor-pointer">
                                    <h3 className="font-semibold tracking-wider">
                                        {design?.checkout_page ===
                                            TWENTY_EIGHT ||
                                        design?.template_id === '29'
                                            ? 'অ্যাডভান্স পেমেন্ট'
                                            : `${
                                                  checkoutData?.partial_payment
                                                      ? checkoutData?.partial_payment
                                                      : 'Advance Payment'
                                              }`}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;

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
        <>
            <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="col-span-6 sm:col-span-4">
                        <div className="flex flex-col gap-2 justify-between pb-3">
                            <label
                                htmlFor="email-address"
                                className="block text-xl font-semibold text-gray-700"
                            >
                                Payment{' '}
                                <span className="text-sm">
                                    ( Please Select Your Payment Method )
                                </span>
                            </label>
                            {store_id === 4736 && (
                                <label
                                    htmlFor="email-address"
                                    className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                                >
                                    ১৫০ টাকা এডভ্যান্স পেমেন্ট করতে এই বক্স এ
                                    ক্লিক করুন
                                </label>
                            )}
                            {store_id === 4812 && (
                                <label
                                    htmlFor="email-address"
                                    className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                                >
                                    ২০০ টাকা অগ্ৰীম পেমেন্ট অথবা সম্পূর্ণ
                                    পেমেন্ট করে আপনার অর্ডারটি নিশ্চিত করুন।
                                </label>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
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
                            className="p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300"
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
                            className="p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300"
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
                            className="p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300"
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
                            className="p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300"
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
                            className="p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300"
                            onClick={() => handleSelect('ap')}
                        >
                            <div className="flex justify-between items-center lg:cursor-pointer">
                                <h3 className="font-semibold tracking-wider">
                                    {design?.checkout_page === TWENTY_EIGHT ||
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
        </>
    );
};

export default PaymentGateway;

'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';

import { FaTruck } from 'react-icons/fa';
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

    const handleSelect = (e: any) => {
        setSelectPayment(e.target.value);
    };

    return (
        <>
            <div className="mt-5">
                <div className="col-span-6 sm:col-span-4">
                    <div className="flex justify-between items-center py-3">
                        <label className="block text-xl font-semibold text-gray-700">
                            পেমেন্ট
                            <span className="text-sm">
                                (আপনার পেমেন্ট পদ্ধতি নির্বাচন করুন)
                            </span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        {headersetting?.online === 'active' && (
                            <label
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
                                className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="online"
                                    checked={selectPayment === 'online'}
                                    onChange={handleSelect}
                                    className="mr-2"
                                />
                                SSL Commerz
                            </label>
                        )}

                        {headersetting?.bkash === 'active' && (
                            <label
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
                                className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="bkash"
                                    checked={selectPayment === 'bkash'}
                                    onChange={handleSelect}
                                    className="mr-2"
                                />
                                {headersetting?.bkash_text || (
                                    <img
                                        src={bkashLogo.src}
                                        className="h-8 mr-2"
                                        alt="bkashLogo"
                                    />
                                )}
                            </label>
                        )}

                        {headersetting?.cod === 'active' && (
                            <div className="flex flex-col items-start">
                                <label
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
                                    className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
                                >
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value="cod"
                                        checked={selectPayment === 'cod'}
                                        onChange={handleSelect}
                                        className="mr-2"
                                    />
                                    {headersetting?.cod_text ||
                                        'Cash On Delivery'}
                                    <FaTruck className="ml-2" />
                                </label>
                                {selectPayment === 'cod' && (
                                    <p className="text-sm text-gray-600 my-3 ml-8">
                                        পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ
                                        করতে হবে।
                                    </p>
                                )}
                            </div>
                        )}

                        {activeModule && (
                            <label
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
                                className="py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="ap"
                                    checked={selectPayment === 'ap'}
                                    onChange={handleSelect}
                                    className="mr-2"
                                />
                                {headersetting?.ap_text || 'Advance Payment'}
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentGateway;

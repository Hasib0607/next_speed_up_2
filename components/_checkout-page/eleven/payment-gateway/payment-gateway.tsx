'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import { classNames } from '@/helpers/littleSpicy';
import { setSelectPayment } from '@/redux/features/filters/paymentFilterSlice';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const PaymentGateway = ({
    design,
    appStore,
    headersetting
}: any) => {
    const store_id = appStore?.id || null;
    const module_id = 106;

    const dispatch:AppDispatch = useAppDispatch();

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    const selectedPayment = useSelector((state:RootState) => state.paymentFilter.paymentMethod)

    const handleSelect = (e: string) => {
        dispatch(setSelectPayment(e));
    };

    const btnStyle =
        'p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300 cursor-pointer';

    return (
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
                                ১৫০ টাকা এডভ্যান্স পেমেন্ট করতে এই বক্স এ ক্লিক
                                করুন
                            </label>
                        )}

                        {store_id === 4812 && (
                            <label
                                htmlFor="email-address"
                                className="block text-sm bg-black text-white font-semibold p-2 rounded-md"
                            >
                                ২০০ টাকা অগ্ৰীম পেমেন্ট অথবা সম্পূর্ণ পেমেন্ট
                                করে আপনার অর্ডারটি নিশ্চিত করুন।
                            </label>
                        )}
                    </div>

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
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
                                    {design?.template_id === '29'
                                        ? 'ক্যাশ অন ডেলিভারি'
                                        : headersetting?.cod_text}
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
            </div>
        </div>
    );
};

export default PaymentGateway;

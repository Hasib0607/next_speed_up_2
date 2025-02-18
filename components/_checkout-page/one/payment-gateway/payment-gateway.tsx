'use client';

import bkashLogo from '@/assets/paymentMethodLogo/bkashLogo.png';
import { classNames } from '@/helpers/littleSpicy';
import { setSelectPayment } from '@/redux/features/filters/paymentFilterSlice';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import { FaTruck } from 'react-icons/fa';

const PaymentGateway = ({ design, appStore, headersetting }: any) => {
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

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = e.target.value as string;
        dispatch(setSelectPayment(selectedValue));
    };

    const btnStyle =
        'py-2 px-5 rounded-lg w-full transition-colors duration-300 flex items-center cursor-pointer hover:bg-gray-100';

    return (
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
                    {headersetting?.uddoktapay === 'active' && (
                        <label
                            className={classNames(
                                btnStyle,
                                selectedPayment === 'uddoktapay'
                                    ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                    : `bg-[#fff] text-[#000]`
                            )}
                        >
                            <input
                                type="radio"
                                name="payment_method"
                                value="uddoktapay"
                                checked={selectedPayment === 'uddoktapay'}
                                onChange={handleSelect}
                                className="mr-2"
                            />
                            {headersetting?.uddoktapay_text}
                        </label>
                    )}

                    {headersetting?.online === 'active' && (
                        <label
                            className={classNames(
                                btnStyle,
                                selectedPayment === 'online'
                                    ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                    : `bg-[#fff] text-[#000]`
                            )}
                        >
                            <input
                                type="radio"
                                name="payment_method"
                                value="online"
                                checked={selectedPayment === 'online'}
                                onChange={handleSelect}
                                className="mr-2"
                            />
                            SSL Commerz
                        </label>
                    )}

                    {headersetting?.bkash === 'active' && (
                        <label
                            className={classNames(
                                btnStyle,
                                selectedPayment === 'bkash'
                                    ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                    : `bg-[#fff] text-[#000]`
                            )}
                        >
                            <input
                                type="radio"
                                name="payment_method"
                                value="bkash"
                                checked={selectedPayment === 'bkash'}
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
                                className={classNames(
                                    btnStyle,
                                    selectedPayment === 'cod'
                                        ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                        : `bg-[#fff] text-[#000]`
                                )}
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={selectedPayment === 'cod'}
                                    onChange={handleSelect}
                                    className="mr-2"
                                />
                                {headersetting?.cod_text}
                                <FaTruck className="ml-2" />
                            </label>
                            {selectedPayment === 'cod' && (
                                <p className="text-sm text-gray-600 my-3 ml-8">
                                    পণ্য হাতে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করতে
                                    হবে।
                                </p>
                            )}
                        </div>
                    )}

                    {activeModule && (
                        <label
                            className={classNames(
                                btnStyle,
                                selectedPayment === 'ap'
                                    ? `bg-[var(--header-color)] text-[var(--text-color)]`
                                    : `bg-[#fff] text-[#000]`
                            )}
                        >
                            <input
                                type="radio"
                                name="payment_method"
                                value="ap"
                                checked={selectedPayment === 'ap'}
                                onChange={handleSelect}
                                className="mr-2"
                            />
                            {headersetting?.ap_text}
                        </label>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentGateway;

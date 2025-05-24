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

const PaymentGateway = ({
  design,
  appStore,
  headersetting,
  className,
  note,
}: any) => {
  const store_id = appStore?.id || null;
  const module_id = 106;
  const dispatch: AppDispatch = useAppDispatch();

  const { data: moduleIdDetailsData } = useGetModuleStatusQuery({ store_id, module_id });
  const activeModule = moduleIdDetailsData?.status || false;

  const selectedPayment = useAppSelector(
    (state: RootState) => state.paymentFilter.paymentMethod
  );

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectPayment(e.target.value));
  };

  useEffect(() => {
    if (headersetting?.cod === 'active') {
      dispatch(setSelectPayment('cod'));
    }
  }, [headersetting, dispatch]);

  const renderOption = (
    key: string,
    isActive: boolean,
    text: string,
    img?: string
  ) => {
    if (!isActive) return null;
    const isChecked = selectedPayment === key;

    return (
      <label
        key={key}
        className={classNames(
          'flex items-center gap-2 cursor-pointer px-3 py-2 transition-all duration-150 hover:bg-gray-100')}
      >
        <input
          type="radio"
          name="paymentMethod"
          value={key}
          checked={isChecked}
          onChange={handleSelect}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        {img ? (
          <Image
            src={img}
            alt={`${key} logo`}
            width={100}
            height={40}
            className="h-6 object-contain"
          />
        ) : (
          <span className="font-medium tracking-wide">{text}</span>
        )}
      </label>
    );
  };

  return (
    <div className={className || 'col-span-6 sm:col-span-4'}>
      <div className="flex justify-between items-center pb-3">
        <label className="block uppercase mt-5 font-semibold text-gray-700">
          Payment{' '}
          {!selectedPayment && (
            <span className="text-sm text-red-500">
              ( Please Select Your Payment Method ) *
            </span>
          )}
        </label>
      </div>

      <div className="flex flex-wrap flex-col gap-3">
        {renderOption('paypal', headersetting?.paypal === 'active', headersetting?.paypal_text, headersetting?.paypal_text === 'paypal Payment Img' ? paypalLogo.src : undefined)}
        {renderOption('stripe', headersetting?.stripe === 'active', headersetting?.stripe_text, headersetting?.stripe_text === 'stripe Payment Img' ? stripeLogo.src : undefined)}
        {renderOption('merchant_bkash', headersetting?.merchant_bkash === 'active', headersetting?.merchant_bkash_text, headersetting?.merchant_bkash_text === 'bKash Payment Img' ? bkashLogo.src : undefined)}
        {renderOption('merchant_nagad', headersetting?.merchant_nagad === 'active', headersetting?.merchant_nagad_text, headersetting?.merchant_nagad_text === 'nagad Payment Img' ? nagadLogo.src : undefined)}
        {renderOption('uddoktapay', headersetting?.uddoktapay === 'active', headersetting?.uddoktapay_text)}
        {renderOption('amarpay', headersetting?.amarpay === 'active', headersetting?.amarpay_text)}
        {renderOption('online', headersetting?.online === 'active', 'SSL Commerz')}
        {renderOption('bkash', headersetting?.bkash === 'active', headersetting?.bkash_text, headersetting?.bkash_text === 'bKash Payment Img' ? bkashLogo.src : undefined)}
        {renderOption('cod', headersetting?.cod === 'active', headersetting?.cod_text)}
        {renderOption('ap', activeModule, headersetting?.ap_text)}
      </div>
    </div>
  );
};

export default PaymentGateway;

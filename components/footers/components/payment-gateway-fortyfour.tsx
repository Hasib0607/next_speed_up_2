import React from 'react';
import SSLImg from '@/assets/paymentMethodLogo/SSLCommerz-Pay-With-logo-All-Size-03.webp';
import BkashImg from '@/assets/paymentMethodLogo/bkashLogo.png';
import NagedImg from '@/assets/paymentMethodLogo/nagad-logo.png';
import AmarPayImg from '@/assets/paymentMethodLogo/amar-pay.png';
import PathaoImg from '@/assets/couriers/pathao.png';
import SteadfastImg from '@/assets/couriers/steadfast.jpg';
import { FaLock } from 'react-icons/fa6';
import { FaRegFaceSmile } from 'react-icons/fa6';
import { GrDeliver } from 'react-icons/gr';
import { useGetCourierNameQuery } from '@/redux/features/courier/courierApi';

const PaymantGatewayFortyFour = ({ headersetting, store_id }: any) => {
    const {
        isLoading: courierLoading,
        isSuccess: courierSuccess,
        isError: courierError,
        data: courierData,
    } = useGetCourierNameQuery({ store_id });

    const isAnyPaymentActive =
        headersetting?.amarpay === 'active' ||
        headersetting?.bkash === 'active' ||
        headersetting?.nagad === 'active' ||
        headersetting?.online === 'active';

    return (
        <div
            className={`flex flex-col md:flex-row gap-10 ${isAnyPaymentActive ? 'justify-between' : 'justify-center md:justify-center'}`}
        >
            {isAnyPaymentActive && (
                <div className="flex flex-wrap items-center gap-20 sm:gap-4 md:w-1/2">
                    <div className="flex flex-col items-center justify-center">
                        <FaLock />
                        <p className="text-xl font-semibold">
                            All secure payment methods
                        </p>
                    </div>
                    <div className="flex gap-5 flex-col">
                        {headersetting?.amarpay === 'active' && (
                            <img
                                src={AmarPayImg?.src}
                                alt="Amar Pay"
                                className="w-1/3 "
                            />
                        )}
                        {headersetting?.bkash === 'active' && (
                            <img
                                src={BkashImg?.src}
                                alt="Bkash"
                                className="w-12 sm:w-16"
                            />
                        )}
                        {headersetting?.nagad === 'active' && (
                            <img
                                src={NagedImg?.src}
                                alt="Nagad"
                                className="w-12 sm:w-16"
                            />
                        )}
                        {headersetting?.online === 'active' && (
                            <img
                                src={SSLImg?.src}
                                alt="SSL Payment"
                                className="mt-0 md:-mt-5"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center">
                <FaRegFaceSmile />
                <h2 className="text-xl font-semibold mb-5">
                    Satisfaction guaranteed
                </h2>
                <p className="text-[16px]">
                    Made with premium quality materials.
                </p>
                <p className="font-semibold">Cozy yet lasts the test of time</p>
            </div>
            <div className="flex flex-col items-center">
                <GrDeliver />
                <h2 className="text-xl font-semibold mb-5">Delivery</h2>
                <p className='text-[16px]'>Fast and reliable shipping options.</p>
                <div className="flex gap-4 items-center">
                    {courierSuccess &&
                        courierData?.data?.map(
                            (courier: any, index: number) => {
                                const name =
                                    courier?.courier_name?.toLowerCase();
                                if (name === 'pathao') {
                                    return (
                                        <img
                                            key={index}
                                            src={PathaoImg?.src}
                                            alt="Pathao"
                                            className="w-16 h-auto"
                                        />
                                    );
                                } else if (name === 'steadfast') {
                                    return (
                                        <img
                                            key={index}
                                            src={SteadfastImg?.src}
                                            alt="Steadfast"
                                            className="w-16 h-auto"
                                        />
                                    );
                                } else {
                                    return null;
                                }
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default PaymantGatewayFortyFour;

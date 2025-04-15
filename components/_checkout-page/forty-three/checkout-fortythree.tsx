'use client';

import { useState } from 'react';
import YourOrders from './your-orders/your-order';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import AddressFortyThree from './address-fortythree.tsx/address-fortythree';
import DiscountFortyThree from './discount-fortythree/discount-fortythree';
import useCheckoutPageEntry from '@/hooks/useCheckoutPageEntry';

const CheckOutFortyThree = ({ design, appStore, headersetting }: any) => {
    const [selectAddress, setSelectAddress] = useState(null);
    const { tax, gTotal, totalDis, isCartEmpty } =
        useCheckoutPageEntry(headersetting);

    if (isCartEmpty) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <div className="text-center">
                    <h3 className="text-gray-400 text-2xl font-bold">
                        You have no product in your cart!{' '}
                    </h3>
                    <h6 className="text-gray-400 text-xl font-semibold">
                        Please Add Some Product
                    </h6>
                </div>
            </div>
        );
    }

    const formFieldStyle =
        'peer pt-5 pb-1 w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400';

    const btnStyleClass =
        'p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300 cursor-pointer';

    return (
        <div className={`bg-white pb-8 mt-32`}>
            <div className="sm:container px-5 xl:px-24">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-14">
                    <div className="px-4 space-y-8 sm:p-6">
                        <div
                            className={`${
                                design?.template_id === '34'
                                    ? 'bg-thirty-one border border-white'
                                    : 'bg-white'
                            } sm:overflow-hidden mb-5`}
                        >
                            <AddressFortyThree
                                design={design}
                                appStore={appStore}
                                selectAddress={selectAddress}
                                setSelectAddress={setSelectAddress}
                                formFieldStyle={formFieldStyle}
                            />
                        </div>
                        <DiscountFortyThree
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                        />
                        <PaymentGateway
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            btnStyleClass={btnStyleClass}
                        />
                    </div>
                    <div className="border-l-0 md:border-l-2 pl-8">
                        <YourOrders
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            selectAddress={selectAddress}
                            gTotal={gTotal}
                            totalDis={totalDis}
                            tax={tax}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFortyThree;

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import YourOrders from './your-orders/your-order';
import { totalCampainOfferDiscount } from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import AddressFortyThree from './address-fortythree.tsx/address-fortythree';
import DiscountFortyThree from './discount-fortythree/discount-fortythree';
import PaymentGatewayFortyThree from './payment-gateway-fortythree/payment-gateway-fortythree';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';

const CheckOutFortyThree = ({ design, appStore, headersetting }: any) => {
    const dispatch: AppDispatch = useAppDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const [couponDis, setCouponDis] = useState(0);
    const [shippingArea, setShippingArea] = useState<any>(null);
    const [selectAddress, setSelectAddress] = useState(null);
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAddress, setUserAddress] = useState(null);

    const cartTotalCampainOfferDiscountAmount = useMemo(
        () => totalCampainOfferDiscount(cartList),
        [cartList]
    );

    useEffect(() => {
        if (cartTotalCampainOfferDiscountAmount > 0) {
            dispatch(
                setTotalCampainOfferDis(cartTotalCampainOfferDiscountAmount)
            );
        } else {
            dispatch(setTotalCampainOfferDis(0));
        }
    }, [cartTotalCampainOfferDiscountAmount, dispatch]);

    useEffect(() => {
        dispatch(setPurchaseList([]));
        dispatch(setGrandTotal(0));
    }, [dispatch]);

    if (cartList?.length === 0) {
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
        'w-full border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-gray-400';

    const btnStyleClass =
        'p-5 rounded space-y-2 w-full transition-colors duration-300 relative flex justify-between border border-gray-300 cursor-pointer';

    return (
        <div className={`bg-white pb-8`}>
            <div className='flex items-center justify-center py-6'>
                {headersetting?.logo === null ? (
                    <Link href="/">
                        <p className="text-xl uppercase">
                            {headersetting?.website_name}
                        </p>
                    </Link>
                ) : (
                    <Link href="/">
                        <img
                            className="h-[50px] w-auto overflow-hidden sm:mr-20"
                            src={imgUrl + headersetting?.logo}
                            alt="logo"
                        />
                    </Link>
                )}
            </div>
            <div className="sm:container px-5 xl:px-24 md:border-t-2">
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-14">
                    <div className="">
                        <div
                            className={`${
                                design?.template_id === '34'
                                    ? 'bg-thirty-one border border-white'
                                    : 'bg-white'
                            } sm:overflow-hidden mb-5`}
                        >
                            <div className="px-4 space-y-6 sm:p-6">
                                <AddressFortyThree
                                    design={design}
                                    appStore={appStore}
                                    selectAddress={selectAddress}
                                    setSelectAddress={setSelectAddress}
                                    setToken={setToken}
                                    token={token}
                                    setUserAddress={setUserAddress}
                                    userPhone={userPhone}
                                    setUserPhone={setUserPhone}
                                    formFieldStyle={formFieldStyle}
                                />
                            </div>
                        </div>
                        <DiscountFortyThree
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            setCouponDis={setCouponDis}
                            shippingArea={shippingArea}
                            setShippingArea={setShippingArea}
                        />
                        <div className="sm:rounded-md sm:overflow-hidden my-5">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <PaymentGatewayFortyThree
                                    design={design}
                                    appStore={appStore}
                                    headersetting={headersetting}
                                    btnStyleClass={btnStyleClass}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:border-l-2 md:pl-8">
                        <YourOrders
                            design={design}
                            appStore={appStore}
                            headersetting={headersetting}
                            couponDis={couponDis}
                            setCouponDis={setCouponDis}
                            selectAddress={selectAddress}
                            shippingArea={shippingArea}
                            userAddress={userAddress}
                            userPhone={userPhone}
                            userName={userName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFortyThree;

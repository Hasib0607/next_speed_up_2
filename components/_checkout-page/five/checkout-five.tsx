'use client';

import './checkoutfiveorder.css';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';

import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import Discount from '../_components/discount/discount';
import { totalCampainOfferDiscount } from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';

const CheckOutFive = ({ design, appStore, headersetting }: any) => {
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

    return (
        <div className="container">
            <div className="text-center pb-5">
                <h1 className="text-4xl font-bold">Checkout</h1>
            </div>
            <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
                <div className="CheckOutFiveBorderShadow mt-5 lg:mt-0 lg:col-span-2 p-5">
                    <div
                        className={`${
                            design?.template_id === '34'
                                ? 'bg-thirty-one border border-white'
                                : 'bg-white'
                        }  shadow sm:rounded-md sm:overflow-hidden mb-5`}
                    >
                        <div className="px-4 py-5 space-y-6 sm:p-6">
                            <Address
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
                    <Discount
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                        setCouponDis={setCouponDis}
                        shippingArea={shippingArea}
                        setShippingArea={setShippingArea}
                    />
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <PaymentGateway
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                            />
                        </div>
                    </div>
                    <PaymentConditions
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                    />
                </div>

                <div className="mt-5 lg:mt-0 lg:col-span-1">
                    <YourOrders
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                        couponDis={couponDis}
                        setCouponDis={setCouponDis}
                        selectAddress={selectAddress}
                        shippingArea={shippingArea}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckOutFive;

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import Address from '../_components/address/address';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import { totalCampainOfferDiscount } from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';

const CheckOutEleven = ({ design, appStore, headersetting }: any) => {

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
            <div className="sm:container px-5 xl:px-24">
                <div className="text-xl pt-2 font-bold text-center md:text-left ">
                    Shipping Information...
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-14">
                    <div className="">
                        <div
                            className={`${
                                design?.template_id === '34'
                                    ? 'bg-thirty-one border border-white'
                                    : 'bg-white'
                            } shadow sm:rounded-md sm:overflow-hidden mb-5`}
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
                                    btnStyleClass={btnStyleClass}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border-l-2 pl-8">
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

export default CheckOutEleven;

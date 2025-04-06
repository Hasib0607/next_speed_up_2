'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import { AppDispatch, RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    totalCampainOfferDiscount,
} from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import { setGrandTotal, setPurchaseList } from '@/redux/features/purchase/purchaseSlice';
import { useGetCountryQuery, useGetDistrictQuery } from '@/redux/features/checkOut/checkOutApi';

const CheckOutTwentyOne = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;
    const dispatch: AppDispatch = useAppDispatch();
    const { cartList } = useSelector((state: RootState) => state.cart);

    const { selectedShippingArea } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );

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
    // const cartTotalCampainOfferDelivery = useMemo(
    //     () => getCampainOfferDeliveryFee(cartList, selectedShippingArea),
    //     [cartList, selectedShippingArea]
    // );

    // useGetCountryQuery({});
    // useGetDistrictQuery({});
    
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
        <div
            className={`${
                design?.template_id === '34' ? 'bg-thirty-one' : 'bg-[#F3F4F6]'
            }`}
        >
            <div className="sm:container px-5 xl:px-24">
                <h2 className="py-10 text-4xl font-semibold text-center">
                    {design?.template_id === '29' ? 'চেকআউট' : 'Checkout'}
                </h2>
                <div className="container">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-6 mt-1 py-4">
                        <div className="mt-5 lg:mt-0 lg:col-span-1 lg:h-max lg:sticky lg:top-28">
                            {store_id === 5368 && (
                                <p className="py-1 text-lg sm:text-2xl bg-black text-white px-2">
                                    অর্ডার করতে আপনার নাম, ঠিকানা,মোবাইল নাম্বার
                                    দিন। আমাদের একজন প্রতিনিধি আপনাকে ফোন করে
                                    অর্ডার কনফার্ম করবে
                                </p>
                            )}
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
                                        setUserName={setUserName}
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
                                shippingColOne
                            />

                            {/* don't remove this below */}
                            {/* <div className="border border-gray-300 rounded-md p-6">
                                <PaymentGateway
                                    selectPayment={selectPayment}
                                    setSelectPayment={setSelectPayment}
                                />
                            </div> */}
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
                                userAddress={userAddress}
                                userPhone={userPhone}
                                userName={userName}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutTwentyOne;

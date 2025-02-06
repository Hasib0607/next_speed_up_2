'use client';

import './checkoutfiveorder.css';
import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';

import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import Discount from '../_components/discount/discount';

const CheckOutFive = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;

    const { cartList } = useSelector((state: any) => state.cart);

    const {
        data: campaignsData,
        isLoading: campaignsLoading,
        isSuccess: campaignsSuccess,
        refetch: campaignsRefetch,
    } = useGetCampaignQuery({ store_id });

    const [couponDis, setCouponDis] = useState(0);
    const [coupon, setCoupon] = useState(null);
    const [shippingArea, setShippingArea] = useState<any>(null);
    const [selectPayment, setSelectPayment] = useState(
        headersetting?.cod === 'active' ? 'cod' : ''
    );
    const [selectAddress, setSelectAddress] = useState(null);
    const [couponResult, setCouponResult] = useState(null);

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        const isCampaigns = campaignsData?.data || {};
        const fetchCampaignData = () => {
            if (campaignsSuccess && isCampaigns) {
                setCampaign(isCampaigns);
            }
        };
        fetchCampaignData();
    }, [campaignsSuccess, campaignsData]);

    // free delivery
    const free: any = campaign?.find(
        (item: any) =>
            item?.discount_amount === '0' && item?.status === 'active'
    );
    const freeId = free?.campaignProducts?.map((item: any) => item?.id);
    const campProdId = cartList?.map((item: any) => item?.id);

    const freeDelivery = campProdId?.every((item: any) =>
        freeId?.includes(item)
    );

    useEffect(() => {
        if (freeDelivery && shippingArea) {
            setShippingArea(0);
        }
    }, [freeDelivery, shippingArea]);

    if (cartList?.length === 0) {
        return (
            <>
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
            </>
        );
    }

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
                                setUserName={setUserName}
                            />
                        </div>
                    </div>
                    <Discount
                        design={design}
                        appStore={appStore}
                        headersetting={headersetting}
                        setCouponDis={setCouponDis}
                        setShippingArea={setShippingArea}
                        setCoupon={setCoupon}
                        setCouponResult={setCouponResult}
                        couponResult={couponResult}
                    />
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <PaymentGateway
                                design={design}
                                appStore={appStore}
                                headersetting={headersetting}
                                selectPayment={selectPayment}
                                setSelectPayment={setSelectPayment}
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
                        couponResult={couponResult}
                        selectAddress={selectAddress}
                        selectPayment={selectPayment}
                        setSelectPayment={setSelectPayment}
                        shippingArea={shippingArea}
                        coupon={coupon}
                        userAddress={userAddress}
                        userPhone={userPhone}
                        userName={userName}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckOutFive;

'use client';

import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from './discount/discount';
import PaymentConditions from '../_components/payment-conditions';

const CheckOutOne = ({ design, appStore, headersetting }: any) => {
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
        <div className="bg-[#F3F4F6] min-h-screen">
            <div className="sm:container px-5 xl:px-24">
                <div className="pt-10 font-semibold text-center">
                    <div className="p-4 mb-4 text-center">
                        <p className="text-orange-300 font-semibold text-lg sm:text-xl">
                            অর্ডার টি সম্পন্ন করতে আপনার নাম, মোবাইল নাম্বার ও
                            ঠিকানা নিচে লিখুন
                        </p>
                        <h2 className="font-semibold mt-2 text-xl sm:text-2xl">
                            বিলিং ডিটেইল
                        </h2>
                        <hr
                            className="border-dashed border-gray-300 my-2 w-3/4 sm:w-1/2 mx-auto"
                            style={{
                                borderWidth: '2px',
                                borderStyle: 'dashed',
                            }}
                        />
                    </div>
                </div>
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
            </div>
        </div>
    );
};

export default CheckOutOne;

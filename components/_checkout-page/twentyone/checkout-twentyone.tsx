'use client';

import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Address from './address/address';
import YourOrders from './your-orders/your-order';
import Discount from './discount/discount';

const CheckOutTwentyOne = () => {
    const home = useSelector((state: any) => state?.home);
    const { design, headersetting } = home || {};

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

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
                            <Address
                                selectAddress={selectAddress}
                                setSelectAddress={setSelectAddress}
                                design={design}
                                setToken={setToken}
                                token={token}
                                setUserAddress={setUserAddress}
                                userPhone={userPhone}
                                setUserPhone={setUserPhone}
                                setUserName={setUserName}
                            />
                            <Discount
                                setCouponDis={setCouponDis}
                                setShippingArea={setShippingArea}
                                setCoupon={setCoupon}
                                setCouponResult={setCouponResult}
                                couponResult={couponResult}
                                design={design}
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

export default CheckOutTwentyOne;

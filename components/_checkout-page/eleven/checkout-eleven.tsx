'use client';

import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import Address from '../_components/address/address';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';

const CheckOutEleven = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;

    const { cartList } = useSelector((state: any) => state.cart);

    const {
        data: campaignsData,
        isLoading: campaignsLoading,
        isSuccess: campaignsSuccess,
        refetch: campaignsRefetch,
    } = useGetCampaignQuery({ store_id });

    const [couponDis, setCouponDis] = useState(0);
    const [shippingArea, setShippingArea] = useState<any>(null);
    const [selectAddress, setSelectAddress] = useState(null);
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

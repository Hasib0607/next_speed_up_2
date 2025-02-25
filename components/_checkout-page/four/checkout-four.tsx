'use client';

import { useGetCampaignQuery } from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount/discount';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import { totalCampainOfferDiscount } from '@/utils/_cart-utils/cart-utils';
import { setTotalCampainOfferDis } from '@/redux/features/filters/offerFilterSlice';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';

const CheckOutFour = ({ design, appStore, headersetting }: any) => {
    const store_id = appStore?.id || null;
    const dispatch: AppDispatch = useAppDispatch();
    const { cartList } = useSelector((state: RootState) => state.cart);

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
    const [checked, setChecked] = useState<boolean>(false);

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

    useEffect(() => {
        if (store_id !== 8729) {
            setChecked(true);
        }
    }, [store_id]);

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

    return (
        <div className="" style={{ backgroundColor: '#F3F4F6' }}>
            <h2 className="py-10 text-4xl font-semibold text-center">
                Checkout
            </h2>
            <div className="container">
                <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-1 py-4 px-2">
                    <div className="mt-5 lg:mt-0 lg:col-span-2">
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
                            shippingColOne
                            shippingOff
                            select
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
                            setChecked={setChecked}
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
                            userAddress={userAddress}
                            userPhone={userPhone}
                            userName={userName}
                            checked={checked}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFour;

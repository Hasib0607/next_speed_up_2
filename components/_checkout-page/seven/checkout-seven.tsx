'use client';

import {
    useGetBookingFormFieldsQuery,
    useGetCampaignQuery,
} from '@/redux/features/checkOut/checkOutApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Address from '../_components/address/address';
import YourOrders from './your-orders/your-order';
import Discount from '../_components/discount-seven/discount-seven';
import PaymentGateway from '../_components/payment-gateway/payment-gateway';
import PaymentConditions from '../_components/payment-conditions';
import { RootState } from '@/redux/store';
import Booking from '@/components/BookingFrom';

const CheckOutTwentyOne = () => {
    const module_id = 108;
    const home = useSelector((state: RootState) => state?.home);
    const { design, headersetting } = home || {};

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const { cartList } = useSelector((state: RootState) => state.cart);

    const {
        data: userBookingFormFieldsData,
        isLoading: userBookingFormFieldsLoading,
        isSuccess: userBookingFormFieldsSuccess,
    } = useGetBookingFormFieldsQuery({ store_id, module_id });

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
    const [bookingData, setBookingData] = useState<any>(null);

    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [campaign, setCampaign] = useState([]);
    const [bookingStatus, setBookingStatus] = useState<boolean>(false);

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

    // Extracting data from db
    useEffect(() => {
        if (userBookingFormFieldsSuccess) {
            const userBookingFormFields =
                userBookingFormFieldsData?.data?.data || [];
            setBookingData(userBookingFormFields);
            setBookingStatus(userBookingFormFieldsData?.status);
        }
    }, [userBookingFormFieldsData, userBookingFormFieldsSuccess]);

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
        <div className="bg-white container px-5">
            <h1 className="text-center py-10 text-3xl font-bold">Checkout</h1>
            <div className="md:grid lg:grid-cols-3 md:gap-10 xl:gap-16 mt-1 py-4 px-2">
                <div className="mt-5 lg:mt-0 lg:col-span-2">
                    {bookingStatus && <Booking bookingData={bookingData} />}
                    {userBookingFormFieldsLoading ? (
                        'loading...'
                    ) : (
                        <>
                            {!bookingStatus && (
                                <>
                                    <h3 className="font-semibold text-xl text-black">
                                        Shipping Address
                                    </h3>
                                    <div
                                        className={`${
                                            design?.template_id === '34'
                                                ? 'bg-thirty-one border border-white'
                                                : 'bg-white'
                                        }  shadow sm:rounded-md sm:overflow-hidden mb-5`}
                                    >
                                        <div className="px-4 py-5 space-y-6 sm:p-6">
                                            <Address
                                                selectAddress={selectAddress}
                                                setSelectAddress={
                                                    setSelectAddress
                                                }
                                                design={design}
                                                setToken={setToken}
                                                token={token}
                                                setUserAddress={setUserAddress}
                                                userPhone={userPhone}
                                                setUserPhone={setUserPhone}
                                                setUserName={setUserName}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <Discount
                                setShippingArea={setShippingArea}
                                setCouponResult={setCouponResult}
                                bookingStatus={bookingStatus}
                                setCouponDis={setCouponDis}
                                couponResult={couponResult}
                                setCoupon={setCoupon}
                                design={design}
                            />
                        </div>
                    </div>
                    <div className="shadow sm:rounded-md sm:overflow-hidden my-5">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <PaymentGateway
                                selectPayment={selectPayment}
                                setSelectPayment={setSelectPayment}
                            />
                        </div>
                    </div>
                    <PaymentConditions />
                </div>
                <div className="mt-5 lg:mt-0 lg:col-span-1">
                    <YourOrders
                        couponDis={couponDis}
                        setCouponDis={setCouponDis}
                        couponResult={couponResult}
                        selectAddress={selectAddress}
                        selectPayment={selectPayment}
                        shippingArea={shippingArea}
                        coupon={coupon}
                        userAddress={userAddress}
                        userPhone={userPhone}
                        userName={userName}
                        bookingStatus={bookingStatus}
                        checked
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckOutTwentyOne;

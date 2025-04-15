'use client';

import { removeFromCartList } from '@/redux/features/cart/cartSlice';

import FileUploadModal from '@/utils/FileUploadModal';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { productImg } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import BDT from '@/utils/bdt';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { AppDispatch, RootState } from '@/redux/store';
import { subTotal } from '@/utils/_cart-utils/cart-utils';

import { useEffect, useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';
// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { howMuchSave } from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setCustomer,
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import { handleCouponRemove } from '@/helpers/handleCouponRemove';

const YourOrders = ({
    design,
    appStore,
    headersetting,
    selectAddress,
    gTotal,
    totalDis,
    tax,
    bookingStatus,
}: any) => {
    const store_id = appStore?.id || null;
    const isAuthenticated = useAuth();

    const referral_code = getFromLocalStorage('referralCode');

    const [isAbleToOrder, setIsAbleToOrder] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [cartId, setCartId] = useState(null);

    const { checkoutFromData, checkoutBookingFromData } = useSelector(
        (state: RootState) => state.checkout
    ); // Access updated Redux state

    const {
        name: userName,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        district: userDistrict,
        phone_code: userPhoneCode,
    } = checkoutFromData || {};

    const { districtArr, countryArr } = useSelector(
        (state: RootState) => state?.checkout
    );

    const districts = useMemo(
        () =>
            districtArr?.find(
                (item: any) => item?.id === numberParser(userDistrict)
            ),
        [districtArr, userDistrict]
    );

    const selectedCountry = useMemo(
        () =>
            countryArr?.find(
                (item: any) => item?.telephonePrefix === userPhoneCode
            ),
        [countryArr, userPhoneCode]
    );

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { shippingAreaCost } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );
    const { couponResult } = useSelector(
        (state: RootState) => state.couponSlice
    );

    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );

    const formData = new FormData();
    const dispatch: AppDispatch = useAppDispatch();
    const total = subTotal(cartList);
    const smsCount = numberParser(headersetting?.total_sms);
    const couponShow = setCouponShow(couponResult, total, shippingAreaCost);

    const updatedCartList = cartList?.map((cart: any, index: any) => {
        if (files[index]) {
            return {
                ...cart,
                items: [files[index]], // Adding the new property 'items' with the product object from data
            };
        }
        return cart; // Return the cart as is if there's no corresponding product in data
    });

    const cart = updatedCartList?.map((item: any) => ({
        id: item?.id,
        quantity: item?.qty,
        discount: howMuchSave(item) ?? 0,
        price: item?.price,
        variant_id: item?.variant_id,
        items: item?.items,
        referral_code: referral_code || '',
    }));

    for (let i = 0; i < cart?.length; i++) {
        if (cart[i]?.items) {
            for (let j = 0; j < cart[i]?.items.length; j++) {
                if (cart[i]?.items[i]?.description) {
                    formData.append(
                        `product[${i}][items][${i}][description]`,
                        cart[i]?.items[i]?.description
                    );
                }
                if (cart[i].items[j]?.files?.length > 0) {
                    for (let k = 0; k < cart[i].items[j].files.length; k++) {
                        formData.append(
                            `product[${i}][items][${j}][files][${k}]`,
                            cart[i].items[j].files[k]
                        );
                    }
                }
            }
        }
    }

    // Append all non-image properties of the cart item
    for (let i = 0; i < cart?.length; i++) {
        for (let key in cart[i]) {
            if (key !== 'items') {
                formData.append(`product[${i}][${key}]`, cart[i][key]);
            }
        }
    }

    // Prepare data object
    const data = useMemo(
        () => ({
            product: cart,
            store_id,
            name: bookingStatus
                ? checkoutBookingFromData?.name
                : checkEasyNotUser(
                      appStore,
                      userName,
                      selectAddress?.name,
                      isAuthenticated
                  ),
            phone: bookingStatus
                ? checkoutBookingFromData?.phone
                : checkEasyNotUser(
                      appStore,
                      userPhone,
                      selectAddress?.phone,
                      isAuthenticated
                  ),
            email: bookingStatus
                ? checkoutBookingFromData?.email
                : checkEasyNotUser(
                      appStore,
                      userEmail,
                      selectAddress?.email,
                      isAuthenticated
                  ),
            address: bookingStatus
                ? ''
                : checkEasyNotUser(
                      appStore,
                      userAddress,
                      selectAddress?.address,
                      isAuthenticated
                  ),
            country_code: selectedCountry?.countryCode,
            phone_code: selectedCountry?.telephonePrefix,
            note: selectAddress?.note,
            district: selectAddress?.district?.bn_name,
            address_id: selectAddress?.id,
            start_date: checkoutBookingFromData?.start_date,
            end_date: checkoutBookingFromData?.end_date,
            pickup_location: checkoutBookingFromData?.pickup_location,
            drop_location: checkoutBookingFromData?.drop_location,
            comment: checkoutBookingFromData?.comment,
            time: checkoutBookingFromData?.time,
            payment_type: selectedPayment,
            subtotal: numberParser(total),
            shipping: shippingAreaCost,
            total: gTotal,
            discount: totalDis,
            tax,
            coupon: couponResult?.code || '',
            referral_code: referral_code || '', // Include referral code if available
        }),
        [
            cart,
            store_id,
            appStore,
            userName,
            userPhone,
            userEmail,
            userAddress,
            selectAddress,
            isAuthenticated,
            selectedPayment,
            total,
            shippingAreaCost,
            gTotal,
            totalDis,
            tax,
            couponResult,
            referral_code,
            checkoutBookingFromData,
            bookingStatus,
            selectedCountry,
        ]
    );

    // Prepare formData
    const appendFormData = (key: string, value: any) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
        }
    };

    // Append data to formData
    Object.entries({
        store_id,
        name: data.name,
        phone: data.phone_code + data.phone,
        country_code: data.country_code,
        phone_code: data.phone_code,
        email: data.email,
        address: data.address,
        note: data.note,
        district: data.district,
        address_id: data.address_id,
        start_date: data.start_date,
        end_date: data.end_date,
        pickup_location: data.pickup_location,
        drop_location: data.drop_location,
        comment: data.comment,
        time: data.time,
        payment_type: data.payment_type,
        subtotal: data.subtotal,
        shipping: data.shipping,
        total: data.total,
        discount: data.discount,
        tax: data.tax,
        coupon: data.coupon,
        referral_code: data.referral_code,
    }).forEach(([key, value]) => appendFormData(key, value));

    const handleCheckout = async () => {
        dispatch(setPurchaseList(cartList));
        dispatch(setGrandTotal(gTotal));
        dispatch(
            setCustomer({
                name: data.name,
                phone: data.phone,
                email: data.email,
                address: data.address,
            })
        );
        // placeorder
        handlePlaceOrder(
            isAbleToOrder,
            smsCount,
            formData,
            dispatch,
            setIsLoading
        );
    };

    useEffect(() => {
        if (
            data?.total &&
            data?.payment_type &&
            data?.product &&
            data?.name &&
            (data?.phone || data?.email) &&
            data?.shipping !== null
        ) {
            if (bookingStatus && !data?.address) {
                setIsAbleToOrder(true);
            } else if (!bookingStatus && data?.address) {
                setIsAbleToOrder(true);
            } else {
                setIsAbleToOrder(false);
            }
        } else {
            setIsAbleToOrder(false);
        }
    }, [data, bookingStatus]);

    return (
        <div className="overflow-hidden bg-[#F4F4F4]">
            <h3 className="text-sm px-2 w-full py-2">
                {bookingStatus ? 'Booking Details' : 'SHOPPING BAG'}
            </h3>
            <hr />

            {cartList ? (
                <div className="">
                    <div className=" flex flex-col justify-between pt-5">
                        {/* Replace with your content */}
                        <div className="px-4 sm:px-2 h-2/3 overflow-y-scroll ">
                            {cartList?.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    onClick={() => setCartId(item?.cartId)}
                                >
                                    <Single
                                        files={files}
                                        cartId={item?.cartId}
                                        item={item}
                                        setIsOpen={setIsOpen}
                                        store_id={store_id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">
                    <h3 className="text-center font-semibold text-lg text-black">
                        No Products Found
                    </h3>
                </div>
            )}
            <hr className="my-5" />
            <div
                className="my-5 px-2 text-gray-500"
                style={{ fontWeight: 500 }}
            >
                <div className="flex justify-between items-center">
                    <p>{'Sub Total'}</p>
                    <p>
                        <BDT price={numberParser(total)} />
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p>{'Discount'}</p>
                    <p>
                        <BDT price={totalDis} />
                    </p>
                </div>

                {couponShow > 0 && (
                    <div className="space-x-4 my-3">
                        <button
                            className="relative inline-flex font-semibold justify-between gap-2 items-center px-2 space-y-2 text-sm shadow rounded-full bg-green-500 text-gray-900"
                            data-dismiss-target="#badge-dismiss-yellow"
                            aria-label="Remove"
                        >
                            {couponResult?.code}
                            <CrossCircledIcon
                                className="absolute -top-3 -right-3 text-red-400 size-5"
                                onClick={() => handleCouponRemove(dispatch)}
                            />
                            <span className="sr-only">Remove badge</span>
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <p>{'Tax'}</p>
                    <p>
                        <BDT price={numberParser(tax)} />
                    </p>
                </div>
                <div className="flex justify-between items-center last:border-0 border-b border-gray-200 py-3">
                    <p>{'Estimated Shipping'}</p>
                    <p>
                        <BDT price={shippingAreaCost ?? 0} />
                    </p>
                </div>

                <div className="flex justify-between items-center last:border-0 border-b border-gray-200 py-3">
                    <p>{'Total'}</p>
                    <p>
                        <BDT price={gTotal} />
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div
                    className={`font-semibold tracking-wider my-1 rounded-sm border border-gray-300 w-full py-3 ${btnhover}`}
                >
                    Loading
                </div>
            ) : (
                <button
                    disabled={!isAbleToOrder}
                    className={`font-semibold tracking-wider my-1 rounded-sm border border-gray-300 w-full py-3 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300 ${!isAbleToOrder ? btnhover : null}`}
                    onClick={handleCheckout}
                >
                    {bookingStatus ? 'Book Now' : 'Place Order'}
                </button>
            )}
            <FileUploadModal
                files={files}
                setFiles={setFiles}
                isOpen={isOpen}
                design={design}
                setIsOpen={setIsOpen}
                cartId={cartId}
            />
        </div>
    );
};

export default YourOrders;

const Single = ({ item, setIsOpen, files, cartId, store_id }: any) => {
    const module_id = 104;

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    function openModal() {
        setIsOpen(true);
    }

    const dispatch: AppDispatch = useAppDispatch();

    const file = files.some((i: any) => i.cartId === cartId);

    return (
        <div className="flex justify-between space-x-1 last:border-0 border-b border-gray-400 py-2">
            <div className="w-24">
                <img
                    className="w-full h-auto "
                    src={productImg + item.image[0]}
                    alt=""
                />
            </div>
            <div className="flex flex-col gap-x-2 gap-y-1 pl-2 w-full">
                <h3 className="text-black text-md whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {item.name}
                    </Link>
                </h3>
                <p className="text-sm">
                    <BDT /> {item?.price * item.qty}
                </p>
                <div className="flex flex-col gap-x-2 gap-y-1 justify-start">
                    <div className="flex items-center">
                        {item?.color ? (
                            <div className="flex items-center gap-2">
                                <p className="text-sm">Color: </p>
                                <p
                                    style={{ backgroundColor: item?.color }}
                                    className="w-2 h-2 rounded-full ring-1 ring-offset-2 ring-gray-600"
                                ></p>
                            </div>
                        ) : null}
                        {item?.size ? (
                            <p className="text-sm">
                                Size:{' '}
                                <span className="font-normal text-sm">
                                    {item?.size}
                                </span>
                            </p>
                        ) : null}
                        {item?.unit ? (
                            <p className="text-sm">
                                Unit:{' '}
                                <span className="font-normal text-sm">
                                    {item?.volume + ' ' + item?.unit}
                                </span>
                            </p>
                        ) : null}
                    </div>
                    <p className="text-sm">Quantity: {item.qty} </p>
                </div>
            </div>

            <div className="justify-self-end flex items-center gap-x-2">
                <MdDelete
                    onClick={() => dispatch(removeFromCartList(item?.cartId))}
                    className="text-2xl lg:cursor-pointer"
                />
                {activeModule && (
                    <button
                        onClick={() => openModal()}
                        className="text-2xl lg:cursor-pointer"
                    >
                        {file ? <FaEdit /> : <AiOutlineUpload />}
                    </button>
                )}
            </div>
        </div>
    );
};

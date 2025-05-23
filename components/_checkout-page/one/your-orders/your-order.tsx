'use client';

import FileUploadModal from '@/utils/FileUploadModal';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { productImg } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import BDT from '@/utils/bdt';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

import {
    getCampainOfferDeliveryFee,
    handleDecrement,
    handleIncrement,
    handleRemove,
} from '@/utils/_cart-utils/cart-utils';

import { AppDispatch, RootState } from '@/redux/store';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';
import { useSelector } from 'react-redux';
import PaymentGateway from '../payment-gateway/payment-gateway';

// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { TWENTY_EIGHT } from '@/consts';
import { getShippingCostByAreaId, howMuchSave } from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setCustomer,
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import { handleCouponRemove } from '@/helpers/handleCouponRemove';
import {
    setSelectedShippingArea,
    setShippingAreaCost,
} from '@/redux/features/filters/shippingAreaFilterSlice';
import useOrderByAuthtype from '@/hooks/useOrderByAuthtype';
import useSendConfidentials from '@/hooks/useSendConfidentials';

const YourOrders = ({
    design,
    appStore,
    headersetting,
    selectAddress,
    gTotal,
    totalDis,
    tax,
}: any) => {
    const store_id = appStore?.id || null;
    const isAuthenticated = useAuth();

    const referral_code = getFromLocalStorage('referralCode');

    const [isAbleToOrder, setIsAbleToOrder] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [cartId, setCartId] = useState(null);

    const { checkoutFromData } = useSelector(
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

    const { districtArr, countryArr, formFieldsArr } = useSelector(
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

    const orderRequire = useOrderByAuthtype(appStore, formFieldsArr);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { shippingAreaCost, selectedShippingArea } = useSelector(
        (state: RootState) => state.shippingAreaFilter
    );

    const { couponResult } = useSelector(
        (state: RootState) => state.couponSlice
    );

    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );

    const isDeliveryOfferExitsInCart = useMemo(
        () => getCampainOfferDeliveryFee(cartList, selectedShippingArea),
        [cartList, selectedShippingArea]
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
            name: checkEasyNotUser(
                appStore,
                userName,
                selectAddress?.name,
                isAuthenticated
            ),
            phone: checkEasyNotUser(
                appStore,
                userPhone,
                selectAddress?.phone,
                isAuthenticated
            ),
            email: checkEasyNotUser(
                appStore,
                userEmail,
                selectAddress?.email,
                isAuthenticated
            ),
            address: checkEasyNotUser(
                appStore,
                userAddress,
                selectAddress?.address,
                isAuthenticated
            ),
            note: selectAddress?.note,
            district: checkEasyNotUser(
                appStore,
                districts?.bn_name,
                selectAddress?.district?.bn_name,
                isAuthenticated
            ),
            country_code: selectedCountry?.countryCode,
            phone_code: selectedCountry?.telephonePrefix,
            district_id: selectAddress?.district_id || districts?.id,
            address_id: selectAddress?.id,
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
            districts,
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
            setIsLoading,
            orderRequire,
            data
        );
    };

    // shippingCost by district
    useEffect(() => {
        const selectedCost = getShippingCostByAreaId(
            selectedShippingArea,
            headersetting
        );

        if (!isDeliveryOfferExitsInCart) {
            dispatch(setShippingAreaCost(selectedCost));
        }

        if (data?.district_id && data?.district_id === 1) {
            dispatch(setSelectedShippingArea(1));
        } else if (data?.district_id) {
            dispatch(setSelectedShippingArea(2));
        } else {
            dispatch(setSelectedShippingArea(null));
        }
    }, [
        data,
        selectedShippingArea,
        isDeliveryOfferExitsInCart,
        dispatch,
        headersetting,
    ]);

    useEffect(() => {
        if (
            data?.total &&
            data?.payment_type &&
            data?.product &&
            data?.name &&
            (data?.phone || data?.email) &&
            data?.address &&
            data?.district && headersetting?.allowOrder
        ) {
            setIsAbleToOrder(true);
        } else {
            setIsAbleToOrder(false);
        }
    }, [data,headersetting]);

    useSendConfidentials(data);

    return (
        <div className="border p-5 sm:rounded-md shadow">
            <div className="mb-12">
                <h3 className="text-center font-semibold text-xl">
                    প্রোডাক্ট ডিটেইল
                </h3>
                <hr className="border-dashed border border-gray-300 my-2 w-36 mx-auto" />
            </div>
            <div className="flex justify-between items-center">
                <p className="font-semibold">প্রোডাক্টের নাম</p>
                <p className="font-semibold">বিক্রয় মূল্য</p>
            </div>
            <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />
            {cartList ? (
                <>
                    <div className="">
                        <div className="flex flex-col justify-between">
                            {/* Replace with your content */}
                            <div className="px-2 h-2/3 overflow-y-auto">
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
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />
                </>
            ) : (
                <div className="">
                    <h3 className="text-center font-semibold text-lg ">
                        No Products Found
                    </h3>
                </div>
            )}

            <div
                className="my-5 text-gray-500 px-2"
                style={{ fontWeight: 500 }}
            >
                <div className="flex justify-between items-center">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'সাব টোটাল'
                            : 'Sub Total'}
                    </p>
                    <p>
                        <BDT price={numberParser(total)} />
                    </p>
                </div>
                {totalDis > 0 && (
                    <>
                        <div className="flex justify-between items-center">
                            <p>
                                {design?.checkout_page === TWENTY_EIGHT ||
                                design?.template_id === '29'
                                    ? 'ডিসকাউন্ট'
                                    : 'Discount'}
                            </p>
                            <p>
                                <BDT price={totalDis} />
                            </p>
                        </div>
                        {couponShow && (
                            <div className="space-x-4 my-3">
                                <button
                                    className="relative inline-flex font-semibold justify-between gap-2 items-center px-2 space-y-2 text-sm shadow rounded-full bg-green-500 text-gray-900"
                                    data-dismiss-target="#badge-dismiss-yellow"
                                    aria-label="Remove"
                                >
                                    {couponResult?.code}
                                    <CrossCircledIcon
                                        className="absolute -top-3 -right-3 text-red-400 size-5"
                                        onClick={() =>
                                            handleCouponRemove(dispatch)
                                        }
                                    />
                                    <span className="sr-only">
                                        Remove badge
                                    </span>
                                </button>
                            </div>
                        )}
                    </>
                )}

                {tax ? (
                    <div className="flex justify-between items-center">
                        <p>
                            {design?.checkout_page === TWENTY_EIGHT ||
                            design?.template_id === '29'
                                ? 'ট্যাক্স'
                                : 'Tax'}
                        </p>
                        <p>
                            <BDT price={numberParser(tax)} />
                        </p>
                    </div>
                ) : null}
                <div className="flex justify-between items-center">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'এস্টিমেটেড শিপিং'
                            : 'Estimated Shipping'}
                    </p>

                    <p>
                        <BDT price={shippingAreaCost ?? 0} />
                    </p>
                </div>
                <hr className="border-dashed border border-gray-300 my-2 w-full mx-auto" />
                <div className="flex justify-between items-center  font-semibold">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'মোট'
                            : 'Total'}
                    </p>
                    <p>
                        <BDT price={gTotal} />
                    </p>
                </div>
                <PaymentGateway
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                />
            </div>

            {store_id === 3020 && (
                <div className="my-2">
                    <p className="px-2">
                        <span className="my-1 font-bold">
                            Bkash/Nagad/Upay/Rocket (
                            <span className="text-sm">Advanced Personal</span>)
                            -{' '}
                        </span>{' '}
                        01660003040
                    </p>
                </div>
            )}

            {isLoading ? (
                <div className="flex justify-center items-center font-semibold tracking-wider my-1 rounded-full border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] border-gray-300 w-full py-3">
                    Loading
                </div>
            ) : (
                <button
                    disabled={!isAbleToOrder}
                    className={`flex justify-center items-center font-semibold tracking-wider my-1 rounded-full border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] hover:bg-transparent border-gray-300 w-full py-3 disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300  ${!isAbleToOrder ? btnhover : null}`}
                    onClick={handleCheckout}
                >
                    {'অর্ডার কনফার্ম করুন'}
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

const Single = ({ item }: any) => {
    const dispatch: AppDispatch = useAppDispatch();

    return (
        <div
            key={item.id}
            className="flex justify-between space-x-1 last:border-0 border-b border-gray-400 py-2"
        >
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

                    <div className="flex h-9 w-24 justify-between items-center rounded-md font-semibold bg-[var(--header-color)] text-[var(--text-color)]">
                        <div
                            onClick={() => handleDecrement(dispatch, item)}
                            className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                        >
                            <MinusIcon
                                className="text-[var(--text-color)]"
                                width={15}
                            />
                        </div>
                        <div className="text-[var(--text-color)]">
                            {item?.qty}
                        </div>
                        <div
                            onClick={() => handleIncrement(dispatch, item)}
                            className="hover:bg-gray-800 hover:rounded-md lg:cursor-pointer py-2 h-full w-8 flex justify-center items-center"
                        >
                            <PlusIcon
                                className="text-[var(--text-color)]"
                                width={15}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-sm justify-self-end flex items-center gap-x-2">
                    <BDT />
                    <span className="font-bold text-xl text-gray-500">
                        {item?.price * item?.qty}
                    </span>
                </p>
                <div className="justify-self-end flex items-center gap-x-2">
                    <span
                        onClick={() => handleRemove(dispatch, item)}
                        className="lg:cursor-pointer underline text-sm"
                    >
                        Remove
                    </span>
                </div>
            </div>
        </div>
    );
};

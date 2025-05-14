'use client';

import FileUploadModal from '@/utils/FileUploadModal';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { productImg } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import BDT from '@/utils/bdt';

import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { AppDispatch, RootState } from '@/redux/store';
import { handleRemove, subTotal } from '@/utils/_cart-utils/cart-utils';
import {  useEffect, useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { TWENTY_EIGHT } from '@/consts';
import {
    howMuchSave,
} from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setCustomer,
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import { handleCouponRemove } from '@/helpers/handleCouponRemove';
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
            country_code: selectedCountry?.countryCode,
            phone_code: selectedCountry?.telephonePrefix,
            note: selectAddress?.note,
            district: selectAddress?.district?.bn_name,
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

    useEffect(() => {
        if (
            data?.total &&
            data?.payment_type &&
            data?.product &&
            data?.name &&
            (data?.phone || data?.email) &&
            data?.address &&
            data?.shipping !== null
        ) {
            setIsAbleToOrder(true);
        } else {
            setIsAbleToOrder(false);
        }
    }, [data]);

    useSendConfidentials(data);

    return (
        <div
            className={`${
                design?.template_id === '34'
                    ? 'bg-thirty-one border border-white'
                    : 'bg-gray-200 '
            } sm:rounded-md`}
        >
            <h3 className="text-base text-black bg-[#FAEBD7] p-5">Products</h3>
            {cartList ? (
                <div className="my-5">
                    <div className="flex flex-col justify-between pt-5">
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
                                        store_id={store_id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">
                    <h3 className="text-center font-semibold text-lg ">
                        No Products Found
                    </h3>
                </div>
            )}

            <div
                className="my-5 text-gray-500 px-5"
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
                                onClick={() => handleCouponRemove(dispatch)}
                            />
                            <span className="sr-only">Remove badge</span>
                        </button>
                    </div>
                )}

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
                <div className="flex justify-between items-center">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'এস্টিমেটেড শিপিং'
                            : 'Estimated Shipping'}
                    </p>
                    <p>
                        <BDT />
                        <span>{shippingAreaCost ?? 0}</span>
                    </p>
                </div>
                <div className="h-[2px] w-full bg-gray-300 mt-4 mb-2"></div>
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
            </div>

            {store_id === 3020 && (
                <div className="my-2 px-5">
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
            <div className="p-5">
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
                        {design?.template_id === '29' ||
                        store_id === 3601 ||
                        design?.checkout_page === TWENTY_EIGHT
                            ? 'অর্ডার কনফার্ম করুন'
                            : 'Place Order'}
                    </button>
                )}
            </div>
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
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between space-y-2 space-x-1 sm:items-center border-b-2 border-gray-300 py-2 ">
            <div className="flex items-center gap-2">
                <div className="w-14 relative">
                    <img
                        className="w-14 h-14"
                        src={productImg + item.image[0]}
                        alt=""
                    />
                    <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-gray-500 text-white text-xs rounded-full center">
                        <p className="px-1">{item?.qty}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-x-2 gap-y-1 pl-2 justify-start">
                    <h3 className=" text-md font-normal">
                        <Link href={'/product/' + item?.id + '/' + item?.slug}>
                            {item?.name.slice(0, 15)}
                            {item?.name?.length > 15 && '...'}
                        </Link>
                    </h3>
                    <div className="flex items-center mt-1">
                        {item?.color ? (
                            <div className="flex items-center gap-2 pr-2">
                                <p className="font-semibold text-sm">Color: </p>
                                <p
                                    style={{ backgroundColor: item?.color }}
                                    className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                                ></p>
                            </div>
                        ) : null}
                        {item?.size ? (
                            <p className="font-semibold text-sm">
                                Size:{' '}
                                <span className="font-normal text-sm">
                                    {item?.size}
                                </span>
                            </p>
                        ) : null}
                        {item?.unit ? (
                            <p className="font-semibold text-sm">
                                Unit:{' '}
                                <span className="font-normal text-sm">
                                    {item?.volume + ' ' + item?.unit}
                                </span>
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-x-5 justify-end">
                <div className="text-md font-semibold">
                    <BDT price={item?.price * item?.qty} />
                </div>
                <div className="">
                    <MdDelete
                        onClick={() => handleRemove(dispatch, item)}
                        className="text-2xl lg:cursor-pointer"
                    />
                </div>
                {activeModule && (
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-1 bg-green-500 rounded-md"
                    >
                        {file ? 'Edit' : 'Upload'}
                    </button>
                )}
            </div>
        </div>
    );
};

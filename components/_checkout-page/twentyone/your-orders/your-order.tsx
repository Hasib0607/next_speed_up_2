'use client';

import { removeFromCartList } from '@/redux/features/cart/cartSlice';
import FileUploadModal from '@/utils/FileUploadModal';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { productImg } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import BDT from '@/utils/bdt';

import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';

import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';

import { grandTotal, subTotal } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PaymentGateway from '../../_components/payment-gateway/payment-gateway';

// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { TWENTY_EIGHT } from '@/consts';
import { RootState } from '@/redux/store';
import { howMuchSave } from '@/helpers/littleSpicy';
import { setCouponResult } from '@/redux/features/filters/couponSlice';

const YourOrders = ({
    design,
    appStore,
    headersetting,
    couponDis,
    setCouponDis,
    selectAddress,
    shippingArea,
}: any) => {
    const store_id = appStore?.id || null;
    const isAuthenticated = useAuth();

    const referral_code = getFromLocalStorage('referralCode');

    const [isAbleToOrder, setIsAbleToOrder] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tax, setTax] = useState<any>(0);
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
    } = checkoutFromData || {};

    const { cartList } = useSelector((state: RootState) => state.cart);
    const { couponResult } = useSelector(
        (state: RootState) => state.couponSlice
    );

    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );

    const smsCount = numberParser(headersetting?.total_sms);

    const dispatch = useDispatch();

    const formData = new FormData();

    const total = subTotal(cartList);

    const handleCouponRemove = () => {
        setCouponDis(0);
        dispatch(setCouponResult({ code: null, code_status: false }));
        toast.error('Coupon removed!');
    };

    const gTotal = grandTotal(total, tax, shippingArea, couponDis);

    const updatedCartList = cartList?.map((cart: any, index: any) => {
        if (files[index]) {
            return {
                ...cart,
                items: [files[index]], // Adding the new property 'items' with the product object from data
            };
        }
        return cart; // Return the cart as is if there's no corresponding product in data
    });
    // howMuchSave(item)
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
            district: selectAddress?.district?.bn_name,
            address_id: selectAddress?.id,
            payment_type: selectedPayment,
            subtotal: numberParser(total),
            shipping: numberParser(shippingArea),
            total: gTotal,
            discount: couponDis,
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
            shippingArea,
            gTotal,
            couponDis,
            tax,
            couponResult,
            referral_code,
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
        phone: data.phone,
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
        handlePlaceOrder(
            isAbleToOrder,
            smsCount,
            formData,
            dispatch,
            setIsLoading
        );
    };

    useEffect(() => {
        if (headersetting?.tax) {
            const tax = (numberParser(headersetting?.tax) / 100) * total;
            setTax(tax);
        }
    }, [headersetting?.tax, total]);

    useEffect(() => {
        // let isValidPhone = getCheckedValue(data?.phone, PHONE_NUMBER_REGEX);
        // let isValidEmail = getCheckedValue(data?.email, EMAIL_REGEX);
        if (
            data?.total &&
            data?.payment_type &&
            data?.product &&
            data?.name &&
            (data?.phone || data?.email) &&
            data?.address &&
            data.shipping !== null
        ) {
            setIsAbleToOrder(true);
        } else {
            setIsAbleToOrder(false);
        }
    }, [data]);

    const btnStyleClass =
        'py-2 px-5 rounded-full space-y-2 w-full sm:w-max transition-colors duration-300 relative flex justify-center items-center border border-gray-300 lg:cursor-pointer';

    return (
        <div
            className={`${
                design?.template_id === '34'
                    ? 'bg-thirty-one border border-white'
                    : 'bg-gray-200 '
            } p-5 sm:rounded-md`}
        >
            <h3 className="text-center font-semibold text-lg ">
                {design?.template_id === '29' ||
                store_id === 3601 ||
                design?.checkout_page === TWENTY_EIGHT
                    ? 'আপনার অর্ডার সমূহ'
                    : 'Your Order Summary'}
            </h3>
            {store_id === 3020 && (
                <p className="mt-3 bg-black text-white px-2 py-1">
                    অর্ডার টি কর্নফার্ম করতে ১৫০/- পেমেন্ট করুন
                </p>
            )}
            {cartList ? (
                <>
                    <div className="my-16">
                        <div className=" flex flex-col justify-between mt-16 pt-5">
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
                <div className="flex justify-between items-center">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'ডিসকাউন্ট'
                            : 'Discount'}
                    </p>
                    <p>{<BDT price={couponDis} />}</p>
                </div>

                {couponDis > 0 && (
                    <div className="space-x-4 my-3">
                        <button
                            className="relative inline-flex font-semibold justify-between gap-2 items-center px-2 space-y-2 text-sm shadow rounded-full bg-green-500 text-gray-900"
                            data-dismiss-target="#badge-dismiss-yellow"
                            aria-label="Remove"
                        >
                            {couponResult?.code}
                            <CrossCircledIcon
                                className="absolute -top-3 -right-3 text-red-400 size-5"
                                onClick={handleCouponRemove}
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
                    <p>{<BDT price={numberParser(tax)} />}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'এস্টিমেটেড শিপিং'
                            : 'Estimated Shipping'}
                    </p>
                    {shippingArea === '--Select Area--' ? (
                        <p>
                            <BDT /> 0
                        </p>
                    ) : (
                        <p>
                            <BDT price={shippingArea ? shippingArea : 0} />
                        </p>
                    )}
                </div>
                <div className="h-[2px] w-full bg-gray-300 mt-4 mb-2"></div>
                <div className="flex justify-between items-center  font-semibold">
                    <p>
                        {design?.checkout_page === TWENTY_EIGHT ||
                        design?.template_id === '29'
                            ? 'মোট'
                            : 'Total'}
                    </p>
                    {shippingArea === '--Select Area--' ||
                    shippingArea === null ? (
                        <p>
                            {
                                <BDT
                                    price={
                                        numberParser(total + tax) - couponDis
                                    }
                                />
                            }
                        </p>
                    ) : (
                        <p>
                            {
                                <BDT
                                    price={
                                        numberParser(total + tax) +
                                        numberParser(shippingArea) -
                                        couponDis
                                    }
                                />
                            }
                        </p>
                    )}
                </div>
                <PaymentGateway
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                    btnStyleClass={btnStyleClass}
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
                    {design?.template_id === '29' ||
                    store_id === 3601 ||
                    design?.checkout_page === TWENTY_EIGHT
                        ? 'অর্ডার কনফার্ম করুন'
                        : 'Place Order'}
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

    const dispatch = useDispatch();

    const file = files.some((i: any) => i.cartId === cartId);

    return (
        <div
            // key={item.id}
            className="flex flex-col sm:flex-row justify-start sm:justify-between space-y-2 space-x-1 sm:items-center border-b-2 border-gray-300 py-2 "
        >
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
                        onClick={() =>
                            dispatch(removeFromCartList(item?.cartId))
                        }
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

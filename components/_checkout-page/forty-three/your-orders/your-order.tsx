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
import { grandTotal, subTotal } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { howMuchSave } from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';
import { setCouponResult } from '@/redux/features/filters/couponSlice';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setCustomer,
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';

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

    const { totalcampainOfferAmount } = useSelector(
        (state: RootState) => state.campainOfferFilters
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
    const couponShow = setCouponShow(couponResult, total, shippingArea);
    const totalDis = useMemo(
        () => couponDis + totalcampainOfferAmount,
        [couponDis, totalcampainOfferAmount]
    );

    const gTotal = grandTotal(total, tax, shippingArea, totalDis);

    const handleCouponRemove = () => {
        setCouponDis(0);
        dispatch(setCouponResult({ code: null, code_status: false }));
        toast.error('Coupon removed!');
    };

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
            district: selectAddress?.district?.bn_name,
            address_id: selectAddress?.id,
            payment_type: selectedPayment,
            subtotal: numberParser(total),
            shipping: shippingArea,
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
            shippingArea,
            gTotal,
            totalDis,
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
        if (headersetting?.tax) {
            const tax = (numberParser(headersetting?.tax) / 100) * total;
            setTax(tax);
        }
    }, [headersetting?.tax, total]);

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

    return (
        <div
        >
            <h3 className="text-base text-black bg-[#FAEBD7] p-5 block md:hidden">Order Summary</h3>
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
                        {'Sub Total'}
                    </p>
                    <p>
                        <BDT price={numberParser(total)} />
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p>
                        {'Discount'}
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
                                onClick={handleCouponRemove}
                            />
                            <span className="sr-only">Remove badge</span>
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <p>
                        {'Tax'}
                    </p>
                    <p>
                        <BDT price={numberParser(tax)} />
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p>
                        {'Estimated Shipping'}
                    </p>
                    {shippingArea === '--Select Area--' ||
                    shippingArea === null ? (
                        <p>
                            <BDT /> 0
                        </p>
                    ) : (
                        <p>
                            <BDT price={shippingArea ? shippingArea : 0} />
                        </p>
                    )}
                </div>
                <div className="flex justify-between items-center font-semibold mt-4">
                    <p>
                        {'Total'}
                    </p>

                    <p>
                        <BDT price={gTotal} />
                    </p>
                </div>
            </div>

            <div className="p-5">
                {isLoading ? (
                    <div className="flex justify-center items-center font-semibold tracking-wider my-1 rounded-lg border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] border-gray-300 w-full py-3">
                        Loading
                    </div>
                ) : (
                    <button
                        disabled={!isAbleToOrder}
                        className={`flex justify-center items-center font-semibold tracking-wider my-1 rounded-lg border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] hover:bg-transparent border-gray-300 w-full py-3 disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300  ${!isAbleToOrder ? btnhover : null}`}
                        onClick={handleCheckout}
                    >
                        {'Place Order'}
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
        <div className="flex sm:flex-row justify-between sm:justify-between space-y-2 space-x-1 sm:items-center py-2 ">
            <div className="flex items-center gap-2">
                <div className="w-14 relative border rounded-md">
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

            <div className="flex items-center gap-x-5 justify-end pr-4">
                <div className="text-md ">
                    <BDT price={item?.price * item?.qty} />
                </div>
                {/* <div className="">
                    <MdDelete
                        onClick={() =>
                            dispatch(removeFromCartList(item?.cartId))
                        }
                        className="text-2xl lg:cursor-pointer"
                    />
                </div> */}
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

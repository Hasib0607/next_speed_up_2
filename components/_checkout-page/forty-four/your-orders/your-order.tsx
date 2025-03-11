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
import { toast } from 'react-toastify';
import { handlePlaceOrder } from '@/components/_checkout-page/_components/handlePlaceOrder';
// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { getVariantDetailsById, howMuchSave } from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';
import {
    setCouponDiscount,
    setCouponResult,
} from '@/redux/features/filters/couponSlice';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    setCustomer,
    setGrandTotal,
    setPurchaseList,
} from '@/redux/features/purchase/purchaseSlice';
import Image from 'next/image';
import { setShippingAreaCost } from '@/redux/features/filters/shippingAreaFilterSlice';

const YourOrders = ({
    design,
    appStore,
    headersetting,
    selectAddress,
    totalDis,
    gTotal,
    tax,
    bookingStatus,
    checked,
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
    } = checkoutFromData || {};

    const { districtArr } = useSelector((state: RootState) => state?.checkout);

    const districts = useMemo(
        () =>
            districtArr?.find(
                (item: any) => item?.id === numberParser(userDistrict)
            ),
        [districtArr, userDistrict]
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

    const handleCouponRemove = () => {
        dispatch(setCouponDiscount(0));
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
            note: selectAddress?.note,
            district: checkEasyNotUser(
                appStore,
                districts?.bn_name,
                selectAddress?.district?.bn_name,
                isAuthenticated
            ),
            district_id: selectAddress?.district_id || districts?.id,
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
            districts,
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

    // shippingCost by district
    useEffect(() => {
        if (data?.district_id && data?.district_id === 1) {
            dispatch(setShippingAreaCost(headersetting?.shipping_area_1_cost));
        } else if (data?.district_id) {
            dispatch(setShippingAreaCost(headersetting?.shipping_area_2_cost));
        } else {
            dispatch(setShippingAreaCost(null));
        }
    }, [data, dispatch, headersetting]);

    useEffect(() => {
        if (
            checked &&
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
    }, [data, bookingStatus, checked]);

    return (
        <div className="py-10 px-8 bg-[#F4F4F4] rounded-md">
            <h3 className="text-2xl px-2 w-full py-2 font-medium">
                {bookingStatus ? 'Booking Details' : 'Cart Overview'}
            </h3>
            <hr />

            {cartList ? (
                <>
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
                </>
            ) : (
                <div className="">
                    <h3 className="text-center font-semibold text-lg text-black">
                        No Products Found
                    </h3>
                </div>
            )}
            <hr className="my-5" />
            <div className="my-5 px-2 text-gray-900 font-bold">
                <div className="flex justify-between items-center">
                    <p>{'Total:'}</p>
                    <p className="space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{numberParser(total)}</span>
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p>{'Discount:'}</p>
                    <p className="space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{totalDis}</span>
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
                                onClick={handleCouponRemove}
                            />
                            <span className="sr-only">Remove badge</span>
                        </button>
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <p>{'Tax:'}</p>
                    <p className="space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{numberParser(tax)}</span>
                    </p>
                </div>
                <div className="flex justify-between items-center last:border-0 border-b border-gray-200 py-3">
                    <p>{'Estimated Shipping:'}</p>
                    <p className="space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{shippingAreaCost ?? 0}</span>
                    </p>
                </div>

                <div className="flex justify-between items-center last:border-0 border-b border-gray-200 py-3">
                    <p className="text-xl">{'Payable:'}</p>
                    <p className="space-x-1 text-green-500">
                        <span>
                            <BDT />
                        </span>
                        <span>{gTotal}</span>
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div
                    className={`font-semibold tracking-wider rounded-sm border border-gray-300 w-full py-1 ${btnhover}`}
                >
                    Loading
                </div>
            ) : (
                <button
                    disabled={!isAbleToOrder}
                    className={`font-semibold tracking-wider rounded-sm border border-gray-300 w-full py-1 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300 ${!isAbleToOrder ? btnhover : null}`}
                    onClick={handleCheckout}
                >
                    {bookingStatus ? 'Book Now' : 'Confirm Order'}
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

    const productVariant = useMemo(() => getVariantDetailsById(item), [item]);

    function openModal() {
        setIsOpen(true);
    }

    const dispatch: AppDispatch = useAppDispatch();

    const file = files.some((i: any) => i.cartId === cartId);

    return (
        <div>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div>
                    <p className="text-black text-sm whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
                        {item.name}
                    </p>
                </div>
            </Link>
            <div className="flex justify-between space-x-1 h-24 last:border-0 border-b border-gray-400 py-2 gap-2">
                <div className="flex mr-auto h-auto max-w-20">
                    <Image
                        width={500}
                        height={500}
                        className="object-fill"
                        src={productImg + item.image[0]}
                        alt=""
                    />
                </div>

                <div className="flex flex-col gap-y-1 justify-start w-full">
                    {productVariant?.color ? (
                        <div className="flex items-center gap-2">
                            <p className="text-sm">Color: </p>
                            <p
                                style={{
                                    backgroundColor: productVariant?.color,
                                }}
                                className="w-2 h-2 rounded-full ring-1 ring-offset-2 ring-gray-600"
                            ></p>
                        </div>
                    ) : null}
                    {productVariant?.size ? (
                        <p className="text-sm font-normal">
                            Size: <span>{productVariant?.size}</span>
                        </p>
                    ) : null}
                    {productVariant?.unit ? (
                        <p className="text-sm font-normal">
                            Unit:{' '}
                            <span>
                                {productVariant?.volume +
                                    ' ' +
                                    productVariant?.unit}
                            </span>
                        </p>
                    ) : null}
                </div>

                <div className="flex items-center ml-auto gap-x-2">
                    <div className="center gap-3">
                        <p>{item.qty} </p>
                        <span>X</span>
                        <p className="space-x-1">
                            <span>
                                <BDT />
                            </span>
                            <span>{item?.price * item.qty}</span>
                        </p>
                    </div>
                    <MdDelete
                        onClick={() =>
                            dispatch(removeFromCartList(item?.cartId))
                        }
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
        </div>
    );
};

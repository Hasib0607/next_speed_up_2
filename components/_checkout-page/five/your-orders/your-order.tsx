'use client';

import {
    clearCartList,
    removeFromCartList,
} from '@/redux/features/cart/cartSlice';
import FileUploadModal from '@/utils/FileUploadModal';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { productImg } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import BDT from '@/utils/bdt';
import '../checkoutfiveorder.css';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import {
    MdDelete,
    MdKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import {
    handleDecrement,
    handleIncrement,
} from '@/utils/_cart-utils/cart-utils';
import { useUserPlaceOrderMutation } from '@/redux/features/checkOut/checkOutApi';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { RootState } from '@/redux/store';
import { grandTotal, subTotal } from '@/utils/_cart-utils/cart-utils';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

// Helper function to conditionally select a value
import { checkEasyNotUser } from '@/helpers/checkEasyNotUser';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { TWENTY_EIGHT } from '@/consts';
import { howMuchSave } from '@/helpers/littleSpicy';
import { setCouponShow } from '@/helpers/setDiscount';

const YourOrders = ({
    design,
    appStore,
    headersetting,
    couponDis,
    setCouponDis,
    coupon,
    selectAddress,
    shippingArea,
    couponResult,
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
    const { user } = useSelector((state: RootState) => state.auth);
    const selectedPayment = useSelector(
        (state: RootState) => state.paymentFilter.paymentMethod
    );
    const smsCount = numberParser(headersetting?.total_sms);

    const router = useRouter();
    const dispatch = useDispatch();

    const formData = new FormData();

    const total = subTotal(cartList);

    const [userPlaceOrder] = useUserPlaceOrderMutation();

    const handleCouponRemove = () => {
        setCouponDis(0);
        toast.error('Coupon removed!');
    };

    const gTotal = grandTotal(total, tax, shippingArea, couponDis);

    const couponShow = setCouponShow(couponResult, total, shippingArea);

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
            discount: couponDis,
            tax,
            coupon: coupon || '',
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
            coupon,
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
        if (!userAddress && !data.address) {
            toast.warning('Please Select The Address', {
                toastId: userAddress,
            });
        }
        if (!userPhone && !user) {
            toast.warning('Please write your phone number', {
                toastId: userPhone,
            });
        }
        if (!userName && !user) {
            toast.warning('Please write your name', { toastId: userName });
        }
        if (!data.payment_type) {
            toast.warning('Please Select Payment Method', {
                toastId: data.payment_type,
            });
        }
        if (data.shipping === null) {
            toast.warning('Please Select Shipping Area', {
                toastId: data.shipping,
            });
        }

        const placeOrder = () => {
            setIsLoading(true);
            userPlaceOrder(formData)
                .unwrap()
                .then(({ data, status }: any) => {
                    const { order, url } = data || {};

                    if (status) {
                        dispatch(clearCartList());
                        if (url) {
                            window.location.replace(url);
                        } else {
                            toast.success(
                                `Your #${order?.reference_no} order complete successfully!`
                            );
                            setIsLoading(false);
                            router.push('/thank-you');
                        }
                    } else {
                        toast.error('Can not place order, please try again!');
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    if ('data' in error) {
                        const errorData = error as any;
                        if (errorData?.status == 404) {
                            toast.error(errorData?.data?.message);
                        } else {
                            toast.error(
                                'Something went wrong! Please try again.'
                            );
                        }
                    }
                    setIsLoading(false);
                });
        };

        if (isAbleToOrder) {
            if (smsCount > 0) {
                placeOrder();
            } else {
                Swal.fire({
                    title: 'Do you want to continue?',
                    text: 'Your vendor does not have any SMS left!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continue',
                    reverseButtons: true,
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Are you sure?',
                            text: 'You cannot get SMS for order confirmation and also cannot receive login credentials!',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Proceed',
                            reverseButtons: true,
                        }).then((result: any) => {
                            if (result.isConfirmed) {
                                placeOrder();
                                toast.success(
                                    `Your order placed without sms confirmation!`
                                );
                            }
                        });
                    }
                });
            }
        }
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
            className={`CheckOutFiveBorderShadow overflow-hidden`}
            style={
                {
                    '--header-color': design?.header_color,
                    '--text-color': design?.text_color,
                } as React.CSSProperties
            }
        >
            <h3 className="text-center font-semibold text-lg text-white w-full bg-black py-2">
                Your Items
            </h3>
            {cartList ? (
                <>
                    <div className="">
                        <div className="flex flex-col justify-between bg-white pt-5">
                            {/* Replace with your content */}
                            <div className="px-4 sm:px-2 h-2/3 overflow-y-scroll CheckOutFiveBorderShadow">
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
                <div className="flex justify-center items-center font-semibold tracking-wider my-1 border-2 border-[var(--header-color)] text-[var(--text-color)] bg-[var(--header-color)] border-gray-300 w-full py-3">
                    Loading
                </div>
            ) : (
                <button
                    disabled={!isAbleToOrder}
                    className={`flex justify-center items-center font-semibold tracking-wider my-1 hover:border-2 text-[var(--text-color)] bg-[var(--header-color)] hover:bg-transparent hover:border-gray-300 w-full py-3 disabled:border disabled:bg-gray-400 disabled:cursor-not-allowed disabled:border-gray-300  ${!isAbleToOrder ? btnhover : null}`}
                    onClick={() => handleCheckout()}
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
            key={item.id}
            className="grid grid-cols-5 justify-between space-y-2 space-x-1 items-center last:border-0 border-b border-gray-400 py-2 px-3"
        >
            <div className="w-14">
                <img
                    className="w-14 h-14 "
                    src={productImg + item.image[0]}
                    alt=""
                />
            </div>
            <div className="flex flex-col gap-x-2 gap-y-1 pl-2">
                <h3 className="text-black text-md whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px] font-normal">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        {item.name}
                    </Link>
                </h3>
                <p className="text-sm">&#2547; {numberParser(item?.price)} </p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
                <MdOutlineKeyboardArrowUp
                    onClick={() => handleIncrement(dispatch, item)}
                    className="text-xl lg:cursor-pointer"
                />

                <p>{item.qty}</p>
                <MdKeyboardArrowDown
                    onClick={() => handleDecrement(dispatch, item)}
                    className="text-xl lg:cursor-pointer"
                />
            </div>
            <div className="text-md font-semibold justify-self-center">
                {item?.price * item.qty}
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

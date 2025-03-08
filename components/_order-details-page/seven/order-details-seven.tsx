'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BookingInformation from '@/components/dashboard/components/booking-information';
import GiveReview from '@/components/_order-details-page/components/review';
import OrderStatus from '@/components/dashboard/components/order-status';
import PaymentAgain from '@/components/dashboard/components/payment-again';
import DataLoader from '@/components/loaders/data-loader';
import { useOrderDetailsQuery } from '@/redux/features/user/userApi';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import { useGetProductDetailsQuery } from '@/redux/features/products/productApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './order-details-seven.css';

const OrderDetailsSeven = ({ appStore, order_id }: any) => {
    const [order, setOrder] = useState<any>({});
    const [booking, setBooking] = useState({});
    const [transaction, setTransaction] = useState({});
    const [orderItem, setOrderItem] = useState([]);

    const router = useRouter();

    const {
        data: orderDetailsData,
        isLoading: orderDetailsLoading,
        isSuccess: orderDetailsSuccess,
        isError: orderDetailsIsError,
        error: orderDetailsError,
        refetch: orderDetailsRefetch,
    } = useOrderDetailsQuery({ order_id });

    useEffect(() => {
        if (orderDetailsIsError) {
            const {
                data: { message },
                status,
            }: any = orderDetailsError || {};
            if (status === 404) {
                router.push('/profile/order');
                toast.error(message);
            }
        }
    }, [orderDetailsIsError, orderDetailsError, router]);

    useEffect(() => {
        const orderDetails = orderDetailsData?.data || {};

        if (orderDetailsSuccess && orderDetails) {
            const { order, orderitem, transaction, booking } =
                orderDetails || {};
            setOrder(order);
            setOrderItem(orderitem);
            setBooking(booking);
            setTransaction(transaction);
        }
    }, [orderDetailsData, orderDetailsSuccess]);

    return (
        <div className="md:w-full mt-4 md:mt-0">
            <h2 className="text-lg md:text-xl xl:text-2xl font-bold mb-6 xl:mb-8">
                Orders
            </h2>
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className="w-full flex flex-col"
                data-projection-id="27"
                style={{ position: 'relative', top: 0, opacity: 1 }}
            >
                <table className="text-left min-w-full">
                    <thead className="text-sm lg:text-base bg-white">
                        <tr>
                            <th className="bg-white p-4 font-semibold text-left w-max">
                                Images
                            </th>
                            <th className="bg-white p-4 font-semibold text-left w-full">
                                Product Name
                            </th>
                            <th className="bg-white p-4 font-semibold text-right w-max flex justify-center">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm lg:text-base">
                        {orderItem?.map((item: any, index: any) => (
                            <Single
                                item={item}
                                key={index}
                                order={order}
                                orderDetailsRefetch={orderDetailsRefetch}
                                appStore={appStore}
                            />
                        ))}

                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">Subtotal</td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.subtotal} />
                            </td>
                        </tr>
                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">
                                Discount
                                {order?.coupon && (
                                    <span className="bg-gray-200 p-1 rounded-md capitalize text-xs font-medium leading-3 ">
                                        {order?.coupon}
                                    </span>
                                )}
                            </td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.discount} />
                            </td>
                        </tr>
                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">Shipping</td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.shipping} />
                            </td>
                        </tr>
                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">Tax</td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.tax} />
                            </td>
                        </tr>
                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">Paid Amount</td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.paid} />
                            </td>
                        </tr>
                        <tr className="font-medium text-base border-b border-gray-300 last:border-b-0">
                            <td className="px-4 py-5  italic">Total</td>
                            <td></td>
                            <td className="flex justify-center w-full py-5 ">
                                <BDT price={order?.due} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>

            {orderDetailsLoading ? (
                <DataLoader />
            ) : (
                <div className="flex w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0  md:space-y-0 md:flex-row  items-center md:items-start ">
                        {order?.status === 'Booked' ? (
                            <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-1 xl:mt-8">
                                <BookingInformation booking={booking} />
                            </div>
                        ) : (
                            <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-1 xl:mt-8">
                                <p className="text-base font-semibold leading-4 text-center md:text-left  pb-2">
                                    Shipping Address
                                </p>
                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600 capitalize">
                                    <span className="font-semibold">
                                        Name:{' '}
                                    </span>
                                    {order?.name}
                                </p>
                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                    <span className="font-semibold">
                                        Phone:{' '}
                                    </span>
                                    {order?.phone}
                                </p>
                                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                    <span className="font-semibold">
                                        Address:{' '}
                                    </span>
                                    {order?.address}
                                </p>
                            </div>
                        )}
                    </div>
                    <PaymentAgain transaction={transaction} order={order} />
                    <div>
                        {order?.status !== 'Booked' && (
                            <OrderStatus order={order} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsSeven;

const Single = ({ item, order, orderDetailsRefetch, appStore }: any) => {
    const store_id = appStore?.id || null;

    const productId = item?.product_id;

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [product, setProduct] = useState<any>({});
    const [productLink, setproductLink] = useState<string | null>(null);

    const {
        data: productDetailsData,
        isLoading: productDetailLoading,
        isSuccess: productDetailSuccess,
    } = useGetProductDetailsQuery({ store_id, productId });

    useEffect(() => {
        if (productDetailSuccess) {
            const product = productDetailsData?.data || {};
            setProduct(product);
            setproductLink(product?.product_link);
        }
    }, [productDetailSuccess, productDetailsData]);

    // useEffect(() => {
    //     let copyText = document.querySelector('.copy-text');
    //     if (copyText !== null) {
    //         copyText
    //             .querySelector('button')
    //             ?.addEventListener('click', function () {
    //                 let input: any = copyText.querySelector('input.text');

    //                 let value = input.value;

    //                 let tempTextarea = document.createElement('textarea');
    //                 tempTextarea.value = value;

    //                 document.body.appendChild(tempTextarea);

    //                 tempTextarea.select();

    //                 document.execCommand('copy');

    //                 document.body.removeChild(tempTextarea);

    //                 copyText.classList.add('active');
    //                 setTimeout(function () {
    //                     copyText.classList.remove('active');
    //                 }, 2500);
    //             });
    //     }
    // }, [product]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(productLink ?? '').then(() => {
                setCopied(true);
                // Display the toast notification
                toast.success('Link copied!', { toastId: product?.id });
                setTimeout(() => setCopied(false), 1500); // Reset "copied" status after 2 seconds
            });
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };

    return (
        <tr className="border-b border-gray-300 last:border-b-0">
            <td>
                <img
                    src={productImg + product?.image}
                    alt=""
                    className="max-h-20"
                />
            </td>
            <td className="px-4 py-5 w-full">
                <div className="flex items-center gap-x-3">
                    <Link
                        href={'/product/' + product?.id + '/' + product?.slug}
                    >
                        <p className="text-xs sm:text-base">{product?.name}</p>
                    </Link>
                </div>
                <p className="text-xs sm:text-sm mt-1">
                    Quantity: {item?.quantity}
                </p>
                <div className="flex flex-wrap justify-start items-start gap-2 mt-1 text-xs sm:text-sm">
                    {item?.color ? (
                        <div className="flex gap-2 items-center">
                            <p className="text-xs sm:text-sm leading-none text-gray-600">
                                Color:
                            </p>
                            <p
                                style={{ backgroundColor: item?.color }}
                                className="w-3 h-3 rounded-full ring-1 ring-offset-2 ring-gray-600"
                            ></p>
                        </div>
                    ) : null}
                    {item?.size ? (
                        <p className="text-xs sm:text-sm leading-none text-gray-800">
                            <span className="text-gray-600">Size: </span>{' '}
                            {item?.size}
                        </p>
                    ) : null}
                    {item?.unit ? (
                        <p className="text-xs sm:text-sm leading-none text-gray-800">
                            <span className="text-gray-600">Unit: </span>
                            {item?.volume} {item?.unit}
                        </p>
                    ) : null}
                </div>
                {(order?.status === 'Payment Success' ||
                    order?.status === 'Delivered') &&
                    productLink && (
                        <div className="copy-text w-full">
                            <input
                                type="text"
                                className="text"
                                value={productLink ?? ''}
                                readOnly
                                disabled
                            />
                            <button
                                className={`px-2 py-2 font-semibold rounded-lg transition-all duration-300 ${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                onClick={copyToClipboard}
                            >
                                <FaCopy />
                            </button>
                        </div>
                    )}
            </td>
            <td className="py-5 flex flex-col justify-center items-center gap-1 w-full font-medium text-base">
                <div>
                    <BDT
                        price={
                            (Number(item?.price) +
                                Number(item?.additional_price)) *
                            item?.quantity
                        }
                    />
                </div>
                {order?.status === 'Delivered' && item?.review === 0 && (
                    <button
                        onClick={() => setOpen(true)}
                        className="py-1 px-1 mt-1 border border-transparent text-xs rounded-sm text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-0"
                    >
                        {'Review'}
                    </button>
                )}
                {order?.status === 'Delivered' && item?.review === 1 && (
                    <p className="py-1 px-1 mt-1 text-xs text-white bg-green-500 rounded-sm text-center cursor-default">
                        Review submitted
                    </p>
                )}
                <GiveReview
                    open={open}
                    setOpen={setOpen}
                    item={item}
                    orderDetailsRefetch={orderDetailsRefetch}
                    appStore={appStore}
                />
            </td>
        </tr>
    );
};

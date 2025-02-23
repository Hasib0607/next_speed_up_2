'use client';

import Link from 'next/link';

import React, { useEffect, useState } from 'react';

import { setStatusBtn } from '@/redux/features/filters/filterSlice';
import {
    useOrderCancelMutation,
    useOrderStatusQuery,
    useUserOrdersQuery,
} from '@/redux/features/user/userApi';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import moment from 'moment';

export const cancelAlert = (setCancel: any) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
        if (result.isConfirmed) {
            setCancel(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            toast.warning('Order not canceled');
        }
    });
};

const Order = ({ design, appStore }: any) => {
    const [orders, setOrders] = useState<any>([]);
    const [filter, setFilter] = useState<any>([]);

    const { statusBtn } = useSelector((state: any) => state?.filters);
    const store_id = appStore?.id || null;

    const dispatch = useDispatch();

    const {
        data: userOrdersData,
        isLoading: userOrdersLoading,
        isSuccess: userOrdersSuccess,
        refetch: userOrdersRefetch,
    } = useUserOrdersQuery({ store_id });

    const {
        data: orderStatusData,
        isLoading: orderStatusLoading,
        isSuccess: orderStatusSuccess,
    } = useOrderStatusQuery({});
    const orderStatus = orderStatusData?.data || [];

    const statusArr = orderStatus?.map((item: any) => item?.name).sort();
    statusArr.unshift('All');

    const getFilter = (status: any) => {
        dispatch(setStatusBtn(status));
        if (status === 'All') {
            setFilter(orders);
        } else {
            setFilter(orders.filter((i: any) => i.status === status));
        }
    };

    useEffect(() => {
        if (userOrdersSuccess) {
            const userOrders = userOrdersData?.data || [];
            setOrders(userOrders);
            setFilter([...userOrders]);
        }
    }, [userOrdersData, userOrdersSuccess]);

    return (
        <>
            <div>
                <div className="sm:px-6 w-full">
                    <div className="px-4 md:px-10 py-2 md:py-4">
                        <div className="flex items-center justify-between">
                            <p
                                className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal ${
                                    design?.template_id === '34'
                                        ? 'text-gray-300'
                                        : 'text-gray-800'
                                }`}
                            >
                                Your Orders
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${
                            design?.template_id === '34'
                                ? 'bg-thirty-one'
                                : 'bg-white'
                        } py-4 md:py-7 px-4 md:px-8 xl:px-10`}
                    >
                        <div className="sm:flex items-center justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                {statusArr.map((i: any, index: any) => (
                                    <div
                                        key={index}
                                        onClick={() => getFilter(i)}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={`${
                                                statusBtn === i
                                                    ? 'bg-indigo-100 text-indigo-700'
                                                    : null
                                            } py-2 px-8 font-medium bg-gray-100 text-gray-700 rounded-full`}
                                        >
                                            <p>{i}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-7 overflow-x-auto">
                            {filter?.length === 0 ? (
                                <div className="flex justify-center items-center h-[300px] font-semibold text-2xl text-gray-400">
                                    {' '}
                                    Order Not found
                                </div>
                            ) : (
                                <table className="min-w-full text-center">
                                    <thead
                                        className={`border-b ${
                                            design?.template_id === '34'
                                                ? 'text-gray-300'
                                                : 'text-gray-800'
                                        }`}
                                    >
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium px-6 py-4"
                                            >
                                                Order#
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium px-6 py-4"
                                            >
                                                Purchased On
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium px-6 py-4"
                                            >
                                                Amount
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium px-6 py-4"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-sm font-medium px-6 py-4"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filter?.map(
                                            (order: any, index: any) => (
                                                <OrderItem
                                                    key={index}
                                                    statusBtn={statusBtn}
                                                    item={order}
                                                    userOrdersRefetch={
                                                        userOrdersRefetch
                                                    }
                                                />
                                            )
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

type Status =
    | 'Pending'
    | 'Shipping'
    | 'Paid'
    | 'Payment Cancel'
    | 'Payment Success'
    | 'Processing'
    | 'Delivered'
    | 'Returned'
    | 'Cancelled'
    | 'Payment Failed'
    | 'On Hold';

const OrderItem = ({ item, userOrdersRefetch }: any) => {
    const [orderCancel] = useOrderCancelMutation();
    const [callCancel, setCallCancel] = useState<boolean>(false);

    const formattedDate = moment(item?.created_at).format(
        'DD-MM-YYYY, hh:mm:ss'
    );

    const statusColors: Record<Status, string> = {
        Pending: 'bg-purple-100 border-purple-200',
        Shipping: 'bg-blue-100 border-blue-200',
        Paid: 'bg-orange-100 border-orange-200',
        'Payment Cancel': 'bg-orange-300 border-orange-400',
        'Payment Success': 'bg-green-200 border-green-400',
        Processing: 'bg-indigo-100 border-indigo-200',
        Delivered: 'bg-green-100 border-green-200',
        Returned: 'bg-yellow-100 border-yellow-200',
        Cancelled: 'bg-red-200 border-red-200',
        'Payment Failed': 'bg-pink-300 border-pink-300',
        'On Hold': 'bg-gray-100 border-gray-200',
    };

    // Get the color dynamically based on the status
    const getStatusColor = (status: Status) =>
        statusColors[status] || 'bg-white border-gray-100';

    // Example usage
    const status = item?.status;
    const order_id = item?.id;

    const dynamicColorByStatus = getStatusColor(status);

    useEffect(() => {
        if (callCancel) {
            orderCancel({ order_id: order_id })
                .unwrap()
                .then((res: any) => {
                    if (res?.status) {
                        userOrdersRefetch(); // Toggle call state to trigger useEffect
                        toast.success(res?.message);
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your order has been cancelled.',
                            icon: 'success',
                        });
                    } else {
                        toast.error('Failed to cancel the order');
                        Swal.fire({
                            title: 'Failed!',
                            text: 'Your order could not be cancelled.',
                            icon: 'error',
                        });
                    }
                })
                .catch((error: any) => {
                    toast.error('An error occurred');
                    Swal.fire({
                        title: 'Error!',
                        text: 'An error occurred while cancelling the order.',
                        icon: 'error',
                    });
                });
        }
    }, [callCancel, order_id]);

    return (
        <tr className={`${dynamicColorByStatus} border-b`}>
            {/* order reference no  */}
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                <Link href={'/profile/order/' + item?.id}>
                    #{item?.reference_no}
                </Link>
            </td>
            {/* date  */}
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {formattedDate}
            </td>
            {/* ammount  */}
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {item?.subtotal}
            </td>
            {/* status  */}
            <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                {item?.status}
            </td>

            {/* actions */}
            <td className="text-sm text-gray-900 font-medium space-x-2 py-4 whitespace-nowrap">
                <Link
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-400 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    href={'/profile/order/' + item?.id}
                >
                    {'View'}
                </Link>
                {item?.status !== 'Cancelled' &&
                item?.status !== 'Delivered' &&
                item?.status !== 'Shipping' ? (
                    <button
                        onClick={() => cancelAlert(setCallCancel)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {'Cancel Request'}
                    </button>
                ) : null}
            </td>
        </tr>
    );
};

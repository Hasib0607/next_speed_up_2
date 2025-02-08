import OrderDetails from '@/components/OrderDetails';
import getStore from '@/utils/fetcher/getStore';
import React from 'react';

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ order_id: any }>;
}) {
    const appStore = await getStore();
    const order_id = (await params).order_id;

    return <OrderDetails appStore={appStore} order_id={order_id} />;
}

import OrderComponent from '@/components/OrderComponent';
import React from 'react';
import getStore from '@/utils/fetcher/getStore';
import getDesign from '@/utils/fetcher/getDesign';

export default async function OrderPage() {
    const design = await getDesign();
    const appStore = await getStore();

    return <OrderComponent design={design} appStore={appStore} />;
}

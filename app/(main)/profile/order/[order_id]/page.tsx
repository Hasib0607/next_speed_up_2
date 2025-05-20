import OrderDetails from '@/components/OrderDetails';
import { getInitialAppData } from '@/lib/getInitialAppData';

export default async function OrderDetailsPage({
    params,
}: {
    params: Promise<{ order_id: any }>;
}) {
    const { appStore,paramsResult } = await getInitialAppData({
        appStore: true,paramsResult:true
    },params);

    const order_id = paramsResult.order_id;

    return <OrderDetails appStore={appStore} order_id={order_id} />;
}
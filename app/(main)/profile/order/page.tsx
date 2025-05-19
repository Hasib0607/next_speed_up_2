import OrderComponent from '@/components/OrderComponent';
import { getInitialAppData } from '@/lib/getInitialAppData';

export default async function OrderPage() {
    const { design, appStore } = await getInitialAppData({
        design: true,
        appStore: true,
    });

    return <OrderComponent design={design} appStore={appStore} />;
}

import OrderComponent from '@/components/OrderComponent';
import React from 'react';
import getStore from '@/utils/fetcher/getStore';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import EbitansAnalytics from '@/components/EbitansAnalytics';

export default async function OrderPage() {
    const design = await getDesign();
    const appStore = await getStore();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();
    
    return (
        <>
            <OrderComponent design={design} appStore={appStore} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

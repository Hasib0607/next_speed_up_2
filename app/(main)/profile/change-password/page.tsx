import React from 'react';
import getDesign from '@/utils/fetcher/getDesign';
import getStore from '@/utils/fetcher/getStore';
import ChangePassword from '@/components/ChangePassword';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';
import EbitansAnalytics from '@/components/EbitansAnalytics';

export default async function ChangePasswordPage() {
    const design = await getDesign();
    const appStore = await getStore();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();
    return (
        <>
            <ChangePassword design={design} appStore={appStore} />
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

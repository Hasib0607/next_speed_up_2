import React from 'react';
import getDesign from '@/utils/fetcher/getDesign';
import getStore from '@/utils/fetcher/getStore';
import ChangePassword from '@/components/ChangePassword';

export default async function ChangePasswordPage() {
    const design = await getDesign();
    const appStore = await getStore();
    return <ChangePassword design={design} appStore={appStore} />;
}

import { DEFAULT } from '@/consts';
import GuestLayer from '@/app/GuestLayer';
import { redirect } from 'next/navigation';
import { register_pages } from '@/utils/dynamic-import/registerPages/registerPages';
import getModuleStatus from '@/utils/fetcher/getModuleStatus';

export default async function Register({
    design,
    appStore,
    headersetting,
}: any) {
    const module_id = 120;
    const store_id = appStore?.id || null;
    const activeModule = await getModuleStatus(store_id, module_id);

    const RegisterComponent =
        register_pages[design?.login_page] || register_pages[DEFAULT];

    if (appStore?.auth_type === 'EasyOrder' && !activeModule) {
        redirect('/login');
    }

    return (
        <GuestLayer>
            {design?.login_page !== 'null' && RegisterComponent && (
                <RegisterComponent
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                    activeModule={activeModule}
                />
            )}
        </GuestLayer>
    );
}

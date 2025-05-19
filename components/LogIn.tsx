import { AFFILIATE_MARKETING, DEFAULT } from '@/consts';
import GuestLayer from '@/app/GuestLayer';
import { login_pages } from '@/utils/dynamic-import/logInPages/logInPages';
import getModuleStatus from '@/utils/fetcher/getModuleStatus';

export default async function LogIn({ design, appStore, headersetting }: any) {
    const storeId = appStore?.id || null;
    const activeModule = await getModuleStatus(storeId, AFFILIATE_MARKETING);

    const SignInComponent =
        login_pages[design?.login_page] || login_pages[DEFAULT];

    return (
        <GuestLayer>
            {design?.login_page !== 'null' && SignInComponent && (
                <SignInComponent
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                    activeModule={activeModule}
                />
            )}
        </GuestLayer>
    );
}

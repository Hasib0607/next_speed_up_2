import PasswordForgot from '@/components/PasswordForgot';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getStore from '@/utils/fetcher/getStore';

export default async function ForgetPasswordPage() {
    const appStore = await getStore();
    const design = await getDesign();
    const headersetting = await getHeaderSetting();

    return (
        <PasswordForgot
            design={design}
            appStore={appStore}
            headersetting={headersetting}
        />
    );
}

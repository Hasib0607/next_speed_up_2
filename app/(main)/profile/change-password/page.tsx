import { getInitialAppData } from '@/lib/getInitialAppData';
import ChangePassword from '@/components/ChangePassword';

export default async function ChangePasswordPage() {
    const { design, appStore } = await getInitialAppData({
        design: true,
        appStore: true,
    });
    return <ChangePassword design={design} appStore={appStore} />;
}

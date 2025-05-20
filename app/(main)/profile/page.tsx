import { getInitialAppData } from '@/lib/getInitialAppData';
import ProfileComponent from '@/components/Profile';

export default async function Profile() {
    const { design, appStore } = await getInitialAppData({
        design: true,
        appStore: true,
    });

    return <ProfileComponent design={design} appStore={appStore} />;
}

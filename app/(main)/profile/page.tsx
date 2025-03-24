import ProfileComponent from '@/components/Profile';
import getDesign from '@/utils/fetcher/getDesign';
import getStore from '@/utils/fetcher/getStore';

export default async function Profile() {
    const design = await getDesign();
    const appStore = await getStore();

    return <ProfileComponent design={design} appStore={appStore} />;
}

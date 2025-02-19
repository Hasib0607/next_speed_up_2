import CustomPage from '@/components/CustomPage';
import getDesign from '@/utils/fetcher/getDesign';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';

export default async function HelpPage() {
    const design = await getDesign();
    const menu = await getMenu();
    const page = await getPage();

    return <CustomPage design={design} menu={menu} page={page} />;
}

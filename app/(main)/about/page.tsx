import About from '@/components/About';
import getDesign from '@/utils/fetcher/getDesign';
import getMenu from '@/utils/fetcher/getMenu';
import getPage from '@/utils/fetcher/getPage';

export default async function AboutPage() {
    const design = await getDesign();
    const menu = await getMenu();
    const page = await getPage();

    return <About design={design} menu={menu} page={page} />;
}

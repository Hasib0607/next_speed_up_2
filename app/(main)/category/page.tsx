import Shop from '@/components/Shop';
import getDesign from '@/utils/fetcher/getDesign';

export default async function CategoryPage() {
    const design = await getDesign();

    return <Shop design={design} />;
}

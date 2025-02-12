import Shop from '@/components/Shop';
import getDesign from '@/utils/fetcher/getDesign';
import ResetFilter from '@/utils/ResetFilter';

export default async function CategoryPage() {
    const design = await getDesign();

    return (
        <>
            <ResetFilter />
            <Shop design={design} />
        </>
    );
}

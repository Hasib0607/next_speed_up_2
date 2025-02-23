import Offer from '@/components/Offer';
import getDesign from '@/utils/fetcher/getDesign';

export default async function OfferPage() {
    const design = await getDesign();
    return <Offer design={design} />;
}

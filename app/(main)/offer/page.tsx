import Offer from '@/components/Offer';
import getDesign from '@/utils/fetcher/getDesign';

import React from "react";


export default async function OfferPage() {
    const design = await getDesign();
    return <Offer design={design} />;
}

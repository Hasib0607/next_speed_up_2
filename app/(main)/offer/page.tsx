import { cookies } from 'next/headers';
import Offer from '@/components/Offer';
import { imgUrl } from '@/site-settings/siteUrl';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getDesign from '@/utils/fetcher/getDesign';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';

import React from 'react';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Offer`,
        icons: { icon: imgUrl + headersetting?.favicon },
    };
}

export default async function OfferPage() {
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    return (
        <>
            <Offer design={design} />;
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
}

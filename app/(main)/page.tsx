import dynamic from 'next/dynamic';

const RenderSection = dynamic(
    () => import('@/components/_homepage/render-section')
);

import { getInitialAppData } from '@/lib/getInitialAppData';

export default async function Home() {
    const initialAppData = await getInitialAppData({
        layout: true,
    });

    const layout = initialAppData.layout;

    return (
        layout.length > 0 &&
        layout?.map((section: any, index: number) => {
            return <RenderSection key={index} sections={section} />;
        })
    );
}

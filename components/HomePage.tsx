'use client';

import dynamic from 'next/dynamic';
import Loading from '@/app/loadingx';
import { useGetLayoutQuery } from '@/redux/features/home/homeApi';

const RenderSection = dynamic(
    () => import('@/components/_homepage/render-section')
);

const HomePage = ({ design,headersetting }: any) => {
    const {
        data: layoutData,
        isLoading,
        isError,
        isSuccess,
    } = useGetLayoutQuery({});
    const layout = layoutData?.data || [];

    if (isError) {
        throw new Error('Failed to fetch HomePage data!');
    }

    if (isLoading && !isError) {
        return <Loading design={design} />;
    }

    let content = (
        <>
            {layout?.length > 0 &&
                design &&
                layout?.map((component: any, index: number) => (
                    <RenderSection
                        key={index}
                        component={component}
                        design={design}
                        headersetting ={headersetting}
                    />
                ))}
        </>
    );

    if (!isLoading && isSuccess && layout) {
        return content;
    }
};

export default HomePage;

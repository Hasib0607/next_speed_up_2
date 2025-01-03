'use client';

import dynamic from 'next/dynamic';

import { useGetLayoutQuery } from '@/redux/features/home/homeApi';
import Loading from '@/app/loadingx';


const RenderSection = dynamic(
    () => import('@/components/_homepage/render-section')
);

const HomePage = ({design}:any) => {
    const {
        data: layoutData,
        isLoading,
        isError,
        isSuccess,
    } = useGetLayoutQuery({});
    const layout = layoutData?.data || [];

    if (isError) {
        return null;
    }

    if (isLoading && !isError) {
        return <Loading design={design}/>;
    }

    let content = (
        <>
            {layout &&
                layout?.length > 0 &&
                layout?.map((item: any, index: number) => (
                    <RenderSection key={index} component={item} design={design} />
                ))}
        </>
    );

    if (!isLoading && isSuccess) {
        return content;
    }
};

export default HomePage;

'use client';

import dynamic from 'next/dynamic';

import { useGetLayoutQuery } from '@/redux/features/home/homeApi';
import Loading from '@/app/loadingx';
import { useSelector } from 'react-redux';


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

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state

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
                    <RenderSection key={index} component={item} design={design} appStore={store} />
                ))}
        </>
    );

    if (!isLoading && isSuccess) {
        return content;
    }
};

export default HomePage;

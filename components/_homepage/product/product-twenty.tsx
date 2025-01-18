'use client';

import dynamic from 'next/dynamic';

const Card44 = dynamic(() => import('@/components/card/card44'), {
    ssr: false,
});
const SectionHeadingTwentyFour = dynamic(
    () => import('@/components/section-heading/section-heading-twenty-four')
);

import { useEffect, useState } from 'react';

import Skeleton from '@/components/loaders/skeleton';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { useSelector } from 'react-redux';

const ProductTwenty = ({ category, design, categoryId }: any) => {
    const [active, setActive] = useState(0);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState(categoryId);

    const headerdata = useSelector((state: any) => state.home.header); // Access updated Redux state

    const { custom_design } = headerdata || {};
    const product = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = product || {};

    const { data, isLoading, isFetching, isError, isSuccess } =
        useGetCategoryProductQuery(
            { id },
            {
                // pollingInterval: 3000,
                // refetchOnMountOrArgChange: false,
                // skip:false
            }
        );

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.products);
        }
    }, [data, isSuccess]);

    const styleCss = `
    .active-cat-twenty-four {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
 `;

    let content;

    if ((isLoading || isFetching) && !isError) {
        content = <Skeleton count={3} />;
    }

    if (isSuccess && products?.length > 0) {
        content = (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {products?.slice(0, 8)?.map((productData: any) => (
                    <div key={productData.id}>
                        <Card44 item={productData} productId={productData.id} />
                    </div>
                ))}
            </div>
        );
    }

    if (isSuccess && products?.length == 0) {
        content = (
            <div className="text-red-500 text-center py-10 text-4xl">
                No Products Available
            </div>
        );
    }

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full mx-auto">
            <style>{styleCss}</style>

            <div>
                <SectionHeadingTwentyFour
                    title={title || 'POPULAR PRODUCTS'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
            </div>

            <div className="flex flex-wrap gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5 justify-center">
                {category?.slice(0, 5).map((item: any, index: any) => (
                    <div key={item.id}>
                        <h1
                            className={`${
                                active === index ? 'active-cat-twenty-four' : ''
                            } px-5 py-1 pb-6 mt-2 border-b-2 border-transparent`}
                            onClick={() => {
                                setActive(index);
                                setId(item?.id);
                            }}
                        >
                            {item.name}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="h-[2px] w-full bg-gray-300 mb-5 -mt-0.5"></div>
            {content}
        </div>
    );
};

export default ProductTwenty;

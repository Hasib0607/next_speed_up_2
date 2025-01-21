'use client';

import { RootState } from '@/redux/store';
import dynamic from 'next/dynamic';
const SectionHeadingSeven = dynamic(
    () => import('@/components/section-heading/section-heading-seven')
);

const Card12 = dynamic(() => import('../../card/card12'), { ssr: false });

import { useSelector } from 'react-redux';

const NewArrivalProductSeven = ({ product }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headerdata || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <SectionHeadingSeven
                title={title || 'New Arrivals'}
                subtitle={''}
                titleColor={title_color || '#000'}
            />

            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-2 ">
                {product?.length > 0 &&
                    product
                        ?.slice(0, 10)
                        .map((productData: any) => (
                            <Card12
                                store_id={store_id}
                                item={productData}
                                key={productData.id}
                                productId={productData.id}
                            />
                        ))}
            </div>
        </div>
    );
};

export default NewArrivalProductSeven;

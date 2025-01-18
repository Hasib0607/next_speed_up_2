'use client';

import dynamic from 'next/dynamic';
const SectionHeadingSeven = dynamic(
    () => import('@/components/section-heading/section-heading-seven')
);

const Card12 = dynamic(() => import('../card/card12'), { ssr: false });

import { useSelector } from 'react-redux';

const NewArrivalProductSeven = ({ product, store_id }: any) => {
    const headerdata = useSelector((state: any) => state.home.header); // Access updated Redux state
    const { custom_design } = headerdata || {};

    const newArrivalProduct = custom_design?.new_arrival_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    // if (error) {
    //   return <p>error from new arrival product</p>;
    // }

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

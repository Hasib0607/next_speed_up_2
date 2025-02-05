import dynamic from 'next/dynamic';
const SectionHeadingSeven = dynamic(
    () => import('@/components/section-heading/section-heading-seven')
);
const Card12 = dynamic(() => import('@/components/card/card12'));

const NewArrivalProductSeven = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

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
                        ?.map((productData: any) => (
                            <Card12
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

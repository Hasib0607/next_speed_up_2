import SectionHeading from '@/components/section-heading/section-heading';
import ProductCardEight from '@/components/card/product-card/product-card-eight';

const ProductFour = ({ product, design, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="bg-gray-50 sm:py-10 py-5">
            <div className="sm:container px-5 mx-auto">
                <div className="py-6">
                    <SectionHeading
                        title_color={title_color || '#000'}
                        text={title || 'Products'}
                        design={design}
                    />
                </div>
                <div className="shadow-lg drop-shadow-lg bg-white ">
                    <div className="">
                        <div className="flex justify-center py-5 sm:py-10  ">
                            <div className="flex flex-wrap gap-8 justify-center">
                                {product?.length > 0 &&
                                    product
                                        ?.slice(0, 10)
                                        ?.map((item: any) => (
                                            <ProductCardEight
                                                item={item}
                                                key={item.id}
                                            />
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFour;

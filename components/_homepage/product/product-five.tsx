import Card5 from '@/components/card/card5';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';

const ProductFive = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-white ">
            <div className="container px-5 mx-auto">
                <SectionHeadingFive
                    title={title || 'Product'}
                    title_color={title_color || '#000'}
                />
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 justify-center">
                        {product?.length > 0 &&
                            product
                                ?.slice(0, 12)
                                ?.map((item: any, id: any) => (
                                    <Card5 item={item} key={id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductFive;

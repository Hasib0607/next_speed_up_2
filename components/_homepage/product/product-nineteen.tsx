import Card39 from '@/components/card/card39';
import SectionHeadingNineteen from '@/components/section-heading/section-heading-nineteen';

const ProductNineteen = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div style={{ background: '#f2efe4' }}>
            <div className="sm:container px-5">
                <div className="py-16">
                    <SectionHeadingNineteen
                        title={title || 'PRODUCT CATEGORIES'}
                        title_color={title_color || '#000'}
                        subtitle={'Add products to weekly line up'}
                    />
                    <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-8 pt-10">
                        {product?.length > 0 &&
                            product
                                ?.slice(0, 9)
                                ?.map((data: any) => (
                                    <Card39 item={data} key={data?.id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductNineteen;

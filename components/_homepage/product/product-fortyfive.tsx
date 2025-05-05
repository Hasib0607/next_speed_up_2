import Card76 from '@/components/card/card76';

const ProductFortyFive = ({ product, headersetting, design }: any) => {
    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <>
            <div className="container my-9">
                <h4
                    style={{ color: title_color }}
                    className="font-semibold text-3xl text-center uppercase mx-4 md:m-0"
                >
                    {title || 'Products'}
                </h4>
            </div>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 sm:px-4">
                    {product?.map((item: any, id: any) => (
                        <Card76 item={item} key={id} design={design} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductFortyFive;

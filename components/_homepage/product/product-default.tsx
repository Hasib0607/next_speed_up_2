import Card14 from '@/components/card/card14';

const DefaultProduct = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <>
            <div className="container my-9">
                <h4
                    style={{ color: title_color }}
                    className="font-semibold text-3xl text-left mx-4 md:m-0"
                >
                    {title || 'Products'}
                </h4>
            </div>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 sm:px-4">
                    {product
                        ?.slice(0, 8)
                        ?.map((item: any, id: any) => (
                            <Card14 item={item} key={id} />
                        ))}
                </div>
            </div>
        </>
    );
};

export default DefaultProduct;

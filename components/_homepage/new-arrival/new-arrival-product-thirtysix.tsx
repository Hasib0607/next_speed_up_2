import Card63 from '../../card/card63';

const NewArrivalProductThirtySix = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="text-center py-10 flex items-center justify-center">
                <p
                    style={{ color: title_color }}
                    className="text-xl xl:text-2xl"
                >
                    {title}
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 gap-2.5 lg:gap-0">
                {product?.length > 0 &&
                    product
                        ?.slice(0, 10)
                        ?.map((item: any) => (
                            <Card63 item={item} key={item.id} />
                        ))}
            </div>
        </div>
    );
};

export default NewArrivalProductThirtySix;

import Card17 from '../../card/card17';
import SectionHeadingSeven from '../../section-heading/section-heading-seven';

const NewArrivalProductTwelve = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <SectionHeadingSeven
                title={title}
                subtitle={''}
                titleColor={title_color || '#000'}
            />
            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 lg2:grid-cols-4 md:grid-cols-3 gap-5 ">
                {product?.length > 0 &&
                    product
                        ?.slice(0, 10)
                        ?.map((productData: any) => (
                            <Card17 item={productData} key={productData.id} />
                        ))}
            </div>
        </div>
    );
};

export default NewArrivalProductTwelve;

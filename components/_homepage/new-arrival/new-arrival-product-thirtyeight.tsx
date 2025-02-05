'use client';
import Card65 from '../../card/card65';

const NewArrivalProductThirtyEight = ({ product, headersetting }: any) => {
    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};    

    return (
        <div className="py-5 sm:py-10 bg-[#F2F4F8]">
            <div className="container px-5">
                <div className="text-center pb-10">
                    <p
                        style={{ color: title_color }}
                        className="font-bold text-[20px]"
                    >
                        {title}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
                        {product?.length > 0 &&
                            product
                                ?.slice(0, 12)
                                ?.map((item: any, id: any) => (
                                    <Card65 item={item} key={id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivalProductThirtyEight;

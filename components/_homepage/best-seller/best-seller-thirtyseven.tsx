'use client';

import img from '@/assets/bg-image/thirtySeven/MARGIN.png';
import Card64 from '@/components/card/card64';

const BestSellerThirtySeven = ({ best_sell_product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    if (best_sell_product.length === 0) {
        return null;
    }
    return (
        <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
            <div className="container px-5">
                <div>
                    <img src={img.src} alt="margin" className="mx-auto" />
                    <h1
                        style={{ color: title_color }}
                        className="text-2xl text-center"
                    >
                        {title}
                    </h1>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
                        {best_sell_product?.length > 0 &&
                            best_sell_product
                                ?.slice(0, 12)
                                ?.map((item: any, id: any) => (
                                    <Card64 item={item} key={id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellerThirtySeven;

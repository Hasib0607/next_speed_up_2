'use client';
import Card65 from '@/components/card/card65';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const BestSellerThirtyEight = ({ best_sell_product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;
    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    if (best_sell_product.length === 0) {
        return null;
    }

    return (
        <div className="py-5 sm:py-10 bg-[#F2F4F8]">
            <div className="container px-5">
                <div className="text-center pb-10">
                    <p
                        style={{
                            color: title_color,
                        }}
                        className="font-bold text-[20px]"
                    >
                        {title}
                    </p>
                    <p className="text-[15px] mt-1">
                        Check & Get Your Desired Product!
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
                        {best_sell_product
                            ?.slice(0, 12)
                            .map((item: any, id: any) => (
                                <Card65
                                    item={item}
                                    key={id}
                                    design={design}
                                    store_id={store_id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellerThirtyEight;

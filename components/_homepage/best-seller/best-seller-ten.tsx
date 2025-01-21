'use client';
import Card21 from '@/components/card/card21';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const BestSellerTen = ({ best_sell_product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <SectionHeadingSeventeen
                title_color={title_color || '#000'}
                title={title || 'Popular Products'}
                subtitle={''}
            />
            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-4 ">
                {best_sell_product
                    ?.slice(0, 8)
                    ?.map((item: any) => (
                        <Card21
                            item={item}
                            key={item?.id}
                            design={design}
                            store_id={store_id}
                        />
                    ))}
            </div>
        </div>
    );
};

export default BestSellerTen;

import { DEFAULT } from '@/consts';
import { getInitialAppData } from '@/lib/getInitialAppData';
// import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';
import { best_sell_products } from '@/utils/dynamic-import/_homepageSections/bestSellProduct/bestSellProduct';

const BestSellProduct = async ({ design, headersetting, products }: any) => {
    const store_id = design?.store_id || null;

    const BestSellProductComponent =
        best_sell_products[design?.best_sell_product] ||
        best_sell_products[DEFAULT];

    const { bestSellProducts } = await getInitialAppData({
        bestSellProducts: true,
    });

    // const {
    //     data: bestSellProductData,
    //     isLoading: bestSellProductLoading,
    //     isSuccess: bestSellProductSuccess,
    // } = useGetBestSellProductQuery({});
    // const best_sell_product = bestSellProductData?.data || [];

    return (
        design?.best_sell_product !== 'null' &&
        BestSellProductComponent && (
            <BestSellProductComponent
                best_sell_product={bestSellProducts}
                design={design}
                headersetting={headersetting}
                store_id={store_id}
                product={products}
            />
        )
    );
};

export default BestSellProduct;

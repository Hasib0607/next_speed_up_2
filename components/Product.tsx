import { DEFAULT } from '@/consts';
import { all_products } from '@/utils/dynamic-import/_homepageSections/product/product';
// import { numberParser } from '@/helpers/numberParser';
import { getInitialAppData } from '@/lib/getInitialAppData';

const Product = async ({
    design,
    headersetting,
    products,
    category,
    banner,
}: any) => {
    const ProductComponent =
        all_products[design?.product] || all_products[DEFAULT];

    // const { data: categoryData } = useGetCategoryQuery({});
    // const category = categoryData?.data || [];

    const { featureProduct, bestSellProducts } = await getInitialAppData({
        featureProduct: true,
        bestSellProducts: true,
    });

    // const products = useSelector((state: RootState) => state?.products);
    // const product = products?.product || [];

    // const bannerType =
    //     banner?.filter((item: any) => numberParser(item?.type) === 0) || [];

    // const {
    //     data: bestSellProductData,
    //     isLoading: bestSellProductLoading,
    //     isSuccess: bestSellProductSuccess,
    // } = useGetBestSellProductQuery({});
    // const best_sell_product = bestSellProductData?.data || [];

    // const {
    //     data: featureProductData,
    //     isLoading: featureProductLoading,
    //     isSuccess: featureProductSuccess,
    // } = useGetFeatureProductQuery({});
    // const feature_product = featureProductData?.data || [];

    return (
        design?.product !== 'null' &&
        category?.length > 0 &&
        ProductComponent && (
            <ProductComponent
                design={design}
                headersetting={headersetting}
                product={products}
                category={category}
                categoryId={category[0]?.id}
                feature_product={featureProduct}
                best_sell_product={bestSellProducts}
                banner={banner}
            />
        )
    );
};

export default Product;

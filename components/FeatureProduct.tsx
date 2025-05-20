import { DEFAULT } from '@/consts';
import { getInitialAppData } from '@/lib/getInitialAppData';
// import { useGetFeatureProductQuery } from '@/redux/features/products/productApi';
import { feature_products } from '@/utils/dynamic-import/_homepageSections/featureProduct/featureProduct';

const FeatureProduct = async ({ design, headersetting, products }: any) => {
    const FeatureProductComponent =
        feature_products[design?.feature_product] ?? feature_products[DEFAULT];

    const { featureProduct } = await getInitialAppData({
        featureProduct: true,
    });
    // const {
    //     data: featureProductData,
    //     isLoading: featureProductLoading,
    //     isSuccess: featureProductSuccess,
    // } = useGetFeatureProductQuery({});
    // const feature_product = featureProductData?.data || [];

    return (
        design?.feature_product !== 'null' &&
        FeatureProductComponent && (
            <FeatureProductComponent
                design={design}
                headersetting={headersetting}
                feature_product={featureProduct}
                product={products}
            />
        )
    );
};

export default FeatureProduct;

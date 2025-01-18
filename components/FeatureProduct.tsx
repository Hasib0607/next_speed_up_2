import { DEFAULT } from '@/consts';
import { feature_products } from '@/utils/dynamic-import/_homepageSections/featureProduct/featureProduct';

import { useGetFeatureProductQuery } from '@/redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const FeatureProduct = ({ design, store_id }: any) => {
    const FeatureProductComponent =
        feature_products[design?.feature_product] || feature_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const home = useSelector((state: RootState) => state?.home);

    const product = products?.product || [];

    const banner = home?.banner || [];

    const {
        data: featureProductData,
        isLoading: featureProductLoading,
        isSuccess: featureProductSuccess,
    } = useGetFeatureProductQuery({});
    const feature_product = featureProductData?.data || [];

    return (
        <>
            {feature_product?.length > 3 &&
                FeatureProductComponent &&
                featureProductSuccess && (
                    <>
                        {
                            <FeatureProductComponent
                                design={design}
                                store_id={store_id}
                                feature_product={feature_product}
                                product={product}
                                banner={banner}
                            />
                        }
                    </>
                )}
        </>
    );
};

export default FeatureProduct;

{
    /* {theme === "two" && (
    <FeatureProductFour
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "four" && (
    <FeatureProductFour
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "five" && (
    <FeatureProductFive feature_product={feature_product} />
  )}
  {theme === "six" && (
    <FeatureProductSix product={product} store_id={store_id} />
  )} */
}
{
    /* {theme === "seven" && (
    <FeatureProductSeven
      store_id={store_id}
      feature_product={feature_product}
    />
  )} */
}
{
    /* {theme === "nine" && (
    <FeatureProductNine feature_product={feature_product} design={design} />
  )}
  {theme === "eleven" && (
    <FeatureProductEight
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twelve" && (
    <FeatureProductTwelve
      feature_product={feature_product}
      design={design}
    />
  )}
  {theme === "thirteen" && (
    <FeatureProductThirteen
      feature_product={feature_product}
      store_id={store_id}
    />
  )}
  {theme === "sixteen" && (
    <FeatureProductSixteen
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}

  {theme === "seventeen" && (
    <FeatureProductSeventeen
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "eighteen" && (
    <FeatureProductEighteen
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "nineteen" && (
    <FeatureProductNineteen
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twenty" && (
    <FeatureProductTwenty
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentyone" && (
    <FeatureProductTwentyOne
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentytwo" && <FeatureProductTwentyTwo product={product} />}
  {theme === "twentythree" && (
    <FeatureProductTwentyThree
      feature_product={feature_product}
      design={design}
    />
  )}
  {theme === "twentyfour" && (
    <FeatureProductTwentyFour
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentyfive" && (
    <FeatureProductTwentyFive
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentysix" && (
    <FeatureProductTwentySix
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentyseven" && (
    <FeatureProductTwentySeven
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentyeight" && (
    <FeatureProductTwentyEight
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "twentynine" && (
    <FeatureProductTwentyNine
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirty" && (
    <FeatureProductThirty
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtyone" && (
    <FeatureProductThirty
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtythree" && (
    <FeatureProductThirtyThree
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtyfour" && (
    <FeatureProductThirtyFour
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtyfive" && (
    <FeatureProductThirtyFive
      banner={banner}
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtysix" && (
    <FeatureProductThirtySix
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtyseven" && (
    <FeatureProductThirtySeven
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtyeight" && (
    <FeatureProductThirtyEight
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )}
  {theme === "thirtynine" && (
    <FeatureProductThirtyNine
      feature_product={feature_product}
      design={design}
      store_id={store_id}
    />
  )} */
}

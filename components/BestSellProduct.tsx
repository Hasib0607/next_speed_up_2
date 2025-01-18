import { DEFAULT } from '@/consts';
import { best_sell_products } from '@/utils/dynamic-import/_homepageSections/bestSellProduct/bestSellProduct';

import { useGetBestSellProductQuery } from '@/redux/features/products/productApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const BestSellProduct = ({ design, store_id }: any) => {
    const BestSellProductComponent =
        best_sell_products[design?.best_sell_product] ||
        best_sell_products[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const home = useSelector((state: RootState) => state?.home);

    const product = products?.product || [];

    const banner = home?.banner || [];

    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});
    const best_sell_product = bestSellProductData?.data || [];

    return (
        <>
            {BestSellProductComponent && bestSellProductSuccess && (
                <BestSellProductComponent
                    best_sell_product={best_sell_product}
                    design={design}
                    store_id={store_id}
                    product={product}
                    banner={banner}
                />
            )}
        </>
    );
};

export default BestSellProduct;

{
    /* {theme === "four" && (
  <BestSellerFive
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "five" && (
  <BestSellerFive
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "six" && (
  <BestSellerSix product={product} design={design} store_id={store_id} />
)} */
}
// {theme === "seven" && (
//   <BestSellerSeven best_sell_product={best_sell_product} />

// )}
{
    /* {theme === "eight" && (
  <BestSellerEight store_id={store_id} product={product} />
)}
{theme === "nine" && (
  <BestSellerNine
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "ten" && (
  <BestSellerTen
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "eleven" && (
  <BestSellerTen
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twelve" && (
  <BestSellerTen
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirteen" && (
  <BestSellerThirteen
    best_sell_product={best_sell_product}
    store_id={store_id}
  />
)}
{theme === "sixteen" && (
  <BestSellerSixteen
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "seventeen" && (
  <BestSellerSeventeen
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "nineteen" && (
  <BestSellerNineteen
    best_sell_product={best_sell_product}
    store_id={store_id}
  />
)}
{theme === "twentyone" && (
  <BestSellerTwentyOne
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
    headerSetting={headerSetting}
  />
)}
{theme === "twentytwo" && (
  <BestSellerTwentyTwo product={product} store_id={store_id} />
)}
{theme === "twentythree" && (
  <BestSellerTwentyThree
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentyfour" && (
  <BestSellerTwentyFour
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentyfive" && (
  <BestSellerTwentyFive
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentysix" && (
  <BestSellerTwentySix
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentyseven" && (
  <BestSellerTwentySeven
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentyeight" && (
  <BestSellerTwentyEight
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "twentynine" && (
  <BestSellerTwentyNine
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirty" && (
  <BestSellerThirty
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtyone" && (
  <BestSellerThirty
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtythree" && (
  <BestSellerThirtyThree
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtyfour" && (
  <BestSellerThirtyFour
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtyfive" && (
  <BestSellerThirtyFive
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
    banner={banner}
  />
)}
{theme === "thirtysix" && (
  <BestSellerThirtySix
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtyseven" && (
  <BestSellerThirtySeven
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtyeight" && (
  <BestSellerThirtyEight
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)}
{theme === "thirtynine" && (
  <BestSellerThirtyNine
    best_sell_product={best_sell_product}
    design={design}
    store_id={store_id}
  />
)} */
}

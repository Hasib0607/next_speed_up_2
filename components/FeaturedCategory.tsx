import { DEFAULT } from '@/consts';
import { feature_categories } from '@/utils/dynamic-import/_homepageSections/featuredCategory/featureCategory';
import { useSelector } from 'react-redux';

const FeaturedCategory = ({ design, store_id }: any) => {
    const FeaturedCategoryComponent =
        feature_categories[design?.feature_category] ||
        feature_categories[DEFAULT];

    const products = useSelector((state: any) => state?.products);
    const categoryStore = useSelector((state: any) => state?.category);

    const product = products?.product || [];
    const category = categoryStore?.categories || [];

    return (
        <>
            {FeaturedCategoryComponent && (
                <FeaturedCategoryComponent
                    design={design}
                    store_id={store_id}
                    category={category}
                    product={product}
                />
            )}
        </>
    );
};

export default FeaturedCategory;

{
    /* {theme === "default" && <DefaultFeaturedCategory category={category} />} */
}
{
    /* {theme === "one" && <FeaturedOne category={category} design={design} />}
  {theme === "two" && <FeaturedTwo category={category} design={design} />}
  {theme === "three" && (
    <FeaturedThree
      category={category}
      design={design}
      store_id={store_id}
      product={product}
    />
  )} */
}
{
    /* {theme === "four" && <FeaturedFour category={category} design={design} />} */
}
{
    /* {theme === "six" && <FeaturedSix design={design} category={category} />} */
}
{
    /* {theme === "seven" && <FeaturedSeven category={category} />} */
}
{
    /* {theme === "eight" && (
    <FeaturedEight category={category} design={design} />
  )}
  {theme === "eleven" && (
    <FeaturedEleven
      store_id={store_id}
      category={category}
      design={design}
    />
  )}
  {theme === TWELVE && (
    <FeaturedTwelve category={category} design={design} />
  )}

  {theme === "sixteen" && (
    <FeaturedSixteen category={category} design={design} />
  )}
  {theme === SEVENTEEN && (
    <FeaturedSeventeen category={category} design={design} />
  )}
  {theme === EIGHTEEN && (
    <FeaturedEighteen category={category} design={design} />
  )}
  {theme === NINETEEN && <FeaturedNineteen category={category} />} */
}
{
    /* {theme === TWENTY && <FeaturedTwenty category={category} />}
  {theme === TWENTY_ONE && <FeaturedTwentyOne category={category} />}
  {theme === TWENTY_THREE && <FeaturedTwentyThree category={category} />}
  {theme === TWENTY_FIVE && (
    <FeaturedTwentyFive category={category} design={design} />
  )}
  {theme === TWENTY_SEVEN && (
    <FeaturedTwentySeven
      category={category}
      product={product}
      design={design}
    />
  )}
  {theme === TWENTY_EIGHT && (
    <FeaturedTwentyEight category={category} design={design} />
  )}
  {theme === THIRTY && (
    <FeaturedThirty category={category} design={design} />
  )}
  {theme === THIRTY_ONE && (
    <FeaturedThirtyOne category={category} design={design} />
  )}
  {theme === THIRTY_THREE && (
    <FeaturedThirtyThree category={category} design={design} />
  )}
  {theme === THIRTY_FIVE && (
    <FeaturedThirtyFive category={category} design={design} />
  )}

  {theme === THIRTY_SIX && (
    <FeaturedThirtySix category={category} design={design} />
  )}

  {theme === THIRTY_SEVEN && (
    <FeaturedThirtySeven category={category} design={design} />
  )}
  {theme === THIRTY_EIGHT && (
    <FeaturedThirtyEight category={category} design={design} />
  )}
  {theme === THIRTY_NINE && (
    <FeaturedThirtyNine category={category} design={design} />
  )}
  {theme === "forty" && <FeaturedForty category={category} />} */
}

import { DEFAULT } from '@/consts';
// import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { feature_categories } from '@/utils/dynamic-import/_homepageSections/featuredCategory/featureCategory';

const FeaturedCategory = ({ design, headersetting, products,category }: any) => {
    const FeaturedCategoryComponent =
        feature_categories[design?.feature_category] ||
        feature_categories[DEFAULT];

    // const { data: categoryData } = useGetCategoryQuery({});
    // const category = categoryData?.data || [];

    return (
        design?.feature_category !== 'null' &&
        FeaturedCategoryComponent && (
            <FeaturedCategoryComponent
                design={design}
                category={category}
                product={products}
                headersetting={headersetting}
            />
        )
    );
};

export default FeaturedCategory;

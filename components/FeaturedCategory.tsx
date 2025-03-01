'use client';

import { DEFAULT } from '@/consts';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { feature_categories } from '@/utils/dynamic-import/_homepageSections/featuredCategory/featureCategory';
import { useSelector } from 'react-redux';

const FeaturedCategory = ({ design, headersetting }: any) => {
    const FeaturedCategoryComponent =
        feature_categories[design?.feature_category] ||
        feature_categories[DEFAULT];

    const products = useSelector((state: RootState) => state?.products);
    const product = products?.product || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <>
            {design?.feature_category !== 'null' &&
                FeaturedCategoryComponent && (
                    <FeaturedCategoryComponent
                        design={design}
                        category={category}
                        product={product}
                        headersetting={headersetting}
                    />
                )}
        </>
    );
};

export default FeaturedCategory;

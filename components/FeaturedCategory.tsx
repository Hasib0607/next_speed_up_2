'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { feature_categories } from '@/utils/dynamic-import/_homepageSections/featuredCategory/featureCategory';
import { useSelector } from 'react-redux';

const FeaturedCategory = ({ design,headersetting }: any) => {
    const FeaturedCategoryComponent =
        feature_categories[design?.feature_category] ||
        feature_categories[DEFAULT];

    const products = useSelector((state: any) => state?.products);
    const product = products?.product || [];

    const categoryStore = useSelector((state: RootState) => state?.category);
    const category = categoryStore?.categories || [];

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

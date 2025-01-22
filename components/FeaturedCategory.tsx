import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { feature_categories } from '@/utils/dynamic-import/_homepageSections/featuredCategory/featureCategory';
import { useSelector } from 'react-redux';

const FeaturedCategory = ({ design, store_id }: any) => {
    const FeaturedCategoryComponent =
        feature_categories[design?.feature_category] || feature_categories[DEFAULT];

    const products = useSelector((state: any) => state?.products);
    const categoryStore = useSelector((state: RootState) => state?.category);

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

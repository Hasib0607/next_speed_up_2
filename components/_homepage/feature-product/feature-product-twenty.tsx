'use client';
import Card44 from '@/components/card/card44';
import SectionHeadingEighteen from '@/components/section-heading/section-heading-eighteen';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FeatureProductTwenty = ({ feature_product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;
    return (
        <div className="sm:container px-5 sm:py-10 py-5 relative">
            <SectionHeadingEighteen
                title={title}
                subtitle={''}
                titleColor={title_color}
            />
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                {feature_product
                    ?.slice(0, 3)
                    ?.map((productData: any) => (
                        <Card44
                            item={productData}
                            key={productData.id}
                            store_id={store_id}
                            design={design}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FeatureProductTwenty;

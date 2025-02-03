'use client';
import img from '@/assets/bg-image/thirtySeven/MARGIN.png';
import Card64 from '@/components/card/card64';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const FeatureProductThirtySeven = ({ feature_product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    if (feature_product.length === 0) {
        return null;
    }
    return (
        <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
            <div className="container px-5">
                <div>
                    <img src={img.src} alt="margin" className="mx-auto" />
                    <h1
                        style={{ color: title_color }}
                        className="text-2xl text-center"
                    >
                        {title}
                    </h1>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
                        {feature_product
                            ?.slice(0, 12)
                            .map((item: any, id: any) => (
                                <Card64
                                    item={item}
                                    key={id}
                                    design={design}
                                    store_id={store_id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProductThirtySeven;

'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'));
const Promo = dynamic(() => import('@/components/Promo'));
const PromoBottom = dynamic(() => import('@/components/PromoBottom'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const BestSellProduct = dynamic(() => import('@/components/BestSellProduct'));
const FeatureProduct = dynamic(() => import('@/components/FeatureProduct'));
const Product = dynamic(() => import('@/components/Product'));
const FeaturedCategory = dynamic(() => import('@/components/FeaturedCategory'));
const Testimonial = dynamic(() => import('@/components/Testimonial'));

type ComponentType =
    | 'header'
    | 'hero_slider'
    | 'feature_category'
    | 'banner'
    | 'banner_bottom'
    | 'product'
    | 'new_arrival'
    | 'best_sell_product'
    | 'feature_product'
    | 'testimonial'
    | 'footer';

interface RenderSectionProps {
    component: ComponentType;
    design: any;
    appStore: any;
}

const RenderSection = ({ component, design, appStore }: RenderSectionProps) => {
    const store_id = appStore?.id || null;

    switch (component) {
        // Hero section
        case 'hero_slider':
            return <Hero design={design} />;
        // FeaturedCategory section
        case 'feature_category':
            return <FeaturedCategory design={design} store_id={store_id} />;
        // Promo section
        case 'banner':
            return <Promo design={design} store_id={store_id} />;
        // PromoBottom section
        case 'banner_bottom':
            return <PromoBottom design={design} />;
        // Product section
        case 'product':
            return <Product design={design} store_id={store_id} />;
        // NewArrival section
        case 'new_arrival':
            return <NewArrival design={design} />;
        // BestSellerProduct section
        case 'best_sell_product':
            return <BestSellProduct design={design} store_id={store_id} />;
        /// FeatureProduct section
        case 'feature_product':
            return <FeatureProduct design={design} store_id={store_id} />;
        // Testimonial section
        case 'testimonial':
            return (
                <>
                    {/* <Suspense fallback={<p>Loading blog...</p>}>
                        <BlogSection />
                    </Suspense> */}
                    <Testimonial design={design} />
                </>
            );
        default:
            return null;
    }
};

RenderSection.displayName = 'RenderSection';
export default RenderSection;

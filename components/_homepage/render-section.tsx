'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'));
const FeaturedCategory = dynamic(() => import('@/components/FeaturedCategory'));
const Promo = dynamic(() => import('@/components/Promo'));
const PromoBottom = dynamic(() => import('@/components/PromoBottom'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const BestSellProduct = dynamic(() => import('@/components/BestSellProduct'));
const FeatureProduct = dynamic(() => import('@/components/FeatureProduct'));
const Product = dynamic(() => import('@/components/Product'));
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
    headersetting: any;
}

const RenderSection = ({ component, design, headersetting }: RenderSectionProps) => {
    const store_id = design?.store_id || null;

    // switch (component) {
    //     // Hero section
    //     case 'hero_slider':
    //         return console.log("this is hero_slider");
    //     // FeaturedCategory section
    //     case 'feature_category':
    //         return console.log("this is feature_category");
    //     // Promo section
    //     case 'banner':
    //         return console.log("this is banner");
    //     // PromoBottom section
    //     case 'banner_bottom':
    //         return console.log("this is banner_bottom");
    //     // Product section
    //     case 'product':
    //         return console.log("this is product");
    //     // NewArrival section
    //     case 'new_arrival':
    //         return console.log("this is new_arrival");
    //     // BestSellerProduct section
    //     case 'best_sell_product':
    //         return console.log("this is best_sell_product");
    //     /// FeatureProduct section
    //     case 'feature_product':
    //         return console.log("this is feature_product");
    //     // Testimonial section
    //     case 'testimonial':
    //         return console.log("this is testimonial");
    //     default:
    //         return console.log("this is default");
    // }
    switch (component) {
        // Hero section
        case 'hero_slider':
            return <Hero design={design} />;
        // FeaturedCategory section
        case 'feature_category':
            return <FeaturedCategory design={design} headersetting={headersetting} />;
        // Promo section
        case 'banner':
            return <Promo design={design} />;
        // PromoBottom section
        case 'banner_bottom':
            return <PromoBottom design={design} />;
        // Product section
        case 'product':
            return <Product design={design} headersetting={headersetting} />;
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

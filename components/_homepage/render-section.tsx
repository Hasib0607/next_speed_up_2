import Skeleton from '@/components/loaders/TextSkeleton';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Hero = dynamic(() => import('@/components/Hero'));
const FeaturedCategory = dynamic(() => import('@/components/FeaturedCategory'));
const Promo = dynamic(() => import('@/components/Promo'));
const PromoBottom = dynamic(() => import('@/components/PromoBottom'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const BestSellProduct = dynamic(() => import('@/components/BestSellProduct'));
const FeatureProduct = dynamic(() => import('@/components/FeatureProduct'));
const Product = dynamic(() => import('@/components/Product'));
const Testimonial = dynamic(() => import('@/components/Testimonial'));

// type ComponentType =
//     | 'header'
//     | 'hero_slider'
//     | 'feature_category'
//     | 'banner'
//     | 'banner_bottom'
//     | 'product'
//     | 'new_arrival'
//     | 'best_sell_product'
//     | 'feature_product'
//     | 'testimonial'
//     | 'footer';

interface RenderSectionProps {
    component: string;
    design: any;
    headersetting: any;
    banner: any;
    slider: any;
}

const RenderSection = ({
    component,
    design,
    headersetting,
    banner,
    slider,
}: RenderSectionProps) => {
    switch (component) {
        case 'hero_slider':
            return (
                <Suspense
                    fallback={
                        <div className="relative xl:px-20 lg:px-10 md:px-10 px-5 bg-white pb-5">
                            <Skeleton
                                className={
                                    'rounded-lg h-[200px] w-full xl:h-[700px] lg:h-[480px] md:h-[310px]'
                                }
                            />
                        </div>
                    }
                >
                    <Hero design={design} slider={slider} />
                </Suspense>
            );
        case 'feature_category':
            return (
                <FeaturedCategory
                    design={design}
                    headersetting={headersetting}
                />
            );
        case 'banner':
            return <Promo design={design} banner={banner} />;
        case 'banner_bottom':
            return <PromoBottom design={design} banner={banner} />;
        case 'product':
            return <Product design={design} headersetting={headersetting} />;
        case 'new_arrival':
            return <NewArrival design={design} headersetting={headersetting} />;
        case 'best_sell_product':
            return (
                <BestSellProduct
                    design={design}
                    headersetting={headersetting}
                />
            );
        case 'feature_product':
            return (
                <FeatureProduct design={design} headersetting={headersetting} />
            );
        case 'testimonial':
            return <Testimonial design={design} />;
        default:
            return null;
    }
};

// const RenderSection = ({
//     component,
//     design,
//     headersetting,
//     banner,
// }: RenderSectionProps) => {
//     const store_id = design?.store_id || null;

//     switch (component) {
//         // Hero section
//         case 'hero_slider':
//             return <Hero />;
//         // FeaturedCategory section
//         case 'feature_category':
//             return (
//                 <FeaturedCategory
//                     design={design}
//                     headersetting={headersetting}
//                 />
//             );
//         // Promo section
//         case 'banner':
//             return <Promo design={design} banner={banner} />;
//         // PromoBottom section
//         case 'banner_bottom':
//             return <PromoBottom design={design} banner={banner} />;
//         // Product section
//         case 'product':
//             return <Product design={design} headersetting={headersetting} />;
//         // NewArrival section
//         case 'new_arrival':
//             return <NewArrival design={design} />;
//         // BestSellerProduct section
//         case 'best_sell_product':
//             return <BestSellProduct design={design} store_id={store_id} />;
//         // FeatureProduct section
//         case 'feature_product':
//             return <FeatureProduct design={design} store_id={store_id} />;
//         // Testimonial section
//         case 'testimonial':
//             return (
//                 <>
//                     {/* <Suspense fallback={<p>Loading blog...</p>}>
//                         <BlogSection />
//                     </Suspense> */}
//                     <Testimonial design={design} />
//                 </>
//             );
//         default:
//             return null;
//     }
// };

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

RenderSection.displayName = 'RenderSection';

export default RenderSection;

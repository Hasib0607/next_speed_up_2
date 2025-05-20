import { getInitialAppData } from '@/lib/getInitialAppData';
import { RenderSectionProps } from '@/types/render';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/Hero'));
const FeaturedCategory = dynamic(() => import('@/components/FeaturedCategory'));
const Promo = dynamic(() => import('@/components/Promo'));
const PromoBottom = dynamic(() => import('@/components/PromoBottom'));
const NewArrival = dynamic(() => import('@/components/NewArrival'));
const BestSellProduct = dynamic(() => import('@/components/BestSellProduct'));
const FeatureProduct = dynamic(() => import('@/components/FeatureProduct'));
const Product = dynamic(() => import('@/components/Product'));
const YouTubeSection = dynamic(() => import('@/components/YouTubeSection'));
const BlogSection = dynamic(() => import('@/components/BlogSection'));
const BrandSection = dynamic(() => import('@/components/BrandSection'));
const Testimonial = dynamic(() => import('@/components/Testimonial'));

const RenderSection = async (props: RenderSectionProps) => {
    const { design, headersetting, banner, slider, products, category } =
        await getInitialAppData({
            design: true,
            headersetting: true,
            products: true,
            slider: true,
            banner: true,
            category: true,
        });

    switch (props.sections) {
        case 'hero_slider':
            return <Hero design={design} slider={slider} banner={banner} />;
        case 'feature_category':
            return (
                <FeaturedCategory
                    design={design}
                    headersetting={headersetting}
                    products={products}
                    category={category}
                />
            );
        case 'banner':
            return <Promo design={design} banner={banner} />;
        case 'banner_bottom':
            return <PromoBottom design={design} banner={banner} />;
        case 'product':
            return (
                <Product
                    design={design}
                    headersetting={headersetting}
                    banner={banner}
                    products={products}
                    category={category}
                />
            );
        case 'new_arrival':
            return (
                <NewArrival
                    design={design}
                    headersetting={headersetting}
                    products={products}
                />
            );
        case 'best_sell_product':
            return (
                <BestSellProduct
                    design={design}
                    headersetting={headersetting}
                    products={products}
                />
            );
        case 'feature_product':
            return (
                <FeatureProduct
                    design={design}
                    headersetting={headersetting}
                    products={products}
                />
            );
        case 'youtube':
            return (
                <YouTubeSection design={design} headersetting={headersetting} />
            );
        case 'blog':
            return <BlogSection design={design} />;
        case 'brand':
            return (
                <BrandSection design={design} headersetting={headersetting} />
            );
        case 'testimonial':
            return <Testimonial design={design} />;
        default:
            return null;
    }
};

RenderSection.displayName = 'RenderSection';

export default RenderSection;

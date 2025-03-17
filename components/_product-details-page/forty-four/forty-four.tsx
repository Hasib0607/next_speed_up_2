'use client';

import Card2 from '@/components/card/card2';
import Skeleton from '@/components/loaders/skeleton';
import {
    useGetBestSellProductQuery,
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
} from '@/redux/features/products/productApi';
import { useEffect, useState } from 'react';

import VideoPlayer from '../components/video-player';

import DetailsFortyFour from './detailsFortyFour/details-forty-four';
import './forty-four.css';
import SectionHeadingFortyFour from '@/components/section-heading/section-heading-forty-four';

const FortyFour = ({ store_id, productId, design }: any) => {
    const {
        data: productDetailsData,
        isLoading: productDetailsLoading,
        isError: productDetailsError,
        isSuccess: productDetailsSuccess,
    } = useGetProductDetailsQuery({ store_id, productId });

    const {
        data: relatedProductsData,
        isLoading: relatedProductsLoading,
        isError: relatedProductsError,
        isSuccess: relatedProductsSuccess,
    } = useGetRelatedProductsQuery({ productId });

    const {
        data: bestSellProductData,
        isLoading: bestSellProductLoading,
        isError: bestSellProductError,
        isSuccess: bestSellProductSuccess,
    } = useGetBestSellProductQuery({});

    const [product, setProduct] = useState<any>({});
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [bestSellProducts, setBestSellProducts] = useState<any>([]);

    useEffect(() => {
        if (productDetailsSuccess && productDetailsData) {
            const productData = productDetailsData?.data || {};
            setProduct(productData);
        }
    }, [productDetailsData, productDetailsSuccess]);

    useEffect(() => {
        if (relatedProductsSuccess && relatedProductsData) {
            const relatedProductsArr = relatedProductsData?.data || [];
            setRelatedProducts(relatedProductsArr);
        }
    }, [relatedProductsData, relatedProductsSuccess]);

    useEffect(() => {
        if (bestSellProductSuccess && bestSellProductData) {
            const bestSellProductsArr = bestSellProductData?.data || [];
            setBestSellProducts(bestSellProductsArr);
        }
    }, [bestSellProductData, bestSellProductSuccess]);

    let detailsContent;
    let relatedContent;
    let bestSellContent;

    // product
    if (productDetailsLoading && !productDetailsError) {
        detailsContent = <Skeleton />;
    }

    if (productDetailsSuccess && !productDetailsLoading) {
        detailsContent = (
            <DetailsFortyFour
                design={design}
                product={product}
                frequentProduct={relatedProducts[0]}
            />
        );
    }

    // related
    if (relatedProductsLoading && !relatedProductsError) {
        relatedContent = <p>Loading related products...</p>;
    }

    if (
        relatedProductsSuccess &&
        !relatedProductsLoading &&
        relatedProducts?.length > 1
    ) {
        relatedContent = <RelatedProducts products={relatedProducts} />;
    }

    // best sell
    if (bestSellProductLoading && !bestSellProductError) {
        bestSellContent = <p>Loading best sell products...</p>;
    }

    if (
        bestSellProductSuccess &&
        !bestSellProductLoading &&
        bestSellProducts?.length > 0
    ) {
        bestSellContent = <BestSellProducts products={bestSellProducts} />;
    }

    return (
        <div className="container my-4 md:my-6 lg:my-8 space-y-5 md:space-y-8 lg:space-y-10 md:max-w-7xl xl:max-w-[1420px] mx-auto md:mx-20 lg:mx-auto">
            <div className="px-0 md:px-4">{detailsContent}</div>
            <div className="px-0 md:px-4">
                {product?.video_link && (
                    <VideoPlayer videoUrl={product?.video_link} />
                )}
            </div>
            <div className="px-0 md:px-4">{relatedContent}</div>
            <div className="px-0 md:px-4">{bestSellContent}</div>
        </div>
    );
};

export default FortyFour;

const pageGrid =
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4';
const pageSection = 'px-3 md:px-0 bg-transparent space-y-4 w-auto';

const RelatedProducts = ({ products }: any) => {
    return (
        <div className={pageSection}>
            <SectionHeadingFortyFour title="You may also like" />
            <div className={pageGrid}>
                {products
                    ?.slice(1, 13)
                    ?.map((product: any) => (
                        <Card2 item={product} key={product.id} />
                    ))}
            </div>
        </div>
    );
};

const BestSellProducts = ({ products }: any) => {
    return (
        <div className={pageSection}>
            <SectionHeadingFortyFour title="People also purchased" />
            <div className={pageGrid}>
                {products
                    ?.slice(0, 12)
                    ?.map((product: any) => (
                        <Card2 item={product} key={product.id} />
                    ))}
            </div>
        </div>
    );
};

'use client';

import SkeletonWrapper from '@/components/skeleton-wrapper';
import Skeleton from '@/components/loaders/skeleton';
import {
    useGetProductDetailsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import { useEffect, useState } from 'react';

import Heading from '@/utils/heading';

import Details from '../components/details';
import VideoPlayer from '../components/video-player';
import ProdMultiCategory from '@/utils/prod-multi-category';
import According from '@/components/_product-details-page/components/according';

const Seven = ({ store_id, productId }: any) => {
    const {
        data: productDetailsData,
        isLoading: productDetailsLoading,
        isError: productDetailsError,
        isSuccess: productDetailsSuccess,
    } = useGetProductDetailsQuery({ store_id, productId });

    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        isError: reviewsError,
        isSuccess: reviewsSuccess,
    } = useGetReviewsQuery({ productId });

    const [product, setProduct] = useState<any>({});

    const [reviews, setReviews] = useState<any>({});

    useEffect(() => {
        if (productDetailsSuccess && productDetailsData) {
            const productData = productDetailsData?.data || {};
            setProduct(productData);
        }
    }, [productDetailsData, productDetailsSuccess]);

    useEffect(() => {
        if (reviewsSuccess && reviewsData) {
            setReviews(reviewsData);
        }
    }, [reviewsData, reviewsSuccess]);

    const { category } = product || [];

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    return (
        <div className="container px-5">
            <Heading title={product?.name} />
            {detailsContentSkeleton}
            <Details product={product}>
                <div className="h-[1px] bg-gray-300 w-full "></div>
                <div className="flex flex-col space-y-3 font-seven">
                    <SkeletonWrapper
                        loadingStatus={productDetailsLoading}
                        className={'w-36 h-5'}
                    >
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                SKU:
                            </span>
                            {product?.SKU}
                        </p>
                    </SkeletonWrapper>

                    <SkeletonWrapper
                        loadingStatus={productDetailsLoading}
                        className={'w-36 h-5'}
                    >
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Category:
                            </span>{' '}
                            <ProdMultiCategory category={category} />
                        </p>
                    </SkeletonWrapper>

                    {product?.tags && (
                        <SkeletonWrapper
                            loadingStatus={productDetailsLoading}
                            className={'w-36 h-5'}
                        >
                            <p className="text-sm text-[#5a5a5a] font-seven">
                                <span className="font-semibold text-[#212121] font-seven">
                                    Tags:
                                </span>{' '}
                                {product?.tags}
                            </p>
                        </SkeletonWrapper>
                    )}
                </div>
                <div className="h-[1px] bg-gray-300 w-full "></div>
                <According
                    text={'Product Details'}
                    description={product?.description}
                />
                <According text={'Customer Reviews'} description={reviews} />
            </Details>

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}
            <div className="my-5 pt-1"></div>
        </div>
    );
};

export default Seven;

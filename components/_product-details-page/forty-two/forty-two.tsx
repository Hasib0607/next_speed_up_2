'use client';

import { profileImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import moment from 'moment';
import DetailsFortyTwo from './details-fortytwo';
import { useEffect, useState } from 'react';
import Skeleton from '@/components/loaders/skeleton';

import Card72 from '@/components/card/card72';
import { customizeSingleProductPage } from '@/utils/customizeDesign';
import { numberParser } from '@/helpers/numberParser';
import VideoPlayer from '../components/video-player';
import {
    useGetFeatureProductQuery,
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import { NotFoundMsg } from '@/utils/little-components';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import FeatureProductFortyTwo from '@/components/_homepage/feature-product/feature-product-fortytwo';

const FortyTwo = ({ store_id, design, headersetting, productId }: any) => {
    const singleProductPageData = customizeSingleProductPage.find(
        (item) => item.id == store_id
    );

    const {
        data: productDetailsData,
        isLoading: productDetailsLoading,
        isError: productDetailsError,
        isSuccess: productDetailsSuccess,
    } = useGetProductDetailsQuery({ store_id, productId });

    const {
        data: featureProductData,
        isLoading: featureProductLoading,
        isSuccess: featureProductSuccess,
    } = useGetFeatureProductQuery({});

    const {
        data: relatedProductsData,
        isLoading: relatedProductsLoading,
        isError: relatedProductsError,
        isSuccess: relatedProductsSuccess,
    } = useGetRelatedProductsQuery({ productId });

    const {
        data: reviewsData,
        isLoading: reviewsLoading,
        isError: reviewsError,
        isSuccess: reviewsSuccess,
    } = useGetReviewsQuery({ productId });

    const [product, setProduct] = useState<any>({});
    const [featureProduct, setFeatureProduct] = useState<any>([]);
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [reviews, setReviews] = useState<any>({});

    useEffect(() => {
        if (productDetailsSuccess && productDetailsData) {
            const productData = productDetailsData?.data || {};
            setProduct(productData);
        }
    }, [productDetailsData, productDetailsSuccess]);

    useEffect(() => {
        if (featureProductSuccess && featureProductData) {
            const feature_product = featureProductData?.data || [];
            setFeatureProduct(feature_product);
        }
    }, [featureProductData, featureProductSuccess]);

    useEffect(() => {
        if (relatedProductsSuccess && relatedProductsData) {
            const relatedProductsArr = relatedProductsData?.data || [];
            setRelatedProducts(relatedProductsArr);
        }
    }, [relatedProductsData, relatedProductsSuccess]);

    useEffect(() => {
        if (reviewsSuccess && reviewsData) {
            setReviews(reviewsData);
        }
    }, [reviewsData, reviewsSuccess]);

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }
    const reviewsArr = reviews?.data || [];

    return (
        <div className="sm:container px-5">
            {detailsContentSkeleton}
            <DetailsFortyTwo
                design={design}
                headersetting={headersetting}
                product={product}
            />

            {/* Feature Products */}
            <div>
                <FeatureProductFortyTwo
                    feature_product={featureProduct}
                    design={design}
                    headersetting={headersetting}
                />
            </div>

            {/* ************************ tab component start ***************************** */}
            <div className="bg-white">
                <TabGroup>
                    {/* Tab List */}
                    <TabList className="px-4 bg-[#DDDDDD] flex flex-col md:flex-row md:space-x-8">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'bg-[var(--header-color)] px-3 py-2 text-sm md:text-base lg:text-xl focus:outline-none underline-offset-4 border-hidden rounded md:rounded-none mb-2 md:mb-0'
                                    : 'text-sm md:text-base lg:text-xl mb-2 md:mb-0'
                            }
                        >
                            Product Information
                        </Tab>
                        {singleProductPageData?.review_not_show ? (
                            ''
                        ) : (
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'bg-[var(--header-color)] px-3 py-2 text-sm md:text-base lg:text-xl focus:outline-none underline-offset-4 border-hidden rounded md:rounded-none'
                                        : 'text-sm md:text-base lg:text-xl'
                                }
                            >
                                Customer Reviews
                            </Tab>
                        )}
                    </TabList>

                    {/* Tab Panels */}
                    <TabPanels className="p-4 md:p-5">
                        {/* Product Information Panel */}
                        <TabPanel>
                            <div className="bg-slate-50 rounded-lg p-5">
                                <DangerouslySafeHTML
                                    content={product?.description}
                                    className={
                                        'text-sm md:text-base leading-relaxed'
                                    }
                                />
                            </div>
                        </TabPanel>

                        {/* Customer Reviews Panel */}
                        <TabPanel>
                            {reviews?.status && reviewsArr.length > 0 ? (
                                reviewsArr?.map((item: any, index: any) => (
                                    <UserReview review={item} key={index} />
                                ))
                            ) : (
                                <NotFoundMsg message={reviews?.message} />
                            )}
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
            {/* ************************ tab component end ***************************** */}

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default FortyTwo;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className=" bg-slate-50 p-5">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={profileImg + review?.image}
                        className="rounded-full h-full w-full"
                        alt=""
                    />
                </div>
            </div>
            <Rate className="text-base" rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">
                {moment(new Date(review?.cd)).format('DD/MM/YYYY')}
            </p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    return (
        <div className="py-5 sm:py-10">
            <div>
                <h1 className="text-2xl pb-3">RELATED PRODUCTS</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
                {product
                    ?.slice(0, 10)
                    ?.map((item: any, id: any) => (
                        <Card72 item={item} key={id} />
                    ))}
            </div>
        </div>
    );
};

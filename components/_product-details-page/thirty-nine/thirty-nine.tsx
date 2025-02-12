'use client';

import Card67 from '@/components/card/card67';
import { profileImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import moment from 'moment';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';

import DetailsThirtyNine from './details-thirty-nine';
import { NotFoundMsg } from '@/utils/little-components';
import VideoPlayer from '../components/video-player';

const ThirtyNine = ({ store_id, productId, design, headersetting }: any) => {
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
        data: reviewsData,
        isLoading: reviewsLoading,
        isError: reviewsError,
        isSuccess: reviewsSuccess,
    } = useGetReviewsQuery({ productId });

    const [product, setProduct] = useState<any>({});
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [reviews, setReviews] = useState<any>({});

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
        <div className="">
            <div className="sm:container px-5">
                {detailsContentSkeleton}
                <DetailsThirtyNine
                    design={design}
                    product={product}
                    headersetting={headersetting}
                />

                {/* ************************ tab component start ***************************** */}
                <div className="mt-14 bg-white">
                    <TabGroup>
                        <TabList className="px-5 py-2 bg-[#DDDDDD]">
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'underline text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden '
                                        : 'text-sm md:text-xl'
                                }
                            >
                                Description
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'underline text-sm md:text-xl focus:outline-none underline-offset-[12px] border-hidden ml-8'
                                        : 'ml-8 text-sm md:text-xl'
                                }
                            >
                                Customer Reviews
                            </Tab>
                        </TabList>
                        <TabPanels className="p-5">
                            <TabPanel>
                                <div className="">
                                    <DangerouslySafeHTML
                                        content={product?.description}
                                    />
                                </div>
                            </TabPanel>
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
        </div>
    );
};

export default ThirtyNine;

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
            <Rate className={'text-base'} rating={parsedRating} />
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
                    .map((item: any, id: any) => (
                        <Card67 item={item} key={id} />
                    ))}
            </div>
        </div>
    );
};

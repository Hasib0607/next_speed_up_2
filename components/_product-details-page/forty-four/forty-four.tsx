'use client';

import Card61 from '@/components/card/card61';
import SectionHeadingThirtyFive from '@/components/section-heading/section-heading-thirty-five';
import { profileImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import VideoPlayer from '../components/video-player';
import { HTML_TAG_PATTERN } from '@/consts';
import { NotFoundMsg } from '@/utils/little-components';
import ProdMultiCategory from '@/utils/prod-multi-category';
import DetailsFortyFour from './detailsFortyFour/details-forty-four';
import './forty-four.css'

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

    const { category } = product || [];

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }

    const buttonThirtyFive =
        'text-lg relative z-[2] py-3 text-center duration-500 bg-white border border-black text-gray-900 min-w-[220px] text-center button-single-product hover:shadow-none rounded';

    return (
        <div className="container my-4 md:my-6 lg:my-8">
            {detailsContentSkeleton}
            <DetailsFortyFour
                design={design}
                product={product}
                buttonStyle={buttonThirtyFive}
                multiCat
            >
                <div className="flex flex-col space-y-3">
                    <p className="text-sm text-[#5a5a5a]">
                        <span className="font-semibold text-[#212121]">
                            SKU:
                        </span>{' '}
                        {product?.SKU}
                    </p>
                    <p className="text-sm text-[#5a5a5a]">
                        <span className="font-semibold text-[#212121]">
                            Category:
                        </span>{' '}
                        <ProdMultiCategory
                            category={category}
                            count={1}
                            linkOff
                        />
                    </p>
                    {product?.tags && (
                        <p className="text-sm text-[#5a5a5a]">
                            <span className="font-semibold text-[#212121]">
                                Tags:
                            </span>{' '}
                            {product?.tags}
                        </p>
                    )}
                </div>
            </DetailsFortyFour>

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related products={relatedProducts} />
        </div>
    );
};

export default FortyFour;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className="bg-slate-50 p-5">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={`${profileImg}${review?.image}`}
                        className="rounded-full h-full w-full"
                        alt={review?.name}
                    />
                </div>
            </div>
            <Rate className={'text-base'} rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">
                {moment(review?.cd).format('DD/MM/YYYY')}
            </p>
            <p className="text-base font-semibold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ products }: any) => {
    return (
        <div className="py-5 sm:py-10 bg-white">
            <div className="my-5 pt-1 flex justify-center items-center">
                <SectionHeadingThirtyFive title="✦ YOU MIGHT LIKE THESE ✦" />
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-6">
                {products
                    ?.slice(0, 10)
                    ?.map((productData: any) => (
                        <Card61 item={productData} key={productData.id} />
                    ))}
            </div>
        </div>
    );
};

const Accordion = ({ text, description }: any) => {
    const [show, setShow] = useState(false);
    const isDescription = HTML_TAG_PATTERN.test(description);
    let reviewsArr = description?.data || [];

    return (
        <>
            {isDescription ? (
                <AnimatePresence>
                    <div
                        onClick={() => setShow(!show)}
                        className="flex justify-between items-center lg:cursor-pointer text-lg font-semibold"
                    >
                        <div className="h3">{text}</div>
                        {show ? (
                            <MinusIcon width={25} />
                        ) : (
                            <PlusIcon width={25} />
                        )}
                    </div>
                    {show && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="font-seven"
                            key={text}
                        >
                            <DangerouslySafeHTML content={description} />
                        </motion.div>
                    )}
                </AnimatePresence>
            ) : (
                <AnimatePresence>
                    <div
                        onClick={() => setShow(!show)}
                        className="flex justify-between items-center lg:cursor-pointer text-lg font-semibold"
                    >
                        <div className="h3">{text}</div>
                        {show ? (
                            <MinusIcon width={25} />
                        ) : (
                            <PlusIcon width={25} />
                        )}
                    </div>
                    {show && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="font-seven"
                            key={text}
                        >
                            {description?.status && reviewsArr.length > 0 ? (
                                reviewsArr?.map((item: any, index: any) => (
                                    <UserReview review={item} key={index} />
                                ))
                            ) : (
                                <NotFoundMsg message={description?.message} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </>
    );
};

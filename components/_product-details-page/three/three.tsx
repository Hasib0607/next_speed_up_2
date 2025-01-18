'use client';

import Card23 from '@/components/card/card23';
import SectionHeadingSeven from '@/components/section-heading/section-heading-seven';
import DefaultSlider from '@/components/slider/default-slider';

import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

import moment from 'moment';
import { SwiperSlide } from 'swiper/react';

import Skeleton from '@/components/loaders/skeleton';
import { HTML_TAG_PATTERN } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { useEffect, useState } from 'react';
import Details from '../components/details';
import VideoPlayer from '../components/video-player';
import { NotFoundMsg } from '@/utils/little-components';

const Three = ({ store_id, productId }: any) => {
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

    const category = product?.category || [];

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p>Loading related...</p>;
    }
    // const reviewsArr = reviewsData?.data;
    // console.log("product before prop",product);

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {detailsContentSkeleton}
            <Details product={product}>
                <div className="flex flex-col space-y-3 my-3">
                    <p className="text-sm text-[#5a5a5a] font-seven">
                        <span className="font-semibold text-[#212121] font-seven">
                            SKU:
                        </span>{' '}
                        {product?.SKU}
                    </p>
                    {Array.isArray(category) && category?.length > 0 && (
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Category:
                            </span>{' '}
                            <ProdMultiCategory category={category} />
                        </p>
                    )}
                    {product?.tags && (
                        <p className="text-sm text-[#5a5a5a] font-seven">
                            <span className="font-semibold text-[#212121] font-seven">
                                Tags:
                            </span>{' '}
                            {product?.tags}
                        </p>
                    )}
                </div>
                <According
                    text={'Product Details'}
                    description={product?.description}
                />
                <According text={'Customer Reviews'} description={reviews} />
            </Details>

            {product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default Three;

const According = ({ text, description }: any) => {
    const isDescription = HTML_TAG_PATTERN.test(description);
    let reviewsArr = description?.data || [];

    return (
        <Accordion type="single" collapsible>
            {isDescription ? (
                <AccordionItem value="item-1">
                    <AccordionTrigger>{text}</AccordionTrigger>
                    <AccordionContent>
                        <DangerouslySafeHTML content={description} />
                    </AccordionContent>
                </AccordionItem>
            ) : (
                <AccordionItem value="item-2">
                    <AccordionTrigger>{text}</AccordionTrigger>
                    <AccordionContent>
                        {description?.status && reviewsArr.length > 0
                            ? reviewsArr?.map((item: any, index: any) => (
                                  <UserReview review={item} key={index} />
                              ))
                            : <NotFoundMsg message={description?.message} />}
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>
    );
};

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <>
            <div className=" bg-slate-50 rounded-lg p-5 flex items-center gap-5 w-full">
                <div className="avatar">
                    <div className="w-20 h-20 rounded-full">
                        <img
                            src={profileImg + review?.image}
                            className="rounded-full h-full w-full"
                            alt=""
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center w-full">
                        <p className="text-lg font-semibold ">{review?.name}</p>
                        <p className="text-base rounded-md font-light border px-2 py-1">
                            {moment(new Date(review?.cd)).format('DD/MM/YYYY')}
                        </p>
                    </div>
                    <Rate className="text-base" rating={parsedRating} />

                    <p className="text-base font-semiBold mt-2">
                        {review?.comment}
                    </p>
                </div>
            </div>
        </>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="shadow-lg py-5 sm:py-10 rounded-md px-4">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingSeven title={'Related Products'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    breakpoints={{
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    prevEl={prev}
                    nextEl={next}
                >
                    {product?.length > 0 &&
                        product?.slice(0, 10)?.map((item: any, index: any) => (
                            <SwiperSlide key={index}>
                                <Card23 item={item} />
                            </SwiperSlide>
                        ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

'use client';

import Card63 from '@/components/card/card63';
import SectionHeadingEighteen from '@/components/section-heading/section-heading-eighteen';
import DefaultSlider from '@/components/slider/default-slider';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import parse from 'html-react-parser';

import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import { NotFoundMsg } from '@/utils/little-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import DetailsEighteen from '../components/details-eighteen';
import VideoPlayer from '../components/video-player';

const ThirtySix = ({ store_id, productId, design }: any) => {
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

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {detailsContentSkeleton}
            <DetailsEighteen product={product} design={design} zoomable>
                <div>
                    <h1 className="text-xl font-medium pb-2">Description</h1>
                    <div className="text-sm text-[#5a5a5a] font-seven leading-7 apiHtml">
                        {parse(`${product?.description}`)}
                    </div>
                </div>

                <div className="h-[1px] bg-gray-300 w-full "></div>
                <According text={'Customer Reviews'} reviews={reviews} />
            </DetailsEighteen>

            <div className="py-7">
                {product && product?.video_link && (
                    <VideoPlayer videoUrl={product?.video_link} />
                )}
            </div>

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </div>
    );
};

export default ThirtySix;

const According = ({ text, description }: any) => {
    const [show, setShow] = useState(false);
    let reviewsArr = description?.data || [];
    return (
        <AnimatePresence>
            <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center lg:cursor-pointer text-lg font-semibold"
            >
                <div className="h3">{text}</div>
                {show ? <MinusIcon width={25} /> : <PlusIcon width={25} />}
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
    );
};

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
                Since {new Date(review?.ucd).getFullYear()}
            </p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';

    return (
        <div className="py-5 sm:py-10 rounded-md bg-white">
            <div className="my-5 pt-1 flex justify-between items-center">
                <SectionHeadingEighteen title={'Related Products'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        250: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        560: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1600: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card63 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

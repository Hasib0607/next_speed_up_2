'use client';

import Card39 from '@/components/card/card39';
import DefaultSlider from '@/components/slider/default-slider';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';
import Skeleton from '@/components/loaders/skeleton';

import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useEffect, useState } from 'react';

import { IoIosArrowForward } from 'react-icons/io';
import { SwiperSlide } from 'swiper/react';

import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';
import { NotFoundMsg } from '@/utils/little-components';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { numberParser } from '@/helpers/numberParser';
import moment from 'moment';

const Nineteen = ({ store_id, productId }: any) => {
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

    const { category } = product || [];

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
        <div className="bg-[#FAF8F1]">
            <div className="sm:container px-5 space-y-8 pt-5 ">
                <div className="flex gap-2 items-center">
                    <p>Home</p>
                    <IoIosArrowForward className="text-xs mt-1" />
                    <ProdMultiCategory
                            category={category}
                            count={1}
                            linkOff
                        />
                    <IoIosArrowForward className="text-xs mt-1" />
                    <p className="text-gray-500 font-medium">{product?.name}</p>
                </div>
                {detailsContentSkeleton}
                <Details product={product} social />

                {/* ************************ tab component start ***************************** */}
                <div className="pt-20">
                    <TabGroup>
                        <TabList className="border-b-2 border-gray-300">
                            <Tab
                                className={({ selected }: any) =>
                                    selected
                                        ? 'underline text-xl  underline-offset-8 text-black border-hidden '
                                        : ' text-black fiveUn '
                                }
                            >
                                Description
                            </Tab>
                            <Tab
                                className={({ selected }: any) =>
                                    selected
                                        ? 'underline text-xl  underline-offset-8 text-black border-hidden ml-8'
                                        : ' text-black fiveUn ml-8'
                                }
                            >
                                Reviews
                            </Tab>
                        </TabList>
                        <TabPanels className="mb-8">
                            <TabPanel>
                                <div className="p-5 ">
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

export default Nineteen;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);
        const date = moment(review?.cd).format('YYYY-MM-DD');

    return (
        <div className="p-5">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={profileImg + review?.image}
                        className="rounded-full h-full w-full"
                        alt=""
                    />
                </div>
            </div>
            <Rate className={"text-base"} rating={parsedRating} />
            <p className="text-xs font-semibold mt-2">{review?.name}</p>
            <p className="text-sm font-light mt-2">{date}</p>
            <p className="text-base font-semiBold mt-2">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="py-5 sm:py-10">
            <div className="my-5 pt-1 flex justify-between items-center">
                <h1 className="text-[#3B3312] text-3xl">Related Products</h1>
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
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        976: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card39 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

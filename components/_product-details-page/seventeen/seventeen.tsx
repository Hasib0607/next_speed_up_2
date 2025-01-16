'use client';

import Card31 from '@/components/card/card31';
import SectionHeadingSeventeen from '@/components/section-heading/section-heading-seventeen';
import DefaultSlider from '@/components/slider/default-slider';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';

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
import { IoIosArrowForward } from 'react-icons/io';
import { SwiperSlide } from 'swiper/react';

import ProdMultiCategory from '@/utils/prod-multi-category';
import moment from 'moment';
import VideoPlayer from '../components/video-player';
import Details from './details-seventeen';
import './style.css';

const Seventeen = ({ store_id, productId, design }: any) => {
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
        <>
            <div className="bg-[#AEE6F6] relative mb-10 py-20">
                <div className="w-full flex flex-col gap-3 justify-center items-center">
                    <div>
                        <h1 className="text-5xl font-medium text-white">
                            Products
                        </h1>
                    </div>
                    <div className="flex gap-1 items-center">
                        <ProdMultiCategory
                            category={category}
                            className={'text-white'}
                            count={1}
                            linkOff
                        />
                        <IoIosArrowForward className="text-xs mt-1 text-white" />
                        <p className="font-medium text-white">
                            {product?.name}
                        </p>
                    </div>
                </div>
                <div className="bg-image-details absolute bottom-0"></div>
                <div className="bg-image-details-top absolute top-0"></div>
            </div>
            <div className="container mx-auto">
                <div className="xl:mx-80 mx-5">
                    {detailsContentSkeleton}
                    <Details product={product} design={design} />
                </div>
            </div>
            <div className="py-14">
                <div className=" sm:container px-5 xl:px-80">
                    <TabGroup>
                        <TabList className="">
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'text-xl font-semibold text-white bg-pink-500 px-3 py-1 rounded-t-md focus:outline-none mr-2 lg:cursor-pointer'
                                        : 'mr-2 text-xl font-semibold text-white bg-blue-500 px-3 py-1 rounded-t-md lg:cursor-pointer'
                                }
                            >
                                Description
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'text-xl font-semibold text-white bg-pink-500 px-3 py-1 rounded-t-md focus:outline-none'
                                        : 'text-xl font-semibold text-white bg-blue-500 px-3 py-1 rounded-t-md'
                                }
                            >
                                Reviews
                            </Tab>
                        </TabList>
                        <TabPanels className="mb-8 border">
                            <TabPanel>
                                <div className="p-5 ">
                                    <DangerouslySafeHTML
                                        content={product?.description}
                                    />
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="border-b mx-5">
                                    <SectionHeadingSeventeen
                                        text={'Customer Reviews'}
                                    />
                                </div>
                                {reviews?.status && reviewsArr.length > 0
                                    ? reviewsArr?.map(
                                          (item: any, index: any) => (
                                              <UserReview
                                                  review={item}
                                                  key={index}
                                              />
                                          )
                                      )
                                    : reviews?.message}
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>

            {product && product?.video_link && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {relatedContentSkeleton}
            <Related product={relatedProducts} />
        </>
    );
};

export default Seventeen;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);
    const date = moment(review?.cd).format('YYYY-MM-DD');

    return (
        <div className="mx-5 py-5 border-b last:border-b-0">
            <p className="text-sm font-light mt-2">{date}</p>
            <p className="text-xs font-semibold mb-2">{review?.name}</p>
            <Rate className={'text-xl'} rating={parsedRating} />
            <p className="text-sm font-semiBold mt-1">{review?.comment}</p>
        </div>
    );
};

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="container px-5 xl:px-80 pb-10 bg-white">
            <div className="my-5 pt-1 flex justify-between items-center">
                <div className="hidden md:block"></div>
                <SectionHeadingSeventeen text={'Related Products'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        350: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1800: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card31 item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

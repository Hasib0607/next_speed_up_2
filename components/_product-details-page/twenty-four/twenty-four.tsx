'use client';

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
import { SwiperSlide } from 'swiper/react';

import img from '@/assets/bg-image/twenty-four-shop.webp';
import Card49 from '@/components/card/card49';
import SectionHeadingTwentyThree from '@/components/section-heading/section-heading-twentythree';
import DefaultSlider from '@/components/slider/default-slider';

import { profileImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import moment from 'moment';

import { NotFoundMsg } from '@/utils/little-components';
import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';

const TwentyFour = ({ store_id, productId, design }: any) => {
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

    const styleCss = `
    .active-des-review {
      color:  ${design?.text_color};
      background: ${design?.header_color};
      
    }
`;

    const buttonTwentyFour =
        'font-bold py-[11px] px-10 w-max bg-color lg:cursor-pointer';
    const borderClass =
        'h-[2px] bg-transparent w-full border-b-2 border-dotted';

    return (
        <div className=" bg-white">
            <div className="min-h-[200px] max-h-60 w-full overflow-hidden relative xl:pr-20 lg:pr-10">
                <img
                    src={img.src}
                    alt=""
                    className="min-h-[200px] max-h-60 w-full object-cover"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex flex-col justify-center items-start sm:container px-5">
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="text-5xl text-white uppercase font-bold">
                            Product Details
                        </h1>
                        <div className="flex items-center gap-1 text-white font-bold">
                            <p>Home</p>
                            <p>/ Product Details</p>
                        </div>
                    </div>
                </div>
            </div>
            <style>{styleCss}</style>
            <div className="sm:container px-5 pt-10">
                {detailsContentSkeleton}
                <Details
                    product={product}
                    buttonStyle={buttonTwentyFour}
                    borderClass={borderClass}
                    multiCat
                    social
                />
            </div>
            {/* ************************ tab component start ***************************** */}
            <div className="mt-14 pb-20 sm:container px-5">
                <TabGroup>
                    <TabList className="pb-3 w-full">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'text-base focus:outline-none border rounded-full px-7 py-2 active-des-review'
                                    : 'bg-white border rounded-full px-7 py-2 text-black text-base '
                            }
                        >
                            Description
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'border rounded-full px-7 py-2 text-base focus:outline-none active-des-review ml-8'
                                    : 'bg-white border rounded-full px-7 py-2 text-black ml-8 text-base '
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
            <Related product={relatedProducts} design={design} />
        </div>
    );
};

export default TwentyFour;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className="p-5 flex items-center gap-5 w-full">
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
                <Rate className={'text-base'} rating={parsedRating} />
                <p className="text-base font-semiBold mt-2">
                    {review?.comment}
                </p>
            </div>
        </div>
    );
};

const Related = ({ product, design }: any) => {
    const prevEl = 'feature-product-prev';
    const nextEl = 'feature-product-next';

    const styleCss = `
     .feature-product-prev {
     color:  ${design?.header_color};
     border: 1px solid ${design?.header_color};
    }
    .feature-product-next{
     color:  ${design?.header_color};
     border: 1px solid ${design?.header_color};
    }
    .feature-product-prev:hover {
     color:  ${design?.text_color};
     background: ${design?.header_color};
    }
    .feature-product-next:hover {
     color:  ${design?.text_color};
     background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
     opacity:1;
     background: white;
    }
`;

    return (
        <div className="pb-10 w-full sm:container px-5">
            <style>{styleCss}</style>
            <div className="pb-2">
                <SectionHeadingTwentyThree title={'RELATED PRODUCTS'} />
            </div>

            <div className="arrow-hov relative">
                <div className="">
                    <div className="arrow gap-2 lg:cursor-pointer opacity-0">
                        <div
                            className={`${prevEl} bg-white h-8 w-8 rounded-full flex justify-center items-center transition-all duration-500  ease-linear absolute left-0  top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronLeftIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                        <div
                            className={`${nextEl} bg-white h-8 w-8 flex justify-center items-center rounded-full transition-all duration-500  ease-linear absolute right-0 top-1/2 -translate-y-1/2 z-[5] `}
                        >
                            <ChevronRightIcon className="h-6 text-2xl font-serif font-bold" />
                        </div>
                    </div>
                </div>

                <DefaultSlider
                    prevEl={prevEl}
                    nextEl={nextEl}
                    loop={true}
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
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((productData: any) => (
                        <SwiperSlide key={productData.id}>
                            <Card49 item={productData} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

'use client';

import Card4 from '@/components/card/card4';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import SliderFive from '@/components/slider/slider-five';
import { profileImg } from '@/site-settings/siteUrl';
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

import { SwiperSlide } from 'swiper/react';
import Details from '../components/details-two';
import './twelve.css';
import VideoPlayer from '../components/video-player';

const Twelve = ({ store_id, productId }: any) => {
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

    const buttonTwelve =
    "bg-black btn-hover text-white text-xs font-bold sm:py-[16px] py-3 w-60 text-center";

    return (
        <div className=" sm:container px-5 sm:py-10 py-5 bg-white">
            {detailsContentSkeleton}
            <Details product={product} buttonStyle={buttonTwelve}/>

            {/* ************************ tab component start ***************************** */}
            <div className="mt-14">
                <TabGroup>
                    <TabList className="fiveBorder">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-xl  underline-offset-8 text-black border-hidden '
                                    : 'bg-white text-black fiveUn '
                            }
                        >
                            Description
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-xl  underline-offset-8 text-black border-hidden ml-8'
                                    : 'bg-white text-black fiveUn ml-8'
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
                            {reviews?.status && reviewsArr.length > 0
                                ? reviewsArr?.map((item: any, index: any) => (
                                      <UserReview review={item} key={index} />
                                  ))
                                : reviews?.message}
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

export default Twelve;

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
            Grade <Rate className="text-base" rating={parsedRating} />
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
        <div className=" shadow-lg py-5 sm:my-10 rounded-md ">
            <div className="my-5 pt-1 flex justify-between items-center sm:container px-5 sm:py-10 py-5">
                <SectionHeadingFive title={'Related product'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <SliderFive prevEl={prev} nextEl={next}>
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card4 item={item} />
                        </SwiperSlide>
                    ))}
                </SliderFive>
            </div>
        </div>
    );
};

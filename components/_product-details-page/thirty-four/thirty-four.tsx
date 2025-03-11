'use client';

import Card60 from '@/components/card/card60';
import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
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

import { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { SwiperSlide } from 'swiper/react';

<<<<<<< HEAD
import './five.css';
=======
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
import ProdMultiCategory from '@/utils/prod-multi-category';
import { NotFoundMsg } from '@/utils/little-components';
import VideoPlayer from '../components/video-player';
import DetailsThirtyFour from './details-thirty-four';
<<<<<<< HEAD
=======
import { RiArrowRightSLine } from 'react-icons/ri';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

const ThirtyFour = ({ store_id, productId, design, headersetting }: any) => {
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
    const reviewsArr = reviews?.data || [];

    const buttonTwentyThree =
        'text-sm sm:text-base sm:py-[12px] py-3 w-36 lg:w-40 xl:w-48';
    // const buttonTwentyThree =
    //     'font-bold py-3 text-center w-48 border border-gray-300 rounded lg:cursor-pointer';

    return (
        <div className="bg-[#F9F8FF]">
            <div className="w-full bg-white text-[#252525]">
                <div className="flex flex-col justify-center sm:container px-5 py-2">
                    <div className="flex items-center gap-1 text-sm font-bold">
                        <Link href="/">
                            <AiOutlineHome className="" />
                        </Link>
                        <RiArrowRightSLine />
                        <p>
                            <ProdMultiCategory
                                category={category}
                                count={1}
                                linkOff
                            />
                            {product?.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 py-5">
                {detailsContentSkeleton}
                <DetailsThirtyFour
                    design={design}
                    headersetting={headersetting}
                    product={product}
                    buttonStyle={buttonTwentyThree}
                />

                {/* ************************ tab component start ***************************** */}
                <div className="mt-14">
                    <div className="bg-white px-5 mb-5 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        <div className="relative pt-5">
                            <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                                Description:
                            </h2>
                            <p className="absolute h-[4px] w-28 -bottom-2 left-0 bg-orange-600"></p>
                        </div>
                        <div className="py-5">
                            <DangerouslySafeHTML
                                content={product?.description}
                            />
                        </div>
                    </div>
                    <div className="bg-white px-5 pb-5 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        <div className="relative pt-5">
                            <h2 className="text-lg text-gray-800 font-bold mb-3 capitalize">
                                Reviews
                            </h2>
                            <p className="absolute h-[4px] w-28 -bottom-2 left-0 bg-orange-600"></p>
                        </div>
                        {reviews?.status && reviewsArr.length > 0 ? (
                            reviewsArr?.map((item: any, index: any) => (
                                <UserReview review={item} key={index} />
                            ))
                        ) : (
                            <NotFoundMsg message={reviews?.message} />
                        )}
                    </div>
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

export default ThirtyFour;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);

    return (
        <div className=" bg-slate-50 p-5 my-5">
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
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="bg-white rounded-md shadow-[0_0_10px_rgba(0,0,0,0.2)] py-5 sm:my-10">
            <div className="my-5 pt-1 flex justify-between items-center sm:container px-5">
                <SectionHeadingFive title={'Related product'} />
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="sm:container px-5">
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
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card60 item={item}  type={'single_product_page'} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

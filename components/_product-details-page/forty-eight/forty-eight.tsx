'use client';

import SectionHeadingFive from '@/components/section-heading/section-heading-five';
import DefaultSlider from '@/components/slider/default-slider';
import { productImg, profileImg } from '@/site-settings/siteUrl';
import Rate from '@/utils/rate';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { NotFoundMsg } from '@/utils/little-components';
import VideoPlayer from '../components/video-player';
import DetailsFortyEight from './details-forty-eight';
import { RiArrowRightSLine } from 'react-icons/ri';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import BDT from '@/utils/bdt';
import Card78 from '@/components/card/card78';

const FortyEight = ({ store_id, productId, design, headersetting }: any) => {
    const descriptionRef = useRef(null);
    const reviewsRef = useRef(null);

    const scrollToSection = (ref: any) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

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
        'text-sm sm:text-base sm:py-[12px] py-3 px-2 lg:w-40 xl:w-48';

    return (
        <div className="">
            <div className="w-full bg-white text-[#252525]">
                <div className="flex flex-col justify-center sm:container px-5 py-2">
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Link href="/">Home</Link>
                        <RiArrowRightSLine />
                        <p className="flex items-center">
                            <ProdMultiCategory
                                category={category}
                                count={1}
                                linkOff
                            />
                            <RiArrowRightSLine />
                            {product?.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 py-5">
                {detailsContentSkeleton}
                <DetailsFortyEight
                    design={design}
                    headersetting={headersetting}
                    product={product}
                    buttonStyle={buttonTwentyThree}
                    zoomable
                />

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-8/12">
                        <Related product={relatedProducts} />
                    </div>
                    <div className="w-full lg:w-4/12 mt-16 hidden lg:block">
                        <RelatedProduct product={relatedProducts} />
                    </div>
                </div>

                {/* ************************ description & review start ***************************** */}
                <div className="bg-white">
                    {/* Scroll Buttons */}
                    <div className="px-4 flex items-center gap-5 py-3">
                        <button
                            onClick={() => scrollToSection(descriptionRef)}
                            className="px-3 py-2 text-sm md:text-base lg:text-xl md:mb-0 border-b-2 border-[--header-color]"
                        >
                            Description
                        </button>
                        <button
                            onClick={() => scrollToSection(reviewsRef)}
                            className="px-3 py-2 text-sm md:text-base lg:text-xl border-b-2 border-[--header-color]"
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Description Section */}
                    <div ref={descriptionRef} className="p-4 md:px-5">
                        <div className="rounded-lg p-5">
                            <DangerouslySafeHTML
                                content={product?.description}
                                className="text-sm md:text-base leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Customer Reviews Section */}
                    <div ref={reviewsRef} className="p-4 md:p-5">
                        {reviews?.status && reviewsArr.length > 0 ? (
                            reviewsArr?.map((item: any, index: number) => (
                                <UserReview review={item} key={index} />
                            ))
                        ) : (
                            <NotFoundMsg message={reviews?.message} />
                        )}
                    </div>
                </div>
                {/* ************************ description & review end ***************************** */}

                {product && product?.video_link && (
                    <VideoPlayer videoUrl={product?.video_link} />
                )}
            </div>
        </div>
    );
};

export default FortyEight;

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
        <div className="bg-white py-5 sm:my-10">
            <div className="my-5 pt-1 flex items-center sm:container px-5">
                <SectionHeadingFive title={'Related products'} />
            </div>
            <div className="sm:container px-5">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        350: {
                            slidesPerView: 2,
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
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1920: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide key={item?.id}>
                            <Card78 item={item} type={'single_product_page'} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

const RelatedProduct = ({ product }: any) => {
    return (
        <div className="w-full">
            <div>
                <h1 className="xl:text-xl font-medium mb-5">
                    Recommended For You
                </h1>
            </div>
            <div className="flex flex-col gap-5 w-full">
                {product
                    ?.slice(0, 4)
                    ?.map((item: any) => <Card item={item} key={item.id} />)}
            </div>
        </div>
    );
};

const Card = ({ item }: any) => {
    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div className="border">
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div className="flex flex-row items-center gap-6">
                    <div>
                        <img
                            src={productImg + item.image[0]}
                            alt={item?.name}
                            className="w-28 h-28 object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <div className="my-1 xl:text-base text-sm">
                            {item?.name}
                        </div>
                        <div className="text-gray-600 font-semibold flex items-center gap-2 w-full">
                            <p className="text-color text-sm">
                                <BDT price={price} />
                            </p>
                            {save > 0 && (
                                <p className="line-through text-xs text-gray-400">
                                    <BDT
                                        price={numberParser(
                                            item?.regular_price
                                        )}
                                    />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

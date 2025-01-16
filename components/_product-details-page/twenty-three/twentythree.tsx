'use client';

import userImg from '@/assets/img/user.png';
import Card47 from '@/components/card/card47';
import SectionHeadingTwentyThree from '@/components/section-heading/section-heading-twentythree';
import DefaultSlider from '@/components/slider/default-slider';

import { productImg, profileImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';

import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import Rate from '@/utils/rate';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import moment from 'moment';
import Link from 'next/link';

import { RiArrowRightSLine } from 'react-icons/ri';
import { SwiperSlide } from 'swiper/react';

import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { NotFoundMsg } from '@/utils/little-components';
import Details from '../components/details-two';
import VideoPlayer from '../components/video-player';

const TwentyThree = ({ store_id, productId, design }: any) => {
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
      color:  ${design?.header_color};
      text-decoration-color: ${design?.header_color};
      text-decoration-thickness: 3px;
    }
`;

    const buttonTwentyThree =
        'cart-btn-details font-bold py-[11px] w-48 border border-gray-300 rounded';

    return (
        <div className={`sm:container px-5 bg-white xl:px-24`}>
            <div className="flex items-center gap-x-1 text-gray-500 text-sm mt-5">
                <Link href="/">
                    <p>Home</p>
                </Link>
                <RiArrowRightSLine />
                <p className="truncate">{product?.name}</p>
            </div>

            <style>{styleCss}</style>

            <div className="grid lg:grid-cols-7 gap-5">
                <div className="lg:col-span-6 w-full">
                    {detailsContentSkeleton}
                    <Details
                        buttonStyle={buttonTwentyThree}
                        product={product}
                        multiCat
                        social
                        supplierDetails
                    />
                </div>
                <div className="w-full hidden lg:block">
                    <RelatedProduct product={relatedProducts} />
                </div>
            </div>

            {/* ************************ tab component start ***************************** */}
            <div className="mt-20 border-b pb-10">
                <TabGroup>
                    <TabList className="pb-3 w-full border-b text-center">
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-lg focus:outline-none underline-offset-[17px] border-hidden active-des-review uppercase'
                                    : 'bg-white text-black text-lg uppercase'
                            }
                        >
                            Description
                        </Tab>
                        <Tab
                            className={({ selected }) =>
                                selected
                                    ? 'underline text-lg focus:outline-none underline-offset-[17px] active-des-review border-hidden ml-8 uppercase'
                                    : 'bg-white text-black ml-8 text-lg uppercase'
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

export default TwentyThree;

const UserReview = ({ review }: any) => {
    const parsedRating = numberParser(review?.rating, true);
    return (
        <div className="p-5 flex items-center gap-5 w-full">
            <div className="avatar">
                <div className="w-20 h-20 rounded-full">
                    <img
                        src={
                            review?.image
                                ? profileImg + review?.image
                                : userImg.src
                        }
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
        <div className="pb-10 w-full">
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
                            <Card47 item={productData} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

const RelatedProduct = ({ product }: any) => {
    return (
        <div>
            <div>
                <h1 className="xl:text-xl text-sm mb-5">Recommended For You</h1>
            </div>
            <div className="flex lg:flex-col items-center gap-1 lg:gap-5">
                {product
                    ?.slice(0, 3)
                    ?.map((item: any) => <Card item={item} key={item.id} />)}
            </div>
        </div>
    );
};

const Card = ({ item }: any) => {
    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div>
            <Link href={'/product/' + item?.id + '/' + item?.slug}>
                <div>
                    <img src={productImg + item.image[0]} alt="" />
                </div>
                <div className="my-1 xl:text-base text-sm">{item?.name}</div>
                <div className="text-gray-600 font-semibold flex items-center gap-2 w-full ">
                    <p className="text-color text-sm">
                        <BDT price={price} />
                    </p>
                    {save > 0 && (
                        <p className="line-through text-xs text-gray-400">
                            {' '}
                            <BDT price={numberParser(item?.regular_price)} />
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
};

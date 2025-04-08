'use client';

import DefaultSlider from '@/components/slider/default-slider';
import { profileImg } from '@/site-settings/siteUrl';
import Arrow from '@/utils/arrow';
import Rate from '@/utils/rate';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { SwiperSlide } from 'swiper/react';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import { useEffect, useState } from 'react';
import VideoPlayer from '../components/video-player';
import moment from 'moment';
import { NotFoundMsg } from '@/utils/little-components';
import DetailsFortyThree from './details-fortythree';
import ProductCardTen from '@/components/card/product-card/product-card-ten';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import DetailsLandingPage from '../landing-page/details-landing-page';

const FortyThree = ({ store_id, productId, design, headersetting }: any) => {
    const module_id = 121;
    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const landingPageModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isLandingPage = numberParser(landingPageModule?.status) === 1;

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
    const [open, setOpen] = useState<boolean>(false);

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
        relatedContentSkeleton = <p className="text-center">Loading...</p>;
    }
    const reviewsArr = reviews?.data || [];

    const buttonTwentyFive =
        'cart-btn1 font-bold py-[10px] px-10 w-full w-max border border-gray-300 rounded';

    return (
        <div className="">
            <div className="">
                {detailsContentSkeleton}

                {isLandingPage && product?.layout?.length > 0 ? (
                    <div className="bg-[var(--header-color)] h-full my-20 py-20">
                        <div className="shadow-md rounded-md bg-white mx-4 md:mx-40 ">
                            <DetailsLandingPage
                                design={design}
                                headersetting={headersetting}
                                product={product}
                            />
                            {product?.tags?.length > 0 && (
                                <>
                                    {relatedContentSkeleton}
                                    <LandingRelatedProducts
                                        product={relatedProducts}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="sm:px-10 px-5">
                        <DetailsFortyThree
                            design={design}
                            product={product}
                            setOpen={setOpen}
                            open={open}
                            buttonStyle={buttonTwentyFive}
                        />
                    </div>
                )}
            </div>

            {product?.layout?.length == 0 && (
                <div className="mt-14 sm:px-10 px-5">
                    <TabGroup>
                        <TabList className="fiveBorder">
                            <Tab
                                className={({ selected }: any) =>
                                    selected
                                        ? 'bg-[var(--header-color)] underline-offset-8 border-hidden px-4 py-2'
                                        : 'bg-white text-black border px-4 py-2'
                                }
                            >
                                Description
                            </Tab>
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? 'bg-[var(--header-color)] underline-offset-8 text-black border-hidden px-4 py-2 ml-3'
                                        : 'bg-white text-black ml-3 border px-4 py-2'
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
            )}

            {product && product?.video_link && product?.layout?.length == 0 && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {product?.layout?.length == 0 && (
                <div>
                    {relatedContentSkeleton}
                    <Related product={relatedProducts} />
                </div>
            )}
        </div>
    );
};

export default FortyThree;

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
            <Rate className="text-base" rating={parsedRating} />
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
        <div className="py-5 sm:my-10 rounded-md w-full">
            <div className="my-5 flex justify-between items-center sm:px-10 px-5">
                <p className="text-2xl">You may also like</p>
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="sm:px-10 px-5">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        375: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        600: {
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
                    }}
                >
                    {product?.slice(0, 10)?.map((item: any) => (
                        <SwiperSlide
                            className="swiperjs-slide py-10"
                            key={item?.id}
                        >
                            <ProductCardTen item={item} />
                        </SwiperSlide>
                    ))}
                </DefaultSlider>
            </div>
        </div>
    );
};

const LandingRelatedProducts = ({ product }: any) => {
    return (
        <div className="py-5 sm:my-10 rounded-md w-full">
            <div className="my-5 sm:px-10 px-5">
                {product.length > 0 && (
                    <p className="text-2xl">Related Product</p>
                )}
            </div>
            <div className="sm:px-10 px-5">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {product
                        ?.slice(0, 5)
                        ?.map((item: any) => (
                            <ProductCardTen item={item} key={item?.id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

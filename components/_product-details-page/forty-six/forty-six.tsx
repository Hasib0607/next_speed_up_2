'use client';

import DefaultSlider from '@/components/slider/default-slider';
import Arrow from '@/utils/arrow';
import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
} from '@/redux/features/products/productApi';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { SwiperSlide } from 'swiper/react';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import { useEffect, useState } from 'react';
import VideoPlayer from '../components/video-player';
import DetailsFortyThree from './details-fortysix';
import ProductCardTen from '@/components/card/product-card/product-card-ten';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import DetailsLandingPage from '../landing-page/details-landing-page';

const FortySix = ({ store_id, productId, design, headersetting }: any) => {
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

    const [product, setProduct] = useState<any>({});
    const [relatedProducts, setRelatedProducts] = useState<any>([]);
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

    let detailsContentSkeleton;

    if (productDetailsLoading && !productDetailsError) {
        detailsContentSkeleton = <Skeleton />;
    }

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p className="text-center">Loading...</p>;
    }

    const buttonTwentyFive =
        'cart-btn1 font-bold py-[10px] px-10 w-full w-max border border-gray-300 rounded';

    return (
        <div className="">
            <div className="">
                {detailsContentSkeleton}

                {isLandingPage && product?.layout?.length > 0 ? (
                    <div className="bg-[var(--header-color)] h-full pt-5 md:py-20">
                        <div className="shadow-md rounded-md bg-white md:mx-40">
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
                            zoomable
                        />
                    </div>
                )}
            </div>

            {product?.layout?.length == 0 && (
                <div className="mt-14 sm:pl-10 pl-5 pr-5 sm:pr-3 w-full md:w-1/2">
                    <div className="mb-8 border rounded-md">
                        <div className="p-5 ">
                            <DangerouslySafeHTML
                                content={product?.description}
                            />
                        </div>
                    </div>
                </div>
            )}

            {product && product?.video_link && product?.layout?.length == 0 && (
                <VideoPlayer videoUrl={product?.video_link} />
            )}

            {product?.layout?.length == 0 && product?.tags?.length > 0 && (
                <div>
                    {relatedContentSkeleton}
                    <Related product={relatedProducts} />
                </div>
            )}
        </div>
    );
};

export default FortySix;

const Related = ({ product }: any) => {
    const prev = 'best_seller_Prev';
    const next = 'best_seller_Next';
    return (
        <div className="py-5 sm:my-10 rounded-md w-full">
            <div className="my-5 flex justify-between items-center sm:px-10 px-5">
                {product.length > 0 && (
                    <p className="text-2xl">You may also like</p>
                )}
                <Arrow prevEl={prev} nextEl={next}></Arrow>
            </div>
            <div className="sm:px-10 px-5">
                <DefaultSlider
                    prevEl={prev}
                    nextEl={next}
                    breakpoints={{
                        375: {
                            slidesPerView: 2,
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
                            slidesPerView: 6,
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

'use client';


import {
    useGetProductDetailsQuery,
    useGetRelatedProductsQuery,
    useGetReviewsQuery,
} from '@/redux/features/products/productApi';
import parse from 'html-react-parser';
import Skeleton from '@/components/loaders/skeleton';
import { NotFoundMsg } from '@/utils/little-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import VideoPlayer from '../components/video-player';
import DetailsFortyFive from './details-fortyfive';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlinePayment, MdEmojiNature } from 'react-icons/md';
import { CiDeliveryTruck } from 'react-icons/ci';
import Card76 from '@/components/card/card76';

const FortyFive = ({ store_id, productId, design }: any) => {
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

    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

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
        <div className=" sm:py-10 py-5">
            {detailsContentSkeleton}
            <div className="sm:container px-5">
                <DetailsFortyFive product={product} design={design} zoomable>
                    <According
                        text="Description"
                        description={product?.description}
                    />

                    {/* <According text={'Customer Reviews'} reviews={reviews} /> */}
                    <div className="h-[1px] bg-gray-300 w-full "></div>

                    <div>
                        <h2 className="font-black text-xl">
                            আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
                        </h2>
                        <div className="mt-7 space-y-2 font-semibold underline text-lg">
                            {headersetting?.whatsapp_phone && (
                                <a
                                    href={`https://wa.me/${headersetting.whatsapp_phone}?text=${encodeURIComponent('আমি আপনার পণ্য অর্ডার করতে চাই।')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {headersetting.whatsapp_phone}
                                </a>
                            )}
                            {headersetting?.phone && (
                                <a
                                    href={`tel:${headersetting.phone}`}
                                    className="block"
                                >
                                    হট লাইন: {headersetting.phone}
                                </a>
                            )}
                        </div>
                    </div>
                </DetailsFortyFive>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center py-16 md:py-28 mt-3 gap-20 md:gap-28 bg-[#f3f3f3]">
                <div className="flex items-center gap-10">
                    <MdOutlinePayment className="text-5xl" />
                    <div className="text-center">
                        <h2 className="font-semibold text-lg">
                            নিরাপদ পেমেন্ট
                        </h2>
                        <p>বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <CiDeliveryTruck className="text-5xl" />
                    <div className="text-center">
                        <h2 className="font-semibold text-lg">
                            গ্রিন ডেলিভারি
                        </h2>
                        <p>৩-৫ দিনের মধ্যে আপনার পণ্য পৌছে যাবে</p>
                    </div>
                </div>
                <div className="flex items-center gap-10">
                    <MdEmojiNature className="text-5xl" />
                    <div className="text-center">
                        <h2 className="font-semibold text-lg">
                            ১০০% ন্যাচারাল
                        </h2>
                        <p>
                            প্রাকৃতিক উপাদান ব্যবহার করতে প্রতিশ্রুতিবদ্ধ
                        </p>
                    </div>
                </div>
            </div>

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

export default FortyFive;

const According = ({ text, description }: any) => {
    const [show, setShow] = useState(false);

    return (
        <AnimatePresence>
            <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center lg:cursor-pointer text-lg font-semibold"
            >
                <div className="h3">{text}</div>
                {show ? (
                    <IoIosArrowUp width={25} />
                ) : (
                    <IoIosArrowDown width={25} />
                )}
            </div>

            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="font-seven text-sm leading-7 text-[#5a5a5a] mt-2"
                    key={text}
                >
                    {description ? (
                        parse(description)
                    ) : (
                        <NotFoundMsg message="No description available." />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// const UserReview = ({ review }: any) => {
//     const parsedRating = numberParser(review?.rating, true);

//     return (
//         <div className=" bg-slate-50 p-5">
//             <div className="avatar">
//                 <div className="w-20 h-20 rounded-full">
//                     <img
//                         src={profileImg + review?.image}
//                         className="rounded-full h-full w-full"
//                         alt=""
//                     />
//                 </div>
//             </div>
//             <Rate className={'text-base'} rating={parsedRating} />
//             <p className="text-xs font-semibold mt-2">{review?.name}</p>
//             <p className="text-sm font-light mt-2">
//                 Since {new Date(review?.ucd).getFullYear()}
//             </p>
//             <p className="text-base font-semiBold mt-2">{review?.comment}</p>
//         </div>
//     );
// };

const Related = ({ product }: any) => {
    return (
        <div className="sm:container px-5 py-5 sm:py-10 rounded-md bg-white">
            <div className="my-5 pt-1">
                <h2 className='font-bold text-2xl'>You Might Also Like</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {product?.map((item: any) => (
                    <Card76 key={item?.id} item={item} />
                ))}
            </div>
        </div>
    );
};
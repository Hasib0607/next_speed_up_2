'use client';

import {
    useGetRelatedProductsQuery,
} from '@/redux/features/products/productApi';
import Skeleton from '@/components/loaders/skeleton';
import { useEffect, useState } from 'react';
import DetailsLandingPage from './details-landing-page';
import ProductCardTen from '@/components/card/product-card/product-card-ten';

const Test = ({ store_id, productId, design,  product, headersetting }: any) => {

    const {
        data: relatedProductsData,
        isLoading: relatedProductsLoading,
        isError: relatedProductsError,
        isSuccess: relatedProductsSuccess,
    } = useGetRelatedProductsQuery({ productId });

    const [relatedProducts, setRelatedProducts] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);

    console.log("relatedProductsData", relatedProductsData);
    console.log("productId", productId);

    useEffect(() => {
        if (relatedProductsSuccess && relatedProductsData) {
            const relatedProductsArr = relatedProductsData?.data || [];
            setRelatedProducts(relatedProductsArr);
        }
    }, [relatedProductsData, relatedProductsSuccess]);

    let relatedContentSkeleton;

    if (relatedProductsLoading && !relatedProductsError) {
        relatedContentSkeleton = <p className='text-center'>Loading ...</p>;
    }


    return (
        <div className='bg-[var(--header-color)] h-full my-20 py-20'>
            <div className="shadow-md rounded-md bg-white mx-4 md:mx-40 ">
                <DetailsLandingPage
                    design={design}
                    headersetting={headersetting}
                    product={product}
                />
                {relatedContentSkeleton}
                <Related product={relatedProducts} />
            </div>
        </div>
    );
};

export default Test;

const Related = ({ product }: any) => {
    return (
        <div className="py-5 sm:my-10 rounded-md w-full">
            <div className="my-5 sm:px-10 px-5">
                <p className="text-2xl">Related Product</p>
            </div>
            <div className="sm:px-10 px-5">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {product?.slice(0, 5)?.map((item: any) => (
                        <ProductCardTen item={item} key={item?.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

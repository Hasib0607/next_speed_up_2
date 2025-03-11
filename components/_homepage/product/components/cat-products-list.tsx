'use client';

import Skeleton from '@/components/loaders/skeleton';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { CategoryProducts, Product } from '@/types';
import { useEffect, useState } from 'react';
import Cards from './cards';

const CatProductsList = ({
    id,
    className,
    children,
    card,
    count,
    btnType,
}: any) => {
    const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>(
        []
    );

    const { data, isLoading, isFetching, isError, isSuccess } =
        useGetCategoryProductQuery({ id });

    useEffect(() => {
        if (isSuccess && data) {
            setCategoryProducts(data?.data?.products);
        }
    }, [data, isSuccess]);

    // Show loading skeleton if theme or header settings are still loading
    if ((isLoading || isFetching) && !isError) {
        return (
            <div className="col-span-12 lg:col-span-9">
                <Skeleton count={count ?? 3} />
            </div>
        );
    }

    return (
        <div
            className={
                className ??
                'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5'
            }
        >
            {categoryProducts?.length > 0
                ? categoryProducts
                      ?.slice(0, count)
                      ?.map((productData: Product) => (
                          <div key={productData.id}>
                              <Cards
                                  item={productData}
                                  card={card}
                                  btnType={btnType}
                              />
                          </div>
                      ))
                : children}
        </div>
    );
};

export default CatProductsList;

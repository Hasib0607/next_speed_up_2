/* eslint-disable no-unused-vars */
'use client';

import Skeleton from '@/components/loaders/skeleton';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { CategoryProducts, Product } from '@/types';
import { useEffect, useState } from 'react';
import Cards from '../components/cards';


interface CatProductsListProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    card: string;
    count?: number;
    btnType?: string;
    onProductsRendered?: (categoryId: string, count: number) => void;
}

const CatgoryProductsList = ({
    id,
    className,
    children,
    card,
    count,
    btnType,
    onProductsRendered
}: CatProductsListProps) => {
    const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>([]);
    const { data, isLoading, isFetching, isError, isSuccess } = 
        useGetCategoryProductQuery({ id });

    useEffect(() => {
        if (isSuccess && data?.data?.products) {
            setCategoryProducts(data.data.products);
        }
    }, [data, isSuccess]);

    useEffect(() => {
        if (typeof onProductsRendered === 'function' && categoryProducts.length > 0) {
            onProductsRendered(id, categoryProducts.length);
        }
    }, [categoryProducts.length, id, onProductsRendered]);

    if ((isLoading || isFetching) && !isError) {
        return (
            <div className="col-span-12 lg:col-span-9">
                <Skeleton count={count ?? 3} />
            </div>
        );
    }

    const displayedProducts = count ? categoryProducts.slice(0, count) : categoryProducts;

    return displayedProducts.length > 0 ? (
        <div className={
            className ??
            'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5'
        }>
            {displayedProducts.map((productData: Product) => (
                <div key={productData.id}>
                    <Cards item={productData} card={card} btnType={btnType} />
                </div>
            ))}
        </div>
    ) : (
        children
    );
};

export default CatgoryProductsList;
'use client';

import Skeleton from '@/components/loaders/skeleton';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { CategoryProducts, Product } from '@/types';
import { useEffect, useState } from 'react';
import Cards from '../components/cards';


interface CatProductsListProps {
    id: string;
    card: string;
    count?: number;
    btnType?: string;
    className?: string;
    children?: React.ReactNode;
    onProductsRendered?: (categoryId: string, count: number) => void;
    render?: (products: Product[]) => React.ReactNode;
}

const CatgoryProductsList: React.FC<CatProductsListProps> & { Card?: typeof Cards } = (props) => {
    const {
        id,
        card,
        count,
        btnType,
        className,
        render,
        children,
        onProductsRendered
    } = props;

    const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>([]);
    const { data, isLoading, isFetching, isError, isSuccess } = useGetCategoryProductQuery({ id });

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

    const displayedProducts = count ? categoryProducts.slice(0, count) : categoryProducts;

    if ((isLoading || isFetching) && !isError) {
        return <Skeleton count={count ?? 5} />;
    }

    if (render) {
        return <>{render(displayedProducts)}</>;
    }

    if (displayedProducts.length === 0) {
        return children ?? (
            <div className="text-red-500 text-center py-10 text-xl">No Products Available</div>
        );
    }

    return (
        <div className={
            className ??
            'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5'
        }>
            {displayedProducts.map((product: Product) => (
                <div key={product.id}>
                    <Cards item={product} card={card} btnType={btnType} />
                </div>
            ))}
        </div>
    );
};

CatgoryProductsList.Card = Cards;

export default CatgoryProductsList;

'use client';

import Link from 'next/link';
import { catImg } from '@/site-settings/siteUrl';
import { useState, useCallback } from 'react';
import CatgoryProductsList from './category-products-list';
import FeatureCategory from './feature-category';

const ProductFortyFour = ({ design, category, headersetting, banner }: any) => {
    const [productCounts, setProductCounts] = useState<{
        [key: string]: number;
    }>({});

    const handleProductsRendered = useCallback(
        (categoryId: string, productCount: number) => {
            setProductCounts((prev) => ({
                ...prev,
                [categoryId]: productCount,
            }));
        },
        []
    );

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <div className="flex flex-col gap-8">
                {category?.map((item: any) => {
                    const currentCount = productCounts[item.id] || 0;
                    const hasMoreProducts = currentCount >= 8;

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row gap-5"
                        >
                            <div className="w-full md:w-1/3">
                                <FeatureCategory item={item} />
                            </div>

                            <div className="w-full md:w-2/3">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                                    <CatgoryProductsList
                                        id={item.id}
                                        className="contents"
                                        card={'74'}
                                        count={hasMoreProducts ? 7 : 8}
                                        btnType={'product'}
                                        onProductsRendered={
                                            handleProductsRendered
                                        }
                                    >
                                        <div className="text-red-500 text-center py-10 text-xl">
                                            No Products Available
                                        </div>
                                    </CatgoryProductsList>

                                    {hasMoreProducts && (
                                        <Link
                                            href={`/category/${item.id}`}
                                            className="group relative h-full min-h-[300px] overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                                            <img
                                                src={catImg + item.banner}
                                                className="h-full w-full object-cover"
                                                alt={item.name}
                                            />
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                                <span className="text-2xl font-bold text-white drop-shadow-md">
                                                    VIEW MORE
                                                </span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductFortyFour;

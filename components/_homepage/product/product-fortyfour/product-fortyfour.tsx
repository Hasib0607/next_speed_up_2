/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Link from 'next/link';
import { catImg, bannerImg } from '@/site-settings/siteUrl'; // Ensure bannerImg is imported
import { useState, useCallback } from 'react';
import CatgoryProductsList from './category-products-list';
import FeatureCategory from './feature-category';

const ProductFortyFour = ({ category, banner }: any) => {
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

    // Split categories into chunks of two
    const categoryChunks = [];
    for (let i = 0; i < category.length; i += 2) {
        categoryChunks.push(category.slice(i, i + 2));
    }

    // Take first 6 banners
    const displayBanners = banner?.slice(6) || [];

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <div className="flex flex-col gap-8">
                {categoryChunks.map((chunk, chunkIndex) => (
                    <div key={chunkIndex} className="flex flex-col gap-8">
                        {/* Render each category in the chunk */}
                        {chunk.map((item: any) => {
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
                        {/* Banner row after each chunk */}
                        {displayBanners.length > 0 && (
                            <div className="grid grid-cols-3 gap-5">
                                {displayBanners
                                    .slice(chunkIndex * 3, chunkIndex * 3 + 3)
                                    .map((ban: any) => (
                                        <div
                                            key={ban?.id}
                                            className="relative overflow-hidden"
                                        >
                                            <Link
                                                href={ban?.link ?? '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    alt="gallery"
                                                    className="min-w-full h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                                    src={bannerImg + ban?.image}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFortyFour;
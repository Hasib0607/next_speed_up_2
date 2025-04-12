'use client';

import CatProductsList from './components/cat-products-list';
import SectionHeadingTwentyOne from '@/components/section-heading/section-heading-twentyone';
import Link from 'next/link';
import { catImg } from '@/site-settings/siteUrl';

const ProductFortyFour = ({ design, category, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = sectionHeadingData || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <div className="pb-2">
                <SectionHeadingTwentyOne
                    title={title || 'POPULAR'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
            </div>

            <div className="flex flex-col gap-8">
                {category?.slice(0, 3).map((item: any) => {
                    // In real implementation, you would check actual product count here
                    const hasMoreProducts = true; // Replace with actual product count check

                    return (
                        <div key={item.id} className="flex flex-col md:flex-row gap-5">
                            {/* FeatureCat - Left Side */}
                            <div className="w-full md:w-1/3">
                                <FeatureCat item={item} />
                            </div>
                            
                            {/* Products Grid Container */}
                            <div className="w-full md:w-2/3">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                                    <CatProductsList
                                        id={item.id}
                                        className="contents"
                                        card={'45'}
                                        count={hasMoreProducts ? 7 : 8}
                                        btnType={"product"}
                                    >
                                        <div className="text-red-500 text-center py-10 text-xl">
                                            No Products Available
                                        </div>
                                    </CatProductsList>

                                    {/* VIEW MORE card - Only show if hasMoreProducts */}
                                    {hasMoreProducts && (
                                        <Link
                                            href={`/category/${item.id}`}
                                            className="group relative h-full min-h-[300px] overflow-hidden rounded-lg"
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
                    )
                })}
            </div>
        </div>
    );
};

export default ProductFortyFour;

const FeatureCat = ({ item }: any) => {
    return (
        <div className="h-full">
            <Link
                href={`/category/${item.id}`}
                className="relative h-full w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100 hover:shadow-lg transition-shadow"
            >
                <img
                    src={catImg + item.banner}
                    className="h-full w-full object-cover hover:scale-105 duration-500"
                    alt={item.name}
                />
                <div className="absolute top-1/2 -translate-y-1/2 uppercase">
                    <span className="text-xl font-bold text-white shadow-sm">
                        {item.name}
                    </span>
                </div>
            </Link>
        </div>
    );
};
'use client';

import FilterByBrandNew from '@/components/_category-page/components/filter-by-brand-new';
import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Pagination from '@/components/paginations/pagination';
import Skeleton from '@/components/loaders/skeleton';
import { getPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import MotionLink from '@/utils/motion-link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import BrandCard from './_components/brand-card';
import BrandTitle from './_components/brand-title';
import BrandTitleBorder from './_components/brand-title-border';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import getPaginationStatusById from '@/helpers/getPaginationStatusById';

const BrandDefault = ({ brands, design }: any) => {
    const store_id = numberParser(design?.store_id) || null;

    const module_id = 105;
    const pathName = usePathname();
    const currentPath = getPathName(pathName);

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<any>({});

    const filtersData = useSelector((state: RootState) => state.filters);

    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);
    const [infiniteProducts, setInfiniteProducts] = useState<any[]>([]);

    const {
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch: shopPageProductsRefetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const isPagination = getPaginationStatusById(modules,module_id)

    const nextPageFetch = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        shopPageProductsRefetch();
        if (paginate?.total > 0) {
            const more = numberParser(paginate?.total / 8, true) > page;
            setHasMore(more);
        }
    }, [page, activeColor, shopPageProductsRefetch, priceValue, paginate]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue]);

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data?.products || [];
            const paginationData = shopPageProductsData?.data?.pagination || {};

            setPaginate(paginationData);
            setProducts(productsData);
        }
    }, [
        shopPageProductsData,
        shopPageProductsSuccess,
        shopPageProductsFetching,
        page,
    ]);

    useEffect(() => {
        if (!isPagination) {
            setInfiniteProducts((prev) => {
                if (page === 1) {
                    // Reset on new filter or first page load
                    return products;
                } else {
                    // Append new products but filter out duplicates
                    const newProducts = products?.filter(
                        (p) => !prev.some((prevP) => prevP.id === p.id)
                    );
                    return [...prev, ...newProducts];
                }
            });
        }
    }, [isPagination, paginate, page, products]);
    

    return (
        <>
            <div className="sm:container px-5 sm:py-10 py-5 ">
                <div className="">
                    <div className="text-sm md:mt-6 my-4 ">
                        <ul className="flex items-center gap-x-2">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>{'>'}</li>
                            <li>{currentPath}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sm:container px-5 pb-10">
                <div className="grid grid-cols-12">
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="flex flex-col gap-4">
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <BrandTitle text={'Category'} color={'black'} />
                                <BrandTitleBorder />

                                <nav className="list-none mb-6 space-y-3 px-4">
                                    {category?.map((item: any) => (
                                        <MotionLink
                                            key={item?.id}
                                            text={item?.name}
                                            href={'/category/' + item?.id}
                                        />
                                    ))}
                                </nav>
                            </div>
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <FilterByBrandNew brands={brands} />
                            </div>
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <FilterByColorNew />
                            </div>
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <FilterByPriceNew />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-9 w-full ml-4">
                        <div className="flex items-center justify-start mb-3">
                            <div className="bg-gray-300 py-1 px-3 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    Showing{' '}
                                    <span className="font-medium">
                                        {paginate?.from}
                                    </span>{' '}
                                    to{' '}
                                    <span className="font-medium">
                                        {paginate?.to}
                                    </span>{' '}
                                    of{' '}
                                    <span className="font-medium">
                                        {paginate?.total}
                                    </span>{' '}
                                    results
                                </p>
                            </div>
                        </div>

                        {/* show loading */}
                        <div className="col-span-12 lg:col-span-9">
                            {isPagination &&
                            ((shopPageProductsLoading &&
                                !shopPageProductsError) ||
                                shopPageProductsFetching)
                                ? Array.from({ length: 8 })?.map((_, index) => (
                                      <Skeleton key={index} />
                                  ))
                                : null}
                        </div>

                        {/* main products in here  */}
                        {!isPagination ? (
                            <div>
                                <InfiniteScroll
                                    style={{
                                        height: 'auto',
                                        overflow: 'hidden',
                                    }}
                                    dataLength={infiniteProducts?.length}
                                    next={nextPageFetch}
                                    hasMore={hasMore}
                                    loader={<InfiniteLoader />}
                                    endMessage={
                                        <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                                            No More Products
                                        </p>
                                    }
                                >
                                    <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                                        {brands?.map(
                                            (item: any, index: number) => (
                                                <BrandCard
                                                    key={`${item?.id}-${index}`}
                                                    item={item}
                                                />
                                            )
                                        )}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        ) : (
                            <div>
                                {brands?.length ? (
                                    <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                                        {brands?.map((i: any) => (
                                            <BrandCard
                                                key={i?.id}
                                                item={i}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex justify-center h-[400px] items-center">
                                        <h3 className=" font-sans font-semibold text-3xl text-gray-400 ">
                                            Product Not Found!
                                        </h3>
                                    </div>
                                )}
                            </div>
                        )}

                        {isPagination && paginate?.total > 7 && (
                            <div className="my-5">
                                <Pagination
                                    paginate={paginate}
                                    initialPage={page}
                                    setPage={setPage}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrandDefault;
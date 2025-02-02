'use client';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import ProductCardOne from '@/components/card/product-card/product-card-one';
import Skeleton from '@/components/loaders/skeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import {
    useGetColorsQuery,
    useGetShopPageProductsQuery,
} from '@/redux/features/shop/shopApi';

import Pagination from '@/components/_category-page/components/pagination';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import { getPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import MotionLink from '@/utils/motion-link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const One = ({ store_id }: any) => {
    const module_id = 105;
    const pathName = usePathname();
    const currentPath = getPathName(pathName);

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [hasMore, setHasMore] = useState<boolean>(true);
    const [paginate, setPaginate] = useState<any>({});

    // setting the initial page number
    const [page, setPage] = useState(1);

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
        refetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const {
        data: colorsData,
        isLoading: colorsLoading,
        isSuccess: colorsSuccess,
    } = useGetColorsQuery({ store_id });

    const colors = colorsData?.data || [];

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );

    const isPagination = numberParser(paginationModule?.status) === 1;

    const nextPageFetch = () => {
        setPage((prev) => prev + 1);
    };

    // Trigger Redux API call when dependencies change
    useEffect(() => {
        refetch();
    }, [page, activeColor, refetch, priceValue]);

    // useEffect(() => {
    //     if (shopPageProductsSuccess) {
    //         const productsData = shopPageProductsData?.data?.products || [];
    //         const paginationData = shopPageProductsData?.data?.pagination || {};

    //         setPaginate(paginationData);
    //         setProducts(productsData);

    //         if (filtersData?.color || filtersData?.price || page === 1) {
    //             setPage(1)
    //         }
    //     }
    //     // console.log('page', page);
    // }, [
    //     shopPageProductsData,
    //     shopPageProductsSuccess,
    //     filtersData,
    //     page,
    //     isPagination,
    //     products
    // ]);
    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data?.products || [];
            const paginationData = shopPageProductsData?.data?.pagination || {};
    
            setPaginate(paginationData);
    
            if (page === 1) {
                // Replace products when filters or first page
                setProducts(productsData);
            } else {
                // Append only new products when paginating
                setProducts((prev) => [
                    ...prev.filter((p:any) => !productsData.some((newP:any) => newP.id === p.id)),
                    ...productsData,
                ]);
            }
    
            if (filtersData?.color || filtersData?.price) {
                setPage(1);
            }
        }
    }, [shopPageProductsData, shopPageProductsSuccess, filtersData, page]);
    

    useEffect(() => {
        setHasMore(paginate?.has_more_pages ?? false);
    
        if (!isPagination) {
            setInfiniteProducts((prev) => {
                if (page === 1) {
                    // Reset on new filter or first page load
                    return products;
                } else {
                    // Append new products but filter out duplicates
                    const newProducts = products.filter(
                        (p) => !prev.some((prevP) => prevP.id === p.id)
                    );
                    return [...prev, ...newProducts];
                }
            });
        }
    }, [isPagination, paginate, page, products]);
    
    // useEffect(() => {
    //     setHasMore(paginate?.has_more_pages ?? false);
    //     if (!isPagination) {
    //         setInfiniteProducts((prev) => {
    //             // If page is 1, replace data, otherwise append
    //             return page > 1 ? [...prev, ...products.filter(p => !prev.some(prevP => prevP.id === p.id))] : products;
    //         });
    //     }

    // }, [isPagination, paginate, page, products]);

    // console.log("p",products);
    // console.log("infiniteProducts",infiniteProducts);
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
                                <Title text={'Category'} color={'black'} />
                                <TitleBorder />

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
                                <FilterByColorNew
                                    colors={colors}
                                    activeColor={activeColor}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
                            </div>
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <FilterByPriceNew
                                    priceValue={priceValue}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
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
                                    dataLength={products?.length}
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
                                        {infiniteProducts?.map(
                                            (i: any, index: number) => (
                                                <ProductCardOne
                                                    // key={`${i?.id}-${index}`}
                                                    key={i?.id}
                                                    item={i}
                                                />
                                            )
                                        )}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        ) : (
                            <div>
                                {products?.length ? (
                                    <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                                        {products?.map((i: any) => (
                                            <ProductCardOne
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

                        {isPagination && paginate?.total > 7 ? (
                            <div className="my-5">
                                <Pagination
                                    paginate={paginate}
                                    initialPage={page}
                                    setPage={setPage}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default One;

const Title = ({ text, children, color, design }: any) => {
    return (
        <h3
            style={{ fontSize: '22px' }}
            className="font-semibold flex gap-1 text-black"
        >
            <span style={{ color: color ? color : design?.text_color }}>
                {text}
            </span>
            {children}
        </h3>
    );
};

const TitleBorder = () => {
    return (
        <>
            <div className="relative">
                <div className="divider relative"></div>
                <div className="w-2/12 bg-orange-500 h-1 text-left flex justify-start absolute left-0 top-1"></div>
            </div>
        </>
    );
};

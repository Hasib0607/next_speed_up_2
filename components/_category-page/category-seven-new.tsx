'use client';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import Card12 from '@/components/card/card12';
import Skeleton from '@/components/loaders/skeleton';
import PaginationComponent from '@/components/paginations/pagination-new';
import { getPathName, getSecondPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import Filters from './components/filters';
import SingleCategory from './components/single-category';
import FilterByBrandNew from './components/filter-by-brand-new';

const Seven = ({ catId, store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();
    const pathName = usePathname();
    const currentPath = getPathName(pathName);
    const currentSecondPath = numberParser(getSecondPathName(pathName));

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const filtersData = useSelector((state: RootState) => state.filters);
    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

    const [open, setOpen] = useState(false);
    const [paginate, setPaginate] = useState<any>({});

    // setting the initial page number
    const [page, setPage] = useState(1);

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);
    const [infiniteProducts, setInfiniteProducts] = useState<any[]>([]);

    const {
        data: categoryPageProductsData,
        isLoading: categoryPageProductsLoading,
        isFetching: categoryPageProductsFetching,
        isError: categoryPageProductsError,
        isSuccess: categoryPageProductsSuccess,
        refetch: categoryPageProductsRefetch,
    } = useGetCategoryPageProductsQuery({ catId, page, filtersData });

    const nextPageFetch = () => {
        setPage((prevPage: number) => prevPage + 1);
    };

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    useEffect(() => {
        categoryPageProductsRefetch();
    }, [page, activeColor, priceValue, catId, categoryPageProductsRefetch]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue, setPage]);

    useEffect(() => {
        if (categoryPageProductsSuccess) {
            const productsData = categoryPageProductsData?.data?.products || [];
            const paginationData =
                categoryPageProductsData?.data?.pagination || {};

            setPaginate(paginationData);
            setProducts(productsData);
        }
    }, [
        categoryPageProductsData,
        categoryPageProductsSuccess,
        categoryPageProductsFetching,
        page,
        setPaginate,
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

    const currentCatName = category?.find(
        (item: any) => item?.id == currentSecondPath
    );

    return (
        <div className="grid grid-cols-5 lg:gap-8 sm:container px-5 bg-white mb-10">
            <div className="lg:col-span-1 lg:block hidden">
                <div className="flex gap-3 py-10">
                    <Link href="/">
                        <span className="text-base text-gray-500">Home</span>
                    </Link>
                    <span className="text-base font-medium text-gray-500">
                        /
                    </span>
                    <span className="text-base text-gray-600 font-bold">
                        {currentPath == 'category'
                            ? currentCatName?.name
                            : currentPath}
                    </span>
                </div>

                <div className="mt-10 ">
                    <h1 className="mb-10 text-2xl text-gray-700 font-medium">
                        Category{' '}
                    </h1>

                    {category?.map((item: any) => (
                        <div key={item.id} className="">
                            <SingleCategory item={item} />
                        </div>
                    ))}
                </div>
                <div className="bg-gray-100 border-2 border-gray-200 p-4">
                    <FilterByBrandNew />
                </div>
                {/* Filter By Color New */}
                <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
                    <FilterByColorNew />
                </div>

                {/* Filter By Price New */}
                <div className="bg-gray-100 border-2 border-gray-200 p-4">
                    <FilterByPriceNew />
                </div>
            </div>

            <div className="col-span-5 lg:col-span-4 w-full">
                <div className="flex justify-between py-10">
                    <div>
                        <h1 className="text-3xl lg:block hidden font-semibold">
                            Products
                        </h1>
                        <div
                            onClick={() => setOpen(!open)}
                            className="lg:cursor-pointer border-2 border-gray-100 rounded-lg justify-between px-3 w-32 py-2 lg:hidden items-center flex gap-3"
                        >
                            <HiOutlineAdjustments className="rotate-90 text-xl" />
                            <button className="text-xl">Filter</button>
                        </div>
                    </div>
                    {/* Filter By Price and name */}
                    <div>
                        <Filters
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                        />
                    </div>
                </div>

                {/* show loading */}
                <div className="col-span-12 lg:col-span-9">
                    {isPagination &&
                    ((categoryPageProductsLoading &&
                        !categoryPageProductsError) ||
                        categoryPageProductsFetching)
                        ? Array.from({ length: 8 })?.map((_, index) => (
                              <Skeleton key={index} />
                          ))
                        : null}
                </div>

                {/* show products */}
                {!isPagination ? (
                    <>
                        <InfiniteScroll
                            style={{ height: 'auto', overflow: 'hidden' }}
                            dataLength={infiniteProducts?.length}
                            next={nextPageFetch}
                            hasMore={paginate?.has_more_pages}
                            loader={
                                paginate?.has_more_pages ||
                                categoryPageProductsFetching ||
                                (categoryPageProductsLoading && (
                                    <InfiniteLoader />
                                ))
                            }
                            endMessage={
                                paginate?.has_more_pages ||
                                categoryPageProductsFetching ||
                                categoryPageProductsLoading ? (
                                    <InfiniteLoader />
                                ) : (
                                    <NotFoundMsg message={'No More Products'} />
                                )
                            }
                        >
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
                                {infiniteProducts?.length &&
                                    infiniteProducts?.map(
                                        (product: any, index: any) => (
                                            <Card12
                                                item={product}
                                                key={index}
                                                store_id={store_id}
                                                productId={product?.id}
                                            />
                                        )
                                    )}
                            </div>
                        </InfiniteScroll>
                    </>
                ) : (
                    <>
                        {products?.length > 0 ? (
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
                                {products?.map((product: any, index: any) => (
                                    <Card12
                                        item={product}
                                        key={index}
                                        productId={product?.id}
                                        store_id={store_id}
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
                    </>
                )}

                {isPagination && paginate?.total > 7 ? (
                    <div className="md:mt-12 flex justify-center">
                        <PaginationComponent
                            initialPage={page}
                            setPage={setPage}
                            paginate={paginate}
                        />
                    </div>
                ) : null}
            </div>

            {/* tablet and mobile view  */}

            <div className="block py-6 lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed md:w-128 w-96 top-0  overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-120%]'
                    }`}
                >
                    <div className="flex py-4  items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ml-20">
                        <ArrowLeftIcon
                            onClick={() => setOpen(!open)}
                            className="h-5 basis-2/4"
                        />
                        <h3 className=" basis-2/4 text-2xl font-medium text-gray-700">
                            Filters
                        </h3>
                    </div>
                    <hr className="mr-10 ml-44" />
                    <div className="mt-10 ml-36">
                        <h1 className="mb-10 text-2xl text-gray-700 font-medium">
                            Category
                        </h1>
                        {category?.map((item: any) => (
                            <div key={item.id} className="">
                                <SingleCategory item={item} />
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Seven;

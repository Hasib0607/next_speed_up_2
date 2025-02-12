'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/_category-page/components/pagination';
import { motion } from 'framer-motion';
import Card61 from '@/components/card/card61';
import Link from 'next/link';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import { setSort } from '@/redux/features/filters/filterSlice';
import InfiniteLoader from '../loaders/infinite-loader';
import CategoryBreadcrumb from '@/utils/CategoryBreadcrumb';
import { NotFoundMsg } from '@/utils/little-components';

const CategoryThirtyFive = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    // setting the initial page number
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState<any>({});
    const [show, setShow] = useState(true);

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    const styleCss = `
    .btn-card:hover {
        background:${design?.header_color};
        color:${design?.text_color};
        }
    .text-hover:hover {
        color:  ${design?.header_color};
        } 
    `;

    return (
        <div>
            <div className="border-b-2 py-3 mb-2 border-black">
                <style>{styleCss}</style>
                <CategoryBreadcrumb catId={catId} />
            </div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:flex col-span-3">
                        <div className="w-full sticky top-40 h-max pb-3">
                            <h1 className="text-2xl border-b border-black pb-4 mb-4">
                                FILTERS
                            </h1>
                            <div className="border-b border-black pb-5">
                                <div
                                    onClick={() => setShow(!show)}
                                    className="flex justify-between items-center "
                                >
                                    <h3 className="text-[#252525] text-lg">
                                        Categories
                                    </h3>
                                    <ChevronDownIcon className="h-5 lg:cursor-pointer" />
                                </div>
                                {show && (
                                    <div>
                                        {category?.map((item: any) => (
                                            <SingleCat
                                                key={item?.id}
                                                item={item}
                                                design={design}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="border-b border-black my-6 pb-5">
                                <FilterByColorNew />
                            </div>
                            <div className="border-b border-black mb-5 pb-5">
                                <FilterByPriceNew />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            paginate={paginate}
                        />
                        <div className="flex-1">
                            <ProductSection
                                catId={catId}
                                paginate={paginate}
                                page={page}
                                setPage={setPage}
                                isPagination={isPagination}
                                setPaginate={setPaginate}
                            />
                        </div>
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
        </div>
    );
};

export default CategoryThirtyFive;

const ProductSection = ({
    catId,
    page,
    setPage,
    paginate,
    isPagination,
    setPaginate,
}: any) => {
    const filtersData = useSelector((state: RootState) => state.filters);
    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};
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

    return (
        <>
            {/* show loading */}
            <div className="col-span-12 lg:col-span-9">
                {isPagination &&
                ((categoryPageProductsLoading && !categoryPageProductsError) ||
                    categoryPageProductsFetching)
                    ? Array.from({ length: 8 })?.map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : null}
            </div>

            {!isPagination ? (
                <div>
                    <InfiniteScroll
                        style={{ height: 'auto', overflow: 'hidden' }}
                        dataLength={infiniteProducts?.length}
                        next={nextPageFetch}
                        hasMore={paginate?.has_more_pages}
                        loader={
                            paginate?.has_more_pages ||
                            categoryPageProductsFetching ||
                            (categoryPageProductsLoading && <InfiniteLoader />)
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                            {infiniteProducts?.map((item: any, key: number) => (
                                <motion.div
                                    key={key}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card61 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                    {products?.map((item: any, key: number) => (
                        <motion.div
                            key={key}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5, ease: 'linear' }}
                        >
                            <Card61 item={item} />
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};

const Filter = ({ paginate, onChange, shops, cat }: any) => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-8">
            <div className=" md:block hidden text-2xl">
                <span>{shops?.name || cat?.name}</span>{' '}
                <span>({paginate ? paginate?.total : 0}) </span>
            </div>
            {/* Short by  */}
            <div className="flex items-center gap-6 text-sm max-w-sm">
                <p>Sort By:</p>
                <select
                    onChange={onChange}
                    className="h-9 border border-black shadow-[2px_2px_1px_1px_black] hover:shadow-none duration-500 lg:cursor-pointer outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
                >
                    <option>Featured</option>
                    <option value="az">A - Z</option>
                    <option value="za">Z - A</option>
                    <option value="lh">Low - High</option>
                    <option value="hl">High - Low</option>
                </select>
            </div>
        </div>
    );
};

const SingleCat = ({ item, design }: any) => {
    const { id }: any = useParams<{ id: string }>();
    const activeColor = `text-[${design?.header_color}] flex-1 text-sm text-hover`;
    const inactiveColor = `flex-1 text-sm text-hover text-gray-900`;
    const activesub = `text-[${design?.header_color}] text-sm`;
    const inactivesub = `text-sm text-gray-600`;
    const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    .category-page-two .active{
        color:red;
        font-weight: 700;
       }
    `;
    return (
        <>
            <div className="w-full flex py-2 category-page">
                <style>{styleCss}</style>
                <Link
                    style={
                        id == item?.id
                            ? { color: `${design.header_color}` }
                            : {}
                    }
                    href={'/category/' + item?.id}
                    className={id == item?.id ? activeColor : inactiveColor}
                >
                    <p>{item.name}</p>
                </Link>
            </div>
            <div className="ml-4">
                {item?.subcategories?.map((sub: any, key: number) => (
                    <div className="category-page-two" key={key}>
                        <Link href={'/category/' + sub?.id}>
                            <p
                                style={
                                    id == sub?.id
                                        ? { color: `${design.header_color}` }
                                        : {}
                                }
                                className={
                                    id == sub?.id ? activesub : inactivesub
                                }
                            >
                                {sub?.name}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

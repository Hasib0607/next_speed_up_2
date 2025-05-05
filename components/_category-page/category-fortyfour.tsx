'use client';

import Card6 from '@/components/card/card6';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoGridSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import FilterByBrandNew from './components/filter-by-brand-new';
import Card75 from '../card/card75';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import Search3 from '@/components/headers/components/search3';

const CategoryFortyFour = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();
    const { id: data }: any = useParams<{ id: string }>();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState<any>({});
    const [select, setSelect] = useState<any>(parseInt(data?.id));
    const [searchTxt, setSearch] = useState('');
    const [searchTxtUp, setSearchUp] = useState('');
    const [searchInput, setSearchInput] = useState(false);

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
        setSearchUp('');
    };

    const styleCss = `
        .grid-active {
            color:  ${design?.header_color};
            border: 1px solid ${design?.header_color};
        }
    `;

    return (
        <div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:block col-span-3 ">
                        <div className="w-full rounded-xl h-max p-4 shadow-2xl">
                            {category?.map((item: any) => (
                                <SingleCat
                                    key={item?.id}
                                    item={item}
                                    design={design}
                                    setSelect={setSelect}
                                    select={select}
                                />
                            ))}
                        </div>
                        <div className="rounded-xl h-max p-4 shadow-md bg-white mt-6">
                            <FilterByBrandNew />
                        </div>
                        <div className="rounded-xl h-max p-4 shadow-md bg-white my-6">
                            <FilterByColorNew />
                        </div>
                        <div className="rounded-xl h-max p-4 shadow-md bg-white">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full gap-2">
                        <Search
                            searchTxt={searchTxt}
                            setSearch={setSearch}
                            design={design}
                            handleClose={handleClose}
                        />
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            grid={grid}
                            setGrid={setGrid}
                            setOpen={setOpen}
                            open={open}
                            paginate={paginate}
                        />
                        <div className="flex-1">
                            <ProductSection
                                catId={catId}
                                grid={grid}
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

export default CategoryFortyFour;

const ProductSection = ({
    grid,
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
        <div className="mt-10">
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
                        {grid === 'H' && (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
                                {infiniteProducts?.map(
                                    (item: any, key: number) => (
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
                                            <Card75 item={item} />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-1 sm:gap-4">
                                    {infiniteProducts?.map(
                                        (item: any, key: number) => (
                                            <motion.div
                                                key={key}
                                                initial={{ translateX: 200 }}
                                                animate={{ translateX: 0 }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: 'linear',
                                                    type: 'tween',
                                                }}
                                            >
                                                <Card6 item={item} />
                                            </motion.div>
                                        )
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    {grid === 'H' && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
                            {products?.map((item: any, key: number) => (
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
                                    <Card75 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-1 sm:gap-4">
                                {products?.map((item: any, key: number) => (
                                    <motion.div
                                        key={key}
                                        initial={{ translateX: 200 }}
                                        animate={{ translateX: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                            type: 'tween',
                                        }}
                                    >
                                        <Card6 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 mt-6 md:mt-0 flex flex-wrap justify-between items-center px-2">
            <div className="text-gray-500 font-medium">
                Showing {paginate?.from}-{paginate?.to} of {paginate?.total}{' '}
                results{' '}
            </div>
            <div className="flex items-center gap-1 mb-3 md:mb-0">
                <div
                    onClick={() => setGrid('H')}
                    className={` rounded-full p-2 lg:cursor-pointer ${
                        grid === 'H' ? 'grid-active' : 'border'
                    }`}
                >
                    <IoGridSharp className="h-4 w-4 " />
                </div>
                <div
                    onClick={() => setGrid('V')}
                    className={`rounded-full p-2 lg:cursor-pointer ${
                        grid === 'V' ? 'grid-active' : 'border'
                    }`}
                >
                    <Bars3Icon className="h-4 w-4" />
                </div>
            </div>
            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm max-w-md w-full">
                <label className="max-w-fit"> Sort by:</label>
                <select
                    onChange={onChange}
                    className="h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
                >
                    <option>Select One</option>
                    <option value="az">Name, A to Z</option>
                    <option value="za">Name, Z to A</option>
                    <option value="lh">Price, Low to High</option>
                    <option value="hl">Price, High to Low</option>
                </select>
            </div>
        </div>
    );
};

const Search = ({ searchTxt, setSearch, design, handleClose }: any) => {
    return (
        <div className="lg:block hidden w-full">
            <div className="relative">
                <div className=" relative overflow-hidden">
                    <div>
                        <input
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search a product"
                            className="w-full pl-3 py-2 border outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0"
                        />
                    </div>
                    <div className=" lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-3">
                        {searchTxt.length === 0 ? (
                            <BsSearch className="text-xl" />
                        ) : (
                            <AiOutlineClose
                                onClick={handleClose}
                                className="text-xl lg:cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                {searchTxt && (
                    <div className="absolute z-[15] top-2 left-0 pl-16 w-full">
                        <Search3
                            design={design}
                            search={searchTxt}
                            setSearch={setSearch}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const SingleCat = ({ item, select, setSelect }: any) => {
    return (
        <div className="w-full mb-2">
            {/* Main Category */}
            <div className="">
                <Link
                    onClick={() => setSelect(item.id)}
                    href={'/category/' + item?.id}
                    className="block"
                >
                    <div className="flex items-center justify-between px-4 hover:bg-gray-50">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => e.preventDefault()}
                            />
                            <span
                                className={`text-lg font-medium ${
                                    select === item.id
                                        ? 'text-red-500'
                                        : 'text-gray-900'
                                }`}
                            >
                                {item.name}
                            </span>
                        </div>
                        <span className="text-sm bg-gray-200 rounded-3xl px-1">
                            {item.total_products}
                        </span>
                    </div>
                </Link>
            </div>

            {/* Subcategories */}
            <div className="">
                {item?.subcategories?.map((sub: any, idx: any) => (
                    <div className="" key={idx}>
                        <Link
                            onClick={() => setSelect(sub.id)}
                            href={'/category/' + sub?.id}
                            className="block"
                        >
                            <div className="flex items-center justify-between pl-8 py-1 hover:bg-gray-50">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        onChange={(e) => e.preventDefault()}
                                    />
                                    <span
                                        className={`text-sm ${
                                            select === sub.id
                                                ? 'text-red-500'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {sub.name}
                                    </span>
                                </div>
                                <span className="text-sm mr-4 bg-gray-200 rounded-3xl px-1">
                                    {sub.total_products}
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

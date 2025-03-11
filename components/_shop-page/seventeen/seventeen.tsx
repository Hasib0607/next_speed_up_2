'use client';
import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import Card31 from '@/components/card/card31';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { Bars3Icon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import './seventeen.css';

const Seventeen = ({ store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    return (
        <div className="">
            <div className="categorySeventeenBackgroundColor">
                <div className="pt-16 w-full flex flex-col gap-3 justify-center items-center">
                    <div>
                        <h1 className="text-5xl font-medium text-white">
                            Products
                        </h1>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="text-white">Home</p>
                        <IoIosArrowForward className="text-xs mt-1 text-white" />
                        <p className="font-medium text-white">Shop</p>
                    </div>
                </div>
                <div className="categorySeventeenBottomBackGroundImage absolute top-64"></div>
            </div>

            <div className="container px-5 xl:px-80">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="mt-8 hidden md:block col-span-3">
                        <div className="w-full">
                            <h3 className="font-semibold text-[#252525] text-lg mx-4 border-b-2 border-[#206469] pb-2 mb-3">
                                Categories
                            </h3>
                            {category?.map((item: any) => (
                                <SingleCat item={item} key={item?.id} />
                            ))}
                        </div>
                        <div className="my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
                        <Location />
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            setGrid={setGrid}
                            setOpen={setOpen}
                            open={open}
                            paginate={paginate}
                        />

                        <div className="flex-1">
                            <ShopProductSection
                                grid={grid}
                                open={open}
                                hasMore={hasMore}
                                paginate={paginate}
                                setHasMore={setHasMore}
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

export default Seventeen;

const ShopProductSection = ({
    grid,
    open,
    page,
    setPage,
    hasMore,
    paginate,
    setHasMore,
    isPagination,
    setPaginate,
}: any) => {
    const filtersData = useSelector((state: RootState) => state.filters);
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

    const nextPageFetch = () => {
        setPage((prevPage: number) => prevPage + 1);
    };

    useEffect(() => {
        shopPageProductsRefetch();
        if (paginate?.total > 0) {
            const more = numberParser(paginate?.total / 8, true) > page;
            setHasMore(more);
        }
    }, [
        page,
        activeColor,
        shopPageProductsRefetch,
        priceValue,
        paginate,
        setHasMore,
    ]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue, setPage]);

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
        page,
        setPaginate,
        shopPageProductsFetching,
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
                ((shopPageProductsLoading && !shopPageProductsError) ||
                    shopPageProductsFetching)
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
                        hasMore={hasMore}
                        loader={<InfiniteLoader />}
                        endMessage={
                            <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                                No More Products
                            </p>
                        }
                    >
                        {grid === 'H' && (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4 sm:px-0">
                                {infiniteProducts?.map((item: any) => (
                                    <motion.div
                                        key={item?.id}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                        }}
                                    >
                                        <Card31 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:px-0">
                                    {infiniteProducts?.map((item: any) => (
                                        <motion.div
                                            key={item?.id}
                                            initial={{ translateX: 200 }}
                                            animate={{ translateX: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'linear',
                                                type: 'tween',
                                            }}
                                        >
                                            <Card31 item={item} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    {grid === 'H' && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4 sm:px-0">
                            {products?.map((item: any) => (
                                <motion.div
                                    key={item?.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card31 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:px-0">
                                {products?.map((item: any) => (
                                    <motion.div
                                        key={item?.id}
                                        initial={{ translateX: 200 }}
                                        animate={{ translateX: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                            type: 'tween',
                                        }}
                                    >
                                        <Card31 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    );
};

const Location = () => {
    return (
        <div className="w-full text-[#414141] bg-[#f1f1f1] flex items-center justify-start py-2 mt-10 lg-mt-0 text-[24px] font-thin px-2">
            <p>Home </p>
            <p>/ {'shop'}</p>
        </div>
    );
};

const Filter = ({ paginate, onChange, setGrid }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex gap-y-2 flex-wrap justify-between items-center">
            <div className="text-gray-500 font-thin">
                There are {paginate?.total} products{' '}
            </div>
            <div className="flex items-center gap-1">
                <div
                    onClick={() => setGrid('H')}
                    className="border rounded-full p-2"
                >
                    <Bars3Icon className="h-4 w-4 text-[#928a8a]" />
                </div>
                <div
                    onClick={() => setGrid('V')}
                    className="border rounded-full p-2"
                >
                    <Bars3Icon className="h-4 w-4 text-[#928a8a]" />
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
                    <option value="az">A - Z</option>
                    <option value="za">Z - A</option>
                    <option value="lh">L - H</option>
                    <option value="hl">H - L</option>
                </select>
            </div>
        </div>
    );
};

const SingleCat = ({ item }: any) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full flex px-4 py-1">
                <Link
                    href={'/category/' + item.id}
                    className="flex-1 text-gray-500"
                >
                    {' '}
                    <p>{item.name}</p>
                </Link>
                {item?.subcategories ? (
                    <div className="px-4 h-full">
                        {show ? (
                            <MinusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        ) : (
                            <PlusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, idx: any) => (
                            <div className="" key={idx}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <li className="text-sm text-gray-500">
                                        {sub?.name}
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

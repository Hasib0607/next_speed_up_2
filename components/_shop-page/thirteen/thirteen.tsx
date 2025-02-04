'use client';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import Pagination from '@/components/_category-page/components/pagination';
import Card18 from '@/components/card/card18';
import Card6 from '@/components/card/card6';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Skeleton from '@/components/loaders/skeleton';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgViewGrid } from 'react-icons/cg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

const Thirteen = ({ store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();
    const { id: data }: any = useParams<{ id: string }>();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});
    const [select, setSelect] = useState<any>(parseInt(data?.id));

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className=" hidden md:block col-span-3">
                    <div className="w-full">
                        <h3 className="font-thin text-[#252525] text-lg px-4">
                            Categories
                        </h3>
                        {category?.map((item: any) => (
                            <SingleCat
                                key={item?.id}
                                item={item}
                                setSelect={setSelect}
                                select={select}
                            />
                        ))}
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
                        <FilterByColorNew />
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 p-4">
                        <FilterByPriceNew />
                    </div>
                </div>
                <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
                    <Location />
                    <Filter
                        onChange={(e: any) => {
                            dispatch(setSort(e.target.value));
                            setPage(1);
                        }}
                        setGrid={setGrid}
                        setOpen={setOpen}
                        open={open}
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
    );
};

export default Thirteen;

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
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
                                        <Card18 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
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
                                            <Card6 item={item} />
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
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
                                    <Card18 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
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
                                        <Card6 item={item} />
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
        <div className="w-full text-[#414141] bg-[#f1f1f1] flex items-center justify-start py-2 text-[24px] font-thin px-2">
            <p>Home </p>
            <p>/ {'shop'}</p>
        </div>
    );
};

const Filter = ({ onChange, setGrid }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center px-2">
            {/* <div className="text-gray-500 font-thin">
        There are {paginate?.total} products{" "}
      </div> */}
            <div className="flex items-center gap-1">
                <div
                    onClick={() => setGrid('H')}
                    className="border rounded-full p-2"
                >
                    <CgViewGrid className="h-4 w-4 text-[#928a8a]" />
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

const SingleCat = ({ item, select, setSelect }: any) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full flex px-4 py-3">
                <Link
                    onClick={() => setSelect(item.id)}
                    href={'/category/' + item.id}
                    className={`flex-1 text-sm font-thin ${
                        select === item.id ? 'text-red-500' : 'text-gray-900'
                    }`}
                >
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
            <div className=" px-4">
                <div className="h-[1px] bg-gray-200 w-full"></div>
            </div>
            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, idx: any) => (
                            <div className="py-2" key={idx}>
                                <Link
                                    onClick={() => setSelect(sub.id)}
                                    href={'/category/' + sub?.id}
                                >
                                    <p
                                        className={`pb-2 text-sm font-thin ${
                                            select === sub.id
                                                ? 'text-red-500'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {sub?.name}
                                    </p>
                                </Link>
                                <div className="pr-4">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

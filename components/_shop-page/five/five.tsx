'use client';

import Card42 from '@/components/card/card42';
import Card6 from '@/components/card/card6';
import './five.css';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';

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
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import FilterByBrandNew from '@/components/_category-page/components/filter-by-brand-new';

const Five = ({ design, store_id }: any) => {
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

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .text-hover:hover {
      color:  ${bgColor};
    }
    .filter {
        color:${textColor};
        background:${bgColor};
    }
    .border-hover:hover {
        border: 1px solid  ${bgColor};
    }
 
    `;

    return (
        <div className="lg:block sm:container px-5 sm:py-10 py-5 bg-white">
            <style>{styleCss}</style>
            <div className="grid grid-cols-9 gap-5">
                {/* filter side design  */}
                <div className="md:col-span-2 w-full items-end md:block hidden">
                    <div className="w-full bg-gray-100 border-2 border-gray-200 text-black pl-6 pt-7 pb-6 ">
                        <h1 className="font-semibold ">FILTER BY</h1>
                        {category?.map((item: any) => (
                            <SingleCat key={item?.id} item={item} />
                        ))}
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 text-black p-4">
                        <FilterByBrandNew />
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 my-6 text-black p-4">
                        <FilterByColorNew />
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 text-black p-4">
                        <FilterByPriceNew />
                    </div>
                </div>

                {/* filter side design finishes  */}

                <div className="relative md:col-span-7 col-span-9 ">
                    {/* Sort by bar start  */}
                    <div>
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            setGrid={setGrid}
                            setOpen={setOpen}
                            open={open}
                        />
                    </div>

                    {/* All product card  */}

                    <div className="mt-4 mb-6 ">
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

export default Five;

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

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

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
            {open && (
                <div className="py-4 px-10 border-[1px] ">
                    <div className="text-lg font-medium py-3 flex flex-col gap-2">
                        <h1>Categories</h1>
                        <p className="h-[1px] w-14 bg-black"></p>
                    </div>
                    <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                        {category?.map((item: any, idx: any) => (
                            <SingleCat key={idx} item={item} />
                        ))}
                    </div>
                </div>
            )}

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
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
                                {infiniteProducts?.map(
                                    (item: any, idx: any) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: 'linear',
                                            }}
                                        >
                                            <Card42 item={item} />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                                    {infiniteProducts?.map(
                                        (item: any, idx: any) => (
                                            <motion.div
                                                key={idx}
                                                className=""
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
                        <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
                            {products?.map((item: any) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card42 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                                {products?.map((item: any) => (
                                    <motion.div
                                        key={item.id}
                                        className=""
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

const Filter = ({ onChange, setGrid, setOpen, open }: any) => {
    return (
        <div>
            <div className="md:flex md:flex-row justify-between md:mt-6 items-center ">
                <div className="md:block hidden">
                    <p>Sort By:</p>
                </div>
                <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
                    {/* Short by  */}
                    <div className="">
                        <select
                            onChange={onChange}
                            className="xl:w-96 lg:w-80 md:w-52 w-32 lg:cursor-pointer h-8 px-2 p-0 text-sm border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
                            id="category"
                            name="category"
                        >
                            <option className="lg:cursor-pointer">
                                Featured
                            </option>
                            <option className="lg:cursor-pointer" value="az">
                                Name, A to Z
                            </option>
                            <option className="lg:cursor-pointer" value="za">
                                Name, Z to A
                            </option>
                            <option className="lg:cursor-pointer" value="lh">
                                Price, Low to High
                            </option>
                            <option className="lg:cursor-pointer" value="hl">
                                Price, High to Low
                            </option>
                        </select>
                    </div>

                    <p
                        onClick={() => setOpen(!open)}
                        className={`px-10 py-1 md:hidden flex  text-sm font-semibold bg-black text-white ${
                            open === true
                                ? 'filter border-transparent '
                                : 'bg-black border-black'
                        } lg:cursor-pointer`}
                    >
                        FILTER
                    </p>
                </div>

                <div className="hidden text-gray-300 gap-1 md:flex">
                    <CgMenuGridO
                        onClick={() => setGrid('H')}
                        className="h-6 w-6 text-hover lg:cursor-pointer"
                    />
                    <Bars3Icon
                        onClick={() => setGrid('V')}
                        className="h-6 w-6 text-hover lg:cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

const SingleCat = ({ item }: any) => {
    const [show, setShow] = useState(false);

    const { id }: any = useParams<{ id: string }>();
    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == id && setShow(true);
            }
        }
    }, [item?.cat, id]);

    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    href={'/category/' + item.id}
                    className={`flex-1 text-sm text-gray-900 font-medium ${
                        numberParser(id) === numberParser(item.id)
                            ? 'text-red-500'
                            : 'text-gray-900'
                    }`}
                >
                    {' '}
                    <p>{item.name}</p>
                </Link>
                {item?.cat ? (
                    <div className="px-4 h-full" onClick={() => setShow(!show)}>
                        {show ? (
                            <MinusIcon className="h-4 w-4 text-gray-800" />
                        ) : (
                            <PlusIcon className="h-4 w-4 text-gray-800" />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.cat?.map((sub: any, idx: any) => (
                            <div className="py-2" key={idx}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <p
                                        className={`pb-2 text-sm ${
                                            numberParser(id) ===
                                            numberParser(sub.id)
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

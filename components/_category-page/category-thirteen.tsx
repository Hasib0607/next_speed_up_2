'use client';
import { useEffect, useState } from 'react';
import Card18 from '@/components/card/card18';
import Card6 from '@/components/card/card6';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { numberParser } from '@/helpers/numberParser';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import { setSort } from '@/redux/features/filters/filterSlice';
import InfiniteLoader from '../loaders/infinite-loader';
import Skeleton from '@/components/loaders/skeleton';

const Thirteen = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className=" hidden lg:block col-span-3">
                    <div className="w-full">
                        <h3 className="font-thin text-[#252525] text-lg px-4">
                            Categories
                        </h3>
                        {category?.map((item: any) => (
                            <SingleCat
                                key={item?.id}
                                item={item}
                                design={design}
                                setPage={setPage}
                                setHasMore={setHasMore}
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
                <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
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
                        <Product
                            catId={catId}
                            open={open}
                            grid={grid}
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

const Product = ({
    grid,
    open,
    catId,
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

    useEffect(() => {
        categoryPageProductsRefetch();
        if (paginate?.total > 0) {
            const more = numberParser(paginate?.total / 8, true) > page;
            setHasMore(more);
        }
    }, [
        page,
        activeColor,
        categoryPageProductsRefetch,
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
                                            <Card18 item={item} />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                                    {infiniteProducts?.map(
                                        (item: any, idx: number) => (
                                            <motion.div
                                                key={idx}
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 px-2 sm:px-0">
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
                                    <Card18 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
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
        </>
    );
};

const Location = () => {
    const [activecat, setActivecat] = useState(null);
    const categoryStore = useSelector((state: any) => state?.category);

    const { id }: any = useParams<{ id: string }>();

    useEffect(() => {
        const category = categoryStore?.categories || [];
        for (let i = 0; i < category.length; i++) {
            if (category[i]?.subcategories) {
                for (let j = 0; j < category[i].subcategories.length; j++) {
                    if (category[i]?.subcategories[j]?.id == id) {
                        setActivecat(category[i]?.subcategories[j]?.name);
                    }
                }
            }
            if (category[i]?.id == id) {
                setActivecat(category[i].name);
            }
        }
    }, [categoryStore, id]);

    return (
        <div className="w-full text-[#414141] bg-[#f1f1f1] flex items-center justify-start py-2 text-[24px] font-thin px-2">
            <p>Home</p>
            <p>/ {activecat}</p>
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

const SingleCat = ({ item, design }: any) => {
    const [show, setShow] = useState(false);
    const { id }: any = useParams<{ id: string }>();
    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == id && setShow(true);
            }
        }
    }, [item?.cat, id]);

    const activeColor = `text-[${design?.header_color}] flex-1 text-sm font-thin`;
    const inactiveColor = `text-gray-900 flex-1 text-sm font-thin`;
    const activesub = `text-[${design?.header_color}] pb-2 text-sm font-thin`;
    const inactivesub = `pb-2 text-sm font-thin`;
    return (
        <>
            <div className="w-full flex px-4 py-3">
                <Link
                    style={
                        id == item?.id
                            ? { color: `${design.header_color}` }
                            : {}
                    }
                    href={'/category/' + item.id}
                    className={id == item?.id ? activeColor : inactiveColor}
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
            <div className=" px-4">
                <div className="h-[1px] bg-gray-200 w-full"></div>
            </div>
            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div key={key} className="py-2">
                                <Link href={'/category/' + sub?.id}>
                                    <p
                                        style={
                                            id == sub?.id
                                                ? {
                                                      color: `${design.header_color}`,
                                                  }
                                                : {}
                                        }
                                        className={
                                            id == sub?.id
                                                ? activesub
                                                : inactivesub
                                        }
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

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import Card21 from '@/components/card/card21';
import Card6 from '@/components/card/card6';
import Skeleton from '@/components/loaders/skeleton';
import { PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { RootState } from '@/redux/store';
import {
    useGetColorsQuery,
    useGetShopPageProductsQuery,
} from '@/redux/features/shop/shopApi';
import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useParams } from 'next/navigation';

const Eight = ({ design, store_id }: any) => {
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

    const filtersData = useSelector((state: RootState) => state.filters);

    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

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
        <div className="sm:container px-5 sm:py-10 py-5 bg-white">
            <style>{styleCss}</style>
            <div className="grid grid-cols-9">
                {/* filter side design  */}
                <div className="md:col-span-2 px-4 w-full items-end md:block hidden">
                    <div className="w-full bg-gray-100 border-2 border-gray-200 text-black  my-6 pl-6 pt-7 pb-6 ">
                        <h1 className="font-semibold ">FILTER BY</h1>
                        {category?.map((item: any) => (
                            <SingleCat key={item?.id} item={item} />
                        ))}
                    </div>

                    <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
                        <FilterByColorNew
                            colors={colors}
                            activeColor={activeColor}
                            setPage={setPage}
                            setHasMore={setHasMore}
                        />
                    </div>
                    <div className="bg-gray-100 border-2 border-gray-200 p-4">
                        <FilterByPriceNew
                            priceValue={priceValue}
                            setPage={setPage}
                            setHasMore={setHasMore}
                        />
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

                    <div className="mt-4 mb-6 mx-4 md:mx-0 ">
                        <ShopProductSection
                            grid={grid}
                            open={open}
                            hasMore={hasMore}
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

export default Eight;

const ShopProductSection = ({
    grid,
    open,
    page,
    setPage,
    hasMore,
    setHasMore,
    isPagination,
    setPaginate,
}: any) => {
    const filtersData = useSelector((state: RootState) => state.filters);

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);

    const {
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const nextPageFetch = () => {
        setPage((prev: any) => prev + 1);
        refetch();
    };

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data || [];
            setPaginate(productsData?.pagination);
            if (isPagination) {
                setProducts(productsData?.products || []);
            } else {
                setProducts((prev) =>
                    Array.isArray(prev)
                        ? [...prev, ...(productsData?.products || [])]
                        : productsData?.products || []
                );
                setPage(1);
            }
        } else if (shopPageProductsData?.data?.pagination?.current_page === 1) {
            setHasMore(false);
        }
    }, [
        shopPageProductsData,
        setPaginate,
        isPagination,
        setHasMore,
        setPage,
        shopPageProductsSuccess,
    ]);

    return (
        <>
            {open && (
                <div className="py-4 px-10 border-[1px] ">
                    <div className="text-lg font-medium py-3 flex flex-col gap-2">
                        <h1>Categories</h1>
                        <p className="h-[1px] w-14 bg-black"></p>
                    </div>
                    <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                        {category?.map((item: any) => (
                            <SingleCat key={item?.id} item={item} />
                        ))}
                    </div>
                </div>
            )}

            {/* show loading */}
            {(shopPageProductsLoading && !shopPageProductsError) ||
            shopPageProductsFetching
                ? Array.from({ length: 8 }).map((_, index) => (
                      <Skeleton key={index} />
                  ))
                : null}

            {!isPagination ? (
                <div>
                    <InfiniteScroll
                        style={{ height: 'auto', overflow: 'hidden' }}
                        dataLength={products?.length}
                        next={nextPageFetch}
                        hasMore={hasMore}
                        loader={
                            <div className="flex justify-center items-center">
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="#f1593a"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    visible={true}
                                />
                            </div>
                        }
                        endMessage={
                            <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                                No More Products
                            </p>
                        }
                    >
                        {grid === 'H' && (
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-5 grid-cols-1 gap-2 mt-10">
                                {products?.map((item: any, key: number) => (
                                    <motion.div
                                        key={key}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                        }}
                                    >
                                        <Card21 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                                    {products?.map((item: any, key: any) => (
                                        <motion.div
                                            key={key}
                                            className="border-hover"
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
                        <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-3 md:gap-5 grid-cols-1 gap-2 mt-10">
                            {products?.map((item: any, key: number) => (
                                <motion.div
                                    key={key}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card21 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 lg:gap-5 md:gap-5 gap-2 mt-10">
                                {products?.map((item: any, key: number) => (
                                    <motion.div
                                        key={key}
                                        className="border-hover"
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
                            className="xl:w-96 lg:w-80 md:w-52 w-40 lg:cursor-pointer h-8 px-2 p-0 text-sm border border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
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
                                ? 'filter border-transparent'
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
                    className="flex-1 text-sm text-gray-900 font-medium"
                >
                    {' '}
                    <p>{item.name}</p>
                </Link>
                {item?.subcategories ? (
                    <div className="px-4 h-full">
                        {show ? (
                            <Bars3Icon
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
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="py-2" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <p className="pb-2 text-sm text-gray-500">
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

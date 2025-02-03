'use client';

import Card16 from '@/components/card/card16';
import Card6 from '@/components/card/card6';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import {
    useGetCategoryPageProductsQuery,
    useGetColorsQuery,
} from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import Skeleton from '@/components/loaders/skeleton';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@/components/_category-page/components/pagination';

import { setSort } from '@/redux/features/filters/filterSlice';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import { numberParser } from '@/helpers/numberParser';

const CategoryTwo = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();
    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const {
        data: colorsData,
        isLoading: colorsLoading,
        isSuccess: colorsSuccess,
    } = useGetColorsQuery({ store_id });

    const colors = colorsData?.data || [];

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const filtersData = useSelector((state: RootState) => state.filters);
    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

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
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <div className="grid grid-cols-9 gap-5">
                {/* filter side design  */}
                <div className="lg:col-span-2 w-full items-end lg:block hidden">
                    <div className="w-full bg-gray-100 border-2 border-gray-200 text-black my-6 py-6 px-4">
                        <h1 className="font-semibold ">FILTER BY</h1>
                        {category?.map((item: any) => (
                            <SingleCat
                                key={item?.id}
                                item={item}
                                design={design}
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

                {/* filter side design finishes  */}

                <div className="relative lg:col-span-7 col-span-9 ">
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
                        <ProductSection
                            catId={catId}
                            open={open}
                            grid={grid}
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

export default CategoryTwo;

const ProductSection = ({
    grid,
    open,
    catId,
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
        data: categoryPageProductsData,
        isLoading: categoryPageProductsLoading,
        isFetching: categoryPageProductsFetching,
        isError: categoryPageProductsError,
        isSuccess: categoryPageProductsSuccess,
        refetch: categoryPageProductsRefetch,
    } = useGetCategoryPageProductsQuery({ catId, page, filtersData });

    const nextPageFetch = () => {
        setPage((prev: any) => prev + 1);
        categoryPageProductsRefetch();
    };

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    useEffect(() => {
        if (categoryPageProductsSuccess) {
            const categoryData = categoryPageProductsData?.data || [];
            setPaginate(categoryData?.pagination);
            if (isPagination) {
                setProducts(categoryData?.products || []);
            } else {
                setProducts((prev) =>
                    Array.isArray(prev)
                        ? [...prev, ...(categoryData?.products || [])]
                        : categoryData?.products || []
                );
                setPage(1);
            }
        } else if (
            categoryPageProductsData?.data?.pagination?.current_page === 1
        ) {
            setHasMore(false);
        }
    }, [
        categoryPageProductsData,
        isPagination,
        setHasMore,
        setPage,
        setPaginate,
        categoryPageProductsSuccess,
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
            {(categoryPageProductsLoading && !categoryPageProductsError) ||
            categoryPageProductsFetching
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
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
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
                                        <Card16 item={item} />
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
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    {grid === 'H' && (
                        <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-5 grid-cols-2 gap-2 mt-10">
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
                                    <Card16 item={item} />
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
                            className="xl:w-96 lg:w-80 md:w-52 w-40 lg:cursor-pointer h-8 px-2 p-0 text-sm border-gray-200 focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none flex items-center"
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
    const activeColor = `text-[${design?.header_color}] flex-1 text-sm font-medium`;
    const inactiveColor = 'text-gray-500 flex-1 text-sm font-medium';
    const activesub = `text-[${design?.header_color}] pb-2 text-sm`;
    const inactivesub = `text-gray-600 pb-2 text-sm`;
    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    onClick={() => setShow(!show)}
                    href={'/category/' + item.id}
                    className={id == item?.id ? activeColor : inactiveColor}
                >
                    {' '}
                    <p
                        style={
                            parseInt(id) === parseInt(item?.id)
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                    >
                        {item.name}
                    </p>
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
                        {item?.cat?.map((sub: any, key: number) => (
                            <div className="py-2" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    <p
                                        style={
                                            parseInt(id) === parseInt(sub?.id)
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

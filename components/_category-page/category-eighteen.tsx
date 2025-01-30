'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThreeDots } from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'next/navigation';
import Pagination from '@/components/_category-page/components/pagination';
import { VscClose } from 'react-icons/vsc';
import { setSort } from '@/redux/features/filters/filterSlice';
import Skeleton from '@/components/loaders/skeleton';
import Card38 from '@/components/card/card38';
import Card6 from '@/components/card/card6';
import { BiFilter } from 'react-icons/bi';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetCategoryPageProductsQuery,
    useGetColorsQuery,
} from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { numberParser } from '@/helpers/numberParser';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';

const CategoryEighteen = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

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
            <div className="bg-gray-100 mb-2">
                <style>{styleCss}</style>
                <Location />
            </div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="hidden md:flex col-span-3">
                        <div className="w-full sticky top-40 h-max">
                            <div>
                                <h3 className="font-thin text-[#252525] text-lg px-4">
                                    Categories
                                </h3>
                                <div className=" px-4 py-3">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                                {category?.map((item: any, key: number) => (
                                    <SingleCat
                                        item={item}
                                        key={key}
                                        design={design}
                                    />
                                ))}
                            </div>
                            <div className="my-6 p-4">
                                <FilterByColorNew
                                    colors={colors}
                                    activeColor={activeColor}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
                            </div>
                            <div className="p-4">
                                <FilterByPriceNew
                                    priceValue={priceValue}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
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

            {/* tablet and mobile view  */}

            <div className={`px-4`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-20 lg:cursor-pointer ${
                        open ? 'left-0 ' : 'left-[-140%] '
                    }`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div
                            onClick={() => setOpen(!open)}
                            className="flex gap-1 items-center border-b-[2px] pb-2 text-color"
                        >
                            <VscClose className="text-lg inline-block" />
                            <p className="text-sm">Close</p>
                        </div>
                        <div className="w-full">
                            <h3 className="font-thin text-[#252525] text-lg px-4">
                                Categories
                            </h3>
                            {category?.map((item: any, idx: any) => (
                                <SingleCat item={item} key={idx} />
                            ))}
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default CategoryEighteen;

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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
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
                                        <Card38 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                                    {products?.map((item: any, idx: number) => (
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
                            {products?.map((item: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card38 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                                {products?.map((item: any, idx: number) => (
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
    const [activecat, setActivecat] = useState(false);
    const { id: data }: any = useParams<{ id: string }>();
    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];
    useEffect(() => {
        for (let i = 0; i < category.length; i++) {
            if (category[i]?.subcategories) {
                for (let j = 0; j < category[i].subcategories.length; j++) {
                    if (category[i]?.subcategories[j]?.id == data) {
                        setActivecat(category[i]?.subcategories[j]?.name);
                    }
                }
            }
            if (category[i]?.id == data) {
                setActivecat(category[i].name);
            }
        }
    }, [category]);

    return (
        <div className="w-full sm:container px-5 text-[#414141] flex gap-1 items-center justify-start py-2 text-sm">
            <p>Home /</p>
            <p>Catagories</p>
            <p> / {activecat}</p>
        </div>
    );
};

const Filter = ({ onChange, setGrid, open, setOpen }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center">
            <div
                onClick={() => setOpen(!open)}
                className="flex gap-3 items-center md:hidden lg:cursor-pointer"
            >
                <BiFilter />
                <p>Filter</p>
            </div>

            {/* Short by  */}
            <div className="flex items-center gap-6 text-sm max-w-sm ml-auto">
                <select
                    onChange={onChange}
                    className="h-9 border-0 rounded lg:cursor-pointer outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
                >
                    <option>Featured</option>
                    <option value="az">A - Z</option>
                    <option value="za">Z - A</option>
                    <option value="lh">L - H</option>
                    <option value="hl">H - L</option>
                </select>

                <div className="flex items-center gap-2">
                    <div
                        onClick={() => setGrid('H')}
                        className="border btn-card text-[#928a8a] rounded-full p-2 lg:cursor-pointer"
                    >
                        <Bars3Icon className="h-4 w-4" />
                    </div>
                    <div
                        onClick={() => setGrid('V')}
                        className="border btn-card text-[#928a8a] rounded-full p-2 lg:cursor-pointer"
                    >
                        <Bars3Icon className="h-4 w-4 " />
                    </div>
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
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};
    const activeColor = `text-[${design?.header_color}] flex-1 text-sm font-thin text-hover`;
    const inactiveColor = `flex-1 text-sm font-thin text-hover text-gray-900`;
    const activesub = `text-[${design?.header_color}] pb-2 text-sm font-thin text-hover`;
    const inactivesub = 'pb-2 text-sm font-thin text-hover text-gray-600';

    const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;
    return (
        <>
            <div className="w-full flex px-4 py-3 category-page">
                <style>{styleCss}</style>
                <Link
                    href={'/category/' + item?.id}
                    style={
                        id == item?.id
                            ? { color: `${design.header_color}` }
                            : {}
                    }
                    className={id == item.id ? activeColor : inactiveColor}
                >
                    <p>{item.name}</p>
                </Link>
                {item?.subcategories ? (
                    <div className="px-4 h-full">
                        {show ? (
                            <MinusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
                            />
                        ) : (
                            <PlusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
                            />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, idx: number) => (
                            <div className="py-2 category-page" key={idx}>
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
                                            id == sub.id
                                                ? activesub
                                                : inactivesub
                                        }
                                    >
                                        {sub?.name}
                                    </p>
                                </Link>
                                <div className="pr-4">
                                    <div className="h-[1px] bg-gray-200 w-full "></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

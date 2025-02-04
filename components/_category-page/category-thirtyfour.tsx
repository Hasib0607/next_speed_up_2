'use client';
import { useEffect, useState } from 'react';
import Card6 from '@/components/card/card6';
import Card60 from '@/components/card/card60';
import Skeleton from '@/components/loaders/skeleton';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { IoGridSharp } from 'react-icons/io5';
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

const CategoryThirtyFour = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();
    const { id: data }: any = useParams<{ id: string }>();

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});
    const [select, setSelect] = useState(parseInt(data?.id));

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
    .sec-twenty-nine{
      border-bottom: 2px solid ${design?.header_color};
   }
 `;

    return (
        <div className="bg-[#F9F8FF]">
            <Location />

            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:block col-span-3 ">
                        <div className="w-full relative p-4 border h-max">
                            <h3 className="font-medium text-[#252525] text-xl mb-4 pb-[10px] w-max">
                                Product Categories..
                            </h3>
                            <div className="absolute h-[1px] bg-gray-300 left-0 right-0 mx-4 top-[55px]"></div>
                            {category?.map((item: any) => (
                                <SingleCat
                                    key={item?.id}
                                    item={item}
                                    design={design}
                                    select={select}
                                />
                            ))}
                        </div>
                        <div className="border my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="border mb-5 p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
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
                            <ProductSection
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
        </div>
    );
};

export default CategoryThirtyFour;

const ProductSection = ({
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
                            <div className="grid grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                            <Card60 item={item} />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
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
                        <div className="grid grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                    <Card60 item={item} />
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
    const { id }: any = useParams<{ id: string }>();
    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    useEffect(() => {
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
    }, [category]);
    return (
        <div className="w-full bg-white text-[#252525]">
            <div className="flex flex-col justify-center sm:container px-5 py-2">
                <div className="flex items-center gap-1 text-sm font-bold">
                    <Link href="/">
                        <AiOutlineHome className="" />
                    </Link>
                    <p>/ Categories</p>
                    <p>/ {activecat}</p>
                </div>
            </div>
        </div>
    );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap justify-between items-center px-2">
            <div className="text-gray-500 font-medium">
                Showing {paginate?.from}-{paginate?.to} of {paginate?.total}{' '}
                results{' '}
            </div>
            <div className="flex items-center gap-1 mb-3 md:mb-0">
                <div
                    onClick={() => setGrid('H')}
                    className={` rounded-full p-2 ${
                        grid === 'H' ? 'grid-active' : 'border'
                    }`}
                >
                    <IoGridSharp className="h-4 w-4 " />
                </div>
                <div
                    onClick={() => setGrid('V')}
                    className={`rounded-full p-2 ${
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
                    className={`${
                        design?.template_id === '34'
                            ? 'bg-thirty-one'
                            : 'bg-white'
                    } h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium text-sm flex-1`}
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

const SingleCat = ({ item, design, select }: any) => {
    const [show, setShow] = useState(false);
    const { id }: any = useParams<{ id: string }>();
    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == id && setShow(true);
            }
        }
    }, [item?.cat, id]);
    const activeColor = `text-[${design?.header_color}] flex-1 text-lg font-medium`;
    const inactiveColor = `text-gray-900 flex-1 text-lg font-medium`;
    const activesub = `text-[${design?.header_color}] text-sm`;
    const inactivesub = `text-sm text-gray-600`;
    return (
        <div className="">
            <div className="w-full mb-2">
                <div className="flex items-center px-4 py-3">
                    <Link
                        style={
                            id == item?.id
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                        onClick={() => setShow(!show)}
                        href={'/category/' + item.id}
                        className={id == item?.id ? activeColor : inactiveColor}
                    >
                        {' '}
                        <li>
                            <span className="text-gray-600">{item.name}</span>
                        </li>
                    </Link>
                    {item?.subcategories ? (
                        <div className="px-4 h-full">
                            {show ? (
                                <MinusIcon
                                    onClick={() => setShow(!show)}
                                    className="h-4 w-4 lg:cursor-pointer text-gray-800"
                                />
                            ) : (
                                <PlusIcon
                                    onClick={() => setShow(!show)}
                                    className="h-4 w-4 lg:cursor-pointer text-gray-800"
                                />
                            )}
                        </div>
                    ) : null}
                </div>
                <div>
                    <div
                        className={`${
                            show
                                ? 'max-h-[1000px] duration-[3000ms]'
                                : 'max-h-0 duration-1000'
                        } overflow-hidden`}
                    >
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <li
                                        className={`py-2 px-8  text-sm ${
                                            select === sub.id
                                                ? design.header_color
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        <span
                                            style={
                                                id == sub?.id
                                                    ? {
                                                          color: `${design.header_color}`,
                                                      }
                                                    : {}
                                            }
                                            className={`text-${design.header_color}`}
                                        >
                                            {sub?.name}
                                        </span>
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

'use client';
import Card55 from '@/components/card/card55';
import Card6 from '@/components/card/card6';
import Skeleton from '@/components/loaders/skeleton';
import { MinusIcon, PlusIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoGridSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '@/components/_category-page/components/pagination';
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
import { setSort } from '@/redux/features/filters/filterSlice';

const CategoryThirty = ({ catId, store_id, design }: any) => {
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
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
  }
  .sec-twenty-nine{
    border-bottom: 2px solid ${design?.header_color};
}
 `;

    return (
        <div>
            <Location />

            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className=" hidden lg:block col-span-3 ">
                        <div className="w-full relative p-4 border h-max">
                            <h3 className="font-medium text-[#252525] text-xl mb-4 pb-[10px] w-max">
                                Product Categories
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
                            <FilterByColorNew
                                colors={colors}
                                activeColor={activeColor}
                                setPage={setPage}
                                setHasMore={setHasMore}
                            />
                        </div>
                        <div className="border p-4">
                            <FilterByPriceNew
                                priceValue={priceValue}
                                setPage={setPage}
                                setHasMore={setHasMore}
                            />
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
        </div>
    );
};

export default CategoryThirty;

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
    if (
        (categoryPageProductsLoading && !categoryPageProductsError) ||
        categoryPageProductsFetching
    ) {
        return (
            <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
                <Skeleton />
            </div>
        );
    }

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
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                        <Card55 item={item} />
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
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    {grid === 'H' && (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                    <Card55 item={item} />
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
        <div className="w-full bg-gray-300 text-[#252525] flex flex-col justify-center items-center py-5 mb-5">
            <h1 className="text-3xl font-medium ">Product</h1>
            <div className="flex items-center gap-1">
                <p>Home</p>
                <p>/ {activecat}</p>
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
    const inactiveColor = `flex-1 text-lg font-medium`;
    const activesub = `text-[${design?.header_color}] flex-1 text-lg font-medium`;
    const inactivesub = `flex-1 text-lg font-medium`;
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
                            <span
                                className={`${
                                    select === item.id
                                        ? design?.header_color
                                        : 'text-gray-800'
                                }`}
                            >
                                {item.name}
                            </span>
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
                                                ? design?.header_color
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
                                            className={
                                                id == sub?.id
                                                    ? activesub
                                                    : inactivesub
                                            }
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

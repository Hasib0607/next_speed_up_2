'use client';

import Card6 from '@/components/card/card6';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Pagination from '@/components/paginations/pagination';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { Bars3Icon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoGridSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import FilterByColorFortySeven from './filter-by-color-fortyseven';
import FilterByPriceFortySeven from './filter-by-price-fortyseven';
import Card77 from '@/components/card/card77';

const FortySeven = ({ design, store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const [grid, setGrid] = useState<any>('H');
    const [paginate, setPaginate] = useState<any>({});
    const [page, setPage] = useState<any>(1);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Default open
    const [isColorOpen, setIsColorOpen] = useState(false); // Default open
    const [isPriceOpen, setIsPriceOpen] = useState(false); // Default open
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .grid-active {
      color:  ${textColor};
      border: 1px solid ${bgColor};
      background-color: ${bgColor};
    }
 `;

    return (
        <div>
            <div className="w-full bg-[var(--header-color)] flex flex-col justify-center items-center py-10 mb-5 mt-16 md:mt-24">
                <h1 className="text-3xl font-medium text-[var(--text-color)]">
                    {'Shop'}
                </h1>
                <div className="flex items-center gap-1 text-[var(--text-color)]">
                    <p>Home</p>
                    <p>/ {'Collections'}</p>
                </div>
            </div>
            <div className="sm:container px-5 md:px-32 mt-20">
                <style>{styleCss}</style>
                <div className="flex gap-2 md:gap-8 flex-row flex-wrap items-start">
                    <div className="px-4 relative bg-white">
                        <div
                            className="font-medium text-xl w-full flex justify-between items-center cursor-pointer"
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        >
                            <span>Categories</span>
                            {isCategoryOpen ? (
                                <FaChevronUp className="text-gray-600 text-sm" />
                            ) : (
                                <FaChevronDown className="text-gray-600 text-sm" />
                            )}
                        </div>
                        {/* Category List - Show/Hide on Click */}
                        {isCategoryOpen && (
                            <div className="absolute left-0 top-full pl-5 mt-1 w-48 bg-white border z-30 shadow-lg">
                                {category?.map((item: any) => (
                                    <SingleCat key={item?.id} item={item} />
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Filter by Color Section */}
                    <div className="px-4 relative bg-white">
                        <div
                            className="font-medium text-xl w-full mb-2 flex justify-between items-center cursor-pointer"
                            onClick={() => setIsColorOpen(!isColorOpen)}
                        >
                            <span>Filter by Color</span>
                            {isColorOpen ? (
                                <FaChevronUp className="text-gray-600 text-sm" />
                            ) : (
                                <FaChevronDown className="text-gray-600 text-sm" />
                            )}
                        </div>
                        {isColorOpen && (
                            <div className="absolute left-0 top-full mt-1 w-48 bg-white border z-30 shadow-lg">
                                <FilterByColorFortySeven />
                            </div>
                        )}
                    </div>
                    {/* Filter by Price Section */}
                    <div className="px-4 relative bg-white">
                        <div
                            className="font-medium text-xl w-full mb-2 flex justify-between items-center cursor-pointer"
                            onClick={() => setIsPriceOpen(!isPriceOpen)}
                        >
                            <span>Filter by Price</span>
                            {isPriceOpen ? (
                                <FaChevronUp className="text-gray-600 text-sm" />
                            ) : (
                                <FaChevronDown className="text-gray-600 text-sm" />
                            )}
                        </div>
                        {isPriceOpen && (
                            <div className="absolute left-0 top-full mt-1 w-48 bg-white border z-30 shadow-lg">
                                <FilterByPriceFortySeven />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="col-span-1 lg:col-span-12 flex flex-col min-h-[100vh-200px] h-full">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            grid={grid}
                            setGrid={setGrid}
                            paginate={paginate}
                            isMobileFilterOpen={isMobileFilterOpen}
                            setIsMobileFilterOpen={setIsMobileFilterOpen}
                            isCategoryOpen={isCategoryOpen}
                            setIsCategoryOpen={setIsCategoryOpen}
                            isColorOpen={isColorOpen}
                            setIsColorOpen={setIsColorOpen}
                            isPriceOpen={isPriceOpen}
                            setIsPriceOpen={setIsPriceOpen}
                            category={category}
                        />
                        <div className="flex-1 my-5">
                            <ShopProductSection
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

export default FortySeven;

const ShopProductSection = ({
    grid,
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
    }, [page, activeColor, priceValue, shopPageProductsRefetch]);

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
            {!isPagination ? (
                <InfiniteScroll
                    style={{ height: 'auto', overflow: 'hidden' }}
                    dataLength={infiniteProducts?.length}
                    next={nextPageFetch}
                    hasMore={paginate?.has_more_pages}
                    loader={
                        paginate?.has_more_pages ||
                        shopPageProductsFetching ||
                        (shopPageProductsLoading && <InfiniteLoader />)
                    }
                    endMessage={
                        paginate?.has_more_pages ||
                        shopPageProductsFetching ||
                        shopPageProductsLoading ? (
                            <InfiniteLoader />
                        ) : (
                            <NotFoundMsg message={'No More Products'} />
                        )
                    }
                >
                    {grid === 'H' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg2:grid-cols-4 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                    <Card77 item={item} type={'shop_page'} />
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
            ) : (
                <>
                    {grid === 'H' && (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg2:grid-cols-4 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                    <Card77 item={item} type={'shop_page'} />
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
                </>
            )}
        </>
    );
};

const Filter = ({
    paginate,
    onChange,
    setGrid,
    grid,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    isCategoryOpen,
    setIsCategoryOpen,
    isColorOpen,
    setIsColorOpen,
    isPriceOpen,
    setIsPriceOpen,
    category,
}: any) => {
    const handleClose = () => {
        // Close all filter sections
        setIsCategoryOpen(false);
        setIsColorOpen(false);
        setIsPriceOpen(false);

        // Close sidebar
        setIsMobileFilterOpen(false);
    };

    const handleApply = () => {
        // Close sidebar
        setIsMobileFilterOpen(false);
    };

    return (
        <>
            <div className="py-3 flex flex-col md:flex-row md:items-center md:justify-between px-4 max-lg:border-0 max-lg:py-2">
                {/* Left Section */}
                <div className="flex items-center gap-5">
                    <div className="font-sm uppercase">
                        Showing {paginate?.from}-{paginate?.to} of{' '}
                        {paginate?.total} results
                    </div>
                </div>

                {/* Header Right section */}
                <div className="mt-5 flex items-center gap-5">
                    <div className="flex items-center gap-1 max-lg:hidden">
                        <div
                            onClick={() => setGrid('H')}
                            className={`p-2 lg:cursor-pointer ${
                                grid === 'H' ? 'grid-active' : 'border'
                            }`}
                        >
                            <IoGridSharp className="h-4 w-4 " />
                        </div>
                        <div
                            onClick={() => setGrid('V')}
                            className={`p-2 lg:cursor-pointer ${
                                grid === 'V' ? 'grid-active' : 'border'
                            }`}
                        >
                            <Bars3Icon className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="flex items-center text-sm font-medium">
                        <label className="">Sort by</label>
                        <div className="relative">
                            <div className="relative w-10 h-9">
                                <select
                                    onChange={onChange}
                                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                >
                                    <option value="az">
                                        Alphabetically, A-Z
                                    </option>
                                    <option value="za">
                                        Alphabetically, Z-A
                                    </option>
                                    <option value="lh">
                                        Price, low to high
                                    </option>
                                    <option value="hl">
                                        Price, high to low
                                    </option>
                                </select>
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-end">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span
                            className=" font-medium flex items-center gap-2"
                            onClick={() => setIsMobileFilterOpen(true)}
                        >
                            Filter{' '}
                            <div className="">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter Sidebar */}
            <div
                className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setIsMobileFilterOpen(false)}
                />
                <div className="relative w-full max-w-xs ml-auto h-full bg-white shadow-xl">
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-2xl font-semibold">Filters</h2>
                        <button
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="p-2 hover:text-gray-600"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="overflow-y-auto flex-1 p-4">
                        {/* Category Filter */}
                        <div className="mb-4">
                            <div
                                className="font-medium text-black text-xl w-full py-2 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                            >
                                <span>Collections</span>
                                {isCategoryOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isCategoryOpen && (
                                <div>
                                    {category?.map((item: any) => (
                                        <SingleCat key={item?.id} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Color Filter */}
                        <div className="mb-4">
                            <div
                                className="font-medium text-black text-xl w-full py-2 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsColorOpen(!isColorOpen)}
                            >
                                <span>Filter by Color</span>
                                {isColorOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isColorOpen && <FilterByColorFortySeven />}
                        </div>

                        {/* Price Filter */}
                        <div className="mb-4">
                            <div
                                className="font-medium text-black text-xl w-full py-2 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsPriceOpen(!isPriceOpen)}
                            >
                                <span>Filter by Price</span>
                                {isPriceOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isPriceOpen && <FilterByPriceFortySeven />}
                        </div>
                    </div>

                    {/* Sidebar Footer */}
                    <div className="border-t p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleClose}
                                className="py-2 px-4 border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleApply}
                                className="py-2 px-4 bg-[var(--header-color)] text-[var(--text-color)] hover:opacity-90 transition-opacity"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const SingleCat = ({ item }: any) => {
    const [show, setShow] = useState(false);

    const { id: select }: any = useParams<{ id: string }>();

    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == select && setShow(true);
            }
        }
    }, [item?.cat, select]);

    return (
        <div className="">
            <div className="w-full mb-2">
                <div className="flex items-center py-1">
                    <Link
                        href={'/category/' + item?.id}
                        className={`flex-1 font-medium ${
                            select === item.id
                                ? 'text-red-500'
                                : 'text-gray-900'
                        }`}
                    >
                        <p>{item.name}</p>
                    </Link>
                    {item?.cat ? (
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
                {show && (
                    <>
                        <div className="">
                            {item?.cat?.map((sub: any, idx: any) => (
                                <div className="border-t" key={idx}>
                                    <Link href={'/category/' + sub?.id}>
                                        <p
                                            className={`py-2 px-4 text-sm ${
                                                select === sub.id
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {sub?.name}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

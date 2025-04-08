'use client';

import CategoryBreadcrumb from '@/components/_category-page/components/CategoryBreadcrumb';
import Card6 from '@/components/card/card6';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoGridSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import FilterByColorFortyThree from '../_shop-page/forty-three/filter-by-color-fortythree';
import FilterByPriceFortyThree from '../_shop-page/forty-three/filter-by-price-fortythree';
import CustomMenu from '../_shop-page/forty-three/custom-menu';
import BestSellerFortyThreeForShop from '../_shop-page/forty-three/best-sell-fortythree-for-shop';
import ProductCardTen from '../card/product-card/product-card-ten';
import { LuSettings2 } from 'react-icons/lu';
import { FiX } from 'react-icons/fi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';

const CategoryFortyThree = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const [grid, setGrid] = useState<any>('H');
    const [paginate, setPaginate] = useState<any>({});
    const [page, setPage] = useState<any>(1);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true); // Default open
    const [isColorOpen, setIsColorOpen] = useState(true); // Default open
    const [isPriceOpen, setIsPriceOpen] = useState(true); // Default open
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

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
            <CategoryBreadcrumb catId={catId} />

            <div className="sm:container px-5 md:px-32 mt-20">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:block col-span-3 h-max">
                        <div className="w-full relative p-4">
                            <h3 className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-10">
                                Filter:
                            </h3>
                            {/* Category Header with Dropdown Icon */}
                            <div
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                            >
                                <span>Category</span>
                                {isCategoryOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {/* Category List - Show/Hide on Click */}
                            {isCategoryOpen && (
                                <div>
                                    {category?.map((item: any) => (
                                        <SingleCat
                                            key={item?.id}
                                            item={item}
                                            design={design}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Filter by Color Section */}
                        <div className="px-4">
                            <div
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsColorOpen(!isColorOpen)}
                            >
                                <span>Filter by Color</span>
                                {isColorOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isColorOpen && <FilterByColorFortyThree />}
                        </div>
                        {/* Filter by Price Section */}
                        <div className="px-4 pt-4">
                            <div
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsPriceOpen(!isPriceOpen)}
                            >
                                <span>Filter by Price</span>
                                {isPriceOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isPriceOpen && <FilterByPriceFortyThree />}
                        </div>
                        {/* Custom Menu */}
                        <div className="px-4 pt-4">
                            <h3 className="font-medium text-[#252525] text-xl">
                                Custom Menu
                            </h3>
                            <CustomMenu />
                        </div>
                        {/* Best Seller */}
                        <div className="px-4 pt-4">
                            <h3 className="font-medium text-[#252525] text-xl">
                                Best Seller
                            </h3>
                            <BestSellerFortyThreeForShop />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
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
                            <ProductSection
                                catId={catId}
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

export default CategoryFortyThree;

const ProductSection = ({
    grid,
    catId,
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

    useEffect(() => {
        categoryPageProductsRefetch();
    }, [page, activeColor, priceValue, catId, categoryPageProductsRefetch]);

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
                        hasMore={paginate?.has_more_pages}
                        loader={
                            paginate?.has_more_pages ||
                            categoryPageProductsFetching ||
                            (categoryPageProductsLoading && <InfiniteLoader />)
                        }
                        endMessage={
                            paginate?.has_more_pages ||
                            categoryPageProductsFetching ||
                            categoryPageProductsLoading ? (
                                <InfiniteLoader />
                            ) : (
                                <NotFoundMsg message={'No More Products'} />
                            )
                        }
                    >
                        {grid === 'H' && (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
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
                                            <ProductCardTen item={item} />
                                        </motion.div>
                                    )
                                )}
                            </div>
                        )}
                        <AnimatePresence>
                            {grid === 'V' && (
                                <div className="grid grid-cols-1 gap-1 sm:gap-4">
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
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-4">
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
                                    <ProductCardTen item={item} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-1 sm:gap-4">
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
        // add any additional apply logic here if needed
    };

    return (
        <>
            <div className="border border-[var(--header-color)] py-3 flex flex-wrap justify-between items-center px-4 max-lg:border-0 max-lg:py-2 max-lg:px-2">
                {/* Desktop Left Section */}
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

                {/* Mobile Header Row */}
                <div className="lg:hidden w-full flex justify-between items-center">
                    <span
                        className="text-[var(--text-color)] font-medium flex items-center gap-2"
                        onClick={() => setIsMobileFilterOpen(true)}
                    >
                        <LuSettings2 /> Filter and sort
                    </span>
                    <div className="text-gray-500 font-semibold">
                        {paginate?.total} Products
                    </div>
                </div>

                {/* Desktop Right Section */}
                <div className="max-lg:hidden flex items-center gap-5">
                    <div className="flex items-center text-sm font-medium border pl-2 pr-2 bg-[var(--header-color)]">
                        <label className="max-w-fit text-[var(--text-color)]">
                            Sort by:
                        </label>
                        <div className="relative">
                            <div className="relative w-10 h-9">
                                <select
                                    onChange={onChange}
                                    className="absolute inset-3 right-5 w-full h-full opacity-0 cursor-pointer z-10"
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
                                        className="w-4 h-4 text-[var(--text-color)]"
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
                    <div className="text-gray-500 font-semibold">
                        {paginate?.total} Products
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sidebar */}
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
                        <h2 className="text-xl font-semibold">
                            Filter and sort
                        </h2>
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
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                            >
                                <span>Category</span>
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
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsColorOpen(!isColorOpen)}
                            >
                                <span>Filter by Color</span>
                                {isColorOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isColorOpen && <FilterByColorFortyThree />}
                        </div>

                        {/* Price Filter */}
                        <div className="mb-4">
                            <div
                                className="bg-[#EFEFEF] font-medium text-[#252525] text-xl w-full border-l-8 border-[var(--header-color)] py-2 px-4 mb-2 flex justify-between items-center cursor-pointer"
                                onClick={() => setIsPriceOpen(!isPriceOpen)}
                            >
                                <span>Filter by Price</span>
                                {isPriceOpen ? (
                                    <FaChevronUp className="text-gray-600 text-sm" />
                                ) : (
                                    <FaChevronDown className="text-gray-600 text-sm" />
                                )}
                            </div>
                            {isPriceOpen && <FilterByPriceFortyThree />}
                        </div>

                        {/* Sort Options */}
                        <div className="mt-4 p-4">
                            <label className="block font-medium mb-2">
                                Sort by:
                            </label>
                            <select
                                onChange={onChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="az">Alphabetically, A-Z</option>
                                <option value="za">Alphabetically, Z-A</option>
                                <option value="lh">Price, low to high</option>
                                <option value="hl">Price, high to low</option>
                            </select>
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

    const { cat_id }: any = useParams<{ id: string }>();

    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == cat_id && setShow(true);
            }
        }
    }, [item?.cat, cat_id]);

    const activeColor = `text-[var(--header-color)] flex-1 text-lg font-medium`;
    const inactiveColor = 'text-gray-500 flex-1 text-lg font-medium';
    const activesub = `text-[var(--header-color)] py-2 px-4 text-sm`;
    const inactivesub = `text-gray-600 py-2 px-4 text-sm`;

    return (
        <div className="">
            <div className="w-full border mb-2">
                <div className="flex items-center px-4 py-1">
                    <Link
                        style={
                            parseInt(cat_id) === parseInt(item?.id)
                                ? { color: 'var(--header-color)' }
                                : {}
                        }
                        onClick={() => setShow(!show)}
                        href={'/category/' + item?.id}
                        className={
                            cat_id == item?.id ? activeColor : inactiveColor
                        }
                    >
                        {' '}
                        <p>{item.name}</p>
                    </Link>
                    {/* {item?.subcategories?.length > 0 ? (
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
                    ) : null} */}
                </div>
                {/* {show && (
                    <>
                        <div className="">
                            {item?.subcategories?.map(
                                (sub: any, key: number) => (
                                    <div className="border-t" key={key}>
                                        <Link href={'/category/' + sub?.id}>
                                            {' '}
                                            <p
                                                style={
                                                    parseInt(cat_id) ===
                                                    parseInt(sub?.id)
                                                        ? {
                                                              color: `${design.header_color}`,
                                                          }
                                                        : {}
                                                }
                                                className={
                                                    cat_id == sub?.id
                                                        ? activesub
                                                        : inactivesub
                                                }
                                            >
                                                {sub?.name}
                                            </p>
                                        </Link>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )} */}
            </div>
        </div>
    );
};

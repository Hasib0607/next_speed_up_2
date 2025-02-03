'use client';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from 'next/navigation';
import Card31 from '@/components/card/card31';
import Link from 'next/link';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import './category-seventeen.css';
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
import Skeleton from '@/components/loaders/skeleton';
import { setSort } from '@/redux/features/filters/filterSlice';

const CategorySeventeen = ({ catId, store_id, design }: any) => {
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

    const [activecat, setActivecat] = useState(null);
    useEffect(() => {
        for (let i = 0; i < category.length; i++) {
            if (category[i]?.cat) {
                for (let j = 0; j < category[i].cat.length; j++) {
                    if (category[i]?.cat[j]?.id == catId) {
                        setActivecat(category[i]?.cat[j]?.name);
                    }
                }
            }
            if (category[i]?.id == catId) {
                setActivecat(category[i].name);
            }
        }
    }, [category]);

    return (
        <>
            <div className="categorySeventeenBackgroundColor">
                <div className="pt-6 w-full flex flex-col gap-3 justify-center items-center">
                    <div>
                        <h1 className="text-5xl font-medium text-white">
                            Products
                        </h1>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="text-white">Home</p>
                        <IoIosArrowForward className="text-xs mt-1 text-white" />
                        <p className="font-medium text-white">{activecat}</p>
                    </div>
                </div>
            </div>
            <div className="container px-5 xl:px-80 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="hidden md:block col-span-3">
                        <div className="w-full">
                            <h3 className="font-semibold text-[#252525] text-lg mx-4 border-b-2 border-[#206469] pb-2 mb-3">
                                Categories
                            </h3>
                            {category?.map((item: any) => (
                                <SingleCat
                                    key={item?.id}
                                    item={item}
                                    design={design}
                                />
                            ))}
                        </div>
                        <div className="my-6 p-4">
                        <FilterByColorNew />
                        </div>
                        <div className="p-4">
                        <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
                        {/* <Location category={shops} cat={cat} /> */}
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
            <div className="categorySeventeenBottomBackGroundImage absolute top-44"></div>
        </>
    );
};

export default CategorySeventeen;

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
            {categoryPageProductsLoading && !categoryPageProductsError ? (
                <div>
                    <Skeleton />
                </div>
            ) : (
                <div>
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
                                <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-3 grid-cols-2 gap-2">
                                    {products?.map((product: any) => (
                                        <Card31
                                            key={product.id}
                                            item={product}
                                        />
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-3 grid-cols-2 gap-2">
                            {products?.map((product: any) => (
                                <Card31 key={product.id} item={product} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const Filter = ({ onChange }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap gap-y-2 justify-between items-center">
            {/* <div className="text-gray-500 font-thin">
        There are {paginate?.total} products{" "}
      </div> */}
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
                    <option value="lh">Low - High</option>
                    <option value="hl">High - Low</option>
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
    const activeColor = `text-[${design?.header_color}] flex-1`;
    const inactiveColor = `flex-1 text-gray-900`;
    const activesub = `text-[${design?.header_color}] flex-1`;
    const inactivesub = `flex-1 text-gray-900`;
    return (
        <>
            <div className="w-full flex px-4 py-1">
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

            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, key: any) => (
                            <div className="" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <li
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
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

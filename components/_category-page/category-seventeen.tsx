'use client';

import CategoryBreadcrumb from '@/components/_category-page/components/CategoryBreadcrumb';
import Card31 from '@/components/card/card31';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import './category-seventeen.css';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import FilterByBrandNew from './components/filter-by-brand-new';

const CategorySeventeen = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    // setting the initial page number
    const [page, setPage] = useState(1);
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
                        <CategoryBreadcrumb
                            catId={catId}
                            className={'font-medium text-white'}
                            nameOnly
                        />
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
                        <div className="p-4">
                            <FilterByBrandNew />
                        </div>
                        <div className="my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                        />
                        <div className="flex-1">
                            <ProductSection
                                catId={catId}
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
            <div className="categorySeventeenBottomBackGroundImage absolute top-64"></div>
        </>
    );
};

export default CategorySeventeen;

const ProductSection = ({
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
                                dataLength={infiniteProducts?.length}
                                next={nextPageFetch}
                                hasMore={paginate?.has_more_pages}
                                loader={
                                    paginate?.has_more_pages ||
                                    categoryPageProductsFetching ||
                                    (categoryPageProductsLoading && (
                                        <InfiniteLoader />
                                    ))
                                }
                                endMessage={
                                    paginate?.has_more_pages ||
                                    categoryPageProductsFetching ||
                                    categoryPageProductsLoading ? (
                                        <InfiniteLoader />
                                    ) : (
                                        <NotFoundMsg
                                            message={'No More Products'}
                                        />
                                    )
                                }
                            >
                                <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-3 grid-cols-2 gap-2">
                                    {infiniteProducts?.map((product: any) => (
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

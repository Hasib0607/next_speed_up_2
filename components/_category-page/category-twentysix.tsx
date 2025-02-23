'use client';

import CategoryBreadcrumb from '@/components/_category-page/components/CategoryBreadcrumb';
import Card56 from '@/components/card/card56';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';

const CategoryTwentySix = ({ catId, store_id, design }: any) => {
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

    const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
    .sec-twenty-nine{
        border-bottom: 2px solid ${design?.header_color};
    }
    .shop-cat{
        border: 2px solid ${design?.header_color};
    }
    .shop-cat-dot{
        background: ${design?.header_color};
    }
    `;

    return (
        <div>
            <CategoryBreadcrumb catId={catId} />

            <div className="sm:container px-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className=" hidden lg:block col-span-3">
                        <div className="w-full h-max relative">
                            <h3 className="font-bold text-[#252525] text-2xl  mb-4 pb-[10px] w-max">
                                Product Categories
                            </h3>
                            <div className="shop-cat rounded-md">
                                {category?.map((item: any) => (
                                    <SingleCat
                                        key={item?.id}
                                        item={item}
                                        design={design}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="bg-white my-6 p-4 shop-cat rounded-md">
                            <FilterByColorNew />
                        </div>
                        <div className="bg-white p-4 shop-cat rounded-md mb-5">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            paginate={paginate}
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
        </div>
    );
};

export default CategoryTwentySix;

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
                            {infiniteProducts?.map((item: any, key: number) => (
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
                                    <Card56 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
                    {products?.map((item: any, key: number) => (
                        <motion.div
                            key={key}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5, ease: 'linear' }}
                        >
                            <Card56 item={item} />
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};

const Filter = ({ paginate, onChange }: any) => {
    return (
        <div className="border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap sm:justify-between justify-end items-center px-2">
            <div className="text-gray-500 font-medium sm:block hidden">
                Showing {paginate?.from}-{paginate?.to} of {paginate?.total}{' '}
                results
            </div>

            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm max-w-[200px] w-full font-medium">
                <select
                    onChange={onChange}
                    className="h-12 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium flex-1 bg-white"
                >
                    <option>Default sorting</option>
                    <option value="az">Name, A to Z</option>
                    <option value="za">Name, Z to A</option>
                    <option value="lh">Price, Low to High</option>
                    <option value="hl">Price, High to Low</option>
                </select>
            </div>
        </div>
    );
};

const SingleCat = ({ item, design }: any) => {
    const [show, setShow] = useState(false);
    const { id }: any = useParams<{ id: string }>();
    const activeColor = `text-[${design?.header_color}] `;
    const inactiveColor = 'text-gray-500 ';
    const activesub = `text-[${design?.header_color}] pl-8`;
    const inactivesub = `text-gray-600 pl-8`;

    return (
        <div className="border-b py-2">
            <div className="w-full">
                <div className="flex items-center gap-2 pl-4 py-1">
                    <p className="w-1.5 h-1.5 rounded-full shop-cat-dot"></p>
                    <Link
                        onClick={() => setShow(!show)}
                        href={'/category/' + item.id}
                    >
                        <p>
                            <span
                                style={
                                    parseInt(id) === parseInt(item?.id)
                                        ? { color: `${design.header_color}` }
                                        : {}
                                }
                                className={
                                    id == item?.id ? activeColor : inactiveColor
                                }
                            >
                                {item.name}
                            </span>
                        </p>
                    </Link>
                    {/* {item?.cat ? <div className="px-4 h-full">
                        {show ? <MinusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' /> :
                            <PlusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' />}
                    </div> : null} */}
                </div>
                <div>
                    <div className={`overflow-hidden`}>
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

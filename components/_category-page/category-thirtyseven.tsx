'use client';

import CategoryBreadcrumb from '@/components/_category-page/components/CategoryBreadcrumb';
import Card64 from '@/components/card/card64';
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

const CategoryThirtySeven = ({ catId, store_id, design }: any) => {
    const { id: data }: any = useParams<{ id: string }>();
    const module_id = 105;
    const dispatch = useDispatch();

    // setting the initial page number
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState<any>({});

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];
    const { subcategories } = category;

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

    const temp = subcategories?.find(
        (c: any) => parseInt(c?.id) === parseInt(data?.id)
    );
    const subCat = subcategories?.filter(
        (c: any) =>
            parseInt(c?.parent) === parseInt(temp ? temp?.parent : data?.id)
    );

    return (
        <div className="bg-[#F1F9DD]">
            <style>{styleCss}</style>
            <div className="pt-3 sm:container px-5 lg:block hidden">
                <div className="flex flex-wrap items-center gap-3">
                    {subCat?.map((item: any) => (
                        <SubCat key={item?.id} item={item} />
                    ))}
                </div>
            </div>
            <div className="pt-3 sm:container px-5">
                <CategoryBreadcrumb catId={catId} />
            </div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:flex col-span-3 ">
                        <div className="w-full sticky top-40 h-max bg-white px-4 py-3">
                            <div className="pb-5">
                                <div className="flex justify-between items-center ">
                                    <h3 className="text-[#252525] text-lg">
                                        Other's Categories
                                    </h3>
                                </div>
                                <div>
                                    {category?.map((item: any) => (
                                        <SingleCat
                                            key={item?.id}
                                            item={item}
                                            design={design}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="my-6 pb-5">
                                <FilterByColorNew />
                            </div>
                            <div className="mb-5 pb-5">
                                <FilterByPriceNew />
                            </div>
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
        </div>
    );
};

export default CategoryThirtySeven;

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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
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
                                    <Card64 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                    {products?.map((item: any, key: number) => (
                        <motion.div
                            key={key}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5, ease: 'linear' }}
                        >
                            <Card64 item={item} />
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};

const Filter = ({ onChange }: any) => {
    return (
        <div className="flex flex-wrap justify-between items-center mb-8 ml-auto">
            <div className=" md:block hidden bg-transparent px-4 py-2"></div>
            {/* Short by  */}
            <div className="">
                <select
                    onChange={onChange}
                    className="h-9 border border-black min-w-[300px] rounded-full duration-500 lg:cursor-pointer focus:border-black focus:outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
                >
                    <option>Sort By</option>
                    <option value="az">A - Z</option>
                    <option value="za">Z - A</option>
                    <option value="lh">Low - High</option>
                    <option value="hl">High - Low</option>
                </select>
            </div>
        </div>
    );
};

const SubCat = ({ item }: any) => {
    const { id }: any = useParams<{ id: string }>();
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};
    const activeColor = `text-[${design?.header_color}] text-sm`;
    const inactiveColor = 'text-gray-500 text-sm';
    return (
        <>
            <Link href={'/category/' + item?.id}>
                <div className="py-2 px-5 text-center min-w-[250px] bg-white">
                    <p className={id == item?.id ? activeColor : inactiveColor}>
                        {item?.name}
                    </p>
                </div>
            </Link>
        </>
    );
};
const SingleCat = ({ item, design }: any) => {
    const { id }: any = useParams<{ id: string }>();
    const activesub = `text-[${design?.header_color}] flex-1 text-sm text-hover`;
    const inactivesub = `text-gray-600 flex-1 text-sm text-hover`;
    const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    .category-page-two .active{
        color:red;
        font-weight: 700;
    }
    `;
    return (
        <>
            <div className="w-full flex py-2 category-page border-b">
                <style>{styleCss}</style>
                <Link
                    href={'/category/' + item?.id}
                    className={id == item?.id ? activesub : inactivesub}
                >
                    <p
                        style={
                            id == item?.id
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                    >
                        {item.name}
                    </p>
                </Link>
            </div>
        </>
    );
};

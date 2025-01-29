'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/_category-page/components/pagination';
import Skeleton from '@/components/loaders/skeleton';
import { ThreeDots } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import Card64 from '@/components/card/card64';
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
import { setSort } from '@/redux/features/filters/filterSlice';

const CategoryThirtySeven = ({ catId, store_id, design }: any) => {
    const { id: data }: any = useParams<{ id: string }>();
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
    const { subcategories } = category;

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
                <Location />
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
                                <FilterByColorNew
                                    colors={colors}
                                    activeColor={activeColor}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
                            </div>
                            <div className="mb-5 pb-5">
                                <FilterByPriceNew
                                    priceValue={priceValue}
                                    setPage={setPage}
                                    setHasMore={setHasMore}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full">
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

export default CategoryThirtySeven;

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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
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

const Location = () => {
    const [activecat, setActivecat] = useState(null);
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
        <div className="w-full text-[#414141] bg-white flex gap-1 items-center justify-start py-2 text-sm px-4">
            <p>Home </p>
            <p> / Shop / {activecat}</p>
        </div>
    );
};

const Filter = ({ paginate, onChange, shops, cat }: any) => {
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

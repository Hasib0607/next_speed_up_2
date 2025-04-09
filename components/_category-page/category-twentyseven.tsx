'use client';

import CategoryBreadcrumb from '@/components/_category-page/components/CategoryBreadcrumb';
import Card51 from '@/components/card/card51';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';

const CategoryTwentySeven = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [paginate, setPaginate] = useState<any>({});
    const [active, setActive] = useState(true);

    if (open === true) {
        setTimeout(() => {
            setActive(false);
        }, 800);
    } else {
        setTimeout(() => {
            setActive(true);
        }, 0);
    }

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
    `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <CategoryBreadcrumb catId={catId} />

            <div className="">
                <style>{styleCss}</style>
                <div className="flex flex-col min-h-[100vh-200px] h-full">
                    <div className="flex justify-between items-center rounded-xl h-max py-4 mb-5">
                        <div className="relative w-40 border rounded-full lg:block hidden">
                            <div
                                onClick={() => setOpen(!open)}
                                className="flex items-center justify-between py-2 px-4 lg:cursor-pointer"
                            >
                                <h3 className="font-medium text-[#252525] md:text-xl">
                                    Categories
                                </h3>
                                <IoIosArrowDown
                                    className={`${open && 'rotate-180'} duration-500 `}
                                />
                            </div>
                            <div
                                className={`menu-twelve absolute top-14 w-80 bg-white z-[1] ${
                                    open ? 'max-h-[1000px]' : 'max-h-0'
                                } ${active ? 'overflow-hidden' : ''}`}
                            >
                                {category?.map((item: any) => (
                                    <SingleCat
                                        key={item?.id}
                                        item={item}
                                        setOpen={setOpen}
                                        design={design}
                                    />
                                ))}
                            </div>
                        </div>
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
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

export default CategoryTwentySeven;

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
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
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
                                    <Card51 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                        {products?.map((item: any, key: number) => (
                            <motion.div
                                key={key}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.5, ease: 'linear' }}
                            >
                                <Card51 item={item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const Filter = ({ onChange }: any) => {
    return (
        <div className="py-3 flex flex-wrap justify-between items-center px-2">
            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm w-full font-medium">
                <select
                    onChange={onChange}
                    className="h-9 border border-gray-200 rounded-full outline-0 ring-0 focus:ring-0 font-medium text-sm flex-1 bg-white"
                >
                    <option>Sort Order</option>
                    <option value="az">Name, A to Z</option>
                    <option value="za">Name, Z to A</option>
                    <option value="lh">Price, Low to High</option>
                    <option value="hl">Price, High to Low</option>
                </select>
            </div>
        </div>
    );
};

const SingleCat = ({ item, setOpen, design }: any) => {
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
    const inactiveColor = 'text-gray-500 flex-1 text-lg font-medium';
    const activesub = `text-[${design?.header_color}] py-2 px-4 text-sm`;
    const inactivesub = `text-gray-600 py-2 px-4 text-sm`;

    return (
        <div className="">
            <div className="w-full border rounded-xl mb-2">
                <div className="flex items-center px-4 py-3">
                    <Link
                        style={
                            parseInt(id) === parseInt(item?.id)
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                        onClick={() => setShow(!show)}
                        href={'/category/' + item.id}
                        className={id == item?.id ? activeColor : inactiveColor}
                    >
                        {' '}
                        <p onClick={() => setOpen(false)}>{item.name}</p>
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
                {show && (
                    <>
                        <div className="">
                            {item?.subcategories?.map(
                                (sub: any, key: number) => (
                                    <div className="border-t" key={key}>
                                        <Link href={'/category/' + sub?.id}>
                                            {' '}
                                            <p
                                                style={
                                                    parseInt(id) ===
                                                    parseInt(sub?.id)
                                                        ? {
                                                              color: `${design.header_color}`,
                                                          }
                                                        : {}
                                                }
                                                onClick={() => setOpen(false)}
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
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

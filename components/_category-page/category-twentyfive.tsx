'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/components/_category-page/components/pagination';
import Skeleton from '@/components/loaders/skeleton';
import Card50 from '@/components/card/card50';
import Link from 'next/link';
import './category-twentyfive.css';
import { useSelector } from 'react-redux';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { numberParser } from '@/helpers/numberParser';
import InfiniteLoader from '../loaders/infinite-loader';
import { NotFoundMsg } from '@/utils/little-components';

const CategoryTwentyFive = ({ catId, store_id, design }: any) => {
    const module_id = 105;

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
        <div>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="">
                    <div className="mt-8 hidden md:flex border-b-2">
                        <div className="flex gap-x-10 flex-wrap gap-y-2">
                            {category?.map((item: any) => (
                                <SingleCat
                                    item={item}
                                    key={item?.id}
                                    design={design}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-10">
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

export default CategoryTwentyFive;

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
            {(categoryPageProductsLoading && !categoryPageProductsError) ||
            categoryPageProductsFetching ? (
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
                                {infiniteProducts?.length > 0 && (
                                    <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2 sm:gap-8">
                                        {infiniteProducts?.map(
                                            (product: any) => (
                                                <Card50
                                                    key={product.id}
                                                    item={product}
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </InfiniteScroll>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2 sm:gap-8">
                            {products?.map((product: any) => (
                                <Card50 key={product.id} item={product} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

const SingleCat = ({ item, design, select, setSelect }: any) => {
    const [show, setShow] = useState(false);
    const { id }: any = useParams<{ id: string }>();

    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == id && setShow(true);
            }
        }
    }, [item?.cat, id]);

    const activeColor = `text-[${design?.header_color}] w-max`;
    const inactiveColor = 'text-gray-500 w-max';
    const activesub = `text-[${design?.header_color}] text-sm w-max`;
    const inactivesub = `text-gray-600 text-sm w-max`;

    return (
        <div onMouseLeave={() => setShow(false)} className="relative">
            <div
                onMouseEnter={() => setShow(true)}
                className="w-full flex items-center gap-x-2 relative pb-3"
            >
                <Link
                    onClick={() => setShow(!show)}
                    href={'/category/' + item.id}
                    className={id == item?.id ? activeColor : inactiveColor}
                >
                    {' '}
                    <p
                        style={
                            parseInt(id) === parseInt(item?.id)
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                    >
                        {item.name}
                    </p>{' '}
                    <p
                        className={`${
                            select === item.id ? 'block' : 'hidden'
                        } h-[2px] w-full bg-black absolute bottom-0 left-0`}
                    ></p>
                </Link>

                {item?.subcategories ? (
                    <div className="lg:cursor-pointer">
                        {show ? (
                            <MdKeyboardArrowUp className="text-xl text-gray-800" />
                        ) : (
                            <MdKeyboardArrowDown className="text-xl text-gray-800" />
                        )}
                    </div>
                ) : null}
            </div>

            {show && item?.subcategories && (
                <>
                    <div
                        onMouseLeave={() => setShow(false)}
                        className="absolute top-8 left-0 z-[8] bg-white px-5 py-2"
                    >
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="" key={key}>
                                <Link
                                    onClick={() => {
                                        setSelect(item.id);
                                    }}
                                    href={'/category/' + sub?.id}
                                >
                                    {' '}
                                    <li
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
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

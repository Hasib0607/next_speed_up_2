'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import img from '@/assets/bg-image/twenty-four-shop.webp';
import Pagination from '@/components/_category-page/components/pagination';
import Skeleton from '@/components/loaders/skeleton';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card49 from '@/components/card/card49';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import InfiniteLoader from '../loaders/infinite-loader';
import { NotFoundMsg } from '@/utils/little-components';
import CategoryBreadcrumb from '@/utils/CategoryBreadcrumb';

const CategoryTwentyFour = ({ catId, store_id, design }: any) => {
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
    `;

    return (
        <div className="mt-10 lg:mt-0">
            <div className="min-h-[200px] max-h-60 w-full overflow-hidden relative xl:pr-20 lg:pr-10">
                <img
                    src={img.src}
                    alt=""
                    className="min-h-[200px] max-h-60 w-full object-cover"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex flex-col justify-center items-start sm:container px-5">
                    <div className="w-full flex flex-col gap-5">
                        <h1 className="text-5xl text-white font-medium ">
                            Products
                        </h1>
                        <div className="flex items-center gap-1 text-white font-bold">
                            <p>Home</p>
                            <p>/</p>
                            <p>categories</p>
                            <p>/</p>
                            <CategoryBreadcrumb catId={catId} nameOnly />
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <style>{styleCss}</style>
                <div className="sm:container px-5">
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

export default CategoryTwentyFour;

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
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                                    {infiniteProducts?.map((product: any) => (
                                        <Card49
                                            key={product.id}
                                            item={product}
                                        />
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 sm:px-0">
                            {products?.map((product: any) => (
                                <Card49 key={product.id} item={product} />
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
        <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap gap-y-3 justify-between items-center px-2">
            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm max-w-md w-full">
                <label className="max-w-fit"> Sort by:</label>
                <select
                    onChange={onChange}
                    className="h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
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
                    {/* <p
            className={`${
              select === item.id ? "block" : "hidden"
            } h-[2px] w-full bg-black absolute bottom-0 left-0`}
          ></p> */}
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
                                <Link href={'/category/' + sub?.id}>
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

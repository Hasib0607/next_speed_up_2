'use client';

import ProductCardOne from '@/components/card/product-card/product-card-one';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { getPathName, getSecondPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import './category-four.css';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';

const CategoryOne = ({ catId, store_id, design }: any) => {
    const module_id = 105;

    const pathName = usePathname();
    const currentPath = getPathName(pathName);
    const currentSecondPath = numberParser(getSecondPathName(pathName));

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const filtersData = useSelector((state: RootState) => state.filters);
    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

    const [paginate, setPaginate] = useState<any>({});
    // setting the initial page number
    const [page, setPage] = useState(1);

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
        setPage((prevPage) => prevPage + 1);
    };

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = numberParser(paginationModule?.status) === 1;

    useEffect(() => {
        categoryPageProductsRefetch();
    }, [page, activeColor, priceValue, catId, categoryPageProductsRefetch]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue]);

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

    const currentCatName = category?.find(
        (item: any) => item?.id == currentSecondPath
    );

    return (
        <>
            <div className="sm:container px-5 sm:py-10 py-5 ">
                <div className="">
                    <div className="text-sm breadcrumbs md:mt-6 my-4 ">
                        <ul>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>Categorys</li>
                            <li>
                                {currentPath == 'category'
                                    ? currentCatName?.name
                                    : currentPath}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sm:container px-5">
                <div className="grid grid-cols-12 gap-4">
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="flex flex-col gap-4">
                            <div className="border border-gray-100 p-4 bg-white rounded shadow">
                                <Title
                                    text={'Category'}
                                    color={'black'}
                                    design={design}
                                />
                                <TitleBorder />
                                <nav className="list-none mb-6 space-y-3 px-4">
                                    {category?.map((item: any) => (
                                        <SingleCat
                                            key={item?.id}
                                            item={item}
                                            design={design}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="border border-gray-100 bg-white rounded shadow my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="border border-gray-100 bg-white rounded shadow p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        {/* show loading */}
                        <div className="col-span-12 lg:col-span-9">
                            {isPagination &&
                            ((categoryPageProductsLoading &&
                                !categoryPageProductsError) ||
                                categoryPageProductsFetching)
                                ? Array.from({ length: 8 })?.map((_, index) => (
                                      <Skeleton key={index} />
                                  ))
                                : null}
                        </div>

                        <div className="col-span-12 lg:col-span-9 w-full">
                            <div className="flex items-center justify-start mb-3">
                                <div className="bg-gray-300  py-1 px-3 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        Showing{' '}
                                        <span className="font-medium">
                                            {paginate?.from}
                                        </span>{' '}
                                        to{' '}
                                        <span className="font-medium">
                                            {paginate?.to}
                                        </span>{' '}
                                        of{' '}
                                        <span className="font-medium">
                                            {paginate?.total}
                                        </span>{' '}
                                        results
                                    </p>
                                </div>
                            </div>
                            {/* main products in here  */}
                            {!isPagination ? (
                                <div>
                                    <InfiniteScroll
                                        style={{
                                            height: 'auto',
                                            overflow: 'hidden',
                                        }}
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
                                        <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                                            {infiniteProducts?.map(
                                                (i: any, index: number) => (
                                                    <ProductCardOne
                                                        key={`${i?.id}-${index}`}
                                                        item={i}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </InfiniteScroll>
                                </div>
                            ) : (
                                <div>
                                    {products?.length ? (
                                        <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                                            {products?.map((i: any) => (
                                                <ProductCardOne
                                                    key={i.id}
                                                    item={i}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex justify-center h-[400px] items-center">
                                            <h3 className=" font-sans font-semibold text-3xl text-gray-400 ">
                                                Product Not Found!
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            )}

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
        </>
    );
};

export default CategoryOne;

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

    const activeColor = `text-[${design?.header_color}] flex-1 hover:ml-4 duration-300 text-lg font-medium`;
    const inactiveColor =
        'flex-1 hover:ml-4 duration-300 text-lg font-medium text-gray-900';
    const activeSub = `text-[${design?.header_color}] py-2 hover:ml-4 duration-300 px-4 text-sm`;
    const inactivesub =
        'py-2 hover:ml-4 duration-300 px-4 text-sm text-gray-600';

    return (
        <div className="">
            <div className="w-full border mb-2">
                <div className="flex items-center px-4 py-3">
                    <Link
                        style={
                            id == item?.id
                                ? { color: `${design.header_color}` }
                                : {}
                        }
                        onClick={() => setShow(!show)}
                        href={'/category/' + item.id}
                        // change here
                        className={id == item.id ? activeColor : inactiveColor}
                    >
                        {' '}
                        <p>{item.name}</p>
                    </Link>
                    {item?.subcategories ? (
                        <div
                            className="px-4 h-full"
                            onClick={() => setShow(!show)}
                        >
                            {show ? (
                                <MinusIcon className="h-4 w-4 lg:cursor-pointer text-gray-800" />
                            ) : (
                                <PlusIcon className="h-4 w-4 lg:cursor-pointer text-gray-800" />
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
                                                    id == sub?.id
                                                        ? {
                                                              color: `${design?.header_color}`,
                                                          }
                                                        : {}
                                                }
                                                className={
                                                    id == sub.id
                                                        ? activeSub
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

const Title = ({ text, children, color, design }: any) => {
    return (
        <h3
            style={{ fontSize: '22px' }}
            className="font-semibold flex gap-1 text-black"
        >
            <span style={{ color: color ? color : design?.text_color }}>
                {text}
            </span>
            {children}
        </h3>
    );
};

const TitleBorder = () => {
    return (
        <>
            <div className="relative">
                <div className="divider relative"></div>
                <div className="w-2/12 bg-orange-500 h-1 text-left flex justify-start absolute left-0 top-1"></div>
            </div>
        </>
    );
};

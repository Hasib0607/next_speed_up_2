'use client';

import Card67 from '@/components/card/card67';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';

const CategoryThirtyNine = ({ catId, store_id, design }: any) => {
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
        <div>
            <div className="sm:container px-5">
                <div className="pt-10">
                    <div className="mb-5 text-xl lg:text-3xl">
                        {/* <h1>{shops?.name || cat?.name}</h1> */}
                    </div>
                    <div className="flex justify-between gap-3">
                        <div className="hidden lg:flex gap-x-10 flex-wrap gap-y-2">
                            {category?.map((item: any) => (
                                <SingleCat
                                    item={item}
                                    key={item?.id}
                                    design={design}
                                />
                            ))}
                        </div>
                        <div className="w-max">
                            <Filter
                                onChange={(e: any) => {
                                    dispatch(setSort(e.target.value));
                                    setPage(1);
                                }}
                            />
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

export default CategoryThirtyNine;

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
                                <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
                                    {infiniteProducts?.map((product: any) => (
                                        <Card67
                                            key={product.id}
                                            item={product}
                                        />
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
                            {products?.map((product: any) => (
                                <Card67 key={product.id} item={product} />
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
        <div className="flex justify-between items-center">
            {/* Short by  */}
            <div className="">
                <select
                    onChange={onChange}
                    className="h-9 min-w-[200px] w-full duration-500 lg:cursor-pointer border-0 focus:border focus:border-black focus:outline-0 ring-0 focus:ring-0 text-sm flex-1 bg-white"
                >
                    <option>Featured</option>
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

    const activeColor = `text-[${design?.header_color}] w-max text-sm`;
    const inactiveColor = 'text-gray-500 w-max text-sm';
    const activesub = `text-[${design?.header_color}] text-xs`;
    const inactivesub = `text-gray-600 text-xs`;

    const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
        border-bottom: 2px solid black;
       }
    `;

    return (
        <div onMouseLeave={() => setShow(false)} className="relative">
            <style>{styleCss}</style>
            <div
                onMouseEnter={() => setShow(true)}
                className="w-full flex items-center gap-x-2 relative category-page"
            >
                <Link
                    style={
                        id == item?.id
                            ? { color: `${design.header_color}` }
                            : {}
                    }
                    href={'/category/' + item.id}
                    className={id == item?.id ? activeColor : inactiveColor}
                >
                    <p>{item.name}</p>
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
                            <div className="category-page" key={key}>
                                <Link
                                    href={'/category/' + sub?.id}
                                    className={
                                        id == sub?.id ? activesub : inactivesub
                                    }
                                >
                                    <li
                                        style={
                                            id == sub?.id
                                                ? {
                                                      color: `${design.header_color}`,
                                                  }
                                                : {}
                                        }
                                        className="w-max"
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

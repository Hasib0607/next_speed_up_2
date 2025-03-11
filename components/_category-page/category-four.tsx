'use client';

import ProductCardTwo from '@/components/card/product-card/product-card-two';
import { getPathName, getSecondPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { catImg } from '@/site-settings/siteUrl';
import { NotFoundMsg } from '@/utils/little-components';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import Pagination from '../paginations/pagination';
import './category-four.css';
import BreadcrumbHeadingWrapper from './components/breadcrumb-heading-wrapper';

const CategoryFour = ({ catId, store_id }: any) => {
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
    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);
    const [infiniteProducts, setInfiniteProducts] = useState<any[]>([]);

    // setting the initial page number
    const [page, setPage] = useState(1);

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
    const isPagination = parseInt(paginationModule?.status) === 1;

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
            {products.length === 0 ? (
                <div className="bg-gray-100">
                    <div className="mx-auto">
                        <img
                            src={catImg}
                            className="w-full min-h-[150px]"
                            alt=""
                        />
                    </div>
                    <div className="sm:container px-5 sm:py-10 py-5">
                        <div className="text-sm breadcrumbs">
                            <ul>
                                <li>Categories</li>
                                <li className="font-bold tracking-wider ">
                                    {currentPath == 'category'
                                        ? currentCatName?.name
                                        : currentPath}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="divider text-black">
                        {currentCatName?.name}
                    </div>

                    <div
                        className="flex sm:container px-5 sm:py-10 py-5 justify-center mt-20"
                        style={{ minHeight: '50vh' }}
                    >
                        <h2 className="font-bold text-4xl text-center text-gray-400">
                            No Product Available
                        </h2>
                    </div>
                </div>
            ) : (
                <div className="">
                    {/* <div className="mx-auto">
            <img
              src={catImg + shops?.banner}
              className="w-full min-h-[150px]"
              alt=""
            />
          </div> */}
                    <BreadcrumbHeadingWrapper category={category}>
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
                                    <div className="flex flex-wrap gap-4 justify-center my-10">
                                        {infiniteProducts?.map(
                                            (product: any) => (
                                                <ProductCardTwo
                                                    key={product.id}
                                                    item={product}
                                                />
                                            )
                                        )}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-wrap gap-4 justify-center my-10">
                                    {products?.map((product: any) => (
                                        <ProductCardTwo
                                            key={product.id}
                                            item={product}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </BreadcrumbHeadingWrapper>

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
            )}
        </>
    );
};

export default CategoryFour;

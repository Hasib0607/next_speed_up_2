'use client';

import BreadcrumbHeadingWrapper from '@/components/_category-page/components/breadcrumb-heading-wrapper';
import ProductCardTwo from '@/components/card/product-card/product-card-two';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Pagination from '@/components/paginations/pagination';
import { getPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

const Four = ({ store_id }: any) => {
    const module_id = 105;
    const pathName = usePathname();
    const currentPath = getPathName(pathName);

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    // setting the initial page number
    const [page, setPage] = useState(1);

    const filtersData = useSelector((state: RootState) => state.filters);
    const { color: activeColor, price: priceValue } = filtersData || {};

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);
    const [infiniteProducts, setInfiniteProducts] = useState<any[]>([]);

    const {
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch: shopPageProductsRefetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const nextPageFetch = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    useEffect(() => {
        shopPageProductsRefetch();
        if (paginate?.total > 0) {
            const more = numberParser(paginate?.total / 8, true) > page;
            setHasMore(more);
        }
    }, [page, activeColor, shopPageProductsRefetch, priceValue, paginate]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue]);

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data?.products || [];
            const paginationData = shopPageProductsData?.data?.pagination || {};

            setPaginate(paginationData);
            setProducts(productsData);
        }
    }, [
        shopPageProductsData,
        shopPageProductsSuccess,
        shopPageProductsFetching,
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

    const shop = {
        name: currentPath || 'Shop',
    };

    return (
        <div>
            <BreadcrumbHeadingWrapper category={shop}>
                {!isPagination ? (
                    <div>
                        <InfiniteScroll
                            style={{ height: 'auto', overflow: 'hidden' }}
                            dataLength={infiniteProducts?.length}
                            next={nextPageFetch}
                            hasMore={hasMore}
                            loader={<InfiniteLoader />}
                            endMessage={
                                <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                                    No More Products
                                </p>
                            }
                        >
                            <div className="flex flex-wrap gap-4 justify-center my-10">
                                {infiniteProducts?.map(
                                    (product: any, index: number) => (
                                        <ProductCardTwo
                                            key={`${product?.id}-${index}`}
                                            item={product}
                                        />
                                    )
                                )}
                            </div>
                        </InfiniteScroll>
                    </div>
                ) : (
                    <div>
                        {products?.length ? (
                            <div className="flex flex-wrap gap-4 justify-center my-10">
                                {products?.map((product: any) => (
                                    <ProductCardTwo
                                        key={product.id}
                                        item={product}
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
    );
};

export default Four;

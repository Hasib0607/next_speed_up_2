'use client';

import ProductCardTwo from '@/components/card/product-card/product-card-two';
import BreadcrumbHeadingWrapper from '@/components/_category-page/components/breadcrumb-heading-wrapper';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';

import { useEffect, useState } from 'react';

import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';

import { getPathName } from '@/helpers/littleSpicy';

import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

import Pagination from '@/components/_category-page/components/pagination';
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

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);

    const {
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const nextPageFetch = () => {
        setPage((prev) => prev + 1);
        refetch();
    };

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data || [];
            setPaginate(productsData?.pagination);
            if (isPagination) {
                setProducts(productsData?.products || []);
            } else {
                setProducts((prev) =>
                    Array.isArray(prev)
                        ? [...prev, ...(productsData?.products || [])]
                        : productsData?.products || []
                );
                setPage(1);
            }
        } else if (shopPageProductsData?.data?.pagination?.current_page === 1) {
            setHasMore(false);
        }
    }, [shopPageProductsData, isPagination, shopPageProductsSuccess]);

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
                                        // wrapperClassName=""
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
                            <div className="flex flex-wrap gap-4 justify-center my-10">
                                {products?.map((product: any) => (
                                    <ProductCardTwo
                                        key={product.id}
                                        item={product}
                                    />
                                ))}
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

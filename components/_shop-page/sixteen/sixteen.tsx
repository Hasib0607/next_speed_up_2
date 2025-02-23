'use client';
import Card26 from '@/components/card/card26';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import FilterCat from './filter-cat';

const Sixteen = ({ design, store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    const styleCss = `
  .btn-hover:hover {
      color:   ${design?.text_color};
      background:${design?.header_color};
      border: 1px solid transparent;
  }
  .filter {
    color: ${design?.text_color};
    background:${design?.header_color};
  }
  .text-hover:hover {
    color: ${design?.header_color};
    
  }
  .border-filter {
    border: 1px solid ${design?.header_color};
}

`;

    return (
        <div>
            <style>{styleCss}</style>
            {/* main section  */}

            <div className="sm:container px-5 sm:py-10 py-5 flex flex-col gap-4 md:gap-0 md:flex-row justify-between md:items-center pb-3">
                {/* <div className="text-gray-500 font-thin order-3 md:order-2">
          There are {paginate ? paginate?.total : 0} products{" "}
        </div> */}
                <div className="md:order-last ">
                    <Filter
                        onChange={(e: any) => {
                            dispatch(setSort(e.target.value));
                            setPage(1);
                        }}
                        setGrid={setGrid}
                        setOpen={setOpen}
                        open={open}
                    />
                </div>
            </div>

            {/* filter category  */}
            <div className="">
                <div
                    className={`z-[4] bg-white hidden lg:block border-r-2 fixed left-0 sm:w-96 w-40 sm:px-10 pl-2 bottom-0 top-[70px] duration-1000 ${
                        open ? 'left-0' : 'sm:-left-96 -left-40'
                    }`}
                >
                    <FilterCat />
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className={`${
                        open ? 'sm:left-96 left-40' : 'left-0'
                    } hidden lg:flex text-white  flex-col items-center duration-1000 lg:fixed top-[170px] bg-color px-4 py-4 z-[2] rounded-tr-lg rounded-br-lg`}
                >
                    <IoFilter className="text-xl" />
                    Filter
                </button>

                <div className="sm:container px-5 sm:py-10 py-5">
                    <ShopProductSection
                        grid={grid}
                        open={open}
                        hasMore={hasMore}
                        paginate={paginate}
                        setHasMore={setHasMore}
                        page={page}
                        setPage={setPage}
                        isPagination={isPagination}
                        setPaginate={setPaginate}
                    />
                </div>

                {/* pagination  */}
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
    );
};

export default Sixteen;

const ShopProductSection = ({
    grid,
    open,
    page,
    setPage,
    hasMore,
    paginate,
    setHasMore,
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
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch: shopPageProductsRefetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const nextPageFetch = () => {
        setPage((prevPage: number) => prevPage + 1);
    };

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    useEffect(() => {
        shopPageProductsRefetch();
        if (paginate?.total > 0) {
            const more = numberParser(paginate?.total / 8, true) > page;
            setHasMore(more);
        }
    }, [
        page,
        activeColor,
        shopPageProductsRefetch,
        priceValue,
        paginate,
        setHasMore,
    ]);

    useEffect(() => {
        if (activeColor !== null || priceValue !== null) {
            setPage(1);
        }
    }, [activeColor, priceValue, setPage]);

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
        page,
        setPaginate,
        shopPageProductsFetching,
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
                ((shopPageProductsLoading && !shopPageProductsError) ||
                    shopPageProductsFetching)
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
                        hasMore={hasMore}
                        loader={<InfiniteLoader />}
                        endMessage={
                            <p className="text-center mt-10 pb-10 text-xl font-bold mb-3">
                                No More Products
                            </p>
                        }
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
                            {infiniteProducts?.map((item: any) => (
                                <div key={item?.id}>
                                    <Card26 item={item} />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
                    {products?.map((item: any) => (
                        <div key={item?.id}>
                            <Card26 item={item} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

const Filter = ({ onChange }: any) => {
    return (
        <div>
            {/* Short by  */}
            <div className="">
                <select
                    onChange={onChange}
                    className="lg:cursor-pointer px-8 text-base border-filter flex items-center focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
                    id="category"
                    name="category"
                >
                    <option className="lg:cursor-pointer">Featured</option>
                    <option className="lg:cursor-pointer" value="az">
                        Name, A to Z
                    </option>
                    <option className="lg:cursor-pointer" value="za">
                        Name, Z to A
                    </option>
                    <option className="lg:cursor-pointer" value="lh">
                        Price, Low to High
                    </option>
                    <option className="lg:cursor-pointer" value="hl">
                        Price, High to Low
                    </option>
                </select>
            </div>
        </div>
    );
};

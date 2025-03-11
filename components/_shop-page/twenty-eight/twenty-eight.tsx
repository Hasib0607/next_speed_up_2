'use client';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import Card58 from '@/components/card/card58';
import Card6 from '@/components/card/card6';
import InfiniteLoader from '@/components/loaders/infinite-loader';
import Pagination from '@/components/paginations/pagination';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { Bars3Icon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoGridSharp } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import ShopBreadcrumb from '../_components/shop-breadcrumb';

const TwentyEight = ({ design, store_id }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const [grid, setGrid] = useState<any>('H');
    const [paginate, setPaginate] = useState<any>({});
    const [page, setPage] = useState<any>(1);

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    const bgColor = design?.header_color;

    const styleCss = `
    .grid-active {
      color:  ${bgColor};
      border: 1px solid ${bgColor};
    }
    .sec-twenty-nine{
        border-bottom: 2px solid ${bgColor};
    }
 `;

    return (
        <div>
            <ShopBreadcrumb title={'প্রোডাক্ট'} />
            <div className="sm:container px-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="hidden lg:block col-span-3  h-max">
                        <div className="w-full relative border p-4">
                            <h3 className="font-medium text-[#252525] text-xl  mb-4 sec-twenty-nine pb-[10px] w-max">
                                প্রোডাক্ট ক্যাটেগরীজ
                            </h3>
                            <div className="absolute h-[1px] bg-gray-300 top-[55px] left-0 right-0 mx-4"></div>
                            {category?.map((item: any) => (
                                <SingleCat key={item?.id} item={item} />
                            ))}
                        </div>
                        <div className="bg-white border border-gray-200 my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="bg-white border border-gray-200 p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                    <div className="col-span-1 lg:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            grid={grid}
                            setGrid={setGrid}
                            paginate={paginate}
                        />
                        <div className="flex-1 my-5">
                            <ShopProductSection
                                grid={grid}
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

export default TwentyEight;

const ShopProductSection = ({
    grid,
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

    useEffect(() => {
        shopPageProductsRefetch();
    }, [page, activeColor, priceValue, shopPageProductsRefetch]);

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
            {!isPagination ? (
                <InfiniteScroll
                    style={{ height: 'auto', overflow: 'hidden' }}
                    dataLength={infiniteProducts?.length}
                    next={nextPageFetch}
                    hasMore={paginate?.has_more_pages}
                    loader={
                        paginate?.has_more_pages ||
                        shopPageProductsFetching ||
                        (shopPageProductsLoading && <InfiniteLoader />)
                    }
                    endMessage={
                        paginate?.has_more_pages ||
                        shopPageProductsFetching ||
                        shopPageProductsLoading ? (
                            <InfiniteLoader />
                        ) : (
                            <NotFoundMsg message={'No More Products'} />
                        )
                    }
                >
                    {grid === 'H' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-0">
                            {infiniteProducts?.map((item: any) => (
                                <motion.div
                                    key={item?.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card58 item={item} type={'shop_page'} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                                {infiniteProducts?.map((item: any) => (
                                    <motion.div
                                        key={item?.id}
                                        initial={{ translateX: 200 }}
                                        animate={{ translateX: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                            type: 'tween',
                                        }}
                                    >
                                        <Card6 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </InfiniteScroll>
            ) : (
                <>
                    {grid === 'H' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 gap-4 px-2 sm:px-0">
                            {products?.map((item: any) => (
                                <motion.div
                                    key={item?.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card58 item={item} type={'shop_page'} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <AnimatePresence>
                        {grid === 'V' && (
                            <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                                {products?.map((item: any) => (
                                    <motion.div
                                        key={item?.id}
                                        initial={{ translateX: 200 }}
                                        animate={{ translateX: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'linear',
                                            type: 'tween',
                                        }}
                                    >
                                        <Card6 item={item} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </>
    );
};

const Filter = ({ paginate, onChange, setGrid, grid }: any) => {
    return (
        <div className="border-t border-b border-[#f1f1f1] py-3 flex flex-wrap justify-between items-center px-2">
            <div className="text-gray-500 font-medium">
                Showing {paginate?.from}-{paginate?.to} of {paginate?.total}{' '}
                results
            </div>
            <div className="flex items-center gap-1 mb-3 md:mb-0">
                <div
                    onClick={() => setGrid('H')}
                    className={` rounded-full p-2 lg:cursor-pointer ${
                        grid === 'H' ? 'grid-active' : 'border'
                    }`}
                >
                    <IoGridSharp className="h-4 w-4 " />
                </div>
                <div
                    onClick={() => setGrid('V')}
                    className={`rounded-full p-2 lg:cursor-pointer ${
                        grid === 'V' ? 'grid-active' : 'border'
                    }`}
                >
                    <Bars3Icon className="h-4 w-4" />
                </div>
            </div>
            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm max-w-md w-full font-medium">
                <label className="max-w-fit"> Sort by:</label>
                <select
                    onChange={onChange}
                    className="h-9 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium text-sm flex-1 bg-white"
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

const SingleCat = ({ item }: any) => {
    const [show, setShow] = useState(false);

    const { id: select }: any = useParams<{ id: string }>();

    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == select && setShow(true);
            }
        }
    }, [item?.cat, select]);

    return (
        <div className="">
            <div className="w-full border mb-2">
                <div className="flex items-center px-4 py-3">
                    <Link
                        href={'/category/' + item?.id}
                        className={`flex-1 text-lg font-medium ${
                            select === item.id
                                ? 'text-red-500'
                                : 'text-gray-900'
                        }`}
                    >
                        <p>{item.name}</p>
                    </Link>
                    {item?.cat ? (
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
                            {item?.cat?.map((sub: any, idx: any) => (
                                <div className="border-t" key={idx}>
                                    <Link href={'/category/' + sub?.id}>
                                        <p
                                            className={`py-2 px-4 text-sm ${
                                                select === sub.id
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {sub?.name}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

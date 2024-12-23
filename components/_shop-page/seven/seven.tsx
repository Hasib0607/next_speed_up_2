'use client';

import FilterByColorNew from '@/components/_category-page/components/filter-by-color-new';
import FilterByPriceNew from '@/components/_category-page/components/filter-by-price-new';
import PaginationComponent from '@/components/_category-page/components/pagination-new';
import Card12 from '@/components/card/card12';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';

import {
    ArrowLeftIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

import Skeleton from '@/components/loaders/skeleton';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiOutlineAdjustments } from 'react-icons/hi';

import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Seven = ({ store_id }: any) => {
    const { data: modulesData } = useGetModulesQuery({ store_id });
    const modules = modulesData?.data || [];

    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState('az');
    const [hasMore, setHasMore] = useState<any>(true);
    // setting the activecolor
    const [activeColor, setActiveColor] = useState('');
    // setting the pricevalue
    const [priceValue, setPriceValue] = useState('');
    // setting the initial page number
    const [page, setPage] = useState(1);

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);
    const [colors, setColors] = useState<any[]>([]);

    const encodedColor = encodeURIComponent(activeColor);

    const {
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isSuccess: shopPageProductsSuccess,
        refetch,
    } = useGetShopPageProductsQuery({ page, encodedColor, priceValue, sort });

    const nextPageFetch = () => {
        setPage((prev) => prev + 1);
        refetch();
    };

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === 105
    );
    const isPagination = parseInt(paginationModule?.status) === 1;

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data || [];
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

    useEffect(() => {
        if (shopPageProductsSuccess) {
            const productsData = shopPageProductsData?.data || [];
            if (productsData?.colors) {
                setColors(productsData?.colors);
            }
        }
    }, [shopPageProductsData, shopPageProductsSuccess]);

    return (
        <div className="grid grid-cols-5 lg:gap-8 sm:container px-5 bg-white mb-10">
            <div className="lg:col-span-1 lg:block hidden">
                <div className="flex gap-3 py-10">
                    <Link href="/">
                        <span className="text-base text-gray-500">Home</span>
                    </Link>
                    <span className="text-base font-medium text-gray-500">
                        /
                    </span>
                    <span className="text-base text-gray-600 font-bold">
                        Shop
                    </span>
                </div>

                <div className="mt-10 ">
                    <h1 className="mb-10 text-2xl text-gray-700 font-medium">
                        Category{' '}
                    </h1>

                    {category?.map((item: any) => (
                        <div key={item.id}>
                            <SingleCat item={item} />
                        </div>
                    ))}
                </div>
                {/* Filter By Color New */}
                <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
                    <FilterByColorNew
                        colors={colors}
                        setActiveColor={setActiveColor}
                        activeColor={activeColor}
                        setPage={setPage}
                        setHasMore={setHasMore}
                    />
                </div>

                {/* Filter By Price New */}
                <div className="bg-gray-100 border-2 border-gray-200 p-4">
                    <FilterByPriceNew
                        priceValue={priceValue}
                        setPriceValue={setPriceValue}
                        setPage={setPage}
                        setHasMore={setHasMore}
                    />
                </div>
            </div>

            <div className="col-span-5 lg:col-span-4 w-full">
                <div className="flex justify-between py-10">
                    <div>
                        <h1 className="text-3xl lg:block hidden font-semibold">
                            Shop
                        </h1>
                        <div
                            onClick={() => setOpen(!open)}
                            className="lg:cursor-pointer border-2 border-gray-100 rounded-lg justify-between px-3 w-32 py-2 lg:hidden items-center flex gap-3"
                        >
                            <HiOutlineAdjustments className="rotate-90 text-xl" />
                            <button className="text-xl">Filter</button>
                        </div>
                    </div>
                    {/* Filter By Price and name */}
                    <div>
                        <Filter
                            onChange={(e: any) => {
                                setSort(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                </div>
                {/* show loading */}
                {shopPageProductsLoading &&
                    Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                {/* show products */}
                {!isPagination ? (
                    <>
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
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
                                {products?.length &&
                                    products?.map(
                                        (product: any, index: any) => (
                                            <Card12
                                                item={product}
                                                key={index}
                                            />
                                        )
                                    )}
                            </div>
                        </InfiniteScroll>
                    </>
                ) : (
                    <>
                        {products?.length > 0 ? (
                            <div className="grid lg:grid-cols-3 lg:gap-5 md:grid-cols-3 md:gap-3 xl:grid-cols-4 grid-cols-2 gap-2">
                                {products?.map((product: any, index: any) => (
                                    <Card12 item={product} key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center h-[400px] items-center">
                                <h3 className=" font-sans font-semibold text-3xl text-gray-400 ">
                                    Product Not Found!
                                </h3>
                            </div>
                        )}
                    </>
                )}

                {isPagination && products?.length > 0 ? (
                    <div className="md:mt-12 flex justify-center">
                        <PaginationComponent
                            lastPage={shopPageProductsData?.data?.last_page}
                            setPage={setPage}
                            currentPage={
                                shopPageProductsData?.data?.current_page
                            }
                            initialPage={page}
                        />
                    </div>
                ) : null}
            </div>

            {/* tablet and mobile view  */}

            <div className="block py-6 lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed md:w-128 w-96 top-0  overflow-y-auto bottom-0 -ml-32 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-120%]'
                    }`}
                >
                    <div className="flex py-4  items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ml-20">
                        <ArrowLeftIcon
                            onClick={() => setOpen(!open)}
                            className="h-5 basis-2/4"
                        />
                        <h3 className=" basis-2/4 text-2xl font-medium text-gray-700">
                            Filters
                        </h3>
                    </div>
                    <hr className="mr-10 ml-44" />
                    <div className="mt-10 ml-36">
                        <h1 className="mb-10 text-2xl text-gray-700 font-medium">
                            Category
                        </h1>
                        {category?.map((item: any) => (
                            <div key={item.id} className="">
                                <SingleCat item={item} />
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Seven;

const Filter = ({ onChange }: any) => {
    return (
        <div>
            <div className="flex py-0 px-0 rounded-xl lg:px-3 justify-between items-center gap-2">
                <div className="md:block hidden lg:mr-28 xl:mr-0">Sort By:</div>
                <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
                    {/* Short by  */}
                    <div className="relative">
                        <select
                            onChange={onChange}
                            className="selectdd w-48 font-medium lg:cursor-pointer h-12 text-md  rounded-md  focus:ring-transparent outline-none focus:outline-none bg-transparent border border-gray-500 appearance-none pl-3"
                            id="category"
                            name="category"
                        >
                            <option className="lg:cursor-pointer">
                                Sorting Options
                            </option>
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
                        {/* Custom caret on the left */}
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SingleCat = ({ item }: any) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    onClick={() => setShow(!show)}
                    href={'/category/' + item.id}
                    className="flex-1 text-sm text-gray-900 font-medium"
                >
                    <p>{item.name}</p>
                </Link>
                {item?.cat ? (
                    <div onClick={() => setShow(!show)} className="px-4 h-full">
                        {show ? (
                            <MinusIcon className="h-4 w-4 text-gray-800" />
                        ) : (
                            <PlusIcon className="h-4 w-4 text-gray-800" />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.cat?.map((sub: any) => (
                            <div className="py-2" key={sub.id}>
                                <Link href={'/category/' + sub?.id}>
                                    <p className="pb-2 text-sm text-red-500">
                                        {sub?.name + 1}
                                    </p>
                                </Link>
                                <div className="pr-4">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

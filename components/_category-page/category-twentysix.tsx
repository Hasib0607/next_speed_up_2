'use client';
import Card56 from '@/components/card/card56';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ThreeDots } from 'react-loader-spinner';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
    useGetCategoryPageProductsQuery,
    useGetColorsQuery,
} from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { numberParser } from '@/helpers/numberParser';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';
import { setSort } from '@/redux/features/filters/filterSlice';

const CategoryTwentySix = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
    // setting the initial page number
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});

    const {
        data: colorsData,
        isLoading: colorsLoading,
        isSuccess: colorsSuccess,
    } = useGetColorsQuery({ store_id });

    const colors = colorsData?.data || [];

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    const filtersData = useSelector((state: RootState) => state.filters);
    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor, price: priceValue } = filtersData || {};

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
    .sec-twenty-nine{
    border-bottom: 2px solid ${design?.header_color};
  }
    .shop-cat{
    border: 2px solid ${design?.header_color};
  }
  .shop-cat-dot{
    background: ${design?.header_color};
  }
 `;

    return (
        <div>
            <Location />

            <div className="sm:container px-5">
                <style>{styleCss}</style>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className=" hidden lg:block col-span-3">
                        <div className="w-full h-max relative">
                            <h3 className="font-bold text-[#252525] text-2xl  mb-4 pb-[10px] w-max">
                                Product Categories
                            </h3>
                            <div className="shop-cat rounded-md">
                                {category?.map((item: any) => (
                                    <SingleCat
                                        key={item?.id}
                                        item={item}
                                        design={design}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="bg-white my-6 p-4 shop-cat rounded-md">
                            <FilterByColorNew
                                colors={colors}
                                activeColor={activeColor}
                                setPage={setPage}
                                setHasMore={setHasMore}
                            />
                        </div>
                        <div className="bg-white p-4 shop-cat rounded-md mb-5">
                            <FilterByPriceNew
                                priceValue={priceValue}
                                setPage={setPage}
                                setHasMore={setHasMore}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-9 flex flex-col min-h-[100vh-200px] h-full ">
                        <Filter
                            onChange={(e: any) => {
                                dispatch(setSort(e.target.value));
                                setPage(1);
                            }}
                            setGrid={setGrid}
                            setOpen={setOpen}
                            open={open}
                        />
                        <div className="flex-1">
                            <ProductSection
                                catId={catId}
                                open={open}
                                grid={grid}
                                hasMore={hasMore}
                                setHasMore={setHasMore}
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

export default CategoryTwentySix;

const ProductSection = ({
    grid,
    open,
    catId,
    page,
    setPage,
    hasMore,
    setHasMore,
    isPagination,
    setPaginate,
}: any) => {
    const filtersData = useSelector((state: RootState) => state.filters);

    // setting the products to be shown on the ui initially zero residing on an array
    const [products, setProducts] = useState<any[]>([]);

    const {
        data: categoryPageProductsData,
        isLoading: categoryPageProductsLoading,
        isFetching: categoryPageProductsFetching,
        isError: categoryPageProductsError,
        isSuccess: categoryPageProductsSuccess,
        refetch: categoryPageProductsRefetch,
    } = useGetCategoryPageProductsQuery({ catId, page, filtersData });

    const nextPageFetch = () => {
        setPage((prev: any) => prev + 1);
        categoryPageProductsRefetch();
    };

    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];

    useEffect(() => {
        if (categoryPageProductsSuccess) {
            const categoryData = categoryPageProductsData?.data || [];
            setPaginate(categoryData?.pagination);
            if (isPagination) {
                setProducts(categoryData?.products || []);
            } else {
                setProducts((prev) =>
                    Array.isArray(prev)
                        ? [...prev, ...(categoryData?.products || [])]
                        : categoryData?.products || []
                );
                setPage(1);
            }
        } else if (
            categoryPageProductsData?.data?.pagination?.current_page === 1
        ) {
            setHasMore(false);
        }
    }, [
        categoryPageProductsData,
        isPagination,
        setHasMore,
        setPage,
        setPaginate,
        categoryPageProductsSuccess,
    ]);

    if (
        (categoryPageProductsLoading && !categoryPageProductsError) ||
        categoryPageProductsFetching
    ) {
        return (
            <div className="text-center text-4xl font-bold text-gray-400 h-screen flex justify-center items-center">
                <Skeleton />
            </div>
        );
    }

    return (
        <>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
                            {products?.map((item: any, key: number) => (
                                <motion.div
                                    key={key}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: 'linear',
                                    }}
                                >
                                    <Card56 item={item} />
                                </motion.div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-3 xl:grid-cols-3 xl3:grid-cols-4 gap-4 px-2 sm:px-0">
                    {products?.map((item: any, key: number) => (
                        <motion.div
                            key={key}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5, ease: 'linear' }}
                        >
                            <Card56 item={item} />
                        </motion.div>
                    ))}
                </div>
            )}
        </>
    );
};

const Location = () => {
    const [activecat, setActivecat] = useState(false);
    const { id: data }: any = useParams<{ id: string }>();
    const categoryStore = useSelector((state: any) => state?.category);
    const category = categoryStore?.categories || [];
    useEffect(() => {
        for (let i = 0; i < category.length; i++) {
            if (category[i]?.subcategories) {
                for (let j = 0; j < category[i].subcategories.length; j++) {
                    if (category[i]?.subcategories[j]?.id == data) {
                        setActivecat(category[i]?.subcategories[j]?.name);
                    }
                }
            }
            if (category[i]?.id == data) {
                setActivecat(category[i].name);
            }
        }
    }, [category]);
    return (
        <div className="w-full bg-[#f1f1f1] flex flex-col justify-center items-center py-5 mb-5">
            <h1 className="text-3xl font-medium ">Product</h1>
            <div className="flex items-center gap-1">
                <p>Home</p>
                <p>/ {activecat}</p>
            </div>
        </div>
    );
};

const Filter = ({ paginate, onChange }: any) => {
    return (
        <div className="border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap sm:justify-between justify-end items-center px-2">
            <div className="text-gray-500 font-medium sm:block hidden">
                Showing {paginate?.from}-{paginate?.to} of {paginate?.total}{' '}
                results
            </div>

            {/* Short by  */}
            <div className="flex items-center gap-2 text-sm max-w-[200px] w-full font-medium">
                <select
                    onChange={onChange}
                    className="h-12 border border-gray-200 rounded  outline-0 ring-0 focus:ring-0 font-medium flex-1 bg-white"
                >
                    <option>Default sorting</option>
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
    const activeColor = `text-[${design?.header_color}] `;
    const inactiveColor = 'text-gray-500 ';
    const activesub = `text-[${design?.header_color}] pl-8`;
    const inactivesub = `text-gray-600 pl-8`;
    return (
        <div className="border-b py-2">
            <div className="w-full">
                <div className="flex items-center gap-2 pl-4 py-1">
                    <p className="w-1.5 h-1.5 rounded-full shop-cat-dot"></p>
                    <Link
                        onClick={() => setShow(!show)}
                        href={'/category/' + item.id}
                    >
                        <p>
                            <span
                                style={
                                    parseInt(id) === parseInt(item?.id)
                                        ? { color: `${design.header_color}` }
                                        : {}
                                }
                                className={
                                    id == item?.id ? activeColor : inactiveColor
                                }
                            >
                                {item.name}
                            </span>
                        </p>
                    </Link>
                    {/* {item?.cat ? <div className="px-4 h-full">
                        {show ? <MinusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' /> :
                            <PlusIcon onClick={() => setShow(!show)} className='h-4 w-4 lg:cursor-pointer text-gray-800' />}
                    </div> : null} */}
                </div>
                <div>
                    <div className={`overflow-hidden`}>
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="" key={key}>
                                <Link
                                    href={'/category/' + sub?.id}
                                >
                                    {' '}
                                    <p
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
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

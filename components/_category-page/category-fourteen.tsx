'use client';

import Card32 from '@/components/card/card32';
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/paginations/pagination';
import { numberParser } from '@/helpers/numberParser';
import { setSort } from '@/redux/features/filters/filterSlice';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { useGetCategoryPageProductsQuery } from '@/redux/features/shop/shopApi';
import { RootState } from '@/redux/store';
import { NotFoundMsg } from '@/utils/little-components';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiFilterAlt } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteLoader from '../loaders/infinite-loader';
import FilterByColorNew from './components/filter-by-color-new';
import FilterByPriceNew from './components/filter-by-price-new';

const CategoryFourteen = ({ catId, store_id, design }: any) => {
    const module_id = 105;
    const dispatch = useDispatch();

    const [grid, setGrid] = useState('H');
    const [open, setOpen] = useState(false);
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
  `;

    return (
        <div>
            <style>{styleCss}</style>
            {/* banner section  */}
            <div className="h-80 bg-gray-100 w-full flex flex-col gap-3 justify-center items-center">
                <div>
                    <h1 className="text-5xl font-medium">Products</h1>
                </div>
                <div className="flex gap-1 items-center">
                    <p>Home</p>
                    <IoIosArrowForward className="text-xs mt-1" />
                    <p className="font-medium">{category?.name}</p>
                </div>
            </div>

            {/* main section  */}

            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-4 gap-8">
                    <div className="lg:col-span-3 col-span-4 ">
                        <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center pb-3">
                            <div
                                onClick={() => setOpen(!open)}
                                className={`px-7 btn-hover md:order-first py-1 flex gap-3 items-center lg:cursor-pointer ${
                                    open === true
                                        ? 'filter border-transparent text-white'
                                        : 'bg-white border-[1px] border-black'
                                }`}
                            >
                                <BiFilterAlt className="text-xl" />
                                <p className="text-lg uppercase ">Filter</p>
                            </div>

                            {/* <div className="text-gray-500 font-thin order-3 md:order-2">
                There are {paginate ? paginate?.total : 0} products{" "}
              </div> */}

                            {/* sorting product  */}
                            <div className="md:order-last">
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
                        {open && (
                            <div className="py-4 px-10 border-[1px] ">
                                <div className="text-lg font-medium py-3 flex flex-col gap-2">
                                    <h1>Categories</h1>
                                    <p className="h-[1px] w-14 bg-black"></p>
                                </div>
                                <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                                    {category?.map((item: any) => (
                                        <SingleCat
                                            key={item?.id}
                                            item={item}
                                            design={design}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 pt-10">
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

                    {/* category side  */}
                    <div className="col-span-1 lg:block hidden">
                        <div className="flex items-center gap-3">
                            <p className="h-[40px] w-[5px] bg-black"></p>
                            <h1 className="text-xl">Categories</h1>
                            <p className="h-[1px] w-full bg-gray-300"></p>
                        </div>
                        <div>
                            {category?.map((item: any, idx: number) => (
                                <SingleCat item={item} key={idx} />
                            ))}
                        </div>
                        <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
                            <FilterByColorNew />
                        </div>
                        <div className="bg-gray-100 border-2 border-gray-200 p-4">
                            <FilterByPriceNew />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFourteen;

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
            {/* show loading */}
            <div className="col-span-12 lg:col-span-9">
                {isPagination &&
                ((categoryPageProductsLoading && !categoryPageProductsError) ||
                    categoryPageProductsFetching)
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
                        hasMore={paginate?.has_more_pages}
                        loader={
                            paginate?.has_more_pages ||
                            categoryPageProductsFetching ||
                            (categoryPageProductsLoading && <InfiniteLoader />)
                        }
                        endMessage={
                            paginate?.has_more_pages ||
                            categoryPageProductsFetching ||
                            categoryPageProductsLoading ? (
                                <InfiniteLoader />
                            ) : (
                                <NotFoundMsg message={'No More Products'} />
                            )
                        }
                    >
                        <div className="">
                            {infiniteProducts?.map((item: any, key: number) => (
                                <div key={key}>
                                    <Card32 item={item} />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            ) : (
                <div>
                    <div className="">
                        {products?.map((item: any, key: any) => (
                            <div key={key}>
                                <Card32 item={item} />
                            </div>
                        ))}
                    </div>
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
                    className="lg:cursor-pointer px-8 text-base border-black flex items-center focus:border-gray-200 focus:ring-transparent outline-none focus:outline-none"
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

const SingleCat = ({ item }: any) => {
    const { id }: any = useParams<{ id: string }>();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (item.cat) {
            for (let i = 0; i < item.cat.length; i++) {
                item.cat[i].id == id && setShow(true);
            }
        }
    }, [item?.cat, id]);
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};
    const activeColor = `text-[${design?.header_color}] flex-1 text-sm font-medium text-hover`;
    const inactiveColor = 'flex-1 text-sm font-medium text-hover text-gray-900';
    const activesub = `text-[${design?.header_color}] pb-2 text-sm text-hover`;
    const inactivesub = 'pb-2 text-sm text-hover text-gray-500';

    const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
       }
    `;
    return (
        <>
            <style>{styleCss}</style>
            <div className="w-full flex px-4 py-3 lg:cursor-pointer category-page">
                <Link
                    style={
                        id == item?.id
                            ? { color: `${design.header_color}` }
                            : {}
                    }
                    href={'/category/' + item?.id}
                    className={id == item?.id ? activeColor : inactiveColor}
                >
                    {' '}
                    <p>{item.name}</p>
                </Link>
                {item?.subcategories ? (
                    <div className="px-4 h-full">
                        {show ? (
                            <MinusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        ) : (
                            <PlusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        )}
                    </div>
                ) : null}
            </div>
            <div className=" px-4">
                <div className="h-[1px] bg-gray-400 w-full"></div>
            </div>
            {show && (
                <>
                    <div className="ml-8">
                        {item?.subcategories?.map((sub: any, key: number) => (
                            <div className="py-2 category-page" key={key}>
                                <Link href={'/category/' + sub?.id}>
                                    <p
                                        style={
                                            id == sub?.id
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

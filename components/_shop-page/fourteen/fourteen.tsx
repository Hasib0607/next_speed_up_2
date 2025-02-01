"use client";
import Card32 from "@/components/card/card32";
import Skeleton from '@/components/loaders/skeleton';
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from "react-redux";
import { useGetModulesQuery } from "@/redux/features/modules/modulesApi";
import { RootState } from "@/redux/store";
import { useGetColorsQuery, useGetShopPageProductsQuery } from "@/redux/features/shop/shopApi";
import { setSort } from "@/redux/features/filters/filterSlice";
import FilterByColorNew from "@/components/_category-page/components/filter-by-color-new";
import FilterByPriceNew from "@/components/_category-page/components/filter-by-price-new";
import { useParams } from "next/navigation";


const Fourteen = ({ design, store_id }: any) => {
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

  const filtersData = useSelector((state: RootState) => state.filters);

  // get the activecolor, pricevalue, selectedSort
  const { color: activeColor, price: priceValue } = filtersData || {};

  const {
      data: colorsData,
      isLoading: colorsLoading,
      isSuccess: colorsSuccess,
  } = useGetColorsQuery({ store_id });

  const colors = colorsData?.data || [];

  const categoryStore = useSelector((state: RootState) => state?.category);

  const category = categoryStore?.categories || [];

  const paginationModule = modules?.find(
      (item: any) => item?.modulus_id === module_id
  );
  const isPagination = parseInt(paginationModule?.status) === 1;

  const bgColor = design?.header_color;
  const textColor = design?.text_color;

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
          <p className="font-medium">Products</p>
        </div>
      </div>

      {/* main section  */}

      <div className="sm:container px-5 sm:py-10 py-5">
        <div className="grid grid-cols-4 gap-8">
          <div className="lg:col-span-3 col-span-4 ">
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center pb-3">
              <div
                onClick={() => setOpen(!open)}
                className={`px-7  md:order-first py-1 flex gap-3 items-center lg:cursor-pointer btn-hover ${
                  open === true
                    ? "filter border-transparent text-white"
                    : "bg-white border-[1px] border-black"
                }`}
              >
                <BiFilterAlt className="text-xl" />
                <p className="text-lg uppercase ">Filter</p>
              </div>

              {/* <div className="text-gray-500 font-thin order-3 md:order-2">
                There are {paginate?.total} products{" "}
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
            {open && (
              <div className="py-4 px-10 border-[1px] ">
                <div className="text-lg font-medium py-3 flex flex-col gap-2">
                  <h1>Categories</h1>
                  <p className="h-[1px] w-14 bg-black"></p>
                </div>
                <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                  {category?.map((item: any) => (
                    <SingleCat key={item?.id} item={item} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 pt-10">
              <ShopProductSection
                grid={grid}
                open={open}
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

          {/* category side  */}
          <div className="col-span-1 lg:block hidden">
            <div className="flex items-center gap-3">
              <p className="h-[40px] w-[5px] bg-black"></p>
              <h1 className="text-xl">Categories</h1>
              <p className="h-[1px] w-full bg-gray-300"></p>
            </div>
            <div>
              {category?.map((item: any) => (
                <SingleCat key={item?.id} item={item} />
              ))}
            </div>
            <div className="bg-gray-100 border-2 border-gray-200 my-6 p-4">
              <FilterByColorNew
                colors={colors}
                activeColor={activeColor}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
            <div className="bg-gray-100 border-2 border-gray-200 p-4">
              <FilterByPriceNew
                priceValue={priceValue}
                setPage={setPage}
                setHasMore={setHasMore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fourteen;

const ShopProductSection = ({
  grid,
  open,
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
        data: shopPageProductsData,
        isLoading: shopPageProductsLoading,
        isFetching: shopPageProductsFetching,
        isSuccess: shopPageProductsSuccess,
        isError: shopPageProductsError,
        refetch,
    } = useGetShopPageProductsQuery({ page, filtersData });

    const nextPageFetch = () => {
        setPage((prev: any) => prev + 1);
        refetch();
    };

    const categoryStore = useSelector((state: RootState) => state?.category);

    const category = categoryStore?.categories || [];

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
    }, [
        shopPageProductsData,
        setPaginate,
        isPagination,
        setHasMore,
        setPage,
        shopPageProductsSuccess,
    ]);

  return (
    <>
    
    {/* show loading */}
    {(shopPageProductsLoading && !shopPageProductsError) ||
    shopPageProductsFetching
        ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
          ))
        : null}
      {!isPagination ? (
        <div>
          <InfiniteScroll
            style={{ height: "auto", overflow: "hidden" }}
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
            <div className="">
              {products?.map((item: any) => (
                <div key={item?.id}>
                  <Card32 item={item} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="">
          {products?.map((item: any) => (
            <div key={item?.id}>
              <Card32 item={item} />
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
  const [show, setShow] = useState(false);
      const { id }: any = useParams<{ id: string }>();
      useEffect(() => {
          if (item.cat) {
              for (let i = 0; i < item.cat.length; i++) {
                  item.cat[i].id == id && setShow(true);
              }
          }
      }, [item?.cat, id]);
  return (
    <>
      <div className="w-full flex px-4 py-3 lg:cursor-pointer">
        <Link
          href={"/category/" + item.id}
          className="flex-1 text-sm text-gray-900 font-medium text-hover"
        >
          {" "}
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
            {item?.subcategories?.map((sub: any, idx: any) => (
              <div className="py-2" key={idx}>
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <p className="pb-2 text-sm text-gray-500 text-hover">
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

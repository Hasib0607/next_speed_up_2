"use client";

// import Pagination from "@/components/_category-page/category/pagination";
import Card38 from "@/components/card/card38";
import Card6 from "@/components/card/card6";
import Skeleton from '@/components/loaders/skeleton';
import { MinusIcon, PlusIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { VscClose } from "react-icons/vsc";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from "react-redux";
import { useGetModulesQuery } from "@/redux/features/modules/modulesApi";
import { RootState } from "@/redux/store";
import { useGetColorsQuery, useGetShopPageProductsQuery } from "@/redux/features/shop/shopApi";
import FilterByColorNew from "@/components/_category-page/components/filter-by-color-new";
import FilterByPriceNew from "@/components/_category-page/components/filter-by-price-new";
import { setSort } from "@/redux/features/filters/filterSlice";

const Eighteen = ({ design, store_id }: any) => {
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
  .text-hover:hover {
    color:  ${design?.header_color};
  }
 .bg-hover:hover {
    background: ${design?.header_color};
    color:  ${design?.text_color};
  }
    `;

  return (
    <div>
      <style>{styleCss}</style>
      <div className="border-b-2 py-3 mb-2 border-black">
        <Location />
      </div>
      <div className="sm:container px-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className=" hidden lg:block col-span-3">
            <div className="w-full sticky top-40 h-max">
              <h3 className="font-thin text-[#252525] text-lg px-4">
                Categories
              </h3>
              {category?.map((item: any) => (
                <SingleCat key={item?.id} item={item} />
              ))}

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
          <div className="col-span-1 lg:col-span-9 flex flex-col h-full">
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
        </div>
      </div>

      {/* tablet and mobile view  */}

      <div className={`px-4`}>
        <ul
          className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-20 lg:cursor-pointer ${
            open ? "left-0 " : "left-[-140%] "
          }`}
        >
          <div className="pb-7 pt-3 px-6">
            <div
              onClick={() => setOpen(!open)}
              className="flex gap-1 items-center border-b-[2px] pb-2 text-color"
            >
              <VscClose className="text-lg inline-block" />
              <p className="text-sm">Close</p>
            </div>
            <div className="w-full">
              <h3 className="font-thin text-[#252525] text-lg px-4">
                Categories
              </h3>
              {category?.map((item: any) => (
                <SingleCat item={item} key={item?.id} />
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Eighteen;

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
            {grid === "H" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
                {products?.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    <Card38 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            <AnimatePresence>
              {grid === "V" && (
                <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                  {products?.map((item: any) => (
                    <motion.div
                      key={item?.id}
                      initial={{ translateX: 200 }}
                      animate={{ translateX: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "linear",
                        type: "tween",
                      }}
                    >
                      <Card6 item={item} />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </InfiniteScroll>
        </div>
      ) : (
        <div>
          {grid === "H" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 sm:px-0">
              {products?.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card38 item={item} />
                </motion.div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {grid === "V" && (
              <div className="grid grid-cols-1 gap-4 px-2 sm:px-0">
                {products?.map((item: any) => (
                  <motion.div
                    key={item?.id}
                    initial={{ translateX: 200 }}
                    animate={{ translateX: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "linear",
                      type: "tween",
                    }}
                  >
                    <Card6 item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

const Location = ({ category }: any) => {
  return (
    <div className="w-full sm:container text-[#414141] flex gap-1 items-center justify-start py-2 text-sm font-thin px-5">
      <p>Home </p>
      <p> / {"Shop"}</p>
    </div>
  );
};

const Filter = ({ paginate, onChange, setGrid, open, setOpen }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 my-5 flex flex-wrap justify-between items-center">
      {/* <div className="text-gray-500 font-thin md:block hidden">
        There are {paginate ? paginate?.total : 0} products{" "}
      </div> */}
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-3 items-center md:hidden lg:cursor-pointer"
      >
        <BiFilter />
        <p>Filter</p>
      </div>

      {/* Short by  */}
      <div className="flex items-center gap-6 text-sm max-w-sm">
        <select
          onChange={onChange}
          className="h-9 border-0 rounded lg:cursor-pointer outline-0 ring-0 focus:ring-0 text-xs flex-1 bg-white"
        >
          <option>Featured</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="lh">L - H</option>
          <option value="hl">H - L</option>
        </select>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setGrid("H")}
            className="border rounded-full p-2 lg:cursor-pointer bg-hover text-[#928a8a]"
          >
            <Bars3Icon className="h-4 w-4" />
          </div>
          <div
            onClick={() => setGrid("V")}
            className="border rounded-full p-2 lg:cursor-pointer bg-hover text-[#928a8a]"
          >
            <Bars3Icon className="h-4 w-4" />
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
      <div className="w-full flex px-4 py-3">
        <Link
          href={"/category/" + item.id}
          className={`flex-1 text-sm font-thin text-gray-500 text-hover`}
        >
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.subcategories ? (
          <div className="px-4 h-full">
            {show ? (
              <MinusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
              />
            ) : (
              <PlusIcon
                onClick={() => setShow(!show)}
                className="h-4 w-4 text-gray-800 lg:cursor-pointer text-hover"
              />
            )}
          </div>
        ) : null}
      </div>
      <div className=" px-4">
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </div>
      {show && (
        <>
          <div className="ml-8">
            {item?.subcategories?.map((sub: any, idx: any) => (
              <div className="py-2" key={idx}>
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <p className="pb-2 text-sm font-thin text-gray-500 text-hover">
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

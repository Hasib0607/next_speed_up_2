"use client";
import img from "@/assets/bg-image/twenty-four-shop.webp";
import Pagination from '@/components/_category-page/components/pagination';
import Card49 from "@/components/card/card49";
import Skeleton from '@/components/loaders/skeleton';
import { setSort } from "@/redux/features/filters/filterSlice";
import { useGetModulesQuery } from "@/redux/features/modules/modulesApi";
import { useGetColorsQuery, useGetShopPageProductsQuery } from "@/redux/features/shop/shopApi";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const TwentyFour = ({ design, store_id }: any) => {
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
  
  const styleCss = `
    .grid-active {
      color:  ${design?.header_color};
      border: 1px solid ${design?.header_color};
    }
 `;

  return (
    <div className="mt-10 lg:mt-0">
      <div className="min-h-[200px] max-h-60 w-full overflow-hidden relative xl:pr-20 lg:pr-10">
        <img
          src={img.src}
          alt=""
          className="min-h-[200px] max-h-60 w-full object-cover"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex flex-col justify-center items-start sm:container px-5">
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-5xl text-white font-medium">Products</h1>
            <div className="flex items-center gap-1 text-white font-bold">
              <p>Home</p>
              <p>/ Shop</p>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <style>{styleCss}</style>
        <div className="">
          <div className="sm:container px-5">
            <div className="w-full">
              <div className="mt-8 hidden lg:flex border-b-2">
                <div className="flex gap-x-10 flex-wrap gap-y-2">
                  {category?.map((item: any) => (
                    <SingleCat item={item} key={item?.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 sm:container px-5">
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
    </div>
  );
};

export default TwentyFour;

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products?.map((item: any) => (
                <motion.div
                  key={item?.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <Card49 item={item} />
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.map((item: any) => (
            <motion.div
              key={item?.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5, ease: "linear" }}
            >
              <Card49 item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

const Filter = ({ paginate, onChange }: any) => {
  return (
    <div className="border-t border-b border-[#f1f1f1] py-3 mb-5 flex flex-wrap gap-y-3 justify-between items-center px-2">
      <div className="text-gray-500 font-medium">
        Showing {paginate?.from}-{paginate?.to} of {paginate?.total} results
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
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        className="w-full flex items-center gap-x-2 relative pb-3"
      >
        <Link href={"/category/" + item.id} className="text-gray-500 w-max">
          {" "}
          <p>{item.name}</p>
        </Link>
        {item?.subcategories ? (
          <div className="lg:cursor-pointer">
            {show ? (
              <MdKeyboardArrowUp className="text-xl text-gray-800" />
            ) : (
              <MdKeyboardArrowDown className="text-xl text-gray-800" />
            )}
          </div>
        ) : null}
      </div>

      {show && item?.subcategories && (
        <>
          <div
            onMouseLeave={() => setShow(false)}
            className="absolute top-8 left-0 z-[8] bg-white px-5 py-2"
          >
            {item?.subcategories?.map((sub: any, idx: any) => (
              <div className="" key={idx}>
                <Link href={"/category/" + sub?.id}>
                  {" "}
                  <li className="text-sm text-gray-500 w-max">{sub?.name}</li>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

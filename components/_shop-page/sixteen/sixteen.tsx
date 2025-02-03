"use client";
import Pagination from '@/components/_category-page/components/pagination';
import Card26 from "@/components/card/card26";
import Skeleton from '@/components/loaders/skeleton';
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import FilterCat from "./filter-cat";
import { useDispatch, useSelector } from 'react-redux';
import { useGetModulesQuery } from '@/redux/features/modules/modulesApi';
import { RootState } from '@/redux/store';
import { useGetColorsQuery, useGetShopPageProductsQuery } from '@/redux/features/shop/shopApi';
import { setSort } from '@/redux/features/filters/filterSlice';

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
            open ? "left-0" : "sm:-left-96 -left-40"
          }`}
        >
          <FilterCat />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open ? "sm:left-96 left-40" : "left-0"
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
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2.5">
              {products?.map((item: any) => (
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

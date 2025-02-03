"use client";
import img from "@/components/_category-page/imageBg/shop-header.webp";
import { useEffect, useState } from "react";
import Card39 from "@/components/card/card39";
import { setSort } from '@/redux/features/filters/filterSlice';
import Link from "next/link";
import { useParams } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import Skeleton from '@/components/loaders/skeleton';
import Pagination from '@/components/_category-page/components/pagination';
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryPageProductsQuery, useGetColorsQuery } from "@/redux/features/shop/shopApi";
import { RootState } from "@/redux/store";
import { useGetModulesQuery } from "@/redux/features/modules/modulesApi";
import { numberParser } from "@/helpers/numberParser";

const CategoryNineteen = ({ catId, store_id, design }: any) => {
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

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

  return (
    <div>
      <div className="min-h-[200px] max-h-80 w-full overflow-hidden relative">
        <img
          src={img.src}
          alt=""
          className="min-h-[200px] max-h-80 w-full object-cover"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-full flex flex-col justify-center items-start sm:container px-5">
          <div className="">
            <div>
              <p className="text-sm font-medium text-gray-200 uppercase">
                Products
              </p>
            </div>
            <div className="flex gap-1 items-center mt-5">
              <h1 className="text-white text-5xl">Shop All</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:container px-5">
        <div className="">
          <div className="mt-8 hidden md:flex border-b-2">
            <div className="flex gap-x-10 flex-wrap gap-y-2">
              {category?.map((item: any) => (
                <SingleCat item={item} key={item?.id} design={design} />
              ))}
            </div>
          </div>
          <div className="mt-10">
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

export default CategoryNineteen;

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

  return (
    <>
      {(categoryPageProductsLoading && !categoryPageProductsError) ||
            categoryPageProductsFetching ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div>
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
                <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
                  {products?.map((product: any) => (
                    <Card39 key={product.id} item={product} />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-2 lg:gap-8">
              {products?.map((product: any) => (
                <Card39 key={product.id} item={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const SingleCat = ({ item, design }: any) => {
  const [show, setShow] = useState(false);
  const { id }: any = useParams<{ id: string }>();
  useEffect(() => {
    if (item.cat) {
        for (let i = 0; i < item.cat.length; i++) {
            item.cat[i].id == id && setShow(true);
        }
    }
}, [item?.cat, id]);
  const activeColor = `text-[${design?.header_color}]  w-max pb-3`;
  const inactiveColor = "text-gray-500 w-max pb-3";
  const activesub = `text-[${design?.header_color}] text-sm`;
  const inactivesub = "text-sm text-gray-500";

  const styleCss = `
    .category-page .active{
        color:#f1593a;
        font-weight: 700;
        border-bottom: 2px solid black;
       }
    `;
  return (
    <div onMouseLeave={() => setShow(false)} className="relative">
      <style>{styleCss}</style>
      <div
        onMouseEnter={() => setShow(true)}
        className="w-full flex items-center gap-x-2 relative category-page"
      >
        <Link
          style={id == item?.id ? { color: `${design.header_color}` } : {}}
          href={"/category/" + item.id}
          className={id == item?.id ? activeColor : inactiveColor}
        >
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
            {item?.subcategories?.map((sub: any, key: number) => (
              <div key={key} className="category-page">
                <Link
                  style={
                    id == sub?.id ? { color: `${design.header_color}` } : {}
                  }
                  href={"/category/" + sub?.id}
                  className={id == sub?.id ? activesub : inactivesub}
                >
                  <li className="w-max">{sub?.name}</li>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

"use client";

import React, { useEffect, useState } from "react";
import "./category-four.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";
import { catImg } from "@/site-settings/siteUrl";
import BreadcrumbHeadingWrapper from "./components/breadcrumb-heading-wrapper";
import ProductCardTwo from "@/components/card/product-card/product-card-two";
import { usePathname } from "next/navigation";
import { getPathName, getSecondPathName } from "@/helpers/littleSpicy";
import { numberParser } from "@/helpers/numberParser";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetCategoryPageProductsQuery } from "@/redux/features/shop/shopApi";
import { useGetModulesQuery } from "@/redux/features/modules/modulesApi";
import Pagination from "./components/pagination";


const CategoryFour = ({ catId, store_id }: any) => {
  const module_id = 105;
const pathName = usePathname();
    const currentPath = getPathName(pathName);
    const currentSecondPath = numberParser(getSecondPathName(pathName));

        const { data: modulesData } = useGetModulesQuery({ store_id });
        const modules = modulesData?.data || [];

    const filtersData = useSelector((state: RootState) => state.filters);

    const [hasMore, setHasMore] = useState<any>(true);
    const [paginate, setPaginate] = useState<any>({});
        // setting the products to be shown on the ui initially zero residing on an array
        const [products, setProducts] = useState<any[]>([]);

        // setting the initial page number
    const [page, setPage] = useState(1);
    
        const {
            data: categoryPageProductsData,
            isLoading: categoryPageProductsLoading,
            isFetching: categoryPageProductsFetching,
            isError: categoryPageProductsError,
            isSuccess: categoryPageProductsSuccess,
            refetch: categoryPageProductsRefetch,
        } = useGetCategoryPageProductsQuery({ catId, page, filtersData });
    
        const nextPageFetch = () => {
            setPage((prev) => prev + 1);
            categoryPageProductsRefetch();
        };
    
        const categoryStore = useSelector((state: any) => state?.category);
        const category = categoryStore?.categories || [];

    const paginationModule = modules?.find(
        (item: any) => item?.modulus_id === module_id
    );
    const isPagination = parseInt(paginationModule?.status) === 1;
    
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
        }, [categoryPageProductsData, isPagination, categoryPageProductsSuccess]);

    const currentCatName = category?.find(
      (item: any) => item?.id == currentSecondPath
  );

  return (
    <>
      {products.length === 0 ? (
        <div className="bg-gray-100">
          <div className="mx-auto">
            <img src={catImg} className="w-full min-h-[150px]" alt="" />
          </div>
          <div className="sm:container px-5 sm:py-10 py-5">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  Categories
                </li>
                <li className="font-bold tracking-wider ">
                                {currentPath == 'category'
                                    ? currentCatName?.name
                                    : currentPath}
                            </li>
              </ul>
            </div>
          </div>
          <div className="divider text-black">{currentCatName?.name}</div>

          <div
            className="flex sm:container px-5 sm:py-10 py-5 justify-center mt-20"
            style={{ minHeight: "50vh" }}
          >
            <h2 className="font-bold text-4xl text-center text-gray-400">
              No Product Available
            </h2>
          </div>
        </div>
      ) : (
        <div className="">
          {/* <div className="mx-auto">
            <img
              src={catImg + shops?.banner}
              className="w-full min-h-[150px]"
              alt=""
            />
          </div> */}
          <BreadcrumbHeadingWrapper category={category}>
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
                  <div className="flex flex-wrap gap-4 justify-center my-10">
                    {products?.map((product: any) => (
                      <ProductCardTwo key={product.id} item={product} />
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-4 justify-center my-10">
                  {products?.map((product: any) => (
                    <ProductCardTwo key={product.id} item={product} />
                  ))}
                </div>
              </div>
            )}
          </BreadcrumbHeadingWrapper>
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
      )}
    </>
  );
};

export default CategoryFour;

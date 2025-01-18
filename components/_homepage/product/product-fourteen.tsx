"use client";
import Card29 from "@/components/card/card29";
import SectionHeadingSixteen from "@/components/section-heading/section-heading-sixteen";
import { useGetCategoryProductQuery } from "@/redux/features/products/productApi";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductFourteen = ({ category, design, categoryId }: any) => {
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(categoryId);

  const store = useSelector((state: RootState) => state.appStore.store);
  const store_id = store?.id || null;

  const headerdata = useSelector((state: RootState) => state.home.headersetting);

  const { custom_design } = headerdata || {};
  const sectionHeadingData = custom_design?.product?.[0] || {};
  const { title = 'Default Title', title_color = '#000' } = sectionHeadingData || {};

  const { data, isLoading, isFetching, isError, isSuccess } =
        useGetCategoryProductQuery(
            { id }
        );
  
    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.products);
        }
    }, [data, isSuccess]);

  const styleCss = `
    .active-cat {
      color:  ${design?.header_color};
      border-bottom: 2px solid ${design?.header_color};
      
  }

    `;


  return (
    <div className="bg-white sm:container px-5 sm:py-10 py-5 mx-auto">
      <style>{styleCss}</style>
      <div className="bg-white">
        <SectionHeadingSixteen
          title={title || "Products"}
          title_color={title_color || "#000"}
        />
        <div className="flex sm:gap-x-5 gap-x-2 justify-center pb-8 lg:cursor-pointer uppercase">
          {category?.slice(0, 4).map((item: any, index: any) => (
            <div key={item.id}>
              <h1
                className={`${
                  active === index ? "active-cat" : ""
                } font-medium text-sm sm:text-base`}
                onClick={() => {
                  setActive(index);
                  setId(index);
                }}
              >
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        {products?.length > 0 ? (
          <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:gap-5 gap-1 ">
            {products
              ?.slice(0, 8)
              .map((productData: any) => (
                <Card29
                  item={productData}
                  key={productData.id}
                  design={design}
                  store_id={store_id}
                />
              ))}
          </div>
        ) : (
          <div className="text-red-500 text-center py-10 text-xl">
            No Products Available
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFourteen;

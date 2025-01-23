"use client";


import SectionHeadingTen from "@/components/section-heading/section-heading-ten";
import { RootState } from "@/redux/store";
import {  useState } from "react";
import { useSelector } from "react-redux";
import CatProductsList from "./components/cat-products-list";

const ProductTwo = ({ category }: any) => {
const [id, setId] = useState(category[0]?.id);

  const headerdata = useSelector((state: RootState) => state.home.headersetting);

  const { custom_design } = headerdata || {};
  const sectionHeadingData = custom_design?.product?.[0] || {};
  const { title = 'Default Title', title_color = '#000' } = sectionHeadingData || {};

  const styleCss = `
    .active-cat {
      color: red;
    }
    `;


  return (
    <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
      <style>{styleCss}</style>
      <div className="">
        <SectionHeadingTen
          title={title || "Our Products"}
          subtitle={""}
          title_color={title_color || "#000"}
        />
        <div className="flex flex-wrap gap-y-3 gap-x-5 text-lg justify-center pb-8 lg:cursor-pointer uppercase">
          {category?.slice(0, 3)?.map((item: any) => (
            <div key={item.id}>
              <h1
                className={`${id === item.id ? "active-cat" : ""} `}
                onClick={() => {
                  setId(item.id);
                }}
              >
                {item.name}
              </h1>
            </div>
          ))}
        </div>
        <CatProductsList
                id={id}
                className={
                    'grid grid-cols-2 xl:grid-cols-5 xl3:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-5'
                }
                card={'16'}
                count={10}
            >
                <div className="text-red-500 text-center py-10 text-xl">
                    No Products Available
                </div>
            </CatProductsList>
      </div>
    </div>
  );
};

export default ProductTwo;

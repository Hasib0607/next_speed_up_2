"use client";
import { useState } from "react";

import "@/components/card/product-card/product-card-one.css";
import { motion } from "framer-motion";
import ProductCardFortyOne from "@/components/card/product-card/product-card-fortyone";
const btn = [{ text: "Featured" }, { text: "Popular" }, { text: "New Added" }];

const ProductFortyOne = ({
  product,
  best_sell_product,
  feature_product,
  design,
}: any) => {
  const [active, setActive] = useState("Featured");
  
  return (
    <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
      <div className="flex justify-between items-center mb-7 ">
        <div className="flex justify-center sm:justify-start flex-wrap gap-2">
          {btn?.map((i) => (
            <Button1
              setActive={setActive}
              text={i.text}
              active={active}
              key={i.text}
              design={design}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 gap-5">
        {active === "New Added" &&
          product
            ?.slice(0, 8)
            ?.map((item: any) => (
              <ProductCardFortyOne
                item={item}
                key={item?.id}
              />
            ))}
        {active === "Featured" &&
          feature_product
            ?.slice(0, 8)
            ?.map((item: any) => (
              <ProductCardFortyOne
                item={item}
                key={item?.id}
              />
            ))}
        {active === "Popular" &&
          best_sell_product
            ?.slice(0, 8)
            ?.map((item: any) => (
              <ProductCardFortyOne
                item={item}
                key={item?.id}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductFortyOne;

const Button1 = ({ text, active, setActive, design }: any) => {
  return (
    <motion.button
      onClick={() => setActive(text)}
      className="px-6 py-2 rounded text-xs sm:text-base font-semibold text-black hover:text-orange-500"
      style={{
        backgroundColor: `${
          active === text ? design?.header_color : design?.text_color
        }`,
        color: `${active !== text ? design?.header_color : design?.text_color}`,
      }}
      whileHover={{
        // backgroundColor: button1.hoverButton,
        // style: { color: button1.color },
        y: -6,
        transition: { duration: 0.5 },
      }}
      exit={{
        // backgroundColor: button1.defaultButton,
        y: 0,
        transition: { duration: 0.5 },
      }}
    >
      {text}
    </motion.button>
  );
};

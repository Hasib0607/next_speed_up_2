"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { productImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import BDT from "@/utils/bdt";
import { useGetSearchProductQuery } from "@/redux/features/home/homeApi";
import { productCurrentPrice } from "@/helpers/littleSpicy";

const Search3 = ({ search, setSearch, design }: any) => {

  const [result, setResult] = useState([]);

    const store_id = design?.store_id || null;

  const {
          data: userSearchProductData,
          isLoading: userSearchProductLoading,
          isSuccess: userSearchProductSuccess,
          refetch: userSearchProductRefetch,
      } = useGetSearchProductQuery({ store_id, search });
  
      useEffect(() => {
          if (userSearchProductSuccess) {
              const userSearchProduct = userSearchProductData?.data || [];
              setResult(userSearchProduct);
          }
      }, [userSearchProductSuccess, userSearchProductData]);

  const styleCss = `
    ::-webkit-scrollbar {
        width: 3px;
      }
  `;

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="min-h-max shadow-xl w-full overflow-hidden bg-gray-200 absolute top-10 left-0 right-0 z-10"
    >
      <style>{styleCss}</style>
      <h3 className="text-lg font-semibold mx-6 py-1">
        {result?.length} results for{" "}
        <span className="font-bold text-red-400">{search}</span>
      </h3>
      <div className="w-full flex flex-col gap-2 my-4 overflow-y-auto max-h-[500px]">
        {result?.map((res, idx) => (
          <Single item={res} key={idx} setSearch={setSearch} />
        ))}
      </div>
    </motion.div>
  );
};

export default Search3;

const Single = ({ item, setSearch }: any) => {
  const price = productCurrentPrice(item);

  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row mx-4 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover h-24 rounded-t-lg w-24 md:rounded-none md:rounded-l-lg"
        src={productImg + item?.image}
        alt=""
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <Link
          href={"/product/" + item?.id + "/" + item?.slug}
          onClick={() => setSearch("")}
          className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-600"
        >
          {item?.name.slice(0, 100)}
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <BDT price={price} />
        </p>
      </div>
    </motion.div>
  );
};

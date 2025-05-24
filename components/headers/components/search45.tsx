'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { productImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import BDT from '@/utils/bdt';
import { useGetSearchProductQuery } from '@/redux/features/home/homeApi';
import { productCurrentPrice } from '@/helpers/littleSpicy';

const Search45 = ({ search, setSearch, design }: any) => {
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
            transition={{ ease: 'easeOut', duration: 1 }}
            className=" overflow-hidden bg-white absolute left-0 md:-left-40 right-0 md:-right-40 z-10"
        >
            <style>{styleCss}</style>
            <h3 className="text-xl font-semibold mx-6 py-1 text-center text-gray-400">
                Results for{' '}
                <span className="font-bold text-black">"{search}"</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 my-4 overflow-y-auto max-h-[500px]">
                {result?.map((res, idx) => (
                    <Single item={res} key={idx} setSearch={setSearch} />
                ))}
            </div>
        </motion.div>
    );
};

export default Search45;

const Single = ({ item, setSearch }: any) => {
    const price = productCurrentPrice(item);

    return (
        <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ ease: 'easeOut', duration: 1 }}
            className="bg-white mx-4"
        >
            <img
                className="object-cover h-44 w-40 md:h-60 md:w-60 mb-3"
                src={productImg + item?.image}
                alt=""
            />

            <Link
                href={'/product/' + item?.id + '/' + item?.slug}
                onClick={() => setSearch('')}
                className="mb-2 text-lg hover:text-[var(--header-color)]"
            >
                {item?.name.slice(0, 100)}
            </Link>
            <p className="mb-3 font-normal text-gray-700">
                <BDT price={price} />
            </p>
        </motion.div>
    );
};

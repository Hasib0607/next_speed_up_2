'use client';
import { useEffect, useState } from 'react';

import { getPrice } from '@/helpers/getPrice';
import { useGetSearchProductQuery } from '@/redux/features/home/homeApi';
import { productImg } from '@/site-settings/siteUrl';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import BDT from '@/utils/bdt';

const Search = ({ search, setSearch, setSearchInput }: any) => {
    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state 
    const store_id = store?.id || null;

    const [result, setResult] = useState([]);

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
            transition={{ ease: 'easeOut', duration: 500 }}
            className="min-h-max shadow-xl w-full rounded-md bg-white absolute top-4 z-50 left-0 right-0"
        >
            <style>{styleCss}</style>
            <h3 className="text-lg font-semibold mx-6 py-1">
                {result?.length} results for{' '}
                <span className="font-bold text-red-400">{search}</span>
            </h3>
            <div
                style={{}}
                className="w-full flex flex-col gap-2 my-4 h-[500px] overflow-y-auto"
            >
                {result?.length > 0 &&
                    result?.map((item, index) => (
                        <Single
                            key={index}
                            item={item}
                            setSearch={setSearch}
                            setSearchInput={setSearchInput}
                        />
                    ))}
            </div>
        </motion.div>
    );
};

export default Search;

const Single = ({ item, setSearch, setSearchInput }: any) => {
    const price = getPrice(
        item?.regular_price,
        item?.discount_price,
        item?.discount_type
    );

    return (
        <Link
            href={'/product/' + item?.id + '/' + item?.slug}
            onClick={() => {
                setSearch('');
                setSearchInput(false);
            }}
        >
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ ease: 'easeOut', duration: 1 }}
                className="flex flex-col border-b-2 items-center bg-white md:flex-row z-40 px-4 border border-gray-100 last:border-b-0"
            >
                <img
                    className="object-cover h-24 rounded-t-lg w-24"
                    src={productImg + item?.image}
                    alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h1 className="mb-2 text-sm font-semibold tracking-tight text-gray-900">
                        {item.name.slice(0, 100)}
                    </h1>
                    <p className="mb-3 font-normal text-gray-700">
                        <BDT tk={price} />
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

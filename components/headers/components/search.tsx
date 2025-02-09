'use client';

import { useEffect, useState } from 'react';
import { useGetSearchProductQuery } from '@/redux/features/home/homeApi';
import { productImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import BDT from '@/utils/bdt';
import { motion } from 'framer-motion';
import { productCurrentPrice } from '@/helpers/littleSpicy';
import { BsSearch } from 'react-icons/bs';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IoSearchCircleOutline } from 'react-icons/io5';

const Search = ({
    design,
    searchInput,
    setSearchInput,
    btnOn,
    className,
    screen,
    backdrop,
}: any) => {
    const [search, setSearch] = useState<any>('');

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
    };

    return (
        <>
            {searchInput && (
                <>
                    {screen && (
                        <>
                            <div
                                onClick={handleClose}
                                className="h-screen left-0 fixed top-0 w-screen z-40"
                            ></div>
                        </>
                    )}
                    <div
                        className={
                            className
                                ? className
                                : 'absolute rounded-lg overflow-hidden z-50 left-[50%] bg-[rgba(255,255,255,.8)] top-3 translate-x-[-50%]'
                        }
                    >
                        <BsSearch className="text-[16px] lg:cursor-pointer absolute top-5 left-3 text-black" />
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search your products"
                            className="md:px-14 px-10 py-4 lg:w-[500px] xl:w-[800px] md:w-[350px] w-[400px] border-gray-200 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black "
                        />
                        <XMarkIcon
                            onClick={handleClose}
                            className="absolute top-5 lg:cursor-pointer h-5 right-3 text-black"
                        />
                    </div>
                    {backdrop && (
                        <>
                            <div className="absolute top-0 left-0 w-screen opacity-50 h-screen bg-[#444] z-30"></div>
                        </>
                    )}
                </>
            )}

            {search && (
                <div className="lg:w-[500px] md:w-[350px] w-[400px] xl:w-[800px] absolute left-[50%] top-16 translate-x-[-50%] z-50 ">
                    <SearchBox
                        design={design}
                        search={search}
                        setSearch={setSearch}
                        setSearchInput={setSearchInput}
                    />
                </div>
            )}

            {btnOn && (
                <IoSearchCircleOutline
                    onClick={() => setSearchInput(!searchInput)}
                    className="h-5 w-5 sm:h-7 sm:w-7 lg:cursor-pointer"
                />
            )}
        </>
    );
};

export default Search;

export const SearchBox = ({
    search,
    setSearch,
    setSearchInput,
    design,
}: any) => {
    const store_id = design?.store_id || null;

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

const Single = ({ item, setSearch, setSearchInput }: any) => {
    const price = productCurrentPrice(item);

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
                        <BDT price={price} />
                    </p>
                </div>
            </motion.div>
        </Link>
    );
};

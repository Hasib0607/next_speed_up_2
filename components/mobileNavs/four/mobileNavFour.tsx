'use client';

import { cancelIcon, gridIcon, searchIcon } from '@/assets/svg';
import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import Search3 from '@/components/headers/components/search3';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { iconImg } from '@/site-settings/siteUrl';
import { MobileNavProps } from '@/types';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
    HomeIcon,
    ShoppingCartIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MobileNavFour = ({ design }: MobileNavProps) => {
    const [open, setOpen] = useState(false);
    const [searchshow, setSearchshow] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const styleCss = `
        .cart-color {
          background: ${design?.header_color};
          color: ${design?.text_color};
      }
        ::-webkit-scrollbar {
        width: 4px;
      }
    `;

    return (
        <>
            <style>{styleCss}</style>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-6 lg:cursor-pointer"
                ></div>
            )}
            <div className="lg:hidden h-[65px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 grid grid-cols-5 px-1 items-center fixed bottom-0 left-0 right-0 z-10 py-2">
                <div
                    onClick={() => {
                        setOpen(!open);
                        setSearchshow(false);
                    }}
                    className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
                >
                    <div className="sm:h-5 h-4">{gridIcon}</div>
                    <h3 className="font-semibold sm:text-base text-xs mt-2">
                        Category
                    </h3>
                </div>
                <div
                    onClick={() => {
                        setSearchshow(!searchshow);
                        setOpen(false);
                    }}
                    className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
                >
                    <div className="sm:h-5 h-4">{searchIcon}</div>
                    <h3 className="font-semibold sm:text-base text-xs mt-2">
                        Search
                    </h3>
                </div>
                <Link href="/" passHref>
                    <div
                        onClick={() => setOpen(false)}
                        className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
                    >
                        <HomeIcon className="sm:h-5 h-6" />
                        <h3 className="font-semibold sm:text-base text-xs">
                            Home
                        </h3>
                    </div>
                </Link>
                <div
                    onClick={() => {
                        setOpenCart(!openCart);
                        setOpen(false);
                    }}
                    className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
                >
                    <div className="relative">
                        <ShoppingCartIcon className="sm:h-5 h-6" />
                        <h3 className="font-semibold sm:text-base text-xs">
                            Cart
                        </h3>
                        {cartList.length > 0 && (
                            <div className="sm:h-6 h-4 w-4 sm:w-6 absolute top-0 -right-2 rounded-full cart-color flex items-center justify-center">
                                <p className="sm:text-sm text-xs">
                                    {cartList.length}
                                </p>
                            </div>
                        )}
                    </div>
                    <CartSideBar
                        open={openCart}
                        setOpen={setOpenCart}
                        design={design}
                    />
                </div>
                <Link href="/profile" passHref>
                    <div
                        onClick={() => setOpen(false)}
                        className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2"
                    >
                        <UserIcon className="sm:h-5 h-6" />
                        <h3 className="font-semibold sm:text-base text-xs">
                            User
                        </h3>
                    </div>
                </Link>
            </div>
            <CategorySideBar
                open={open}
                setOpen={setOpen}
                category={category}
            />
            <AnimatePresence>
                {searchshow && (
                    <SearchDiv setSearchshow={setSearchshow} design={design} />
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNavFour;

const CategorySideBar = ({ open, setOpen, category }: any) => {
    return (
        <>
            {/* Background Overlay */}

            <div
                className={`group fixed inset-0 z-[7] bg-black ${open ? 'opacity-50' : 'opacity-0 hidden'} transition-opacity duration-300`}
                onClick={() => setOpen(!open)}
            ></div>

            {/* Sidebar Container */}
            <div
                className={`fixed md:w-96 w-64 sm:w-80 top-0 overflow-y-auto max-h-[calc(100vh-65px)] h-full pb-5 z-[11] bg-white duration-500 ease-in-out ${
                    open ? 'left-0 ' : 'left-[-140%] '
                }`}
            >
                {/* Header */}
                <div className="p-5">
                    <div className="text-xl border-b-[2px] pb-2 text-center text-color flex justify-between items-center">
                        <p>Category</p>
                        <div onClick={() => setOpen(!open)} className="h-8">
                            {cancelIcon}
                        </div>
                    </div>

                    {/* Scrollable Category List */}
                    <div className="flex flex-col gap-3 w-[95%]">
                        {category?.map((item: any) => (
                            <SingleCat
                                key={item?.id}
                                item={item}
                                open={open}
                                setOpen={setOpen}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

interface SearchDivProps {
    setSearchshow: (show: boolean) => void;
    design: any;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow, design }) => {
    const [searchTxt, setSearch] = useState('');
    return (
        <>
            <div
                onClick={() => setSearchshow(false)}
                className="fixed inset-0 text-right"
            ></div>
            <motion.div
                initial={{ y: -42, opacity: 0 }}
                animate={{ y: 42, opacity: 1 }}
                exit={{ y: 74, opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.8 }}
                className="w-full h-8 fixed px-2 -top-9 left-0 right-0 z-[11]"
            >
                <div className="shadow-lg rounded-md">
                    <div className="absolute left-5 top-3 h-4 w-4 font-bold">
                        {searchIcon}
                    </div>
                    <input
                        type="text"
                        value={searchTxt}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-md px-10 py-3 border-0 outline-0 focus:outline-0 focus:border focus:border-gray-300 focus:ring-0"
                        placeholder="Search"
                    />
                    <div
                        onClick={() => {
                            setSearch('');
                            setSearchshow(false);
                        }}
                        className="absolute right-5 top-3 h-4 w-4 font-bold"
                    >
                        {cancelIcon}
                    </div>
                </div>
                {searchTxt && (
                    <div className="w-[95%] absolute top-4 left-1/2 -translate-x-1/2">
                        <Search3
                            search={searchTxt}
                            setSearch={setSearch}
                            design={design}
                        />
                    </div>
                )}
            </motion.div>
        </>
    );
};

interface CategoryItem {
    id: string;
    name: string;
    icon: string;
    subcategories?: CategoryItem[]; // Optional subcategories
}

// Define the props interface for SingleCat
interface SingleCatProps {
    item: CategoryItem;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SingleCat: React.FC<SingleCatProps> = ({ item, open, setOpen }) => {
    const [show, setShow] = useState(false);
    const subcategories = item?.subcategories || [];

    return (
        <>
            <div className="w-full flex py-2 lg:cursor-pointer">
                <Link href={`/category/${item.id}`} passHref>
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                    >
                        <img
                            src={`${iconImg}${item?.icon}`}
                            alt=""
                            className="h-5"
                        />
                        <p>{item.name}</p>
                    </div>
                </Link>
                {subcategories?.length > 0 && (
                    <div className="px-4 h-full">
                        {show ? (
                            <MinusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        ) : (
                            <PlusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 text-gray-800"
                            />
                        )}
                    </div>
                )}
            </div>

            {show && (
                <div className="ml-4">
                    {subcategories?.map((sub) => (
                        <div className="py-2" key={sub?.id}>
                            <Link href={`/category/${sub.id}`} passHref>
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-x-2 pb-2"
                                >
                                    <img
                                        src={`${iconImg}${sub?.icon}`}
                                        alt=""
                                        className="h-5"
                                    />
                                    <p className="text-sm text-gray-500">
                                        {sub?.name}
                                    </p>
                                </div>
                            </Link>
                            <div className="pr-2">
                                <div className="h-[1px] bg-gray-200 w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

'use client';

import { cancelIcon, gridOutlineIcon, searchIcon } from '@/assets/svg';
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
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

const MobileNavOne = ({ design }: MobileNavProps) => {
    const [active, setActive] = useState('home');
    const [searchshow, setSearchshow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const styles = `
        .hoverIcon {
            background-color: ${design?.header_color}
        }
        .cart-color {
            background: ${design?.header_color};
            color: ${design?.text_color};
        }
    `;

    const classes = `scale-110 p-[10px] -translate-y-3 border-4 border-white hoverIcon rounded-full transition-all duration-400 ease-in-out`;
    const classesH3 =
        'text-gray-800 text-[14px] font-bold -translate-y-3 transition-all duration-300 ease-in-out';
    const classesH31 = 'text-xs font-semibold';

    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed top-0 bottom-0 left-0 right-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}
            <div className="lg:hidden h-[75px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 grid grid-cols-5 items-center fixed bottom-0 left-0 right-0 z-10 py-2">
                <style>{styles}</style>

                <div
                    onClick={() => {
                        setActive('category');
                        setOpen(!open);
                    }}
                    className="rounded-full p-3 text-gray-600 flex flex-col justify-center items-center py-2 group"
                >
                    <div className={active === 'category' ? classes : ''}>
                        <div className="group-hover:text-white lg:cursor-pointer">
                            {gridOutlineIcon}
                        </div>
                    </div>
                    <h3
                        className={
                            active === 'category' ? classesH3 : classesH31
                        }
                    >
                        Category
                    </h3>
                </div>

                <div
                    onClick={() => {
                        setActive('search');
                        setOpen(false);
                        setSearchshow(!searchshow);
                    }}
                    className="rounded-full p-3 text-gray-600 flex flex-col justify-center items-center py-2 group"
                >
                    <div className={active === 'search' ? classes : ''}>
                        <div className="group-hover:text-white">
                            {searchIcon}
                        </div>
                    </div>
                    <h3
                        className={active === 'search' ? classesH3 : classesH31}
                    >
                        Search
                    </h3>
                </div>

                <Link
                    href="/"
                    onClick={() => {
                        setActive('home');
                        setOpen(false);
                    }}
                    className="rounded-full p-3 text-gray-600 flex flex-col justify-center items-center py-2 group"
                >
                    <div className={active === 'home' ? classes : ''}>
                        <HomeIcon
                            width={20}
                            className="group-hover:text-white"
                        />
                    </div>
                    <h3 className={active === 'home' ? classesH3 : classesH31}>
                        Home
                    </h3>
                </Link>

                <div
                    onClick={() => {
                        setActive('cart');
                        setOpen(false);
                        setOpenCart(!openCart);
                    }}
                    className="rounded-full relative p-3 text-gray-600 flex flex-col justify-center items-center py-2 group"
                >
                    <div className={active === 'cart' ? classes : ''}>
                        <ShoppingCartIcon
                            width={20}
                            className="group-hover:text-white"
                        />
                    </div>
                    <div className="relative">
                        <h3
                            className={
                                active === 'cart' ? classesH3 : classesH31
                            }
                        >
                            Cart
                        </h3>
                        {cartList.length > 0 && (
                            <div className="absolute h-4 w-4 rounded-full cart-color flex items-center justify-center top-[-25px] right-[-7px]">
                                <p className="text-xs">{cartList.length}</p>
                            </div>
                        )}
                    </div>
                    <CartSideBar
                        open={openCart}
                        setOpen={setOpenCart}
                        design={design}
                    />
                </div>

                <Link
                    href="/profile"
                    onClick={() => {
                        setActive('user');
                        setOpen(false);
                    }}
                    className="rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear flex flex-col justify-center items-center py-2 group"
                >
                    <div className={active === 'user' ? classes : ''}>
                        <UserIcon
                            width={20}
                            className="group-hover:text-white"
                        />
                    </div>
                    <h3 className={active === 'user' ? classesH3 : classesH31}>
                        User
                    </h3>
                </Link>
            </div>

            <div className={`px-4 z-[20]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[20] lg:cursor-pointer ${open ? 'left-0 ' : 'left-[-140%] '}`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div className="text-xl border-b-[2px] pb-5 text-center text-color flex justify-between items-center">
                            <p>Category</p>
                            <div onClick={() => setOpen(!open)} className="h-8">
                                {cancelIcon}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-[90%]">
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
                </ul>
            </div>

            <AnimatePresence>
                {searchshow && (
                    <SearchDiv setSearchshow={setSearchshow} design={design} />
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNavOne;

interface SearchDivProps {
    setSearchshow: React.Dispatch<React.SetStateAction<boolean>>;
    design: any;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow, design }) => {
    const [searchTxt, setSearch] = useState('');

    return (
        <>
            <div
                onClick={() => setSearchshow(false)}
                className="fixed top-0 bottom-0 left-0 right-0 text-right"
            ></div>
            <motion.div
                initial={{ y: -42, opacity: 0 }}
                animate={{ y: 42, opacity: 1 }}
                exit={{ y: 74, opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.8 }}
                className="w-full h-8 fixed -top-9 px-2 left-0 right-0 z-[11]"
            >
                <input
                    type="text"
                    value={searchTxt || ''}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-3 rounded-md px-10 border-0 outline-0 focus:outline-0 focus:border focus:border-gray-300 z-10 focus:ring-0"
                    placeholder="Search"
                />
                <div className="h-5 w-5 absolute top-4 left-4 font-bold z-10">
                    {searchIcon}
                </div>
                <div
                    onClick={() => {
                        setSearch('');
                        setSearchshow(false);
                    }}
                    className="h-4 w-4 absolute top-4 right-4 font-bold z-10"
                >
                    {cancelIcon}
                </div>
                {searchTxt && (
                    <div className="absolute z-20 top-4 xl:right-0 -right-24 w-full rounded-md">
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
interface SubItem {
    id: number;
    name: string;
    icon: string; // Ensure this matches your data
}

interface Item {
    id: number;
    name: string;
    icon: string; // Ensure this matches your data
    subcategories?: SubItem[]; // This property is optional
}

interface SingleCatProps {
    item: Item;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SingleCat: FC<SingleCatProps> = ({ item, open, setOpen }) => {
    const [show, setShow] = useState(false);
    const subcategories = item?.subcategories || [];

    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    href={'/category/' + item.id}
                    onClick={() => setOpen(!open)}
                    className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                >
                    <img src={iconImg + item?.icon} alt="" className="h-5" />
                    <p>{item.name}</p>
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
                <div className="ml-8">
                    {subcategories?.map((sub: any) => (
                        <div className="py-2" key={sub?.id}>
                            <Link
                                href={'/category/' + sub.id}
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-x-2 pb-2"
                            >
                                <img
                                    src={iconImg + sub?.icon}
                                    alt=""
                                    className="h-5"
                                />
                                <p className="text-sm text-gray-500">
                                    {sub?.name}
                                </p>
                            </Link>
                            <div className="pr-4">
                                <div className="h-[1px] bg-gray-200 w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

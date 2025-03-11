'use client';

import {
    HomeIcon,
    ShoppingCartIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import React, { useState } from 'react';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import { cancelIcon, gridIcon, searchIcon } from '@/assets/svg';
import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import Search3 from '@/components/headers/components/search3';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { iconImg } from '@/site-settings/siteUrl';
import { MobileNavProps } from '@/types';

const MobileNavFive = ({ design }: MobileNavProps) => {
    const [searchshow, setSearchshow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const styleCss = `
    .cart-color {
        background:${design?.header_color};
        color:  ${design?.text_color};
     }
    `;

    return (
        <>
            <style>{styleCss}</style>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}
            <div className="lg:hidden h-[50px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 flex justify-around items-center fixed bottom-0 left-0 right-0 z-10">
                <div
                    onClick={() => {
                        setOpen(!open);
                        setSearchshow(false);
                    }}
                    className={
                        'rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear'
                    }
                >
                    {gridIcon}
                </div>
                <div
                    onClick={() => {
                        setSearchshow(!searchshow);
                        setOpen(false);
                    }}
                    className={
                        'rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear'
                    }
                >
                    {searchIcon}
                </div>
                <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    style={{ backgroundColor: design?.header_color }}
                    className={'rounded-full p-5 -mt-10'}
                >
                    <HomeIcon color={design?.text_color} width={25} />
                </Link>
                <div
                    onClick={() => {
                        setOpenCart(!openCart);
                        setOpen(false);
                    }}
                    className={
                        'rounded-full relative p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear'
                    }
                >
                    <ShoppingCartIcon width={25} />
                    {cartList.length > 0 && (
                        <div className="absolute h-[15px] w-[15px] rounded-full cart-color flex items-center justify-center top-[3px] right-[4px]">
                            <p className="text-sm">{cartList.length}</p>
                        </div>
                    )}
<<<<<<< HEAD
                    <CartSideBar open={openCart} setOpen={setOpenCart} design={design}/>
=======
                    <CartSideBar
                        open={openCart}
                        setOpen={setOpenCart}
                        design={design}
                    />
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                </div>
                <Link
                    onClick={() => setOpen(false)}
                    href={'/profile'}
                    className={
                        'rounded-full p-3 text-gray-400 hover:text-gray-900 transition-all duration-300 ease-linear '
                    }
                >
                    <UserIcon width={25} />
                </Link>
            </div>

            {/* tablet and mobile view  */}

            <div className={`px-4 z-[7]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${open ? 'left-0 ' : 'left-[-140%] '}`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div className=" text-xl border-b-[2px] pb-5 text-center text-color flex justify-between items-center">
                            <p className="">Category</p>
                            <div onClick={() => setOpen(!open)} className="h-8">
                                {cancelIcon}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-[90%]">
                            {category?.map((item: any) => (
                                <SingleCategory
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
<<<<<<< HEAD
                {searchshow && <SearchDiv setSearchshow={setSearchshow} design={design}/>}
=======
                {searchshow && (
                    <SearchDiv setSearchshow={setSearchshow} design={design} />
                )}
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
            </AnimatePresence>
        </>
    );
};

export default MobileNavFive;

interface SearchDivProps {
    setSearchshow: (show: boolean) => void; // Type the function appropriately
<<<<<<< HEAD
    design:any
}

export const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow,design }) => {
=======
    design: any;
}

export const SearchDiv: React.FC<SearchDivProps> = ({
    setSearchshow,
    design,
}) => {
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
    const [searchTxt, setSearch] = useState('');

    return (
        <>
            <div
                onClick={() => setSearchshow(false)}
                className="fixed top-0 bottom-0 left-0 right-0"
            ></div>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 20, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ ease: 'easeOut', duration: 0.8 }}
                className="w-full h-8 fixed -top-2 px-2 left-0 right-0 z-[11]"
            >
                <input
                    type="text"
                    value={searchTxt ? searchTxt : ''}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full py-3 rounded-md px-10 border outline-0 focus:outline-0 focus:border-0 z-10"
                    placeholder="Search"
                />
                <div
                    className={`h-5 w-5 absolute top-4 left-4 font-bold z-[4] text-gray-400`}
                >
                    {searchIcon}
                </div>
                <div
                    onClick={() => {
                        setSearch('');
                        setSearchshow(false);
                    }}
                    className="h-4 w-4 absolute top-4 right-4 font-bold z-[4]"
                >
                    {cancelIcon}
                </div>
                {searchTxt && (
                    <div className="mx-5">
<<<<<<< HEAD
                        <Search3 search={searchTxt} setSearch={setSearch} design={design}/>
=======
                        <Search3
                            search={searchTxt}
                            setSearch={setSearch}
                            design={design}
                        />
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                    </div>
                )}
            </motion.nav>
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

interface SingleCategoryProps {
    item: Item;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SingleCategory: React.FC<SingleCategoryProps> = ({
    item,
    open,
    setOpen,
}) => {
    const [show, setShow] = useState(false);
    const subcategories = item?.subcategories || [];

    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    onClick={() => setOpen(!open)}
                    href={'/category/' + item.id}
                    className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                >
                    <img src={iconImg + item?.icon} alt="" className="h-5" />
                    <p>{item.name}</p>
                </Link>
                {subcategories?.length > 0 ? (
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
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {subcategories?.map((sub: any) => (
                            <div key={sub?.id} className="py-2">
                                <Link
                                    onClick={() => setOpen(!open)}
                                    href={'/category/' + sub?.id}
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
                </>
            )}
        </>
    );
};

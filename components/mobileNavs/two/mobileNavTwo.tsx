'use client';

import {
    HomeIcon,
    ShoppingCartIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import React, { useState, FC } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { iconImg } from '@/site-settings/siteUrl';
import { MobileNavProps } from '@/types';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import Search3 from '@/components/headers/components/search3';
import { cancelIcon, gridIcon, searchIcon } from '@/assets/svg';

const MobileNavTwo = ({ design }: MobileNavProps) => {
    const [active, setActive] = useState('home');
    const [open, setOpen] = useState(false);
    const [searchshow, setSearchshow] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    console.log('category', category);

    const styles = `
    .hoverIcon{
        color:${design?.header_color};
    }
    .cart-color {
        background: ${design?.header_color};
        color: ${design?.text_color};
    }
    `;

    const topBorder = `h-[4px] rounded-b-lg opacity-0 invisible`;
    const topBorderActive = `opacity-100 visible transition-all duration-300 ease-linear`;

    return (
        <>
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}
            <div className="lg:hidden h-[48px] bg-white shadow-lg drop-shadow-xl border border-t border-gray-100 flex justify-around items-center fixed bottom-0 left-0 right-0 z-10">
                <style>{styles}</style>
                <div className="group">
                    <div
                        style={{ backgroundColor: design?.header_color }}
                        className={
                            active === 'category' ? topBorderActive : topBorder
                        }
                    ></div>
                    <div
                        onClick={() => {
                            setOpen(!open);
                            setActive('category');
                        }}
                        className={
                            'rounded-full px-3 py-2 transition-all duration-300 ease-linear'
                        }
                    >
                        <div
                            className={active === 'category' ? 'hoverIcon' : ''}
                        >
                            {gridIcon}
                        </div>
                    </div>
                </div>
                <div className="group">
                    <div
                        style={{ backgroundColor: design?.header_color }}
                        className={
                            active === 'search' ? topBorderActive : topBorder
                        }
                    ></div>
                    <div
                        onClick={() => {
                            setSearchshow(!searchshow);
                            setActive('search');
                            setOpen(false);
                        }}
                        className={
                            'rounded-full px-3 py-2 transition-all duration-300 ease-linear'
                        }
                    >
                        <div className={active === 'search' ? 'hoverIcon' : ''}>
                            {searchIcon}
                        </div>
                    </div>
                </div>
                <div className="group">
                    <div
                        style={{ backgroundColor: design?.header_color }}
                        className={
                            active === 'home' ? topBorderActive : topBorder
                        }
                    ></div>
                    <Link href="/" passHref>
                        <div
                            onClick={() => setActive('home')}
                            className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
                        >
                            <HomeIcon
                                width={25}
                                className={active === 'home' ? 'hoverIcon' : ''}
                            />
                        </div>
                    </Link>
                </div>
                <div className="group">
                    <div
                        style={{ backgroundColor: design?.header_color }}
                        className={
                            active === 'cart' ? topBorderActive : topBorder
                        }
                    ></div>
                    <div
                        onClick={() => {
                            setOpenCart(!openCart);
                            setActive('cart');
                            setOpen(false);
                        }}
                        className={
                            'rounded-full relative px-3 py-2 transition-all duration-300 ease-linear'
                        }
                    >
                        <ShoppingCartIcon
                            width={25}
                            className={active === 'cart' ? 'hoverIcon' : ''}
                        />
                        {cartList.length > 0 && (
                            <div className="absolute h-4 w-4 rounded-full cart-color flex items-center justify-center top-0 right-2">
                                <p className="text-xs">{cartList.length}</p>
                            </div>
                        )}
                        <CartSideBar open={openCart} setOpen={setOpenCart} />
                    </div>
                </div>
                <div className="group">
                    <div
                        style={{ backgroundColor: design?.header_color }}
                        className={
                            active === 'user' ? topBorderActive : topBorder
                        }
                    ></div>
                    <Link href="/profile" passHref>
                        <div
                            onClick={() => {
                                setActive('user');
                                setOpen(false);
                            }}
                            className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
                        >
                            <UserIcon
                                width={25}
                                className={active === 'user' ? 'hoverIcon' : ''}
                            />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Tablet and mobile view */}
            <div className={`px-4 z-[7]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${open ? 'left-0 ' : 'left-[-140%] '}`}
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
                {searchshow && <SearchDiv setSearchshow={setSearchshow} />}
            </AnimatePresence>
        </>
    );
};

export default MobileNavTwo;

interface SearchDivProps {
    setSearchshow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow }) => {
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
                className="w-full h-8 fixed px-2 -top-9 left-0 right-0 z-[4]"
            >
                <input
                    type="text"
                    value={searchTxt}
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
                        <Search3 search={searchTxt} setSearch={setSearch} />
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
    subcategories?: SubItem[] | undefined; // This property is optional
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
                <Link href={`/category/${item.id}`} passHref>
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                    >
                        <img src={iconImg + item.icon} alt="" className="h-5" />
                        <p>{item.name}</p>
                    </div>
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
                <div className="ml-8">
                    {subcategories?.map((sub: any) => (
                        <div key={sub.id} className="py-2">
                            <Link href={`/category/${sub.id}`} passHref>
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-x-2 pb-2"
                                >
                                    <img
                                        src={iconImg + sub.icon}
                                        alt=""
                                        className="h-5"
                                    />
                                    <p className="text-sm text-gray-500">
                                        {sub.name}
                                    </p>
                                </div>
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

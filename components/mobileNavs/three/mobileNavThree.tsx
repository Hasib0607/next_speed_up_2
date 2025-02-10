'use client';

import {
    HomeIcon,
    ShoppingCartIcon,
    UserIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import Search3 from '@/components/headers/components/search3';
import { useSelector } from 'react-redux';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { iconImg } from '@/site-settings/siteUrl';
import { customizeMobileNavThree } from '@/utils/customizeDesign';
import { RootState } from '@/redux/store';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { cancelIcon, gridIcon, searchIcon } from '@/assets/svg';
import { MobileNavProps } from '@/types';

const MobileNavThree = ({ design }: MobileNavProps) => {
    const [active, setActive] = useState('home');
    const [open, setOpen] = useState(false);
    const [searchshow, setSearchshow] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const bottomBorder = 'h-[4px] rounded-t-lg opacity-0 invisible';
    const bottomBorderActive =
        'h-[4px] rounded-t-lg opacity-100 visible transition-all duration-300 ease-linear';

    const styleCss = `
      .cart-color {
        background: ${design?.text_color};
        color: ${design?.header_color};
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
            <div
                style={{ backgroundColor: design?.header_color }}
                className="lg:hidden h-[48px] shadow-lg drop-shadow-xl flex justify-around items-center fixed bottom-4 left-2 right-2 z-[100] rounded-2xl"
            >
                {['category', 'search', 'home', 'cart', 'user'].map((item) => (
                    <div className="group" key={item}>
                        <div
                            onClick={() => {
                                if (item === 'category') setOpen(!open);
                                if (item === 'search')
                                    setSearchshow(!searchshow);
                                if (item === 'home') setActive('home');
                                if (item === 'cart') setOpenCart(!openCart);
                                else setActive(item);
                            }}
                            className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
                        >
                            {item === 'category' && (
                                <div
                                    className={`${active === 'category' ? 'text-gray-400' : ''}`}
                                >
                                    {React.cloneElement(gridIcon, {
                                        color: design?.text_color,
                                    })}
                                </div>
                            )}
                            {item === 'search' && (
                                <div
                                    className={`${active === 'search' ? 'text-gray-400' : ''}`}
                                >
                                    {React.cloneElement(searchIcon, {
                                        color: design?.text_color,
                                    })}
                                </div>
                            )}
                            {item === 'home' && (
                                <Link href="/" passHref>
                                    <div
                                        onClick={() => setActive('home')}
                                        className="rounded-full px-3 py-2 transition-all duration-300 ease-linear"
                                    >
                                        <HomeIcon
                                            width={25}
                                            color={design?.text_color}
                                            className={
                                                active === 'home'
                                                    ? 'hoverIcon'
                                                    : ''
                                            }
                                        />
                                    </div>
                                </Link>
                            )}
                            {item === 'cart' && (
                                <div className="relative">
                                    <ShoppingCartIcon
                                        width={25}
                                        color={design?.text_color}
                                        className={
                                            active === 'cart'
                                                ? 'text-gray-400'
                                                : ''
                                        }
                                    />
                                    {cartList.length > 0 && (
                                        <div className="absolute h-[15px] w-[15px] rounded-full cart-color flex items-center justify-center top-[-4px] right-[-4px]">
                                            <p className="text-sm">
                                                {cartList.length}
                                            </p>
                                        </div>
                                    )}
                                    <CartSideBar
                                    design={design}
                                        open={openCart}
                                        setOpen={setOpenCart}
                                    />
                                </div>
                            )}
                            {item === 'user' && (
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
                                            color={design?.text_color}
                                            className={
                                                active === 'user'
                                                    ? 'hoverIcon'
                                                    : ''
                                            }
                                        />
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div
                            style={{ backgroundColor: design?.text_color }}
                            className={
                                active === item
                                    ? bottomBorderActive
                                    : bottomBorder
                            }
                        ></div>
                    </div>
                ))}
            </div>

            {/* this to show */}
            <div className={`px-4 z-[7]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${open ? 'left-0' : 'left-[-140%]'}`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div className="text-xl border-b-[2px] pb-5 text-center text-color flex justify-between items-center">
                            <p>Category</p>
                            <div onClick={() => setOpen(!open)} className="h-8">
                                {cancelIcon}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
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
                {searchshow && <SearchDiv setSearchshow={setSearchshow} design={design}/>}
            </AnimatePresence>
        </>
    );
};

export default MobileNavThree;

interface SearchDivProps {
    setSearchshow: (show: boolean) => void;
    design:any;
}

const SearchDiv: React.FC<SearchDivProps> = ({ setSearchshow,design }) => {
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
                className="w-full h-8 fixed -top-9 px-2 left-0 right-0 z-10"
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
                        <Search3 search={searchTxt} setSearch={setSearch} design={design}/>
                    </div>
                )}
            </motion.div>
        </>
    );
};

interface SubCategory {
    id: string;
    icon?: string;
    name: string;
}

interface Category {
    id: string;
    icon?: string;
    name: string;
    subcategories?: SubCategory[];
}

interface SingleCatProps {
    item: Category;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const SingleCat: React.FC<SingleCatProps> = ({
    item,
    open,
    setOpen,
}) => {
    const [show, setShow] = useState(false);

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const mobileNavThreeIcon = customizeMobileNavThree.find(
        (item) => item.id == store_id
    );
    const subcategories = item?.subcategories || [];

    return (
        <>
            <div className="w-full flex justify-between py-3 lg:cursor-pointer">
                <Link href={`/category/${item.id}`} passHref>
                    <span
                        onClick={() => setOpen(!open)}
                        className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                    >
                        {/* this condition for lotus bloem which store_id is 9501 */}
                        {!mobileNavThreeIcon?.category_icon_not_show && (
                            <img
                                src={`${iconImg}${item?.icon}`}
                                alt={item.name}
                                className="h-5"
                            />
                        )}
                        <p>{item.name}</p>
                    </span>
                </Link>
                {subcategories?.length > 0 && (
                    <div className="px-4 h-full">
                        {show ? (
                            <IoIosArrowUp
                                onClick={() => setShow(!show)}
                                className="text-gray-800"
                            />
                        ) : (
                            <IoIosArrowDown
                                onClick={() => setShow(!show)}
                                className="text-gray-800"
                            />
                        )}
                    </div>
                )}
            </div>

            {show && (
                <div className="ml-8">
                    {subcategories?.map((sub: any) => (
                        <div className="py-2" key={sub.id}>
                            <Link href={`/category/${sub.id}`} passHref>
                                <span
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-x-2 pb-2"
                                >
                                    {/* this condition for lotus bloem which store_id is 9501 */}
                                    {!mobileNavThreeIcon?.category_icon_not_show && (
                                        <img
                                            src={`${iconImg}${sub.icon}`}
                                            alt={sub.name}
                                            className="h-5"
                                        />
                                    )}
                                    <p className="text-sm text-gray-500">
                                        {sub.name}
                                    </p>
                                </span>
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

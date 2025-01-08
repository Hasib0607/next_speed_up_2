'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

import { CgShoppingBag } from 'react-icons/cg';
import { IoSearchCircleOutline } from 'react-icons/io5';

import Search3 from '../components/search3';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';

const HeaderDown = ({ design, menu, headersetting }: any) => {
    const [searchTxt, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    return (
        <div className="mb-2">
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />
            <div className="flex justify-between items-center lg:grid lg:grid-cols-12 shadow-lg bg-white sm:px-10 px-5 pt-2 pb-2 ">
                <div className="flex space-x-5 items-center col-span-3 ">
                    <div
                        className="border border-gray-300 p-1 lg:cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <GiHamburgerMenu className="h-5 w-5" />
                    </div>
                    <div className="lg:block hidden">
                        {headersetting?.logo === null ? (
                            <Link href="/">
                                <p className="text-xl uppercase">
                                    {headersetting?.website_name}
                                </p>
                            </Link>
                        ) : (
                            <Link href="/">
                                <img
                                    className="h-10"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                </div>

                <div className="col-span-7 md:col-span-6 relative lg:block hidden">
                    <input
                        placeholder={'Search a product...'}
                        value={searchTxt}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 rounded-full h-8 w-full  focus:border focus:ring-0 focus:outline-0 focus:border-gray-100 px-4 transition-all duration-300 ease-linear bg-gray-100 text-xs flex items-center"
                        type="text"
                    />
                    <div className="absolute right-2 top-0 bottom-0 flex items-center">
                        <div
                            style={{
                                background: design?.header_color,
                                color: design?.text_color,
                            }}
                            className="rounded-full"
                        >
                            <IoSearchCircleOutline className="h-6 w-8" />
                        </div>
                    </div>
                    {searchTxt && (
                        <div className="lg:w-full left-0 absolute top-1 z-50">
                            <Search3 search={searchTxt} setSearch={setSearch} />
                        </div>
                    )}
                </div>

                <div
                    onClick={() => setOpenCart(!openCart)}
                    className=" items-center md:col-span-3 col-span-2 justify-self-end lg:flex hidden"
                >
                    <p
                        style={{ color: design?.header_color }}
                        className={`pr-1 lg:cursor-pointer menu-hover`}
                    >
                        <CgShoppingBag className="text-3xl" />
                    </p>
                </div>
                <div className="lg:hidden">
                    {headersetting?.logo === null ? (
                        <Link href="/">
                            <p className="text-xl uppercase">
                                {headersetting?.website_name}
                            </p>
                        </Link>
                    ) : (
                        <Link href="/">
                            <img
                                className="h-10"
                                src={imgUrl + headersetting?.logo}
                                alt="logo"
                            />
                        </Link>
                    )}
                </div>
            </div>
            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="">
                <ul
                    className={` bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    }`}
                >
                    <div className="flex justify-between px-6 py-4">
                        <div>
                            {headersetting?.logo === null ? (
                                <Link href="/">
                                    <p className="text-xl uppercase">
                                        {headersetting?.website_name}
                                    </p>
                                </Link>
                            ) : (
                                <Link href="/">
                                    <img
                                        className="h-10"
                                        src={imgUrl + headersetting?.logo}
                                        alt="logo"
                                    />
                                </Link>
                            )}
                        </div>
                        <XMarkIcon
                            onClick={() => setOpen(!open)}
                            className="h-7"
                        />
                    </div>

                    <div className="px-6">
                        <div className="flex flex-col space-y-3 mt-5 z-50">
                            {menu?.slice(0, 6)?.map(
                                (item: any) =>
                                    item?.status == 1 && (
                                        <div key={item.id}>
                                            <Link
                                                onClick={() => setOpen(false)}
                                                href={
                                                    item?.custom_link ||
                                                    (item?.url
                                                        ? `/${item?.url}`
                                                        : '/')
                                                }
                                            >
                                                <p className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium">
                                                    {item.name}
                                                </p>
                                            </Link>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderDown;

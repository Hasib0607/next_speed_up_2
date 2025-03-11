'use client';

import { headerBg } from '@/site-settings/color';
import { imgUrl } from '@/site-settings/siteUrl';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { RootState } from '@/redux/store';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import Search3 from '../components/search3';
import Category from '../header-three/category';

const HeaderMenu = ({ headersetting, design, menu }: any) => {
    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [hoverSearch, setHoverSearch] = useState(false);
    const [hoverBag, setHoverBag] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
    };

    const bgColor = design?.header_color;

    const { cartList } = useSelector((state: RootState) => state?.cart);

    const total = subTotal(cartList);

    return (
        <div className="relative">
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <div className=" flex justify-between items-center">
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
                                className="h-[45px] w-auto overflow-hidden"
                                src={imgUrl + headersetting?.logo}
                                alt="logo"
                            />
                        </Link>
                    )}
                </div>

                <div>
                    <div className="flex-row items-center hidden gap-7 xl:gap-5 text-sm font-bold list-none lg:cursor-pointer md:flex">
                        <Category menu={menu} design={design} />
                    </div>
                </div>
                <div className="flex items-center relative gap-3">
                    <div className="flex items-center relative">
                        {!searchInput && (
                            <>
                                <p
                                    style={{
                                        color: hoverSearch ? bgColor : '',
                                    }}
                                    onMouseEnter={() => setHoverSearch(true)}
                                    onMouseLeave={() => setHoverSearch(false)}
                                    className="lg:cursor-pointer absolute right-2"
                                    onClick={() => setSearchInput(!searchInput)}
                                >
                                    <BsSearch className="text-2xl" />
                                </p>
                            </>
                        )}
                        {searchInput && (
                            <div className="absolute center">
                                <input
                                    value={searchTxt}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    className="xl:w-60 p-2 absolute -left-60 lg:w-60 border-gray-300 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
                                    placeholder="Search your products "
                                />
                                <p
                                    style={{ color: headerBg }}
                                    className="absolute z-10 center right-1"
                                    onClick={handleClose}
                                >
                                    <AiOutlineClose className="text-xl lg:cursor-pointer" />
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-1 items-center">
                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex items-center lg:cursor-pointer"
                        >
                            <p
                                style={{
                                    color: hoverBag ? bgColor : '',
                                    padding: '4px',
                                }}
                                onMouseEnter={() => setHoverBag(true)}
                                onMouseLeave={() => setHoverBag(false)}
                            >
                                <HiOutlineShoppingBag className="text-3xl font-thin" />
                            </p>
                            <p
                                style={{
                                    background: bgColor,
                                    color: design?.text_color,
                                }}
                                className="bg-[#c0b07d] text-sm text-white mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
                            >
                                {cartList.length}
                            </p>
                        </div>
                        <p
                            className={`text-lg font-bold lg:cursor-default mt-1 hover:text-[${headerBg}]`}
                        >
                            <BDT price={total} />
                        </p>
                    </div>
                </div>
                {searchTxt && (
                    <div className="absolute w-128 top-10 right-0">
                        <Search3
                            search={searchTxt}
                            setSearch={setSearch}
                            design={design}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderMenu;

'use client';

import { imgUrl } from '@/site-settings/siteUrl';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { RiCloseCircleLine, RiMenu3Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { RootState } from '@/redux/store';
import { subTotal } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import { GiHamburgerMenu } from 'react-icons/gi';
import Search3 from '../components/search3';
import SideCategory from '../components/side-category';
import SideMenu from '../components/side-menu';

const HeaderMenu = ({ headersetting, menu, design }: any) => {
    const [searchInput, setSearchInput] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
    };

    const { cartList } = useSelector((state: RootState) => state.cart);

    const total = subTotal(cartList);

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 90) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    const styleCss = `
        .navbarSixteen.openMenu {
            display: block;
            position: fixed;
            background: white;
            width: 100%;
            z-index: 5;
            top:0;
            animation: fadeIn 0.2s ease-in both;

        }
    `;

    return (
        <div>
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <style>{styleCss}</style>
            <div
                className={`bg-slate-50 z-[5] border-b-[1px] relative  ${
                    openMenu ? 'navbarSixteen openMenu py-2' : 'py-3'
                }`}
            >
                <div className={`sm:container px-5 `}>
                    <div
                        className={`${
                            searchInput === true ? 'opacity-0' : 'opacity-1'
                        } flex justify-between items-center`}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => setOpen(!open)}
                                className="lg:cursor-pointer col-span-3 md:col-span-1 lg:block hidden"
                            >
                                <RiMenu3Fill className="text-4xl menu-hover " />
                            </div>
                            {headersetting?.logo === null ? (
                                <Link href="/">
                                    <p className="text-xl uppercase">
                                        {headersetting?.website_name}
                                    </p>
                                </Link>
                            ) : (
                                <Link href="/">
                                    <div
                                        className={`h-[50px] w-[80px] ${openMenu ? 'max-w-[100px]' : 'max-w-[120px]'}`}
                                    >
                                        <img
                                            className="h-full w-full object-contain"
                                            src={imgUrl + headersetting?.logo}
                                            alt="logo"
                                        />
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div>
                            <ul className="lg:flex lg:flex-row lg:gap-8 lg:justify-center hidden ">
                                {menu?.slice(0, 6)?.map(
                                    (item: any) =>
                                        item.status == 1 && (
                                            <div key={item.id} className="">
                                                <li>
                                                    <Link
                                                        href={
                                                            item?.custom_link ||
                                                            (item?.url
                                                                ? `/${item?.url}`
                                                                : '/')
                                                        }
                                                    >
                                                        <h1 className="flex uppercase justify-between items-center group font-semibold text-sm menu-hover">
                                                            {item.name}
                                                        </h1>
                                                    </Link>
                                                </li>
                                            </div>
                                        )
                                )}
                            </ul>
                        </div>

                        <div className="gap-5 justify-center items-center lg:flex hidden">
                            <div onClick={() => setSearchInput(!searchInput)}>
                                <FaSearch className="text-3xl lg:cursor-pointer menu-hover " />
                            </div>
                            <div
                                onClick={() => setOpenCart(!openCart)}
                                className="relative"
                            >
                                <FaShoppingCart className="text-3xl menu-hover lg:cursor-pointer" />
                                <div className="absolute h-6 w-6 rounded-full bg-color flex items-center justify-center -top-2 -right-2">
                                    <p className="text-white text-sm">
                                        {cartList.length}
                                    </p>
                                </div>
                            </div>
                            <div className="md:block hidden">
                                <p className="text-lg text-gray-700 font-normal">
                                    Shopping Cart
                                </p>
                                <p className="text-lg font-medium">
                                    <BDT price={total} />
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex lg:hidden"
                            onClick={() => setView(!view)}
                        >
                            <GiHamburgerMenu className="h-8" />
                        </div>
                    </div>

                    {searchInput && (
                        <div className="absolute left-0 ml-[7%] top-6 w-[65%] sm:w-[80%] md:w-[80%] lg:w-[83%] h-10 z-30 flex items-center">
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="w-full py-3 absolute border-blue-300 outline-none bg-gray-100 focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
                                placeholder="Search your products "
                            />
                            <p
                                style={{ color: design?.header_color }}
                                className="absolute z-10 -right-10"
                                onClick={handleClose}
                            >
                                <RiCloseCircleLine className="text-3xl lg:cursor-pointer" />
                            </p>
                        </div>
                    )}
                    {searchTxt && (
                        <div className="left-0 sm:ml-[7%] w-full sm:w-[80%] md:w-[80%] lg:w-[83%] absolute top-10">
                            <Search3
                                search={searchTxt}
                                setSearch={setSearch}
                                design={design}
                            />
                        </div>
                    )}
                </div>
            </div>
                <div
                    className={`top-0 fixed bg-white sm:w-96 w-52 h-auto overflow-y-auto bottom-0 pb-5 z-[4] lg:cursor-pointer ${openMenu ? 'mt-16 pt-6 animate-out' : 'mt-32 pt-10'} ${
                        open ? 'left-0 ' : 'left-[-160%]'
                    }`}
                >
                    <div className="pb-7 px-6">
                        <SideCategory design={design} />
                    </div>
                </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}

            {view && (
                <div
                    onClick={() => setView(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <ul
                className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-20 lg:cursor-pointer ${
                    view ? 'left-0' : 'left-[-160%]'
                }`}
            >
                <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden ">
                    <h3>MENU</h3>
                    <ArrowLeftIcon
                        onClick={() => setView(!view)}
                        className="h-7"
                    />
                </div>
                <div className="px-6">
                    <SideMenu
                        setOpen={setOpen}
                        design={design}
                        menu={menu}
                        menuLoading={false}
                    />
                </div>
            </ul>
        </div>
    );
};

export default HeaderMenu;

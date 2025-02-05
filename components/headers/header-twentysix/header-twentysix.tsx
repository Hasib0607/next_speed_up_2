'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiShoppingBagLine } from 'react-icons/ri';

import { Menu, Transition } from '@headlessui/react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import LoginTwentyOne from '../../sign-in/signin-twentyone';

import Search3 from '../components/search3';
import SideMenu from '../components/side-menu';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import { GiHamburgerMenu } from 'react-icons/gi';
import defaultUserImage from '@/assets/default-user-image.png';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderTwentySix = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);

    const [openCat, setOpenCat] = useState(false);
    const [login, setLogin] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const handleClose = () => {
        setSearch('');
    };

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 120) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    });

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Yantramanav&display=swap');

    .navbarTwentyOne.openMenu {
        position: fixed;
        background: #dddfff;
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .input-hover-thirty {
        border: 1px solid ${design?.header_color};
    }
    .cat-hover-thirty:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    .font-twenty-six {
        font-family: 'Yantramanav', sans-serif;
    }
    h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div{
        font-family: 'Yantramanav', sans-serif;
    }
`;

    return (
        <div>
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />

            <div className="">
                {/* header top  */}
                <div className="bg-gray-100 ">
                    <div className="lg:flex hidden justify-between items-center sm:container px-5">
                        <div className="flex gap-2 items-center text-gray-500">
                            <p>
                                Support:{' '}
                                <span className="text-black">
                                    {headersetting?.phone}
                                </span>
                            </p>
                        </div>
                        <div className="relative">
                            {/* Authenticate routes dropdown  */}
                            {isAuthenticated ? (
                                <Menu as="div" className="ml-3 relative py-3">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                                {isAuthenticated ? (
                                                    <img
                                                        src={
                                                            user?.image
                                                                ? user?.image
                                                                : `${defaultUserImage.src}`
                                                        }
                                                        alt=""
                                                        className="object-fit"
                                                    />
                                                ) : (
                                                    <svg
                                                        className="h-full w-full text-gray-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                )}
                                            </span>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {isAuthenticated && (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/profile"
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="profile/order"
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Order
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <div
                                                                onClick={
                                                                    handleLogOut
                                                                }
                                                                className={classNames(
                                                                    active
                                                                        ? 'bg-gray-100'
                                                                        : '',
                                                                    'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
                                                                )}
                                                            >
                                                                Sign out
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <div>
                                    <p
                                        onClick={() => setLogin(!login)}
                                        className="uppercase text-sm font-medium lg:cursor-pointer py-3"
                                    >
                                        Login / Register{' '}
                                        <MdKeyboardArrowDown className="inline" />
                                    </p>
                                    {login && (
                                        <div className="relative w-full">
                                            <div className="absolute top-0 right-0 w-max bg-red-100 z-50">
                                                <LoginTwentyOne />
                                            </div>
                                            <div
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                }}
                                                className="absolute h-4 w-4 top-8 right-20 rotate-45 z-40"
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* header middle  */}
                <div className="flex justify-between items-center sm:container px-5 pt-3">
                    <div className={`w-full max-w-max`}>
                        {headersetting?.logo === null ? (
                            <Link href="/">
                                <p className="text-xl uppercase">
                                    {headersetting?.website_name}
                                </p>
                            </Link>
                        ) : (
                            <Link href="/">
                                <img
                                    className="h-16"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                    <div className="lg:flex hidden items-center justify-between w-full lg:mx-20 md:mx-3 relative input-hover-thirty rounded-md">
                        <input
                            type="text"
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter your keyword..."
                            className="w-full pl-2 ring-0 outline-none border-0 rounded-md focus:outline-none focus:border-0 focus:ring-0"
                        />
                        <div className="w-max flex justify-center  md:lg:cursor-pointer absolute right-3">
                            {searchTxt.length === 0 ? (
                                <p className="menu-hover">SEARCH</p>
                            ) : (
                                <AiOutlineClose
                                    onClick={handleClose}
                                    className="text-xl menu-hover"
                                />
                            )}
                        </div>
                        {searchTxt && (
                            <div className="absolute z-[15] top-8 xl:right-0 -right-24 w-full">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                    <div className="lg:flex hidden items-center gap-x-5">
                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                        >
                            <RiShoppingBagLine className="text-2xl" />
                        </div>
                    </div>
                    <div
                        className="lg:cursor-pointer flex lg:hidden gap-x-1 justify-center items-center pb-5"
                        onClick={() => setOpen(!open)}
                    >
                        <GiHamburgerMenu className="h-10" />
                    </div>
                </div>
                {/* mobile search  */}
                <div className="sm:container mx-5 py-2">
                    <div className="flex lg:hidden items-center justify-between w-full  relative input-hover-thirty rounded-md">
                        <input
                            type="text"
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter your keyword..."
                            className="w-full pl-2 ring-0 outline-none border-0 rounded-md focus:outline-none focus:border-0 focus:ring-0"
                        />
                        <div className="w-max flex justify-center  md:lg:cursor-pointer absolute right-3">
                            {searchTxt.length === 0 ? (
                                <p className="menu-hover">SEARCH</p>
                            ) : (
                                <AiOutlineClose
                                    onClick={handleClose}
                                    className="text-xl menu-hover"
                                />
                            )}
                        </div>
                        {searchTxt && (
                            <div className="absolute z-10 top-1 w-full">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* header bottom */}

                <div
                    className={`sm:container px-5 items-center my-3 lg:flex hidden gap-x-5`}
                >
                    <div className="">
                        <div className="relative">
                            <p
                                onClick={() => setOpenCat(!openCat)}
                                className="w-60 bg-gray-400 rounded-md cat-hover-thirty text-center py-5 px-2 md:lg:cursor-pointer uppercase font-semibold text-sm"
                            >
                                All Categories{' '}
                                <MdKeyboardArrowDown className="text-xl inline " />
                            </p>

                            {openCat && (
                                <div className="flex flex-col absolute left-0 top-[60px] border-2 border-gray-400 rounded-bl-md rounded-br-md bg-gray-50 w-full z-[1]">
                                    {category?.map((cat: any) => (
                                        <Link
                                            key={cat.id}
                                            href={'/category/' + cat?.id}
                                        >
                                            <ul
                                                className="border-b rounded-bl-md rounded-br-md py-4 pl-4 cat-hover-thirty"
                                                key={cat?.id}
                                            >
                                                <li className="text-sm font-medium">
                                                    {cat?.name}
                                                </li>
                                            </ul>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`flex gap-4`}>
                        {menu?.slice(0, 7).map(
                            (menu: any) =>
                                menu.status == 1 && (
                                    <ul
                                        className="group relative xl:pr-10 pr-6"
                                        key={menu?.id}
                                    >
                                        <Link
                                            href={
                                                menu?.custom_link ||
                                                (menu?.url
                                                    ? `/${menu?.url}`
                                                    : '/')
                                            }
                                            className="flex items-center"
                                        >
                                            <li className="text-lg font-medium py-3 uppercase menu-hover">
                                                {menu?.name}
                                            </li>
                                        </Link>
                                    </ul>
                                )
                        )}
                    </div>
                </div>
                <div
                    className={`${
                        openMenu
                            ? 'navbarTwentyOne openMenu lg:block hidden'
                            : 'hidden'
                    }`}
                >
                    <div className="sm:container px-5 flex gap-4">
                        {menu?.slice(0, 7).map(
                            (menu: any) =>
                                menu.status == 1 && (
                                    <ul
                                        className="group relative xl:pr-10 pr-6"
                                        key={menu?.id}
                                    >
                                        <Link
                                            href={
                                                menu?.custom_link ||
                                                (menu?.url
                                                    ? `/${menu?.url}`
                                                    : '/')
                                            }
                                            className="flex items-center"
                                        >
                                            <li className="text-lg font-medium py-3 uppercase menu-hover">
                                                {menu?.name}
                                            </li>
                                        </Link>
                                    </ul>
                                )
                        )}
                    </div>
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

            <ul
                className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-20 lg:cursor-pointer ${
                    open ? 'left-0' : 'left-[-160%]'
                }
      `}
            >
                <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden ">
                    <h3>MENU</h3>
                    <ArrowLeftIcon
                        onClick={() => setOpen(!open)}
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

export default HeaderTwentySix;

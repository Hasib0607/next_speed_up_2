'use client';

import './header-seventeen.css';
import React, { useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { IoCartSharp, IoMenuOutline } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import Search3 from '../components/search3';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';

import { classNames } from '@/helpers/littleSpicy';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import SideMenu from './side-menu';

const HeaderSeventeen = ({ headersetting, design, menu, cartList }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
    };

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
    .navbarSeventeen.openMenu {
        display: block;
        position: fixed;
        opacity:1;
        width: 100%;
        height:80px;
        z-index: 5;
        top:0;
        animation: fadeIn 0.2s ease-in both;
    }

    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
     }
    .hover-color:hover {
        color:  ${design?.header_color};
     }

    `;

    return (
        <div className={`pb-6 lg:pb-0`}>
            <style>{styleCss}</style>
            <div
                className={`w-full h-20 bg-sky-200  top-0 ${
                    openMenu === true && searchInput === true
                        ? 'z-10 fixed'
                        : 'z-10 absolute'
                }`}
            >
                <div className="w-full text-center pt-5 relative">
                    <input
                        value={searchTxt}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-[80%] md:w-[60%] lg:w-[50%] rounded-lg border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 "
                        placeholder="Search anything"
                    />
                    <p
                        className="absolute md:right-5 right-2 md:top-6 top-8"
                        onClick={handleClose}
                    >
                        <GrClose className="md:text-3xl text-lg lg:cursor-pointer " />
                    </p>
                </div>
                {searchTxt && (
                    <div className="w-full flex justify-center">
                        <Search3 search={searchTxt} setSearch={setSearch} />
                    </div>
                )}
            </div>

            <div
                className={`relative h-20 bg-white ${
                    searchInput === true ? ' mt-20' : 'mt-0 z-[20]'
                } ${
                    openMenu === true && searchInput === true && 'mt-0 '
                } duration-1000 `}
            >
                <div className="">
                    <div
                        className={`${
                            openMenu
                                ? 'navbarSeventeen openMenu'
                                : 'absolute -bottom-7 z-[4] h-20 w-[80%] sm:w-[85%] md:w-[90%] lg:w-[80%] xl:w-[70%] left-[50%] translate-x-[-50%]'
                        }`}
                    >
                        <div className="seventeen-menu relative">
                            <div className="seventeen-menu-left absolute z-[5] -left-[38px]"></div>
                            <div className="seventeen-menu-right absolute z-[5] -right-[38px]"></div>
                            <div className="flex justify-between">
                                <div
                                    className={`${
                                        openMenu === true
                                            ? 'hidden'
                                            : 'relative -top-5 sm:left-0 -left-4 z-10 h-28 max-w-[130px] overflow-hidden'
                                    }`}
                                >
                                    <div className="flex justify-center items-center h-full">
                                        <Link href="/">
                                            {' '}
                                            <img
                                                src={
                                                    headersetting?.logo
                                                        ? imgUrl +
                                                          headersetting?.logo
                                                        : headersetting?.website_name
                                                }
                                                alt=""
                                                className="h-auto min-w-full"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute lg:block hidden left-[50%] translate-x-[-50%] top-[27%] ">
                                    <SideMenu
                                        setOpen={setOpen}
                                        open={open}
                                        menu={menu}
                                    />
                                </div>

                                <div
                                    className={`flex items-center gap-5 absolute top-[27%] text-white ${
                                        openMenu === true
                                            ? 'lg:right-40 right-[50%] translate-x-[50%]'
                                            : 'right-5'
                                    }`}
                                >
                                    <div
                                        onClick={() => setOpen(!open)}
                                        className="lg:hidden flex items-center gap-1 lg:cursor-pointer"
                                    >
                                        <IoMenuOutline className="text-2xl" />
                                        <p className="text-base md:block hidden">
                                            Menu
                                        </p>
                                    </div>

                                    {/* My account dropdown menu start */}
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left "
                                    >
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full ">
                                                <FaUserTie className="text-xl text-white hover-color" />
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
                                            <Menu.Items className="absolute -right-4 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {isAuthenticated ? (
                                                        <div>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <Link
                                                                        href="/profile"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        My
                                                                        account
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <Link
                                                                        href="/checkout"
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100 text-gray-900'
                                                                                : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Checkout
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({
                                                                    active,
                                                                }) => (
                                                                    <div
                                                                        onClick={
                                                                            handleLogOut
                                                                        }
                                                                        className={classNames(
                                                                            active
                                                                                ? 'bg-gray-100'
                                                                                : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        Sign out
                                                                    </div>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    ) : (
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    href="/login"
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100 text-gray-900'
                                                                            : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    Sign in
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    )}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    {/* My account dropdown menu finished */}

                                    <div
                                        onClick={() => setOpenCart(!openCart)}
                                        className="relative"
                                    >
                                        <IoCartSharp className="text-xl menu-hover lg:cursor-pointer text-white hover-color" />
                                        <div className="absolute h-4 w-4 rounded-full border flex items-center justify-center -top-2 -right-[10px]">
                                            <p className="text-white text-[10px]">
                                                {cartList.length}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <IoMdSearch
                                            onClick={() =>
                                                setSearchInput(!searchInput)
                                            }
                                            className="text-xl lg:cursor-pointer hover-color"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute lg:-bottom-5 -bottom-11 z-[3] h-6 w-full">
                    <div className="seventeenHeaderBackground"></div>
                </div>
            </div>

            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />

            {/* tablet and mobile view  */}

            <div className={`px-4 z-[7]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${
                        open ? 'right-0 ' : 'right-[-140%] '
                    }`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div className=" pb-5 flex justify-end text-color mb-3">
                            <GrClose
                                onClick={() => setOpen(!open)}
                                className="text-xl hover-color"
                            />
                        </div>
                        <SideMenu setOpen={setOpen} open={open} menu={menu} />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderSeventeen;

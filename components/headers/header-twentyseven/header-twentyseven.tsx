'use client';

import React, { Fragment } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { RiShoppingBagLine } from 'react-icons/ri';
import { useState } from 'react';

import { HiMenu } from 'react-icons/hi';

import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import Search3 from '../components/search3';
import { IoSearchOutline } from 'react-icons/io5';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SideMenu from '../components/side-menu';
import defaultUserImage from '@/assets/default-user-image.png';
import { classNames } from '@/helpers/littleSpicy';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderTwentySeven = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);

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
        setOpen(false);
    };

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
      .navbarTwentyFour.openMenu {
          position: fixed;
          background: #F2E1D9;
          opacity:1;
          width: 100%;
          z-index: 10;
          top:0;
          animation: fadeIn 0.2s ease-in both;
  
        }
      .all-hover:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
  
      .menu-hover:hover {
        color:  ${design?.header_color};
       
    }
    .border-cat {
      border: 2px solid ${design?.header_color};
    }
    .border-hover-menu:hover{
      border-bottom: 1px solid ${design?.text_color};
    }
  
    
    .font-twenty-seven {
        font-family: 'Inter', sans-serif;
    }
  
    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Inter', sans-serif;
    }
  
`;

    return (
        <div className="sticky z-[5] top-0 left-0 h-20 flex items-center bg-white w-full">
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />
            <style>{styleCss}</style>
            <div className="flex items-center justify-between sm:container px-5 w-full">
                <div className={`h-16`}>
                    {headersetting?.logo === null ? (
                        <Link href="/">
                            <p className="text-xl uppercase">
                                {headersetting?.website_name}
                            </p>
                        </Link>
                    ) : (
                        <Link href="/">
                            <img
                                className="h-full w-full"
                                src={imgUrl + headersetting?.logo}
                                alt="logo"
                            />
                        </Link>
                    )}
                </div>
                <div className={`lg:block hidden`}>
                    {!open && (
                        <div className="flex justify-start xl:gap-10 gap-4 uppercase text-[14px] py-4">
                            {menu?.slice(0, 6)?.map(
                                (menu: any) =>
                                    menu.status == 1 && (
                                        <ul key={menu.id}>
                                            <Link
                                                href={
                                                    menu?.custom_link ||
                                                    (menu?.url
                                                        ? `/${menu?.url}`
                                                        : '/')
                                                }
                                            >
                                                <li className="">
                                                    {menu.name}
                                                </li>
                                            </Link>
                                        </ul>
                                    )
                            )}
                        </div>
                    )}
                    {open && (
                        <div className="lg:flex items-center hidden relative w-96">
                            <input
                                autoFocus
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className={`outline-none w-full focus:outline-none focus:ring-0 focus:border-gray-400 h-8 bg-transparent placeholder:text-[${design?.text_color}] border-0 border-b border-gray-400 text-sm`}
                            />
                            <div className="">
                                <AiOutlineClose
                                    onClick={handleClose}
                                    className="text-sm -ml-4 lg:cursor-pointer"
                                />
                            </div>
                            {searchTxt && (
                                <div className="absolute z-20 top-4 -right-48 w-[800px]">
                                    <Search3
                                        search={searchTxt}
                                        setSearch={setSearch}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="justify-between items-center gap-10 lg:flex hidden">
                    {!open && (
                        <div className="lg:block hidden">
                            <IoSearchOutline
                                onClick={() => setOpen(true)}
                                className="text-xl"
                            />
                        </div>
                    )}

                    <div className="lg:block hidden">
                        {/* Authenticate routes dropdown  */}
                        {isAuthenticated ? (
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                            {user?.image || user?.social_img ? (
                                                <img
                                                    src={
                                                        user?.image
                                                            ? user?.image
                                                            : user?.social_img
                                                    }
                                                    alt="user"
                                                    className="object-fit"
                                                />
                                            ) : (
                                                <img
                                                    src={defaultUserImage.src}
                                                    alt="user"
                                                    className="object-fit"
                                                />
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
                            <Link href="/login">
                                <p className="">Sign In</p>
                            </Link>
                        )}
                    </div>

                    <div
                        onClick={() => setOpenCart(!openCart)}
                        className="relative lg:block hidden"
                    >
                        <RiShoppingBagLine className="text-3xl font-thin" />
                    </div>
                </div>
                <div
                    onClick={() => setOpenMenu(!openMenu)}
                    className="lg:hidden block"
                >
                    <HiMenu className="text-2xl" />
                </div>
            </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}

            <div className="block lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        openMenu ? 'left-0' : 'left-[-160%]'
                    } `}
                >
                    <div className="flex justify-between px-6 py-4 lg:hidden">
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
                            onClick={() => setOpenMenu(!openMenu)}
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
        </div>
    );
};

export default HeaderTwentySeven;

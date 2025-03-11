'use client';

<<<<<<< HEAD
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CgShoppingBag } from 'react-icons/cg';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import Search3 from '../components/search3';
import { XMarkIcon } from '@heroicons/react/24/outline';
import SideMenuWithCategory from './side-menu-with-category';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
=======
import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { FiUser } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Search3 from '../components/search3';
import SideMenuWithCategory from './side-menu-with-category';

const HeaderTwentyThree = ({ headersetting, design }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
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

    // header search close
    const handleClose = () => {
        setSearch('');
    };

    useEffect(() => {
        // sticky navbar
        const changeNavbar = () => {
            if (window.scrollY >= 120) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    // css class
    const styleCss = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    .navbarTwentyOne.openMenu {
        position: fixed;
        background: ${design?.header_color};
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
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

  
    .font-twenty-three {
      font-family: 'Poppins', sans-serif;
    }

    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
      font-family: 'Poppins', sans-serif;
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
                className={`sm:container px-5 flex justify-between items-center sm:pt-5 pt-2 pb-2`}
            >
                {/* middle section  */}
                <div className="flex lg:items-end items-center">
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:hidden block"
                    >
                        <HiMenu className="text-3xl" />
                    </div>
                    <div className="hidden lg:block">
                        {headersetting?.logo === null ? (
                            <Link href="/">
                                <p className="text-xl uppercase">
                                    {headersetting?.website_name}
                                </p>
                            </Link>
                        ) : (
                            <Link href="/">
                                <img
                                    className="h-[80px] w-auto overflow-hidden"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="lg:hidden block">
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

                <div className="flex flex-col gap-y-5 items-end">
                    {/* search product implement  */}
                    <div className="lg:block hidden">
                        <div className="flex w-full relative">
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className="pl-2 outline-none focus:outline-none focus:ring-0 focus:border-gray-400 w-full h-8 bg-gray-100 border-0 border-b border-gray-400 text-sm"
                            />
                            <div className="absolute top-2.5 right-2">
                                {searchTxt.length === 0 ? (
                                    <IoSearchOutline className="text-sm" />
                                ) : (
                                    <AiOutlineClose
                                        onClick={handleClose}
                                        className="text-sm lg:cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                        {searchTxt && (
                            <div className="relative top-5 right-0 w-96">
                                <Search3
<<<<<<< HEAD
                                design={design}
=======
                                    design={design}
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-x-2 text-sm font-medium text-gray-700">
                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="lg:flex hidden items-center gap-2 lg:cursor-pointer"
                        >
                            <CgShoppingBag className="text-xl" />
                            <p>Shopping Cart</p>
                        </div>
                        <div>
                            {/* Authenticate routes dropdown  */}
                            {isAuthenticated ? (
                                <Menu as="div" className="relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                                {isAuthenticated ? (
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
                                <Link href="/login">
                                    <p className="lg:block hidden">
                                        Sign In or Sign Up
                                    </p>
                                    <FiUser className="lg:hidden block text-2xl font-semibold text-[#212121] " />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* menu section  */}
            <div
                className={`${
                    openMenu && 'navbarTwentyOne openMenu'
                } bg-color lg:block hidden`}
            >
                <div className="flex gap-10 uppercase text-[14px] sm:container px-5 py-4 justify-center">
                    {category?.map((cat: any) => (
                        <Link key={cat.id} href={'/category/' + cat?.id}>
                            <ul className="" key={cat?.id}>
                                <li className="duration-500 border border-transparent border-hover-menu">
                                    {cat?.name}
                                </li>
                            </ul>
                        </Link>
                    ))}
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

            <div className="block lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    }`}
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
                            onClick={() => setOpen(!open)}
                            className="h-7"
                        />
                    </div>

                    <div className="px-6">
                        <SideMenuWithCategory
                            setOpen={setOpen}
                            design={design}
                            category={category}
                            isAuthenticated={isAuthenticated}
                            handleLogOut={handleLogOut}
                        />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderTwentyThree;

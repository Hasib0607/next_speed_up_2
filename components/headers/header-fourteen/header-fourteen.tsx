'use client';

import { imgUrl, profileImg } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { GiShoppingBag } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { HiUser } from 'react-icons/hi';
import { RiCloseCircleLine, RiMenu2Line } from 'react-icons/ri';
import Search3 from '../components/search3';
import SideMenu from './side-menu';

import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderFourteen = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);
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
    });

    const styleCss = `
    .navbarSixteen.openMenu {
        display: block;
        position: fixed;
        background: ${design?.header_color};
        opacity:0.8;
        width: 100%;
        z-index: 5;
        padding-top: 10px;
        padding-bottom: 10px;
        top:0;
        animation: fadeIn 0.2s ease-in both;
      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
      }
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
     }
    .text-color {
        color:  ${design?.header_color};
     }
     .text-hover:hover {
        color: ${design?.header_color}; 
      }
  `;

    return (
        <div
            className={` w-full  ${
                searchInput === true
                    ? 'mt-[620px] block duration-500'
                    : 'top-0 absolute'
            }`}
        >
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <style>{styleCss}</style>
            {open && (
                <div
                    onClick={() => setOpen(!open)}
                    className="h-screen left-0 fixed top-0 w-screen z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            {searchInput && (
                <div className="fixed top-0 z-20 w-full bg-white h-[600px] overflow-y-auto">
                    <div>
                        <h1 className="text-[32px] font-medium text-center pt-10">
                            Start typing and hit enter
                        </h1>
                    </div>
                    <div className="w-full mt-20 text-center">
                        <input
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="w-[50%] border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 "
                            placeholder="Search anything "
                        />
                        <p
                            style={{ color: design?.header_color }}
                            className="absolute z-10 right-5 top-10"
                            onClick={handleClose}
                        >
                            <RiCloseCircleLine className="text-3xl lg:cursor-pointer" />
                        </p>
                    </div>
                    {searchTxt && (
                        <div className="relative">
                            <Search3 search={searchTxt} setSearch={setSearch} design={design}/>
                        </div>
                    )}
                </div>
            )}

            <div className="">
                <div
                    className={`${openMenu ? 'navbarSixteen openMenu py-1' : 'py-6'}`}
                >
                    <div
                        className={`sm:container px-5 relative bg-transparent z-[4] `}
                    >
                        <div className={`flex justify-between items-center`}>
                            <div className="flex items-center gap-4">
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

                            <div className="flex gap-5 justify-center items-center">
                                <div
                                    onClick={() => setSearchInput(!searchInput)}
                                >
                                    <FaSearch
                                        className={`text-3xl lg:cursor-pointer text-black ${
                                            openMenu ? ' ' : 'text-hover'
                                        }`}
                                    />
                                </div>

                                {/* My account dropdown menu start */}
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left "
                                >
                                    <div>
                                        <Menu.Button className="inline-flex justify-center w-full ">
                                            {isAuthenticated ? (
                                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                                    <img
                                                        src={
                                                            user?.image
                                                                ? user?.image
                                                                : user?.social_img
                                                        }
                                                        alt=""
                                                        className="object-fit"
                                                    />
                                                </span>
                                            ) : (
                                                <HiUser
                                                    className={`text-3xl text-black ${
                                                        openMenu
                                                            ? ' '
                                                            : 'text-hover'
                                                    }`}
                                                />
                                            )}
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
                                        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/profile"
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100 text-gray-900'
                                                                    : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            My account
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
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
                                                {isAuthenticated ? (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <div>
                                                                <Link
                                                                    href="/login"
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
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </Menu.Item>
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
                                    className="relative sm:block hidden"
                                >
                                    <GiShoppingBag
                                        className={`text-3xl lg:cursor-pointer text-black ${
                                            openMenu ? ' ' : 'text-hover'
                                        }`}
                                    />
                                </div>
                                <div
                                    onClick={() => setOpen(!open)}
                                    className="lg:cursor-pointer col-span-3 md:col-span-1"
                                >
                                    <RiMenu2Line
                                        className={`text-4xl text-black ${
                                            openMenu ? ' ' : 'text-hover'
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* screen touch menu close  */}
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                    ></div>
                )}

                <ul
                    className={`
                            bg-white fixed sm:w-[350px] md:w-[400px] w-[280px] top-0 overflow-y-auto bottom-0  pb-5
                            duration-1000 z-20 lg:cursor-pointer ${
                                open ? 'left-0' : 'left-[-180%]'
                            }
                         `}
                >
                    <div className="px-10 text-center cursor-auto pt-3">
                        <p>Welcome you to {headersetting?.website_name}</p>
                        <div className="flex items-center justify-center gap-2 pb-8 pt-2">
                            <p className="">
                                {' '}
                                <span className="inline-block">
                                    <GoLocation />
                                </span>{' '}
                                {headersetting?.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden">
                        <h3>MENU</h3>
                        <ArrowLeftIcon
                            onClick={() => setOpen(!open)}
                            className="h-7"
                        />
                    </div>
                    <div className="px-6">
                        <SideMenu
                            menu={menu}
                            design={design}
                            setOpen={setOpen}
                        />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderFourteen;

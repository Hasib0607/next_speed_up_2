'use client';

import { location } from '@/assets/svg';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import {
    ArrowLeftIcon,
    Bars4Icon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import HeaderMenu from '../components/header-menu';
import SideMenu from '../components/side-menu';
import './header-three.css';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderThree = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 120) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    // CSS START FROM HERE

    const styleCss = `
     @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
 
     .all-hover:hover {
       color:  ${design?.text_color};
       background: ${design?.header_color};
   }
     .menu-hover:hover {
       color:  ${design?.header_color};
      
   }
    .font-seven {
      font-family: 'Open Sans', sans-serif;
   }
   h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
      font-family: 'Open Sans', sans-serif;
    }
     `;

    return (
        <div className="w-full">
            <style>{styleCss}</style>
            <div className="lg:block hidden">
                <div
                    style={{
                        background: design?.header_color,
                        color: design?.text_color,
                    }}
                    className=""
                >
                    <div className="flex justify-between py-4 text-sm sm:container px-5">
                        <div>
                            <p>Welcome you to {headersetting?.website_name}</p>
                        </div>
                        <div className="">
                            <ul className="flex flex-row gap-5 list-none">
                                <li className="flex items-center">
                                    <span
                                        style={{ color: design?.text_color }}
                                        className="pr-2"
                                    >
                                        {location}
                                    </span>
                                    {headersetting?.address}
                                </li>
                                <li>|</li>

                                {/* My account dropdown menu start */}
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left "
                                >
                                    <div>
                                        <Menu.Button className="inline-flex justify-center w-full ">
                                            My Account
                                            <ChevronDownIcon
                                                className="w-5 h-5 ml-2 -mr-1"
                                                aria-hidden="true"
                                            />
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
                            </ul>
                        </div>
                    </div>
                </div>

                {/* header category  */}
                <div
                    className={`${
                        openMenu ? 'navbarThree openMenu' : 'navbarThree'
                    } w-full`}
                >
                    <div className="mx-auto sm:container px-5">
                        <HeaderMenu
                            headersetting={headersetting}
                            design={design}
                            menu={menu}
                        />
                    </div>
                </div>
            </div>

            {/* tablet and mobile view  */}

            <div className="block sm:container px-5 py-6 lg:hidden">
                <div className="flex justify-between items-center">
                    <div
                        className="lg:cursor-pointer"
                        onClick={() => setOpen(!open)}
                    >
                        <Bars4Icon className="h-6" />
                    </div>
                    <div>
                        <Link href="/">
                            <img
                                className="h-10"
                                src={imgUrl + headersetting?.logo}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="flex">
                        <div>
                            {/* My account dropdown menu start */}
                            <Menu
                                as="div"
                                className="relative inline-block text-left "
                            >
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full ">
                                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                            {isAuthenticated ? (
                                                <img
                                                    src={
                                                        user?.image
                                                            ? user?.image
                                                            : user?.social_img
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
        lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5
        duration-1000 z-20 lg:cursor-pointer ${open ? 'left-0' : 'left-[-160%]'}
            `}
            >
                <div className="sm:px-10 text-center cursor-auto mt-6 text-xs sm:text-sm">
                    <p>Welcome you to {headersetting?.website_name}</p>
                    <div className="flex items-center justify-center gap-2 pb-8">
                        <span>{location}</span>
                        <p className=""> {headersetting?.address}</p>
                    </div>
                </div>
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

export default HeaderThree;

'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { imgUrl } from '@/site-settings/siteUrl';
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';

import SideMenu from '../components/side-menu';
import HeaderCatTen from './header-cat-ten';
import './header-ten.css';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';

const HeaderTen = ({ design, headersetting, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 80) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');
    .font-ten {
        font-family: 'Libre Franklin', sans-serif;
      }
    
      h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Libre Franklin', sans-serif;
      }
  `;

    return (
        <div>
            <style>{styleCss}</style>
            <div className="top-0 z-50 w-full sm:container px-5">
                <div className="lg:flex grid grid-cols-3 justify-between items-center py-4 text-sm">
                    <div className="lg:block hidden">
                        <FiPhoneCall className="text-xl inline" />
                        <p className="inline pl-3">
                            Call Us: <br />{' '}
                            <span className="font-medium">
                                {headersetting?.phone}
                            </span>
                        </p>
                    </div>
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:hidden block lg:cursor-pointer"
                    >
                        <HiMenu className="text-2xl" />
                    </div>
                    <div className=" justify-self-center">
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
                    <div className="justify-self-end">
                        <ul className="flex list-none items-center">
                            {/* My account dropdown menu start */}
                            <Menu as="div" className="relative text-left">
                                <Menu.Button className="w-full lg:inline-flex hidden">
                                    My Account
                                    <ChevronDownIcon
                                        className="w-5 h-5 "
                                        aria-hidden="true"
                                    />
                                </Menu.Button>

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
                                                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
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

                            <div className="flex items-center gap-x-2">
                                <div>
                                    {/* My account dropdown menu start */}
                                    <Menu
                                        as="div"
                                        className="relative  text-left lg:hidden inline-block "
                                    >
                                        <div>
                                            <Menu.Button className="inline-flex justify-center w-full ">
                                                <p className="pr-1 mt-2 lg:cursor-pointer">
                                                    <UserCircleIcon className="h-8" />
                                                </p>
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
                                                                        'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
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
                        </ul>
                    </div>
                </div>
            </div>
            {/* header category  */}
            <div
                className={` ${openMenu ? 'navbarSeven openMenu' : 'navbarSeven'}`}
            >
                <HeaderCatTen menu={menu} design={design} />
            </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="block px-4 lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-50 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    }`}
                >
                    <div className="px-10 text-center cursor-auto py-10">
                        <FiPhoneCall className="text-xl inline" />
                        <p className="inline pl-3">
                            Call Us: <br />{' '}
                            <span className="font-medium">
                                {headersetting?.phone}
                            </span>
                        </p>
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

export default HeaderTen;

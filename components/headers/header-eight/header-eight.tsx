'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { IoSearchCircleOutline } from 'react-icons/io5';

import Search3 from '../components/search3';
import { GiHamburgerMenu } from 'react-icons/gi';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

export default function HeaderEight({ design, headersetting, menu }: any) {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);

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

    return (
        <>
            <div className="sm:container px-5">
                <div
                    className={`w-full bg-white fixed top-0 left-0 h-[150px] z-[15] duration-500 ${
                        searchInput === true ? 'mt-0' : '-mt-[150px]'
                    }`}
                >
                    <div className="sm:container px-5 w-full relative">
                        <div className="flex justify-between pt-8 pb-4">
                            <h1 className="text-sm font-medium ">
                                What are you Looking for?
                            </h1>
                            <p
                                style={{ color: design?.header_color }}
                                className=""
                                onClick={handleClose}
                            >
                                <IoIosClose className="text-3xl lg:cursor-pointer" />
                            </p>
                        </div>
                        <div className="w-full text-center relative">
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="w-full border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 p-0 pb-2 text-2xl text-black"
                                placeholder="SEARCH PRODUCTS "
                            />

                            <IoIosSearch className="text-3xl absolute top-0 right-0 lg:cursor-pointer text-gray-500" />
                        </div>
                        {searchTxt && (
                            <div className="relative w-full flex justify-center -top-10">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                    design={design}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 py-3 items-center">
                    <div className="">
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
                        <div className="float-right text-sm lg:flex-grow">
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
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/profile/order"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Order
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
                </div>
            </div>
            <div className="min-h-full bg-gray-800">
                <div className="sm:container px-5">
                    <Disclosure as="nav" className="bg-gray-800 py-4">
                        {({ open }) => (
                            <>
                                <div className="mx-auto">
                                    <div className="flex items-center justify-between h-10">
                                        <div className="">
                                            <div className="hidden md:block">
                                                <div className="flex gap-4">
                                                    {menu
                                                        ?.slice(0, 6)
                                                        ?.map(
                                                            (
                                                                item: any,
                                                                idx: any
                                                            ) =>
                                                                item?.url ===
                                                                'category' ? (
                                                                    <Cat
                                                                        item={
                                                                            item
                                                                        }
                                                                        key={
                                                                            idx
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <SingleMenu
                                                                        key={
                                                                            item?.id
                                                                        }
                                                                        item={
                                                                            item
                                                                        }
                                                                    />
                                                                )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="flex justify-end items-center">
                                                <button
                                                    type="button"
                                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                                                >
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <IoSearchCircleOutline
                                                        onClick={() =>
                                                            setSearchInput(
                                                                !searchInput
                                                            )
                                                        }
                                                        className="h-6 w-6 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mr-2 md:hidden order-first">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <GiHamburgerMenu
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {menu?.slice(0, 6)?.map(
                                            (item: any) =>
                                                item.status == 1 && (
                                                    <Disclosure.Button
                                                        key={item.id}
                                                        as="a"
                                                        href={
                                                            item?.custom_link ||
                                                            (item?.url
                                                                ? `/${item?.url}`
                                                                : '/')
                                                        }
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'block px-3 py-2 rounded-md text-base font-medium'
                                                        )}
                                                        aria-current={
                                                            item.current
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                    >
                                                        {item?.name}
                                                    </Disclosure.Button>
                                                )
                                        )}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
            <Sticky
                setSearchInput={setSearchInput}
                searchInput={searchInput}
                headersetting={headersetting}
                menu={menu}
            />
        </>
    );
}

const Sticky = ({ setSearchInput, searchInput, headersetting, menu }: any) => {
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 150) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    });

    return (
        openMenu && (
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'linear' }}
                className=" bg-gray-800 fixed top-0 left-0 right-0"
                style={{
                    zIndex: 11,
                }}
            >
                <div className="sm:container px-5">
                    <Disclosure as="nav" className="bg-gray-800 ">
                        {({ open }) => (
                            <>
                                <div className="mx-auto">
                                    <div className="flex items-center justify-between h-16">
                                        <div className="">
                                            {headersetting?.logo === null ? (
                                                <Link href="/">
                                                    <p className="text-xl uppercase">
                                                        {
                                                            headersetting?.website_name
                                                        }
                                                    </p>
                                                </Link>
                                            ) : (
                                                <Link href="/">
                                                    <img
                                                        className="h-12 w-auto overflow-hidden"
                                                        src={
                                                            imgUrl +
                                                            headersetting?.logo
                                                        }
                                                        alt="logo"
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                        <div className="">
                                            <div className="hidden md:block">
                                                <div className="flex flex-wrap">
                                                    {menu?.map((item: any) =>
                                                        item?.url ===
                                                        'category' ? (
                                                            <Cat
                                                                key={item.id}
                                                                item={item}
                                                            />
                                                        ) : (
                                                            <SingleMenu
                                                                key={item?.id}
                                                                item={item}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="flex justify-end items-center">
                                                <button
                                                    type="button"
                                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                                                >
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <IoSearchCircleOutline
                                                        onClick={() =>
                                                            setSearchInput(
                                                                !searchInput
                                                            )
                                                        }
                                                        className="h-6 w-6 text-white"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <GiHamburgerMenu
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {menu?.map((item: any) => (
                                            <Disclosure.Button
                                                key={item?.id}
                                                as="a"
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={
                                                    item.current
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                {item?.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </motion.div>
        )
    );
};

const SingleMenu = ({ item }: any) => {
    return (
        <div className="py-3 flex ">
            {item.status == 1 && (
                <Link
                    href={
                        item?.custom_link || (item?.url ? `/${item?.url}` : '/')
                    }
                    className={classNames(
                        item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'py-2 rounded-md text-sm font-medium px-3'
                    )}
                >
                    {item?.name}
                </Link>
            )}
        </div>
    );
};

const Cat = ({ item }: any) => {
    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const [show, setShow] = useState(false);

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className={'py-3 relative flex'}
            aria-current={item.current ? 'page' : undefined}
        >
            <Link
                href={item?.url}
                className={classNames(
                    item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'py-2 px-3 rounded-md text-sm font-medium'
                )}
            >
                {item?.name}
            </Link>
            {show && (
                <div className="absolute top-12 z-10 left-0 max-h-fit bg-black text-black min-w-[200px] py-2 flex flex-col space-y-2">
                    {category?.map((item: any) => (
                        <Link
                            key={item?.id}
                            href={'/category/' + item?.id}
                            className="py-2 px-3 hover:bg-gray-700 min-w-fit block mx-2 text-white rounded-xl "
                        >
                            {item?.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

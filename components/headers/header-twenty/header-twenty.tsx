'use client';

import { HiUser } from 'react-icons/hi';
import { Fragment, useState } from 'react';
import { Popover, Transition, Menu } from '@headlessui/react';

import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import Search3 from '../components/search3';
import { imgUrl } from '@/site-settings/siteUrl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { btnhover } from '@/site-settings/style';
import { GiHamburgerMenu } from 'react-icons/gi';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';

export default function HeaderTwenty({ headersetting, menu, design }: any) {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [searchInput, setSearchInput] = useState(false);
    const [searchTxt, setSearch] = useState('');

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    return (
        <Popover className="relative bg-white">
            <div className="sm:container px-5">
                <div className="flex justify-between items-center lg:grid grid-cols-3 py-6 lg:space-x-10">
                    <Popover.Group
                        as="nav"
                        className="hidden lg:flex space-x-6"
                    >
                        {menu?.slice(0, 5)?.map(
                            (data: any) =>
                                data.status == 1 && (
                                    <Link
                                        href={
                                            data?.custom_link ||
                                            (data?.url ? `/${data?.url}` : '/')
                                        }
                                        key={data?.id}
                                        className="text-base font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        {data?.name}
                                    </Link>
                                )
                        )}
                    </Popover.Group>

                    <div className="justify-self-center">
                        <Link href="/">
                            <img
                                className="h-8 w-auto sm:h-10"
                                src={imgUrl + headersetting?.logo}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 lg:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <GiHamburgerMenu
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </Popover.Button>
                    </div>

                    <div className="hidden justify-self-end lg:flex items-center justify-end lg:flex-1 lg:w-0 space-x-4">
                        <div
                            className=" lg:cursor-pointer "
                            onClick={() => setSearchInput(!searchInput)}
                        >
                            {!searchInput && (
                                <IoSearchCircleOutline className="h-6 w-6 text-gray-700" />
                            )}
                            {searchInput && (
                                <CgClose
                                    className="h-6 w-6 text-gray-700"
                                    onClick={() => setSearch('')}
                                />
                            )}
                        </div>
                        <div className="">
                            <div>
                                {/* My account dropdown menu start */}
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left "
                                >
                                    <div>
                                        <Menu.Button className="inline-flex justify-center w-full ">
                                            <HiUser className="text-xl text-gray-500 mt-2" />
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
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden z-50"
                >
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <Link href="/">
                                    <img
                                        className="h-8 w-auto sm:h-10"
                                        src={imgUrl + headersetting?.logo}
                                        alt=""
                                    />
                                </Link>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {menu?.slice(0, 5)?.map(
                                        (item: any) =>
                                            item.status == 1 && (
                                                <Link
                                                    key={item.id}
                                                    href={
                                                        item?.custom_link ||
                                                        (item?.url
                                                            ? `/${item?.url}`
                                                            : '/')
                                                    }
                                                >
                                                    <Popover.Button className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 w-full">
                                                        <span className=" text-base font-medium text-gray-900">
                                                            {item.name}
                                                        </span>
                                                    </Popover.Button>
                                                </Link>
                                            )
                                    )}
                                </nav>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div>
                                {isAuthenticated ? (
                                    <p
                                        onClick={handleLogOut}
                                        style={{
                                            backgroundColor:
                                                design?.header_color,
                                            color: design?.text_color,
                                        }}
                                        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer ${btnhover}`}
                                    >
                                        <Popover.Button>Logout</Popover.Button>
                                    </p>
                                ) : (
                                    <Link
                                        href="/sign-up"
                                        style={{
                                            backgroundColor:
                                                design?.header_color,
                                            color: design?.text_color,
                                        }}
                                        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium ${btnhover}`}
                                    >
                                        <Popover.Button>Sign up</Popover.Button>
                                    </Link>
                                )}
                                {isAuthenticated ? null : (
                                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                                        Existing customer?{' '}
                                        <Link
                                            href="/login"
                                            className="text-indigo-600 hover:text-indigo-500"
                                        >
                                            <Popover.Button>
                                                Sign in
                                            </Popover.Button>
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
            {searchInput && (
                <div className="absolute h-28 w-full bg-white -bottom-28 z-10 flex justify-center items-center">
                    <div className="w-full relative flex justify-center items-center gap-x-10 ">
                        <input
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="w-[50%] h-14"
                            placeholder="SEARCH PRODUCTS "
                        />
                        {searchTxt ? (
                            <button
                                className="bg-black h-14 w-16"
                                onClick={() => {
                                    setSearchInput(!searchInput);
                                    setSearch('');
                                }}
                            >
                                <XMarkIcon
                                    onClick={() => setSearchInput(!searchInput)}
                                    className="h-6 w-6 mx-5 text-white"
                                />
                            </button>
                        ) : (
                            <button
                                className="bg-black h-14 w-16"
                                onClick={() => setSearch('')}
                            >
                                {' '}
                                <IoSearchCircleOutline
                                    onClick={() => setSearch('')}
                                    className="h-6 w-6 mx-5 text-white"
                                />
                            </button>
                        )}
                    </div>
                    {searchTxt && (
                        <div className="left-0 sm:ml-[7%] w-full sm:w-[80%] md:w-[80%] lg:w-[83%] absolute top-12">
                            <Search3 search={searchTxt} setSearch={setSearch} design={design}/>
                        </div>
                    )}
                </div>
            )}
        </Popover>
    );
}

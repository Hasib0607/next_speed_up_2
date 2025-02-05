'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import useAnnouncementScroll from '@/utils/use-annoucement-height';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';

import defaultUserImage from '@/assets/default-user-image.png';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';

import { useRouter } from 'next/navigation';
import Search3 from '../components/search3';
import SideCategory from '../components/side-category';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const HeaderThirtySix = ({ headersetting, design }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const { announcementHeight, scrollPassed } = useAnnouncementScroll();

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

    return (
        <>
            <div
                style={{ top: scrollPassed ? 0 : announcementHeight }}
                className="bg-[#FDD670] h-20 fixed w-full  left-0 z-[6] flex items-center"
            >
                <div className="sm:container px-5 flex justify-between items-center gap-x-5 w-full">
                    <div className="flex gap-5 justify-between items-center w-full lg:w-max">
                        <div
                            onClick={() => setOpen(!open)}
                            className="p-2 lg:cursor-pointer lg:hover:bg-[#EEB529] opacity-70"
                        >
                            <FaBars className="text-2xl" />
                        </div>
                        <div className="w-max">
                            {headersetting?.logo === null ? (
                                <Link href="/">
                                    <p className="text-xl uppercase">
                                        {headersetting?.website_name}
                                    </p>
                                </Link>
                            ) : (
                                <Link href="/">
                                    <img
                                        className="lg:h-[45px] h-8 w-auto overflow-hidden"
                                        src={imgUrl + headersetting?.logo}
                                        alt="logo"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="w-full lg:block hidden relative">
                        <input
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search Products"
                            className="w-full border border-gray-400 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0 p-2"
                        />
                        <div
                            onClick={handleClose}
                            className="lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-[11px]"
                        >
                            {searchTxt.length === 0 ? (
                                <BsSearch className="text-xl" />
                            ) : (
                                <AiOutlineClose className="text-xl lg:cursor-pointer" />
                            )}
                        </div>
                        {searchTxt && (
                            <div className="absolute z-[15] top-5 left-0 w-full">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                    <div className="hidden lg:flex gap-5 items-center w-max">
                        <div className="flex items-center gap-1 text-[#FF686E] font-bold">
                            <HiOutlineLocationMarker className="" />
                            <p className="w-max">{headersetting?.address}</p>
                        </div>
                        <div>
                            {/* Authenticate routes dropdown  */}
                            {isAuthenticated ? (
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
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
                                            {isAuthenticated ? (
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
                                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                                )}
                                                            >
                                                                Sign out
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            ) : (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/login"
                                                            className={classNames(
                                                                active
                                                                    ? 'bg-gray-100'
                                                                    : '',
                                                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                                            )}
                                                        >
                                                            Login
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <Link href="/login">
                                    <p className="text-[16px] font-semibold font-seven bg-[#FF686E] hover:bg-[#e45c60] rounded-lg px-6 py-1.5 text-white">
                                        Login
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[4] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="">
                <ul
                    className={`bg-white mt-20  fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-[5] lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    } `}
                >
                    <div className="px-6">
                        <SideCategory design={design} />
                    </div>
                </ul>
            </div>
        </>
    );
};

export default HeaderThirtySix;

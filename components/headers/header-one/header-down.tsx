'use client';

import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import defaultUserImage from '@/assets/default-user-image.png';
import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { imgUrl, profileImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Search from '../components/search';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderDown = ({ headersetting }: any) => {
    const isAuthenticated = useAuth();
    const router = useRouter();

    const [searchInput, setSearchInput] = useState(false);

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    return (
        <div>
            <div className=" sm:container px-5 mx-auto my-1">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                    <div className="col-span-1 px-2 flex md:justify-center justify-between items-center"></div>
                    <div className="col-span-1 hidden md:flex justify-center justify-self-center items-center ">
                        <div className="w-full h-full">
                            {headersetting?.logo !== null ? (
                                <Link href="/">
                                    <img
                                        src={imgUrl + headersetting?.logo}
                                        alt=""
                                        className="w-auto max-h-[80px] object-cover"
                                    />
                                </Link>
                            ) : (
                                <Link href="/">
                                    <p className="text-xl uppercase">
                                        {headersetting?.website_name}
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="col-span-1 hidden md:flex order-1 md:order-last justify-end items-center mr-2">
                    <Search searchInput={searchInput} setSearchInput={setSearchInput} screen backdrop btnOn/>
                        {/* Profile dropdown */}
                        {isAuthenticated && (
                            <Menu as="div" className="ml-3 relative">
                                <div className="flex items-center">
                                    <Menu.Button className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            src={
                                                user?.image
                                                    ? profileImg + user?.image
                                                    : user?.social_img
                                                      ? profileImg +
                                                        user?.social_img
                                                      : `${defaultUserImage.src}`
                                            }
                                            alt=""
                                            className="object-fit"
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
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 flex flex-col">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/profile"
                                                    className={
                                                        'hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                                    }
                                                >
                                                    Your Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/profile/order"
                                                    className={
                                                        'hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                                    }
                                                >
                                                    Order
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <p
                                                    onClick={handleLogOut}
                                                    className={
                                                        'hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700'
                                                    }
                                                >
                                                    Sign out
                                                </p>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderDown;

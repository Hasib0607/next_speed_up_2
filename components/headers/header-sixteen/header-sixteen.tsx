'use client';

import Link from 'next/link';
import { profileImg } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { HiUser, HiUserAdd } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdLocalPhone } from 'react-icons/md';

import useAuth from '@/hooks/useAuth';
import HeaderMenu from './header-menu';
import { customizeHeader } from '@/utils/customizeDesign';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { classNames } from '@/helpers/littleSpicy';

const HeaderSixteen = ({ headersetting, user, design,menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const headerData = customizeHeader.find((item) => item.id == store_id);

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    .bg-color {
        background: ${design?.header_color};
        color:  ${design?.text_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .all-hover:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .menu-hover:hover {
      color:  ${design?.header_color};
     
  }
    .border-hover:hover {
      border: 1px solid ${design?.header_color};
     
  }
    .border-hover-bottom:hover {
      border-bottom: 2px solid ${design?.header_color};
     
  }
  
  .font-sixteen {
   font-family: 'Roboto', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
    font-family: 'Roboto', sans-serif;
  }`;

    return (
        <div>
            <style>{styleCss}</style>
            <div className="bg-color">
                <div className="flex justify-between py-3 sm:container px-5 z-[6] relative">
                    <div className="flex sm:gap-10 gap-2">
                        <div className="lg:flex gap-1 hidden items-center">
                            <IoLocationOutline />
                            <p className="text-lg">{headersetting?.address}</p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <MdLocalPhone className="sm:text-lg text-xs" />
                            <p
                                className={
                                    headerData?.mobile_font_big
                                        ? headerData?.mobile_font_big
                                        : 'sm:text-lg text-xs'
                                }
                            >
                                {headersetting?.phone}
                            </p>
                        </div>
                    </div>

                    {/* Authenticate routes dropdown  */}
                    {isAuthenticated ? (
                        <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={profileImg + user?.image}
                                            alt=""
                                            className="object-fit"
                                        />
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
                                                        onClick={handleLogOut}
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100 lg:cursor-pointer'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
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
                                                        'block px-4 py-2 text-sm text-gray-700'
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
                        <div className="flex lg:gap-x-10 gap-x-2 justify-between">
                            <Link href="/sign-up">
                                <div className="flex gap-1 items-center">
                                    <HiUserAdd />
                                    <p className="text-lg">Register</p>
                                </div>
                            </Link>

                            <Link href="/login">
                                <div className="flex gap-1 items-center">
                                    <HiUser />
                                    <p className="text-lg">SignIn</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="">
                <HeaderMenu menu={menu} headersetting={headersetting} design={design}/>
            </div>
        </div>
    );
};

export default HeaderSixteen;

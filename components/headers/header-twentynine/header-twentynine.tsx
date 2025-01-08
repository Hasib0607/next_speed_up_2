'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { IoLogoWhatsapp } from 'react-icons/io5';

import HeaderTwentyNineCat from './header-twentynine-cat';
import HeaderTwentyNineMenu from './header-twentynine-menu';
import { classNames } from '@/helpers/littleSpicy';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';

const HeaderTwentyNine = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');

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
  
  .font-six {
    font-family: 'Libre Franklin', sans-serif;
  }
  
  h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
    font-family: 'Libre Franklin', sans-serif;
  }

`;

    return (
        <div>
            <style>{styleCss}</style>
            <div
                style={{
                    background: design?.header_color,
                    color: design?.text_color,
                }}
                className="pb-1 lg:border-b border-gray-300"
            >
                <div className="lg:flex hidden pt-3 sm:container px-5 justify-between">
                    <div>
                        <p className="text-sm">
                            Need Help? {headersetting?.phone}
                        </p>
                    </div>

                    <div className="flex gap-3 items-center">
                        {/* My account dropdown menu start */}
                        <div className="">
                            <Menu
                                as="div"
                                className="relative inline-block text-left "
                            >
                                <div>
                                    {isAuthenticated ? (
                                        <Menu.Button
                                            style={{
                                                color: design?.text_color,
                                            }}
                                            className="inline-flex items-center justify-center w-full"
                                        >
                                            My Account
                                            <ChevronDownIcon
                                                className="h-3 ml-1 mt-1"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    ) : (
                                        <Menu.Button
                                            style={{
                                                color: design?.text_color,
                                            }}
                                            className="inline-flex items-center justify-center w-full"
                                        >
                                            Login
                                            <ChevronDownIcon
                                                className="h-3 ml-1 mt-1"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    )}
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
                                            {isAuthenticated ? (
                                                <div>
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
                                                </div>
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
                        </div>
                        {/* My account dropdown menu finished */}
                        <div style={{ color: design?.text_color }}>|</div>
                        <div
                            style={{ color: design?.text_color }}
                            className="flex gap-2 items-center"
                        >
                            {headersetting?.facebook_link && (
                                <a
                                    href={headersetting?.facebook_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaFacebook className="text-lg " />
                                </a>
                            )}

                            {headersetting?.whatsapp_phone && (
                                <a
                                    href={
                                        'https://api.whatsapp.com/send?phone=' +
                                        headersetting?.whatsapp_phone
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <IoLogoWhatsapp className="text-lg " />
                                </a>
                            )}

                            {headersetting?.instagram_link && (
                                <a
                                    href={headersetting?.instagram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <GrInstagram className="text-lg " />
                                </a>
                            )}

                            {headersetting?.youtube_link && (
                                <a
                                    href={headersetting?.youtube_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <GrYoutube className="text-lg " />
                                </a>
                            )}
                            {headersetting?.lined_in_link && (
                                <a
                                    href={headersetting?.lined_in_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillLinkedin className="text-lg " />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <HeaderTwentyNineMenu
                menu={menu}
                headersetting={headersetting}
                design={design}
            />
            <HeaderTwentyNineCat design={design} />
        </div>
    );
};

export default HeaderTwentyNine;

'use client';

import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import { AiFillLinkedin, AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { IoLogoWhatsapp } from 'react-icons/io5';
import HeaderSixCat from './header-six-cat';
import HeaderSixMenu from './header-six-menu';
import Search3 from '../components/search3';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';

const HeaderSix = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    const [openMenu, setOpenMenu] = useState(false);
    const [searchTxt, setSearch] = useState<any>('');

    const handleClose = () => {
        setSearch('');
    };
    // console.log(!searchTxt);

    useEffect(() => {
        // scroll navbar
        const changeNavbar = () => {
            if (window.scrollY >= 10) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, [searchTxt]);

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
        <>
            <style>{styleCss}</style>
            <div
                style={{
                    background: design?.header_color,
                    color: design?.text_color,
                }}
            >
                <div className="lg:flex hidden py-3 justify-between sm:container px-5">
                    <div className="">
                        {/* My account dropdown menu start */}
                        <Menu
                            as="div"
                            className="relative inline-block text-left "
                        >
                            <div>
                                <Menu.Button
                                    style={{ color: design?.text_color }}
                                    className="inline-flex items-center justify-center w-full"
                                >
                                    Login
                                    <ChevronDownIcon
                                        className="h-3 ml-1 mt-1"
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
                                <Menu.Items className="absolute left-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                        onClick={handleLogOut}
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

                    <div className="flex gap-3 items-center">
                        <div style={{ color: design?.text_color }}>
                            <p>Welcome to {headersetting?.website_name}</p>
                        </div>
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

            <HeaderSixMenu
                headersetting={headersetting}
                design={design}
                menu={menu}
            />
            <HeaderSixCat design={design} />

            {/* sticky nav  */}
            <div
                className={`hidden bg-gray-100 ${
                    openMenu ? 'stickyNavSix openMenuSix' : 'stickyNavSix'
                }`}
            >
                <div className="sm:container px-5 lg:py-4 ">
                    <div className="lg:block hidden">
                        <ul className="lg:flex lg:flex-row lg:gap-8">
                            {menu?.slice(0, 6)?.map(
                                (item: any) =>
                                    item.status == 1 && (
                                        <div key={item.id} className="">
                                            <li>
                                                <Link
                                                    href={
                                                        item?.custom_link ||
                                                        (item?.url
                                                            ? `/${item?.url}`
                                                            : '/')
                                                    }
                                                >
                                                    <h1 className="flex uppercase justify-between items-center group font-semibold text-sm">
                                                        {item.name}
                                                    </h1>
                                                </Link>
                                            </li>
                                        </div>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="lg:hidden border sm:container px-5">
                    <div className="relative overflow-hidden">
                        <div className="bg-black">
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Enter your search key ..."
                                className="w-full pl-3 py-2 lg:py-3 outline-none focus:outline-none border focus:border-gray-200 border-gray-200 focus:ring-0"
                            />
                        </div>
                        <div
                            style={{
                                background: design?.header_color,
                                color: design?.text_color,
                            }}
                            className="hover:bg-yellow-500 lg:cursor-pointer absolute right-0 top-0 px-5 font-thin py-2.5 lg:py-4"
                        >
                            {!searchTxt ? (
                                <BsSearch className="text-xl" />
                            ) : (
                                <AiOutlineClose
                                    onClick={handleClose}
                                    className="text-xl lg:cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    {searchTxt && (
                        <div className="relative">
                            <Search3
                                search={searchTxt}
                                setSearch={setSearch}
                                design={design}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HeaderSix;

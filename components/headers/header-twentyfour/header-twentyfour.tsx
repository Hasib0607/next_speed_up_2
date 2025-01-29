'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdMenu } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { RiShoppingBagLine } from 'react-icons/ri';

import Search3 from '../components/search3';
import defaultUserImage from '@/assets/default-user-image.png';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';

const HeaderTwentyFour = ({ headersetting, design, menu, user }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const handleClose = () => {
        setSearch('');
    };

    // sticky navbar
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

    // css class
    const styleCss = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    .navbarTwentyFour.openMenu {
        position: fixed;
        background: #F2E1D9;
        opacity:1;
        width: 100%;
        z-index: 10;
        top:0;
        animation: fadeIn 0.2s ease-in both;

      }
    .all-hover:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }
    .bg-color {
      color:  ${design?.text_color};
      background: ${design?.header_color};
  }

    .menu-hover:hover {
      color:  ${design?.header_color};
     
  }
  .border-cat {
    border: 2px solid ${design?.header_color};
  }
  .border-hover-menu:hover{
    border-bottom: 1px solid ${design?.text_color};
  }

  
  .font-twenty-three {
    font-family: 'Poppins', sans-serif;
  }

  h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
    font-family: 'Poppins', sans-serif;
  }
    `;

    return (
        <div>
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />
            <style>{styleCss}</style>
            <div
                className={`flex items-center justify-between bg-[#F2E1D9] h-20  ${
                    openMenu ? 'navbarTwentyFour openMenu' : ''
                }`}
            >
                <div className="sm:container px-5 flex items-center justify-between">
                    <div
                        className={`lg:absolute top-0 left-0 z-[3] bg-color p-2 lg:p-5 h-20 w-auto`}
                    >
                        {headersetting?.logo === null ? (
                            <Link href="/">
                                <p className="text-xl uppercase">
                                    {headersetting?.website_name}
                                </p>
                            </Link>
                        ) : (
                            <Link href="/">
                                <img
                                    className="h-full w-full"
                                    src={imgUrl + headersetting?.logo}
                                    alt=""
                                />
                            </Link>
                        )}
                    </div>
                    <div className={`lg:ml-24 lg:block hidden w-full`}>
                        <div className="flex justify-center xl:gap-10 gap-4 uppercase text-[14px] py-4">
                            {menu?.slice(0, 7).map(
                                (menu: any) =>
                                    menu.status == 1 && (
                                        <ul key={menu.id}>
                                            <Link
                                                href={
                                                    menu?.custom_link ||
                                                    (menu?.url
                                                        ? `/${menu?.url}`
                                                        : '/')
                                                }
                                            >
                                                <li className="">
                                                    {menu.name}
                                                </li>
                                            </Link>
                                        </ul>
                                    )
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-x-5 ">
                        <div className="lg:flex items-center hidden relative">
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Search"
                                className={`outline-none focus:outline-none focus:ring-0 focus:border-gray-400 h-8 bg-transparent placeholder:text-[${design?.text_color}] border-0 border-b border-gray-400 text-sm`}
                            />
                            <div className="">
                                {searchTxt.length === 0 ? (
                                    <IoSearchOutline className="text-sm -ml-4" />
                                ) : (
                                    <AiOutlineClose
                                        onClick={handleClose}
                                        className="text-sm -ml-4 lg:cursor-pointer"
                                    />
                                )}
                            </div>
                            {searchTxt && (
                                <div className="absolute z-[15] top-4 xl:right-0 -right-24 w-[800px]">
                                    <Search3
                                        search={searchTxt}
                                        setSearch={setSearch}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            {/* Authenticate routes dropdown  */}
                            {isAuthenticated ? (
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                                            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                                {user?.image ||
                                                user?.social_img ? (
                                                    <img
                                                        src={
                                                            user?.image
                                                                ? user?.image
                                                                : user?.social_img
                                                        }
                                                        alt="user"
                                                        className="object-fit"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            defaultUserImage.src
                                                        }
                                                        alt="user"
                                                        className="object-fit"
                                                    />
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
                                            {isAuthenticated && (
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
                                                                    'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
                                                                )}
                                                            >
                                                                Sign out
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            ) : (
                                <Link href="/login">
                                    <p className="">Sign In</p>
                                </Link>
                            )}
                        </div>

                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                        >
                            <RiShoppingBagLine className="text-3xl font-thin" />
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 w-full z-[4] ">
                <div
                    className={`bg-gray-600 lg:hidden mx-auto px-2  duration-500 menu-twelve overflow-hidden ${
                        open ? 'max-h-64' : 'max-h-14 '
                    }`}
                >
                    <div
                        onClick={() => setOpen(!open)}
                        className="flex lg:cursor-pointer bg-gray-900 px-2 py-1 rounded-md text-white gap-1 items-center mt-2.5 text-lg w-max float-right"
                    >
                        <h1>MENU</h1>
                        <IoMdMenu className="text2xl" />
                    </div>
                    <div className="pb-5 pt-20 pl-4 text-white">
                        {menu?.slice(0, 7).map(
                            (menu: any) =>
                                menu.status == 1 && (
                                    <ul key={'/' + menu.id}>
                                        <Link
                                            href={
                                                menu?.custom_link ||
                                                (menu?.url
                                                    ? `/${menu?.url}`
                                                    : '/')
                                            }
                                        >
                                            <li className="">{menu.name}</li>
                                        </Link>
                                    </ul>
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTwentyFour;

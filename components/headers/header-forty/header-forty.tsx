'use client';

import { Fragment, useState } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { IoBagOutline, IoSearchOutline } from 'react-icons/io5';
import { RiMenu2Line } from 'react-icons/ri';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { imgUrl } from '@/site-settings/siteUrl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Search3 from '../components/search3';
import SideMenu from '../components/side-menu';

const HeaderForty = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openCart, setOpenCart] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const handleClose = () => {
        setOpenSearch(!openSearch);
        setSearch('');
    };

    // CSS START FROM HERE
    const styleCss = `
    @font-face {
        font-family: 'BemboStd':
        src: local('BemboStd'),
             url('../../../../fonts/BemboStd.otf') format('otf'),
    }
    .font-forty {
        font-family: BemboStd, serif;
    }
    
    h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: BemboStd, serif;
      } 
    `;

    return (
        <div className="relative">
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <div
                className={`fixed ${openSearch ? 'right-0' : '-right-[350px]'} duration-500 top-0 bg-white h-full w-[350px] z-10 pt-5 shadow-2xl`}
            >
                <div className="text-center w-full relative">
                    <p>SEARCH</p>
                    <XMarkIcon
                        onClick={() => setOpenSearch(!openSearch)}
                        className="h-5 absolute right-5 top-0 lg:cursor-pointer"
                    />
                </div>
                <div className="md:flex hidden items-center justify-between w-full relative px-5 mt-20">
                    <input
                        type="text"
                        value={searchTxt}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className="w-full h-10 border focus:outline-none focus:border-black focus:ring-0"
                    />
                    <div
                        onClick={handleClose}
                        className="w-10 h-10 bg-black text-white cat-hover-thirty flex justify-center py-3 md:lg:cursor-pointer"
                    >
                        {searchTxt.length === 0 ? (
                            <IoSearchOutline className="text-xl" />
                        ) : (
                            <AiOutlineClose className="text-xl" />
                        )}
                    </div>
                </div>
                {searchTxt && (
                    <div className="absolute z-20 top-32 xl:right-0 -right-24 w-full rounded-md">
                        <Search3
                            search={searchTxt}
                            setSearch={setSearch}
                            design={design}
                        />
                    </div>
                )}
            </div>

            {/* top menu  */}
            <div className="">
                <div className="flex justify-between items-center sm:container px-5 py-3">
                    <div className="lg:flex hidden "></div>
                    <div>
                        {headersetting?.logo === null ? (
                            <Link href="/">
                                <p className="text-xl uppercase">
                                    {headersetting?.website_name}
                                </p>
                            </Link>
                        ) : (
                            <Link href="/">
                                <img
                                    className="h-16"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                    <div className="lg:flex hidden items-center gap-5">
                        <BsSearch
                            onClick={() => setOpenSearch(true)}
                            className="lg:cursor-pointer"
                        />
                        <IoBagOutline
                            onClick={() => setOpenCart(!openCart)}
                            className="text-lg lg:cursor-pointer"
                        />
                    </div>
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:cursor-pointer lg:hidden flex"
                    >
                        <RiMenu2Line className="text-4xl" />
                    </div>
                </div>
            </div>

            {/* bottom menu */}

            <div className="lg:flex hidden justify-between items-center sm:container px-5 ">
                <div
                    className={`lg:flex hidden justify-center sm:container px-5 gap-10 w-full`}
                >
                    {category?.slice(0, 5).map((cat: any) => (
                        <div className="group" key={cat?.id}>
                            <Link
                                href={'/category/' + cat?.id}
                                className="flex items-center "
                            >
                                <p className="text-sm py-3 uppercase tracking-[2px]">
                                    {cat?.name}
                                </p>
                            </Link>

                            {cat?.cat != null && (
                                <div className="absolute top-[100%] left-0 bg-white z-10 w-full group-hover:h-20 h-0 duration-100 overflow-hidden ">
                                    <div className="flex justify-between sm:container px-5">
                                        {cat?.cat?.map((subItem: any) => (
                                            <div
                                                key={subItem.id}
                                                className="my-5"
                                            >
                                                <Link
                                                    href={
                                                        '/category/' +
                                                        subItem?.id
                                                    }
                                                >
                                                    <h1>{subItem.name} </h1>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
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
                                                                ? 'bg-gray-100'
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
                        <Link href="/login">
                            <p className="w-max">Sign In</p>
                        </Link>
                    )}
                </div>
            </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="block lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    } `}
                >
                    <div className="flex justify-between px-6 py-4 lg:hidden">
                        <div>
                            {headersetting?.logo === null ? (
                                <Link href="/">
                                    <p className="text-xl uppercase">
                                        {headersetting?.website_name}
                                    </p>
                                </Link>
                            ) : (
                                <Link href="/">
                                    <img
                                        className="h-10"
                                        src={imgUrl + headersetting?.logo}
                                        alt="logo"
                                    />
                                </Link>
                            )}
                        </div>
                        <XMarkIcon
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

export default HeaderForty;

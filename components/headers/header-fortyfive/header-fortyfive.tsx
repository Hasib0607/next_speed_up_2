'use client';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { BiShoppingBag } from 'react-icons/bi';
import { HiMenu } from 'react-icons/hi';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import { useSelector } from 'react-redux';
import SideMenu from '../components/side-menu';
import Search45 from '../components/search45';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlinePhoneEnabled } from 'react-icons/md';

const HeaderFortyFive = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const store_id = numberParser(design?.store_id) || null;

    const [openCat, setOpenCat] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [searchTxtUp, setSearchUp] = useState('');
    const [heading, setHeading] = useState('');
    const [active, setActive] = useState(true);
    const [border, setBorder] = useState(true);
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [searchInput, setSearchInput] = useState(false);

    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const { cartList } = useSelector((state: RootState) => state?.cart);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
        setSearchUp('');
    };

    // for category open
    if (openCat === true) {
        setTimeout(() => {
            setActive(false);
        }, 800);
    } else {
        setTimeout(() => {
            setActive(true);
        }, 0);
    }
    if (openCat === true) {
        setTimeout(() => {
            setBorder(false);
        }, 0);
    } else {
        setTimeout(() => {
            setBorder(true);
        }, 1000);
    }

    useEffect(() => {
        // sticky navbar
        const changeNavbar = () => {
            if (window.scrollY >= 120) {
                setOpenMenu(true);
                setOpenCat(false);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    // CSS START FROM HERE
    const styleCss = `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&display=swap');
        @media (max-width: 1023px) {
            .mobile-sticky {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 50;
            background: white;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            }
        }

    `;

    console.log('headersetting', headersetting);

    return (
        <div className="">
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            {/* sticky nav search  */}
            <div
                className={`w-full bg-white fixed top-0 left-0 h-[150px] z-[100] duration-500 flex items-center justify-center gap-20 md:px-20 ${
                    searchInput === true ? 'mt-0' : '-mt-[150px]'
                }`}
            >
                <div className="hidden lg:block">
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

                <div className="sm:container px-5 xl:px-24 w-full relative">
                    <div className="flex justify-between pt-5">
                        <h1 className="text-sm font-medium">
                            Search our store
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
                            value={searchTxtUp}
                            onChange={(e) => setSearchUp(e.target.value)}
                            type="text"
                            className="w-full border border-black rounded-md outline-none ring-0 focus:ring-0 py-2 pl-2 text-black"
                            placeholder="Search Products"
                        />
                        <IoIosSearch className="text-2xl absolute top-3 right-2 lg:cursor-pointer text-gray-500" />
                    </div>
                    <div className="mt-3 mb-6 md:text-center">
                        <div className="hidden lg:flex items-center justify-center gap-3 flex-wrap">
                            <span className="font-medium text-gray-500">
                                Popular Searches:
                            </span>
                            {category?.slice(0, 3).map((cat: any) => (
                                <div
                                    className="relative group inline-block"
                                    key={cat?.id}
                                >
                                    <Link href={'/category/' + cat?.id}>
                                        <span className="underline cursor-pointer">
                                            {cat?.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    {searchTxtUp && (
                        <div className="relative -top-12">
                            <Search45
                                design={design}
                                search={searchTxtUp}
                                setSearch={setSearchUp}
                            />
                        </div>
                    )}
                </div>

                <div className="hidden lg:block">
                    <div className="flex items-center gap-3 ">
                        {/* Authenticate routes dropdown */}
                        {isAuthenticated ? (
                            <Menu
                                as="div"
                                className="ml-3 relative lg:block hidden"
                            >
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
                                                    alt="user"
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
                                                            href="/profile/order"
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
                                        ) : (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/login"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
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
                                <FiUser className="text-3xl font-semibold lg:block hidden" />
                            </Link>
                        )}

                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                        >
                            <BiShoppingBag className="text-3xl font-thin" />
                            <p
                                style={{
                                    background: design?.header_color,
                                    color: design?.text_color,
                                }}
                                className="text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                            >
                                {cartList?.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--header-color)] py-2">
                <h2 className="flex justify-center items-center gap-2 text-[var(--text-color)] text-sm md:text-base text-center">
                    আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:
                    <MdOutlinePhone className="text-xl" />
                    {headersetting?.whatsapp_phone} |
                    <MdOutlinePhoneEnabled className="text-xl" />
                    {headersetting?.phone}
                </h2>
            </div>

            {/* middle menu */}
            <div className="pt-3">
                <div className="flex justify-between items-center md:px-52 pb-3 mobile-sticky">
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:hidden block"
                    >
                        <HiMenu className="text-3xl" />
                    </div>

                    {/* Left (Search icon - only for lg and up) */}
                    <div className="hidden lg:flex flex-1">
                        <div
                            onClick={() => setSearchInput(!searchInput)}
                            className="cursor-pointer"
                        >
                            <BsSearch className="text-2xl text-gray-700" />
                        </div>
                    </div>

                    {/* logo section */}
                    <div className="flex flex-1 justify-center md:justify-normal">
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

                    <div className="flex items-center gap-3 pr-5">
                        {/* Authenticate routes dropdown */}
                        {isAuthenticated ? (
                            <Menu
                                as="div"
                                className="ml-3 relative lg:block hidden"
                            >
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
                                                    alt="user"
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
                                                            href="/profile/order"
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
                                        ) : (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/login"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
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
                                <FiUser className="text-3xl font-semibold lg:block hidden" />
                            </Link>
                        )}

                        <div
                            onClick={() => setSearchInput(!searchInput)}
                            className="block md:hidden"
                        >
                            <BsSearch className="text-xl lg:cursor-pointer" />
                        </div>

                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex flex-col justify-center items-center relative lg:cursor-pointer"
                        >
                            <BiShoppingBag className="text-3xl font-thin" />
                            <p
                                style={{
                                    background: design?.header_color,
                                    color: design?.text_color,
                                }}
                                className="text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                            >
                                {cartList?.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="flex gap-14 justify-center bg-gray-100 py-6">
                    {category?.slice(0, 10).map((cat: any) => (
                        <div
                            className="relative group inline-block"
                            key={cat?.id}
                        >
                            <Link href={'/category/' + cat?.id}>
                                <span className="cursor-pointer border-black hover:border-b-2">
                                    {cat?.name}
                                </span>
                            </Link>
                        </div>
                    ))}
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

export default HeaderFortyFive;

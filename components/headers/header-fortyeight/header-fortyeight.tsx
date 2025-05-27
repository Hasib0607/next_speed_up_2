'use client';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { RootState } from '@/redux/store';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BsSearch } from 'react-icons/bs';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsTelephoneFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import Search3 from '../components/search3';
import SideMenuFortyEight from './side-menu-fortyeight';

const HeaderFortyEight = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openCart, setOpenCart] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const { cartList } = useSelector((state: RootState) => state?.cart);

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

    // CSS START FROM HERE

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
        h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
            font-family: 'Poppins', sans-serif;
        }
        .header-thirty-seven {
            color:  ${design?.text_color};
            background: ${design?.header_color};
        }
     `;

    return (
        <>
            <div className="bg-white h-16 md:h-20 flex items-center">
                <style>{styleCss}</style>
                {/* CartSideBar open  */}
                <CartSideBar
                    open={openCart}
                    setOpen={setOpenCart}
                    design={design}
                />
                <div className="sm:container px-5 flex justify-between items-center gap-x-5 w-full">
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:hidden block"
                    >
                        <HiMenu className="text-3xl" />
                    </div>

                    <div className="lg:mr-20">
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
                                        className="h-[45px] w-auto overflow-hidden"
                                        src={imgUrl + headersetting?.logo}
                                        alt="logo"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:flex items-center hidden relative">
                        <input
                            value={searchTxt}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search Products"
                            className="pl-2 py-[9px] w-full border border-gray-400 focus:outline-none focus:border focus:border-gray-400 rounded focus:ring-0"
                        />
                        <div
                            onClick={handleClose}
                            className="lg:cursor-pointer header-thirty-seven px-10 font-thin py-[12px] -ml-1"
                        >
                            {searchTxt.length === 0 ? (
                                <BsSearch className="text-xl" />
                            ) : (
                                <AiOutlineClose className="text-xl lg:cursor-pointer" />
                            )}
                        </div>
                        {searchTxt && (
                            <div className="absolute z-20 top-5 left-0 w-full">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                    design={design}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-5 items-center w-max md:ml-28">
                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex items-center lg:cursor-pointer bg-[--header-color] rounded-md py-2 px-2 shadow relative"
                        >
                            <p className={`lg:cursor-pointer`}>
                                <FaShoppingCart className="text-xl font-thin" />
                            </p>
                            <p className="text-sm rounded-full w-fit px-1.5 h-fit bg-black text-white absolute bottom-7 left-7">
                                {cartList.length}
                            </p>
                        </div>
                        <div className='hidden lg:block'>
                            {/* Authenticate routes dropdown  */}
                            {isAuthenticated ? (
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
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
                                    <FaUserCircle className="text-4xl bg-[--header-color] rounded-md py-2 px-2 shadow" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[--header-color] text-[--text-color] h-10 lg:flex items-center justify-between hidden">
                <div className="px-20 flex gap-x-5">
                    <div className="relative group">
                        <div className="flex items-center gap-4 cursor-pointer">
                            <RxHamburgerMenu />
                            <span>|</span>
                        </div>

                        {/* Full-width dropdown on hover of hamburger */}
                        <div className="absolute -left-24 top-8 w-screen bg-white text-black shadow-md z-50 py-4 px-6 hidden group-hover:flex">
                            <div className="flex flex-col gap-2 pl-16 relative">
                                <Link href="/shop">
                                    <p className="text-sm font-medium hover:text-[var(--header-color)]">
                                        shop now
                                    </p>
                                </Link>

                                {category?.slice(0, 7).map((cat: any) => (
                                    <div
                                        key={cat.id}
                                        className="relative hover-trigger"
                                    >
                                        <Link href={`/category/${cat?.id}`}>
                                            <div className="flex items-center justify-between text-sm font-medium uppercase hover:text-[var(--header-color)] cursor-pointer">
                                                <span>{cat?.name}</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/shop">
                        <p className="text-sm font-medium">shop now</p>
                    </Link>

                    {category?.slice(0, 7).map((cat: any) => (
                        <div key={cat.id} className="relative group">
                            <Link href={`/category/${cat?.id}`}>
                                <ul>
                                    <li className="text-sm font-medium uppercase cursor-pointer">
                                        {cat?.name}
                                    </li>
                                </ul>
                            </Link>

                            {/* Subcategories dropdown (only shown on hover) */}
                            {cat?.subcategories?.length > 0 && (
                                <div className="absolute left-0 mt-2 bg-white shadow p-2 hidden group-hover:block z-10">
                                    {cat?.subcategories?.map((sub: any) => (
                                        <Link
                                            href={`/category/${sub?.id}`}
                                            key={sub?.id}
                                        >
                                            <p className="text-sm text-gray-600 mb-1 hover:text-[var(--header-color)] cursor-pointer">
                                                {sub.name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <a
                    href={`tel:${headersetting?.phone}`}
                    className="px-20 flex items-center gap-2 no-underline"
                >
                    <BsTelephoneFill />
                    {headersetting?.phone}
                </a>
            </div>
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[4] bg-black bg-opacity-40 lg:cursor-pointer"
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
                        <SideMenuFortyEight
                            setOpen={setOpen}
                            design={design}
                            categoryLoading={false}
                            openMenu={openMenu}
                        />
                    </div>
                </ul>
            </div>
        </>
    );
};

export default HeaderFortyEight;

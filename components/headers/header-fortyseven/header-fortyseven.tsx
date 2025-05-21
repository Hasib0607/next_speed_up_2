'use client';

import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BsSearch } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { SlBag } from 'react-icons/sl';
import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { classNames } from '@/helpers/littleSpicy';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import MenuFortySeven from './menu-fortyseven';
import SideMenuFortySeven from './side-menu-fortyseven';
import { CgProfile } from 'react-icons/cg';
import { IoIosClose, IoIosSearch } from 'react-icons/io';
import Search3 from '../components/search3';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const HeaderFortySeven = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [searchTxtUp, setSearchUp] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const lastScrollY = useRef(0);

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const bgColor = design?.header_color;

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const { cartList } = useSelector((state: RootState) => state?.cart);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
        setSearchUp('');
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                setIsScrollingDown(true);
            } else {
                // Scrolling up
                setIsScrollingDown(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // CSS START FROM HERE
    const styleCss = `
     @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

     .navbarSeven.openMenu {
        display: block;
        // position: fixed;
        width: 100%;
        background: ${design?.header_color};
        z-index: 10;
        /* opacity: 0; */
        animation: fadeIn 0.6s ease-in both;
      }
     .all-hover:hover {
       color:  ${design?.text_color};
       background: ${design?.header_color};
    }
        .menu-hover:hover {
        color:  ${design?.header_color};
    }

    .font-seven {
        font-family: 'Open Sans', sans-serif;
    }
    h1, p, span, button {
        font-family: 'Open Sans', sans-serif;
    }
     `;

    return (
        <div>
            <div
                className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                    isScrollingDown ? '-translate-y-full' : 'translate-y-0'
                } ${openMenu && 'navbarSeven openMenu'} text-[var(--text-color)] ${
                    searchInput
                        ? 'bg-[var(--header-color)]'
                        : 'backdrop-blur-2xl'
                }`}
            >
                <style>{styleCss}</style>
                <div className="flex flex-row justify-between items-center nav-menu sm:container px-5 py-2 md:py-5 gap-3 lg:gap-0">
                    <div
                        className={`w-full bg-white fixed top-[60px] md:top-24 left-0 h-[300px] md:h-[200px] z-[100] duration-500 ${
                            searchInput === true
                                ? 'mt-0'
                                : '-mt-[500px] md:-mt-[300]'
                        }`}
                    >
                        <div className=" sm:container px-5 xl:px-24 w-full relative">
                            <div className="flex justify-between pt-5 pb-3">
                                <h1 className="font-medium text-gray-500 uppercase">
                                    Search{' '}
                                    {window.location.origin.replace(
                                        /^https?:\/\//,
                                        ''
                                    )}
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
                                    onChange={(e) =>
                                        setSearchUp(e.target.value)
                                    }
                                    type="text"
                                    className="w-full uppercase border-b-2 border-gray-200 border-0 outline-none ring-0 focus:ring-0 focus:border-gray-300 p-0 pb-1 text-md text-black"
                                    placeholder="Type to search"
                                />
                                <IoIosSearch className="text-2xl absolute top-0 right-0 lg:cursor-pointer text-gray-500" />
                            </div>
                            <div className="my-6">
                                <div>
                                    <div className="font-medium text-gray-500 uppercase mb-2">
                                        Trending
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {category
                                            ?.slice(0, 10)
                                            .map((cat: any) => (
                                                <Link
                                                    href={
                                                        '/category/' + cat?.id
                                                    }
                                                    key={cat?.id}
                                                >
                                                    <span className="border lowercase px-3 py-1 rounded cursor-pointer text-gray-500 hover:text-black hover:border-black transition">
                                                        {cat?.name}
                                                    </span>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {searchTxtUp && (
                                <div className="relative -top-3">
                                    <Search3
                                        design={design}
                                        search={searchTxtUp}
                                        setSearch={setSearchUp}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center lg:gap-0 gap-5">
                        <div>
                            <RxHamburgerMenu
                                onClick={() => setOpen(!open)}
                                className="text-3xl hover:rotate-180 lg:cursor-pointer lg:hidden"
                            />
                        </div>

                        <div className="lg:block hidden">
                            <MenuFortySeven
                                openMenu={openMenu}
                                menu={menu}
                                menuLoading={false}
                            />
                        </div>
                    </div>
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
                                    className="h-[45px] w-auto overflow-hidden sm:mr-20"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                    <div className='text-[var(--header-color)]'>
                        <div className="flex-row flex justify-center items-center gap-4 md:gap-8 relative">
                            <BsSearch
                                onClick={() => setSearchInput(!searchInput)}
                                className="text-2xl lg:cursor-pointer"
                            />
                            <div
                                onClick={() => setOpenCart(!openCart)}
                                className="lg:cursor-pointer relative"
                            >
                                <SlBag className="text-2xl" />
                                <p
                                    style={{
                                        background: design?.text_color,
                                        color: bgColor,
                                    }}
                                    className="text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                                >
                                    {cartList?.length}
                                </p>
                            </div>

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
                                        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
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
                                                                    'block px-4 py-2 text-sm text-gray-700 cus'
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
                                                    {/*  */}
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
                                    <p className="text-[16px] font-semibold font-seven">
                                        <CgProfile className="text-2xl lg:cursor-pointer" />
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* CartSideBar open  */}
                <CartSideBar
                    open={openCart}
                    setOpen={setOpenCart}
                    design={design}
                />
            </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="block px-4 lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0  pb-5 duration-1000 z-50 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-120%]'
                    }`}
                >
                    <div className="flex py-4 z-50 justify-between items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ">
                        {!headersetting ? (
                            <p>loading logo... </p>
                        ) : (
                            <>
                                <div>
                                    <Link href="/">
                                        <img
                                            className="h-8"
                                            src={`${imgUrl}${headersetting?.logo}`}
                                            alt="logo"
                                        />
                                    </Link>
                                </div>
                            </>
                        )}

                        <div>
                            <XMarkIcon
                                onClick={() => setOpen(!open)}
                                className="h-5 basis-2/4"
                            />
                        </div>
                    </div>
                    <div className="z-50 px-10">
                        <SideMenuFortySeven
                            setOpen={setOpen}
                            design={design}
                            menu={menu}
                            menuLoading={false}
                            openMenu={openMenu}
                        />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderFortySeven;

'use client';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { RootState } from '@/redux/store';
import { imgUrl } from '@/site-settings/siteUrl';
import useAnnouncementScroll from '@/utils/use-annoucement-height';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft } from 'react-icons/cg';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Search3 from '../components/search3';
import SideMenu from '../components/side-menu';

const HeaderThirtyFive = ({ design, headersetting, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();
    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const bgColor = design?.header_color;

    const handleClose = () => {
        setSearch('');
    };

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const { cartList } = useSelector((state: RootState) => state?.cart);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
 
     .navbarSeven.openMenu {
        display: block;
        position: fixed;
        width: 100%;
        background: ${design?.header_color};
        z-index: 10;
        animation: fadeIn 0.6s ease-in both;
      }
        
     .bg-seven-header {
       color:  ${design?.text_color};
       background: ${design?.header_color};
    }
     .all-hover:hover {
       color:  ${design?.text_color};
       background: ${design?.header_color};
    }
     .menu-hover:hover {
        color:  ${design?.header_color};     
    }
    .thirty-five-menu .active {
        border-bottom : 1px solid black;
    }
    
     .font-thirty-five {
        font-family: 'Orbitron', sans-serif;
    }
    h1, h2, h3, h4, h5, h6, li, ul, a, p, span, button, option, select, input, div {
        font-family: 'Orbitron', sans-serif;
    }
     `;

    const { announcementHeight, scrollPassed } = useAnnouncementScroll();

    return (
        <div>
            <div
                className={`bg-white fixed z-[5] w-full border-b shadow-xl lg:border-b-2 border-black h-20 flex items-center ${!scrollPassed && announcementHeight > 0 ? `top-[${announcementHeight}px]` : 'top-0'}`}
            >
                <style>{styleCss}</style>
                <div className="w-full flex flex-row justify-between items-center nav-menu sm:container px-5 lg:py-0 py-1">
                    {searchInput && (
                        <div
                            onClick={() => {
                                setSearchInput(false);
                                setSearch('');
                            }}
                            className="h-screen left-0 fixed top-0 w-screen z-40"
                        ></div>
                    )}
                    {searchInput && (
                        <div className="absolute rounded-lg overflow-hidden z-50 left-[50%] bg-[rgba(255,255,255,.8)] top-3 translate-x-[-50%]">
                            <BsSearch className="text-[16px] lg:cursor-pointer absolute top-5 left-3 text-black" />
                            <input
                                autoFocus
                                type="text"
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search your products"
                                className="md:px-14 px-10 py-4 lg:w-[500px] xl:w-[800px] md:w-[350px] w-[400px] border-gray-200 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black "
                            />
                            <XMarkIcon
                                onClick={() => {
                                    setSearchInput(false);
                                    handleClose();
                                }}
                                className="absolute top-5 lg:cursor-pointer h-5 right-3 text-black"
                            />
                        </div>
                    )}
                    {searchTxt && (
                        <div className="lg:w-[500px] md:w-[350px] w-[400px] xl:w-[800px] absolute left-[50%] top-16 translate-x-[-50%] z-50 ">
                            <Search3
                                search={searchTxt}
                                setSearch={setSearch}
                                design={design}
                            />
                        </div>
                    )}
                    <div className="flex justify-between items-center lg:gap-0 gap-5 lg:border-r-2 border-black w-full h-20">
                        <div className="lg:hidden">
                            <CgMenuLeft
                                onClick={() => setOpen(!open)}
                                className="text-3xl hover:rotate-180 lg:cursor-pointer"
                            />
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
                                        className="h-[45px] w-auto overflow-hidden lg:mr-20"
                                        src={imgUrl + headersetting?.logo}
                                        alt="logo"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex gap-5 items-center border-r-2 border-black w-full justify-center h-20 px-4 thirty-five-menu">
                        {menu?.slice(0, 6)?.map(
                            (item: any) =>
                                item.status == 1 && (
                                    <p
                                        key={item.id}
                                        className="text-base font-semibold leading-4 lg:cursor-pointer"
                                    >
                                        <Link
                                            href={
                                                item?.custom_link ||
                                                (item?.url
                                                    ? `/${item?.url}`
                                                    : '/')
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    </p>
                                )
                        )}
                    </div>

                    <div className="w-full hidden lg:flex justify-end">
                        <div className="flex-row flex justify-center items-center gap-8 relative">
                            <BsSearch
                                onClick={() => setSearchInput(true)}
                                className="text-xl lg:cursor-pointer lg:block hidden"
                            />

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
                                        Sign In
                                    </p>
                                </Link>
                            )}

                            <div
                                onClick={() => setOpenCart(!openCart)}
                                className="lg:cursor-pointer relative"
                            >
                                <HiOutlineShoppingBag className="text-3xl font-thin" />
                                <p
                                    style={{
                                        background: design?.text_color,
                                        color: bgColor,
                                    }}
                                    className=" text-sm absolute top-0 -right-2 rounded-full w-fit px-1.5 h-fit"
                                >
                                    {cartList?.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {searchInput && (
                    <div className="absolute top-0 left-0 w-screen opacity-50 h-screen bg-[#444] z-30"></div>
                )}

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
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-50 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-120%]'
                    } `}
                >
                    <div className="flex py-4 z-50 justify-between items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ">
                        <div>
                            <Link href="/">
                                <img
                                    className="h-8"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div>
                            <XMarkIcon
                                onClick={() => setOpen(!open)}
                                className="h-5 basis-2/4"
                            />
                        </div>
                    </div>
                    <div className="z-50 px-10">
                        <SideMenu setOpen={setOpen} />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderThirtyFive;

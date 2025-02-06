'use client';

import { imgUrl, profileImg } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCart2, BsSearch } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { RiMenu2Line, RiUser2Fill } from 'react-icons/ri';

import Search3 from '../components/search3';

import { classNames } from '@/helpers/littleSpicy';
import { CartSideBar } from '@/components/_shopping-cart/three/cart-popup-three';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { REDUX_PERSIST } from '@/consts';
import SideMenu from '../components/side-menu';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const HeaderNineteen = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [visible, setVisible] = useState(true);

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/login');
    };

    const visibleBtn = () => {
        setVisible(!visible);
    };

    const handleClose = () => {
        setSearch('');
    };

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

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');

    .navbarSixteen.openMenu {
        position: fixed;
        background: ${design?.header_color};
        opacity:0.8;
        width: 100%;
        z-index: 5;
        padding-top: 10px;
        padding-bottom: 10px;
        top:0;
        animation: fadeIn 0.2s ease-in both;
      }
    .navbarSixteen.openMenu:hover {
        opacity: 1;
      }

    .font-ten {
        font-family: 'Lora', serif;
      }
    
      h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Lora', serif;
      }
    `;

    return (
        <div
            style={{
                background: design?.header_color,
                color: design?.text_color,
            }}
        >
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />

            <div className="sm:container px-5 grid grid-cols-3 py-4">
                <div className="col-span-1 justify-self-start lg:hidden block">
                    <div
                        onClick={() => setOpen(!open)}
                        className="lg:cursor-pointer "
                    >
                        <RiMenu2Line className="text-4xl text-white" />
                    </div>
                </div>
                <div className="col-span-1 justify-self-start lg:block hidden">
                    <div onClick={visibleBtn}>
                        {visible ? (
                            <BsSearch className="text-xl lg:cursor-pointer" />
                        ) : (
                            <ImCross className="text-xl lg:cursor-pointer text-red-500" />
                        )}
                    </div>
                </div>
                <div className="col-span-1 justify-self-center ">
                    <div className="flex items-center gap-4">
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
                </div>
                <div className="col-span-1 justify-self-end flex gap-5 items-center">
                    <div
                        onClick={() => setOpenCart(!openCart)}
                        className="flex items-center"
                    >
                        <p className={`pr-1 lg:cursor-pointer`}>
                            <BsCart2 className="text-3xl font-thin" />
                        </p>
                    </div>
                    <div>
                        {/* My account dropdown menu start */}
                        {/* Authenticate routes dropdown  */}
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
                                <RiUser2Fill className="text-2xl font-semibold lg:block hidden" />
                            </Link>
                        )}
                        {/* My account dropdown menu finished */}
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

                <ul
                    className={`lg:hidden bg-white text-black fixed sm:w-[350px] md:w-[400px] w-[280px] top-0 overflow-y-auto bottom-0  pb-5 duration-1000 z-20 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-180%]'
                    }
    `}
                >
                    <div className="px-10 text-center cursor-auto pt-3">
                        <p>Welcome you to {headersetting?.website_name}</p>
                        <div className="flex items-center justify-center gap-2 pb-8 pt-2">
                            <p className="">
                                {' '}
                                <span className="inline-block">
                                    <GoLocation />
                                </span>{' '}
                                {headersetting?.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between px-6 py-4 text-white bg-black lg:hidden">
                        <h3>MENU</h3>
                        <ArrowLeftIcon
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
            <div
                className="sm:container px-5 py-6 justify-items-center lg:block hidden"
                style={{
                    background: design?.header_color,
                    color: design?.text_color,
                }}
            >
                <div className="col-span-3 justify-self-center lg:block hidden">
                    <ul className=" flex gap-10 justify-center item-center">
                        {menu?.slice(0, 6)?.map(
                            (menuData: any, id: any) =>
                                menuData.status == 1 && (
                                    <Link
                                        key={id}
                                        href={
                                            menuData?.custom_link ||
                                            (menuData?.url
                                                ? `/${menuData?.url}`
                                                : '/')
                                        }
                                    >
                                        <h1
                                            className={`flex justify-between items-center group`}
                                        >
                                            {menuData?.name}
                                        </h1>
                                    </Link>
                                )
                        )}
                    </ul>
                </div>
            </div>
            <div
                className="lg:block hidden"
                style={{ display: visible === true ? 'none' : 'block' }}
            >
                <div className="flex justify-center py-8 z-[2] relative">
                    <div className="lg:basis-3/6 w-full h-12">
                        <div className=" relative overflow-hidden ">
                            <div className="">
                                <input
                                    value={searchTxt}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Enter your search key ..."
                                    className="bg-white pl-3 text-black h-11 w-full  outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0 "
                                />
                            </div>
                            <div
                                style={{ height: '70px' }}
                                className="searchHover lg:cursor-pointer absolute right-0 top-0 px-4 py-3"
                            >
                                {searchTxt.length === 0 ? (
                                    <BsSearch className="text-xl" />
                                ) : (
                                    <AiOutlineClose
                                        onClick={handleClose}
                                        className="text-base lg:cursor-pointer text-red-600"
                                    />
                                )}
                            </div>
                        </div>
                        {searchTxt && (
                            <div className="relative -top-1">
                                <Search3
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => {
                        handleClose();
                        visibleBtn();
                    }}
                    className="absolute top-20 bottom-0 right-0 left-0 z-[1] bg-gray-400 opacity-50 lg:cursor-pointer overscroll-none"
                ></div>
            </div>

            <div
                className={`${
                    openMenu
                        ? 'navbarSixteen openMenu py-1 hidden lg:block'
                        : 'hidden'
                }`}
            >
                <div className="flex items-center gap-4 sm:container px-5">
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
                    <div className="flex">
                        {category?.slice(0, 5).map((item: any) => (
                            <div key={item.id} className="group relative">
                                <Link href={'/category/' + item?.id}>
                                    <h1
                                        className={`group justify-between items-center group uppercase text-sm px-4 ${
                                            openMenu ? 'text-menu' : ''
                                        }`}
                                    >
                                        {item.name}
                                    </h1>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderNineteen;

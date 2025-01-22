'use client';

import { imgUrl, profileImg } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';

import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { CgShoppingBag } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

import defaultUserImage from '@/assets/default-user-image.png';
import { CartSideBar } from '@/components/_shopping-cart/cart-popup-three';
import { REDUX_PERSIST } from '@/consts';
import { classNames } from '@/helpers/littleSpicy';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import Search from '../components/search';
import SideCategory from './side-category';
import SideMenu from './side-menu';
import { useGetCategoryQuery, useGetSubCategoryQuery } from '@/redux/features/category/categoryApi';

const HeaderTwo = ({ headersetting, design, menu, user, cartList }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const styleCss = `
  .header-menu .active{
      color:#f1593a;
      font-weight: 700;
     }
  `;

    return (
        <div className="sm:container px-5">
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />

            <div className="flex justify-between py-4 items-center">
                <div className="flex space-x-5 items-center">
                    <div>
                        <HiMenu
                            onClick={() => setOpen(!open)}
                            className="text-4xl menu-hover lg:cursor-pointer border-2 rounded"
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
                                    className="h-[45px] w-auto overflow-hidden"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="lg:flex hidden space-x-5">
                    {menu?.slice(0, 6)?.map(
                        (item: any) =>
                            item?.status == 1 && (
                                <div key={item?.id} className="header-menu">
                                    <Link
                                        href={
                                            item?.custom_link ||
                                            (item?.url ? `/${item?.url}` : '/')
                                        }
                                        className="uppercase sm:text-base text-sm text-gray-500 font-medium"
                                    >
                                        {item?.name}
                                    </Link>
                                </div>
                            )
                    )}
                </div>
                <div className="flex gap-3 items-center">
                    <div className="flex items-center relative">
                        {!searchInput && <p
                            className="lg:cursor-pointer absolute right-2"
                            onClick={() => setSearchInput(!searchInput)}
                        >
                            <BsSearch className="text-2xl lg:block hidden menu-hover" />
                        </p>}
                            <Search
                                searchInput={searchInput}
                                setSearchInput={setSearchInput}
                                className={'flex w-96'}
                            />
                    </div>
                    <div
                        onClick={() => setOpenCart(!openCart)}
                        className="lg:flex hidden items-center"
                    >
                        <p className={`pr-1 lg:cursor-pointer menu-hover`}>
                            <CgShoppingBag className="text-3xl" />
                        </p>
                        <p
                            style={{
                                color: design?.header_color,
                                background: design?.text_color,
                            }}
                            className="text-sm text-white mt-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
                        >
                            {cartList.length}
                        </p>
                    </div>
                    <div>
                        <Menu as="div" className="relative text-left">
                            <Menu.Button className="items-center">
                                {isAuthenticated ? (
                                    <img
                                        src={
                                            user?.image
                                                ? profileImg + user?.image
                                                : user?.social_img
                                                  ? profileImg +
                                                    user?.social_img
                                                  : `${defaultUserImage.src}`
                                        }
                                        alt=""
                                        className="object-fit h-8 w-8 rounded-full overflow-hidden"
                                    />
                                ) : (
                                    <p className=" lg:cursor-pointer menu-hover">
                                        <FaUser className="text-2xl" />
                                    </p>
                                )}
                            </Menu.Button>

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

            <div className="">
                <ul
                    className={`bg-white fixed md:w-128 w-96 lg:[400px] top-0 overflow-y-auto bottom-0 -ml-32 pb-5 lg:px-10 duration-1000 flex flex-col justify-between z-50 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-120%]'
                    }`}
                >
                    <div>
                        <div className="flex py-4 z-50 justify-between items-center  pl-10 lg:pl-10 pr-5 border-b-2 border-gray-100 pb-8 ml-28">
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
                                    className="h-5 menu-hover basis-2/4"
                                />
                            </div>
                        </div>
                        <div className="mt-5 ml-36 z-50 lg:block hidden">
                            <SideCategory
                                category={category}
                                subCategory={subCategory}
                                design={design}
                            />
                        </div>
                        <div className="lg:hidden flex flex-col space-y-3 ml-36 z-50">
                            <SideMenu
                                setOpen={setOpen}
                                menu={menu}
                                design={design}
                            />
                        </div>
                        {/* <div className="lg:hidden flex flex-col space-y-3 mt-5 ml-36 z-50" >
              {
                menu?.map((item:any) =>
                  <div key={item.id} >
                    <Link href={item.url}><p className='menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium'>{item.name}</p></Link>
                  </div>
                )
              }
            </div> */}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderTwo;

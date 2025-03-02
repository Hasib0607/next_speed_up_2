'use client';

import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import {
    MdOutlineAccountCircle,
    MdOutlineManageAccounts,
} from 'react-icons/md';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import useAuth from '@/hooks/useAuth';
import { headerBg } from '@/site-settings/color';
import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Search3 from '../components/search3';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { RootState } from '@/redux/store';

const HeaderElevenHeaderMenu = ({ headersetting, design }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [searchTxt, setSearch] = useState('');
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

    const bgColor = design?.header_color;

    const cartList = useSelector((state: RootState) => state.cart.cartList);

    return (
        <div>
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <div className=" flex justify-between items-center bg-white sm:container px-5 my-2">
                <div>
                    <Link href="/">
                        {!headersetting?.logo ? (
                            <p>{headersetting?.website_name}</p>
                        ) : (
                            <img
                                className="h-[45px] w-auto overflow-hidden"
                                src={imgUrl + headersetting?.logo}
                                alt="logo"
                            />
                        )}
                    </Link>
                </div>

                <div className="lg:basis-3/6 w-full h-12">
                    <div className=" relative overflow-hidden">
                        <div>
                            <input
                                value={searchTxt}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder=" Enter your search key ..."
                                className="bg-white pl-3 h-11 w-full  outline-none focus:outline-none focus:border-gray-200 search-border focus:ring-0 z-50"
                            />
                        </div>
                        <div
                            style={{ height: '70px' }}
                            className="searchHover lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-3"
                        >
                            {searchTxt.length === 0 ? (
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
                        <div className="relative -top-10">
                            <Search3
                                search={searchTxt}
                                setSearch={setSearch}
                                design={design}
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center relative gap-4">
                    <div
                        onClick={() => setOpenCart(!openCart)}
                        className="relative group flex gap-1 items-center"
                    >
                        <div className="flex items-center">
                            <p className={`pr-1 lg:cursor-pointer`}>
                                <HiOutlineShoppingBag className="text-3xl font-thin" />{' '}
                            </p>
                            <p
                                style={{
                                    background: bgColor,
                                    color: design?.text_color,
                                }}
                                className="bg-[#c0b07d] text-sm text-white mb-5 -ml-5 rounded-full w-fit px-1.5 h-fit"
                            >
                                {cartList.length}
                            </p>
                        </div>
                        <div>
                            <p
                                className={`text-sm lg:cursor-pointer mt-1 hover:text-[${headerBg}]`}
                            >
                                Cart
                            </p>
                        </div>
                    </div>

                    <div className="relative group flex gap-1 items-center ml-3">
                        <div className="flex items-center">
                            <p className={`pr-1 lg:cursor-pointer`}>
                                <MdOutlineManageAccounts className="text-3xl font-thin" />{' '}
                            </p>
                        </div>
                        <div>
                            <p
                                className={`text-sm lg:cursor-pointer mt-1 hover:text-[${headerBg}]`}
                            >
                                Account
                            </p>
                        </div>

                        <div className="absolute z-50 group-hover:block hidden shadow-md rounded-lg bg-white w-[150px] top-[30px] left-[-80%] lg:cursor-pointer">
                            {isAuthenticated ? (
                                <div className="relative ">
                                    <div className="px-6 py-4">
                                        <Link href="/profile">
                                            {' '}
                                            <div className="flex gap-2 mb-2">
                                                <RiAccountPinCircleFill className="text-2xl font-thin" />
                                                <h1>Profile </h1>
                                            </div>
                                        </Link>
                                        <div onClick={handleLogOut}>
                                            <div className="flex gap-2">
                                                <BiLogOut className="text-2xl font-thin" />
                                                <h1 className="text-black">
                                                    Logout{' '}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative ">
                                    <div className="px-6 py-4">
                                        <Link href="/login">
                                            {' '}
                                            <div className="flex gap-2 mb-2">
                                                <MdOutlineManageAccounts className="text-2xl font-thin" />
                                                <h1>Login </h1>
                                            </div>
                                        </Link>
                                        <Link href="/sign-up">
                                            <div className="flex gap-2">
                                                <MdOutlineAccountCircle className="text-2xl font-thin" />
                                                <h1>Register </h1>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderElevenHeaderMenu;

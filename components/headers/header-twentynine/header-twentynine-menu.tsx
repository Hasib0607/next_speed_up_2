'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { CgShoppingBag } from 'react-icons/cg';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { HiMenu } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io5';
import SideMenu from '../components/side-menu';

import '../header-six/header-six.css';
import { CartSideBar } from '@/components/_shopping-cart/cart-popup-three';


const HeaderTwentyNineMenu = ({ menu, design, headersetting}: any) => {
    
    const [open, setOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const bgColor = design?.header_color;

    const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
    }
`;

    return (
        <div
            style={{
                background: design?.header_color,
                color: design?.text_color,
            }}
            className="lg:border-b border-gray-300"
        >
            <style>{styleCss}</style>
            {/* CartSideBar open  */}
            <CartSideBar open={openCart} setOpen={setOpenCart} />

            <div className="flex flex-row gap-6 sm:container px-5 py-3 items-center justify-between">
                <div
                    onClick={() => setOpen(!open)}
                    className="lg:hidden lg:cursor-pointer menu-hover"
                >
                    <HiMenu className="text-4xl" />
                </div>
                <div className="lg:basis-1/4">
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
                <div className="lg:basis-3/4 flex justify-between items-center">
                    <div>
                        <ul className="lg:flex lg:flex-row lg:gap-8 lg:justify-center hidden ">
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
                                                    <h1 className="flex uppercase justify-between items-center group font-semibold text-sm ">
                                                        {item.name}
                                                    </h1>
                                                </Link>
                                            </li>
                                        </div>
                                    )
                            )}
                        </ul>
                    </div>
                    <div className="flex lg:gap-6 gap-2 text-gray-500 mr-3">

                        <div className="flex flex-col justify-center items-center relative">
                            <div
                                onClick={() => setOpenCart(!openCart)}
                                className="lg:cursor-pointer"
                            >
                                <CgShoppingBag
                                    style={{ color: design?.text_color }}
                                    className="text-3xl font-thin"
                                />
                                <p
                                    style={{ color: design?.text_color }}
                                    className="lg:block hidden"
                                >
                                    Cart
                                </p>
                            </div>
                        </div>
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

            <div className="block px-4 lg:hidden">
                <ul
                    className={`
                            lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5
                            duration-1000 z-10 lg:cursor-pointer ${
                                open ? 'left-0' : 'left-[-160%]'
                            }
                            `}
                >
                    <div
                        style={{
                            background: design?.header_color,
                            color: design?.text_color,
                        }}
                        className="px-10 pb-2 text-center cursor-auto "
                    >
                        <div
                            style={{ color: design?.text_color }}
                            className="py-3"
                        >
                            <p>Welcome to {design?.name}</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
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
                    <div
                        style={{
                            background: design?.header_color,
                            color: design?.text_color,
                        }}
                        className="flex justify-between px-6 py-4 lg:hidden "
                    >
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
        </div>
    );
};

export default HeaderTwentyNineMenu;

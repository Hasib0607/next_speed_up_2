'use client';

import React from 'react';
import {
    AiFillLinkedin,
    AiOutlineInstagram,
    AiOutlineMail,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { BsYoutube, BsFacebook, BsTelephone } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
import Newsletter from './components/newsletter';
import MenuList from './components/menu-list';
import CategoryList from './components/category-list';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import PageList from './components/page-list';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const FooterTwelve = ({ headersetting, design, page, menu }: any) => {
    const store_id = design?.store_id || null;

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="pb-16 lg:pb-0 pt-10">
            <div style={{ background: design?.header_color }} className="">
                <div className="sm:container px-5 sm:py-10 py-5 grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between justify-items-start gap-5 overflow-hidden items-center">
                    <div className="flex gap-3 items-center ">
                        <div>
                            <IoLocationOutline className="text-[42px]" />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-semibold ">
                                {headersetting?.address}
                            </h1>
                            <p className="text-[13px] ">Contact Info!</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center ">
                        <div>
                            <AiOutlineMail className="text-[42px]" />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-semibold ">
                                {headersetting?.email}
                            </h1>
                            <p className="text-[13px] ">Orders Support!</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div>
                            <BsTelephone className="text-[42px] bs-telephone" />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-semibold ">
                                {headersetting?.phone}
                            </h1>
                            <p className="text-[13px] ">Free support line!</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 sm:container px-5 sm:py-10 py-5">
                <Newsletter headersetting={headersetting} store_id={store_id} />
                <div className="grid lg:grid-cols-4 grid-cols-2 py-6 lg:flex lg:justify-between justify-items-start lg:gap-0 gap-5 ">
                    <div>
                        <div className="flex flex-col gap-4">
                            <h1 className="text-sm font-semibold ">Social</h1>
                            <div className="flex flex-col gap-3 text-gray-500  text-[15px]">
                                {headersetting?.facebook_link && (
                                    <a
                                        href={headersetting?.facebook_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <BsFacebook className="text-xl menu-hover lg:cursor-pointer inline mr-2" />
                                        <span className="menu-hover">
                                            Facebook
                                        </span>
                                    </a>
                                )}
                                {headersetting?.youtube_link && (
                                    <a
                                        href={headersetting?.youtube_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <BsYoutube className=" text-xl menu-hover lg:cursor-pointer inline mr-2" />
                                        <span className="menu-hover">
                                            Youtube
                                        </span>
                                    </a>
                                )}
                                {headersetting?.instagram_link && (
                                    <a
                                        href={headersetting?.instagram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiOutlineInstagram className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                        <span className="menu-hover">
                                            Instagram
                                        </span>
                                    </a>
                                )}
                                {headersetting?.lined_in_link && (
                                    <a
                                        href={headersetting?.lined_in_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <AiFillLinkedin className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                        <span className="menu-hover">
                                            LinkedIn
                                        </span>
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
                                        <AiOutlineWhatsApp className="mr-2 inline text-xl lg:cursor-pointer menu-hover" />
                                        <span className="menu-hover">
                                            WhatsApp
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-sm font-semibold ">Contact</h1>
                        </div>
                        <div className="flex flex-col gap-3 text-gray-500 text-[15px] ">
                            <p className="break-words w-36 sm:w-full">
                                {headersetting?.email}
                            </p>
                            <p className="">Call Us: {headersetting?.phone}</p>
                            <p className="">
                                Address: {headersetting?.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-sm font-semibold ">Pages</h1>
                        </div>
                        <div className="text-[15px] text-gray-500">
                            <MenuList menu={menu} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-sm font-semibold ">Legal</h1>
                        </div>
                        <div className="text-[15px] text-gray-500">
                            <PageList page={page} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-sm font-semibold  ">
                                Top Category
                            </h1>
                        </div>
                        <div className="text-[15px] text-gray-500">
                            <CategoryList category={category} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 mt-8">
                <AllPaymantGateway headersetting={headersetting} />
            </div>
            <hr />
            <div className="sm:container px-5 sm:py-10 py-5 text-[13px] font-light text-[#333333]">
                <CopyrightAll headersetting={headersetting} />
            </div>
            {/* <Messenger /> */}
            <WhatsApp headersetting={headersetting} />
        </div>
    );
};

export default FooterTwelve;

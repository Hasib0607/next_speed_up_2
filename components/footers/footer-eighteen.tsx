'use client';

import React from 'react';
import {
    AiFillLinkedin,
    AiOutlineInstagram,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { BsFacebook, BsYoutube } from 'react-icons/bs';
import Newsletter from './components/newsletter';
import CategoryList from './components/category-list';
import MenuList from './components/menu-list';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';
import PageList from './components/page-list';
import AllPaymantGateway from './components/all-payment-gateway';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const FooterEighteen = ({ headersetting, design, menu, page }: any) => {
    const store_id = design?.store_id || null;

    const styleCss = `
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    `;

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="bg-gray-200 pt-10 pb-24 lg:pb-5">
            <style>{styleCss}</style>
            <div className="sm:container px-5">
                <Newsletter headersetting={headersetting} store_id={store_id} />
            </div>
            <div className="sm:container px-5 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-2">
                <div className="">
                    <h1 className="text-xl font-medium">Categories</h1>
                    <div className="flex flex-col gap-3 pt-3 text-gray-500">
                        <CategoryList category={category} />
                    </div>
                </div>
                <div className="justify-self-center">
                    <h1 className="text-xl font-medium ">Buy with Us</h1>
                    <div className="flex flex-col gap-3 pt-3 text-gray-500">
                        <MenuList menu={menu} />
                    </div>
                </div>
                <div className="lg:justify-self-center border-b-2 lg:border-0 pb-5 lg:pb-0">
                    <h1 className="text-xl font-medium ">Legal</h1>
                    <div className="flex flex-col gap-3 pt-3 text-gray-500">
                        <PageList page={page} />
                    </div>
                </div>
                <div className="sm:justify-self-end">
                    <h1 className="text-xl font-medium"> Follow us</h1>
                    <div className="flex flex-col gap-3 pt-3">
                        <div className="flex flex-col gap-3 text-gray-500  text-[13px]">
                            {headersetting?.facebook_link && (
                                <a
                                    href={headersetting?.facebook_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <BsFacebook className="text-lg menu-hover lg:cursor-pointer inline mr-2" />
                                    <span className="menu-hover">Facebook</span>
                                </a>
                            )}
                            {headersetting?.youtube_link && (
                                <a
                                    href={headersetting?.youtube_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <BsYoutube className=" text-lg menu-hover lg:cursor-pointer inline mr-2" />
                                    <span className="menu-hover">Youtube</span>
                                </a>
                            )}
                            {headersetting?.instagram_link && (
                                <a
                                    href={headersetting?.instagram_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiOutlineInstagram className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                                    <span className="menu-hover">
                                        Instagram
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
                                    <AiOutlineWhatsApp className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                                    <span className="menu-hover">WhatsApp</span>
                                </a>
                            )}
                            {headersetting?.lined_in_link && (
                                <a
                                    href={headersetting?.lined_in_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillLinkedin className="mr-2 inline menu-hover text-lg lg:cursor-pointer" />
                                    <span className="menu-hover">LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:container px-5 mt-8">
                <AllPaymantGateway headersetting={headersetting} />
            </div>

            <div className=" sm:container px-5 text-[15px] pt-14 font-light text-[#333333]">
                <CopyrightAll headersetting={headersetting} />
            </div>
            {/* <Messenger /> */}
            <WhatsApp headersetting={headersetting} />
        </div>
    );
};

export default FooterEighteen;

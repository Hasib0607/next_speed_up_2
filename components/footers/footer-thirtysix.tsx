import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import React from 'react';
import {
    AiFillLinkedin,
    AiOutlineInstagram,
    AiOutlineMail,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { BsFacebook, BsYoutube } from 'react-icons/bs';
import CategoryList from './components/category-list';
import MenuList from './components/menu-list';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';
import SSLImg from '@/assets/SSLCommerz-Pay-With-logo-All-Size-03.webp';
import AllPaymantGateway from './components/all-payment-gateway';
import PageList from './components/page-list';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const FooterThirtySix = ({ headersetting, design, menu, page }: any) => {
    const styleCss = `
    .menu-hover:hover {
        color:  ${design?.header_color};
    }
    `;

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="pt-10 pb-24 lg:pb-5">
            <style>{styleCss}</style>
            <div className="sm:container px-5 grid grid-cols-1 lg:grid-cols-6 gap-5 sm:gap-6">
                <div className="lg:col-span-2">
                    <Link href="/">
                        <img
                            className="h-14"
                            src={imgUrl + headersetting?.logo}
                            alt=""
                        />
                    </Link>
                    <p className="py-5 text-lg font-bold">
                        For queries and help
                    </p>
                    <div className="flex items-center gap-1 text-gray-400">
                        <AiOutlineMail className="text-lg text-gray-800" />
                        <p className="">{headersetting?.email}</p>
                    </div>
                </div>

                <div className="lg:justify-self-center border-b-2 lg:border-0 pb-5 lg:pb-0">
                    <h1 className="text-xl font-medium">Categories</h1>
                    <div className="flex flex-col gap-3 pt-3 text-gray-500">
                        <CategoryList category={category} />
                    </div>
                </div>
                <div className="lg:justify-self-center border-b-2 lg:border-0 pb-5 lg:pb-0">
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
                <div className="lg:justify-self-end">
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

            <div className="border-t border-b border-gray-500 my-5 flex justify-between items-center">
                <div className="sm:container px-5 text-[15px] py-8 font-light text-[#333333]">
                    <CopyrightAll headersetting={headersetting} />
                </div>
                {headersetting?.online === 'active' && (
                    <>
                        <div>
                            <img src={SSLImg?.src} alt="" />
                        </div>
                    </>
                )}
            </div>
            {/* <Messenger /> */}
            <WhatsApp />
        </div>
    );
};

export default FooterThirtySix;

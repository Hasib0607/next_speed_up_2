'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';
import { AiFillGift, AiFillLinkedin } from 'react-icons/ai';
import { BiSupport } from 'react-icons/bi';
import { FaFacebook } from 'react-icons/fa';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { TbFileCertificate } from 'react-icons/tb';
import CategoryList from './components/category-list';
import CopyrightAll from './components/copyrightall';
import MenuList from './components/menu-list';
import MyAccount from './components/myaccount';
import NewsletterThree from './components/newsletter-three';
import WhatsApp from './components/whatsApp';
import { customizeFooter } from '@/utils/customizeDesign';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import PageList from './components/page-list';
import AllPaymantGateway from './components/all-payment-gateway';

const FooterTwentyOne = ({ headersetting, menu, page }: any) => {
    const store_id = headersetting?.store_id || null;
    const [heading, setHeading] = useState(null);

    const cls = 'text-gray-400 hover:text-white';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const footerData = customizeFooter.find((item) => item.id == store_id);

    return (
            <div className="bg-black mt-10 pb-24 lg:pb-10">
                <div className="sm:container px-5 sm:py-10 py-5">
                    <NewsletterThree store_id={store_id} />
                    {/* footer top section  */}
                    <div className="grid lg2:grid-cols-6 md:grid-cols-4 grid-cols-1 sm:gap-y-10 gap-y-2  text-white ">
                        <div className="flex flex-col gap-5 lg2:col-span-2 md:col-span-2 col-span-1 mb-5 sm:mb-0">
                            <div>
                                <h1 className="text-xl uppercase font-bold">
                                    ABOUT US
                                </h1>
                                <p className="text-base pt-5 text-gray-400">
                                    {headersetting?.short_description}
                                </p>
                            </div>
                            <div className="flex gap-x-4 ">
                                {headersetting?.facebook_link && (
                                    <a
                                        href={headersetting?.facebook_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="h-10 w-10 rounded-full border border-transparent hover:border-black duration-300 text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                                            <FaFacebook className="text-lg " />
                                        </div>
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
                                        <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                                            <IoLogoWhatsapp className="text-lg " />
                                        </div>
                                    </a>
                                )}

                                {headersetting?.instagram_link && (
                                    <a
                                        href={headersetting?.instagram_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                                            <GrInstagram className="text-lg " />
                                        </div>
                                    </a>
                                )}

                                {headersetting?.youtube_link && (
                                    <a
                                        href={headersetting?.youtube_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                                            <GrYoutube className="text-lg " />
                                        </div>
                                    </a>
                                )}
                                {headersetting?.lined_in_link && (
                                    <a
                                        href={headersetting?.lined_in_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="h-10 w-10 rounded-full border border-transparent duration-300 hover:border-black text-black hover:text-[#f1593a] bg-white flex justify-center items-center">
                                            <AiFillLinkedin className="text-lg " />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="lg2:justify-self-center md:block hidden">
                            <h1 className="sm:text-xl uppercase font-bold pb-5">
                                MY ACCOUNT
                            </h1>
                            <div className="flex flex-col gap-2 text-base text-gray-400">
                                <MyAccount cls={cls} />
                            </div>
                        </div>

                        <div className="lg2:justify-self-center md:col-span-2 lg2:col-span-1 md:block hidden">
                            <div>
                                <h1 className="sm:text-xl uppercase font-bold pb-5">
                                    RESOURCES
                                </h1>
                                <div className="flex flex-col gap-2 ">
                                    <MenuList cls={cls} menu={menu} />
                                </div>
                            </div>
                        </div>
                        <div className="lg2:justify-self-center md:col-span-2 lg2:col-span-1 md:block hidden">
                            <div>
                                <h1 className="sm:text-xl uppercase font-bold pb-5">
                                    LEGAL
                                </h1>
                                <div className="flex flex-col gap-2 ">
                                    <PageList cls={cls} page={page} />
                                </div>
                            </div>
                        </div>

                        <div className="lg2:justify-self-center md:block hidden">
                            <h1 className="sm:text-xl uppercase font-bold pb-5">
                                FIND IT FAST
                            </h1>
                            <div className="flex flex-col gap-2 text-base ">
                                <CategoryList cls={cls} category={category} />
                            </div>
                        </div>

                        {/* responsive for small device  */}
                        <div className="lg2:justify-self-center md:hidden block">
                            <div
                                // onClick={() =>
                                //   setHeading(heading !== "account" ? "account" : "")
                                // }
                                className="flex justify-between items-center"
                            >
                                <h1 className="sm:text-xl uppercase font-bold">
                                    MY ACCOUNT
                                </h1>
                                {heading === 'account' ? (
                                    <MinusIcon className="h-4 w-4 text-white" />
                                ) : (
                                    <PlusIcon className="h-4 w-4 text-white" />
                                )}
                            </div>
                            {heading === 'account' && (
                                <div className="flex flex-col gap-2 text-base text-gray-400">
                                    <MyAccount cls={cls} />
                                </div>
                            )}
                        </div>
                        <div className="lg2:justify-self-center md:hidden block">
                            <div>
                                <div
                                    // onClick={() =>
                                    //   setHeading(heading !== "resource" ? "resource" : "")
                                    // }
                                    className="flex justify-between items-center"
                                >
                                    <h1 className="sm:text-xl uppercase font-bold ">
                                        RESOURCES
                                    </h1>
                                    {heading === 'resource' ? (
                                        <MinusIcon className="h-4 w-4 text-white" />
                                    ) : (
                                        <PlusIcon className="h-4 w-4 text-white" />
                                    )}
                                </div>
                                {heading === 'resource' && (
                                    <div className="flex flex-col gap-2">
                                        <MenuList cls={cls} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg2:justify-self-center md:hidden block">
                            <div>
                                <div
                                    // onClick={() =>
                                    //   setHeading(heading !== "resource" ? "resource" : "")
                                    // }
                                    className="flex justify-between items-center"
                                >
                                    <h1 className="sm:text-xl uppercase font-bold ">
                                        LEGAL
                                    </h1>
                                    {heading === 'resource' ? (
                                        <MinusIcon className="h-4 w-4 text-white" />
                                    ) : (
                                        <PlusIcon className="h-4 w-4 text-white" />
                                    )}
                                </div>
                                {heading === 'resource' && (
                                    <div className="flex flex-col gap-2">
                                        <PageList cls={cls} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg2:justify-self-center md:hidden block">
                            <div
                                // onClick={() => setHeading(heading !== "find" ? "find" : "")}
                                className="flex justify-between items-center"
                            >
                                <h1 className="sm:text-xl uppercase font-bold">
                                    FIND IT FAST
                                </h1>
                                {heading === 'find' ? (
                                    <MinusIcon className="h-4 w-4 text-white" />
                                ) : (
                                    <PlusIcon className="h-4 w-4 text-white" />
                                )}
                            </div>
                            {heading === 'find' && (
                                <div className="flex flex-col gap-2 text-base text-gray-400">
                                    <CategoryList cls={cls} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* footer middle section  */}
                    <div className="border border-gray-600 mt-5">
                        <div
                            className={`text-white flex flex-col md:flex-row justify-between justify-items-center`}
                        >
                            {footerData?.free_shipping == false && (
                                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative">
                                    <div>
                                        <AiFillGift className="text-5xl" />
                                    </div>
                                    <div>
                                        <h1 className="font-medium text-lg">
                                            Free Shipping
                                        </h1>
                                        <p className="text-gray-400 text-sm">
                                            Free shipping over{' '}
                                            {store_id === 2272
                                                ? '1999'
                                                : '1990'}{' '}
                                            Taka
                                        </p>
                                    </div>
                                    <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden md:block"></div>
                                </div>
                            )}
                            <div
                                className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative hover:cursor-pointer"
                                onClick={() =>
                                    (window.location.href = `https://wa.me/${headersetting?.whatsapp_phone}`)
                                }
                            >
                                <div>
                                    <BiSupport className="text-5xl" />
                                </div>
                                <div>
                                    <h1 className="font-medium text-lg">
                                        {headersetting?.whatsapp_phone
                                            ? 'Whatsapp'
                                            : 'Support 24/7'}
                                    </h1>
                                    <p className="text-gray-400 text-sm">
                                        {headersetting?.whatsapp_phone
                                            ? headersetting?.whatsapp_phone
                                            : 'Contact us 24 hours a day'}
                                    </p>
                                </div>

                                <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden lg2:block"></div>
                            </div>

                            {store_id === 6227 ? (
                                ''
                            ) : (
                                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5 relative">
                                    <div>
                                        <TbFileCertificate className="text-5xl" />
                                    </div>
                                    <div>
                                        <h1 className="font-medium text-lg">
                                            {store_id === 2272 ? '72' : '48'}{' '}
                                            Hours Return Policy
                                        </h1>
                                        <p className="text-gray-400 text-sm">
                                            Condition apply
                                        </p>
                                    </div>
                                    <div className="absolute w-[1px] h-16 bg-gray-500 right-0 hidden md:block"></div>
                                </div>
                            )}
                            {store_id === 6227 ? (
                                ''
                            ) : (
                                <div className="flex items-center gap-2 w-full justify-center hover:bg-gray-900 p-5">
                                    <div>
                                        <RiSecurePaymentLine className="text-5xl" />
                                    </div>
                                    <div>
                                        <h1 className="font-medium text-lg">
                                            Payment Secure
                                        </h1>
                                        <p className="text-gray-400 text-sm">
                                            We ensure secure payment
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-600 h-[1px] w-full"></div>

                <div className="sm:container px-5 mt-8 text-white">
                    <AllPaymantGateway headersetting={headersetting} />
                </div>

                {/* bottom section  */}
                <div className="sm:container px-5 pt-5 flex flex-col md:flex-row gap-5 items-center md:justify-between text-white">
                    <div>
                        <img
                            src={imgUrl + headersetting?.logo}
                            alt=""
                            className="h-10 max-w-20"
                        />
                    </div>
                    <div className="text-center">
                        <CopyrightAll headersetting={headersetting} />
                    </div>
                </div>
                {/* <Messenger /> */}
                <WhatsApp headersetting={headersetting} />
            </div>
    );
};

export default FooterTwentyOne;

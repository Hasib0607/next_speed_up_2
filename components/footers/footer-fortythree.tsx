'use client';

import React, { useState } from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
import { RiInstagramLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { imgUrl } from '@/site-settings/siteUrl';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import MenuList from './components/menu-list';
import CopyrightAll from './components/copyrightall';
import Link from 'next/link';
import CategoryList from './components/category-list';
import WhatsApp from './components/whatsApp';
import PageList from './components/page-list';
import AllPaymantGateway from './components/all-payment-gateway';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import NewsletterFortyThree from './components/newsletter-fortythree';

const FooterFortyThree = ({ design, headersetting, menu, page }: any) => {
    const store_id = design?.store_id || null;

    const customDesign = `
      .liList:hover{
        color: ${design?.header_color}
      }
      
    `;
    const menuList = [
        { name: 'Profile' },
        { name: 'Order' },
        { name: 'Checkout' },
        { name: 'Login' },
    ];

    const cls = 'hover:ml-2 liList duration-500';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="mt-[60px] bg-gray-50 xl:mt-0 md:mt-[25px] lg:mt-0">
            <NewsletterFortyThree
                headersetting={headersetting}
                store_id={store_id}
            />
            <style>{customDesign}</style>
            <div className="sm:container px-5 flex justify-center">
                <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    <div className="col-span-1 hidden sm:hidden lg:block">
                        <h2 className="font-bold">Menu</h2>
                        <div className="mt-4">
                            <MenuList cls={cls} menu={menu} />
                        </div>
                    </div>
                    <div className="col-span-1 hidden sm:hidden lg:block">
                        <h1 className="font-bold">Legal</h1>
                        <div className="mt-4">
                            <PageList cls={cls} page={page} />
                        </div>
                    </div>
                    <div className="col-span-1 hidden sm:hidden lg:block">
                        <h2 className="font-bold">Categories</h2>
                        <div className="mt-4">
                            <CategoryList cls={cls} category={category} />
                        </div>
                    </div>
                    <div className="col-span-1 hidden lg:block">
                        <h2 className="font-bold">Your Account</h2>
                        <div className="mt-4">
                            <Link href="/profile" className={`${cls}`}>
                                Profile
                            </Link>
                            <br />
                            <Link href="/order" className={`${cls}`}>
                                Order
                            </Link>
                            <br />
                            <Link href="/checkout" className={`${cls}`}>
                                Checkout
                            </Link>
                            <br />
                            <Link href="/login" className={`${cls}`}>
                                Login
                            </Link>
                        </div>
                    </div>

                    {/* Accordion for mobile view */}
                    <div className="col-span-1 lg:hidden">
                        <Accordion name={'Menu'} menu={menu} cls={cls} />
                    </div>
                    <div className="col-span-1 lg:hidden">
                        <Accordion
                            name={'Categories'}
                            categoryMenu={category}
                            cls={cls}
                        />
                    </div>
                    <div className="col-span-1 lg:hidden">
                        <Accordion
                            name={'Your Account'}
                            menuList={menuList}
                            category={category}
                            cls={cls}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center mt-12">
                <div>
                    <img
                        className="w-auto md:h-20 h-10"
                        src={imgUrl + headersetting?.logo}
                        alt=""
                    />
                </div>
                <div className="flex pb-4 mt-8 items-center">
                    {headersetting?.facebook_link && (
                        <div
                            className="p-2"
                            style={{
                                color: design?.text_color,
                            }}
                        >
                            <a href={`${headersetting?.facebook_link}`}>
                                {' '}
                                <FaFacebookF className="text-xl" />
                            </a>
                        </div>
                    )}
                    {headersetting?.youtube_link && (
                        <div
                            className="p-2"
                            style={{
                                color: design?.text_color,
                            }}
                        >
                            <a href={`${headersetting?.youtube_link}`}>
                                {' '}
                                <AiFillYoutube className="text-xl" />
                            </a>
                        </div>
                    )}
                    {headersetting?.instagram_link && (
                        <div
                            className="p-2"
                            style={{
                                color: design?.text_color,
                            }}
                        >
                            <a href={`${headersetting?.instagram_link}`}>
                                {' '}
                                <RiInstagramLine className="text-xl" />
                            </a>
                        </div>
                    )}
                    {headersetting?.lined_in_link && (
                        <div
                            className="p-2"
                            style={{
                                color: design?.text_color,
                            }}
                        >
                            <a href={`${headersetting?.lined_in_link}`}>
                                {' '}
                                <AiFillLinkedin className="text-xl" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="border-t border-gray-300 w-full lg:w-[80%]"></div>
            </div>
            <div className="sm:container px-5 mt-8">
                <AllPaymantGateway headersetting={headersetting} />
            </div>
            <div className="sm:container">
                <div className="mb-20 md:mb-10 px-5 lg:pl-32">
                    <CopyrightAll headersetting={headersetting} />
                </div>
            </div>
            <WhatsApp headersetting={headersetting} />
        </div>
    );
};

export default FooterFortyThree;

const Accordion = ({ name, menu, menuList, categoryMenu, cls }: any) => {
    const [show, setShow] = useState(false);
    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="accordion-item" onClick={() => setShow(!show)}>
            <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-bold">{name}</h3>
                {show ? (
                    <MinusIcon className="w-6 h-6" />
                ) : (
                    <PlusIcon className="w-6 h-6" />
                )}
            </div>

            {show && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6 }}
                    className="accordion-content"
                >
                    {menuList ? (
                        <ul className="list-none liList">
                            {menuList.map((data: any) => (
                                <li key={data?.id || data?.name}>
                                    <Link href={`/${data?.name.toLowerCase()}`}>
                                        {data?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : menu ? (
                        <div className="list-none">
                            <MenuList cls={cls} menu={menu} />
                        </div>
                    ) : categoryMenu ? (
                        <div className="list-none">
                            <CategoryList category={category} />
                        </div>
                    ) : null}
                </motion.div>
            )}
        </div>
    );
};

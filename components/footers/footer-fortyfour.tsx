'use client';

import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';
import { RiInstagramLine } from 'react-icons/ri';
import CopyrightAll from './components/copyrightall';
import Link from 'next/link';
import WhatsApp from './components/whatsApp';
import PageList from './components/page-list';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import NewsletterFortyFour from './components/newsletter-fortyfour';
import PaymantGatewayFortyFour from './components/payment-gateway-fortyfour';

const FooterFortyFour = ({ design, headersetting, menu, page }: any) => {
    const store_id = design?.store_id || null;

    const customDesign = `
      .liList:hover{
        color: ${design?.header_color}
      }
      @media (max-width: 640px) {
        .footer-grid {
          grid-template-columns: 1fr;
        }
      }
    `;

    const cls = 'hover:ml-2 liList duration-500';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="mt-[60px] bg-gray-50 xl:mt-0 md:mt-[25px] lg:mt-0">
            <div className="sm:container px-5 py-10 mt-8">
                <PaymantGatewayFortyFour headersetting={headersetting} />
            </div>

            <NewsletterFortyFour
                headersetting={headersetting}
                store_id={store_id}
            />
            <style>{customDesign}</style>
            <div className="bg-[#58595b] text-white py-8 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid footer-grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
                        {/* Brand Section */}
                        <div className="col-span-1">
                            <h1 className="font-bold text-xl md:text-2xl mb-4">
                                {headersetting?.website_name}
                            </h1>
                            <PageList cls={cls} page={page} />
                            <div className="flex items-center mt-4 flex-wrap gap-3">
                                {headersetting?.facebook_link && (
                                    <a href={headersetting.facebook_link}>
                                        <FaFacebookF className="text-2xl text-white bg-black p-1 rounded-full hover:opacity-80 transition-opacity" />
                                    </a>
                                )}
                                {headersetting?.youtube_link && (
                                    <a href={headersetting.youtube_link}>
                                        <AiFillYoutube className="text-2xl text-white bg-black p-1 rounded-full hover:opacity-80 transition-opacity" />
                                    </a>
                                )}
                                {headersetting?.instagram_link && (
                                    <a href={headersetting.instagram_link}>
                                        <RiInstagramLine className="text-2xl text-white bg-black p-1 rounded-full hover:opacity-80 transition-opacity" />
                                    </a>
                                )}
                                {headersetting?.lined_in_link && (
                                    <a href={headersetting.lined_in_link}>
                                        <AiFillLinkedin className="text-2xl text-white bg-black p-1 rounded-full hover:opacity-80 transition-opacity" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Categories Section */}
                        <div className="col-span-1 md:col-span-1 lg:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                                {category?.slice(0, 3)?.map((cat: any) => (
                                    <div key={cat.id} className="mb-4">
                                        <h3 className="font-bold text-lg mb-2">
                                            {cat.name}
                                        </h3>
                                        <div className="space-y-1">
                                            {cat.subcategories
                                                ?.slice(0, 5)
                                                ?.map((sub: any) => (
                                                    <Link
                                                        href={`/category/${sub.id}`}
                                                        key={sub.id}
                                                        className={`block ${cls} text-sm md:text-base`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Account Section */}
                        <div className="col-span-1">
                            <h2 className="font-bold text-lg md:text-xl mb-4">
                                Your Account
                            </h2>
                            <div className="space-y-2">
                                <Link
                                    href="/profile"
                                    className={`${cls} block text-sm md:text-base`}
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/order"
                                    className={`${cls} block text-sm md:text-base`}
                                >
                                    Order
                                </Link>
                                <Link
                                    href="/checkout"
                                    className={`${cls} block text-sm md:text-base`}
                                >
                                    Checkout
                                </Link>
                                <Link
                                    href="/login"
                                    className={`${cls} block text-sm md:text-base`}
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="flex items-center justify-center py-8">
                <div className="px-5 md:pb-0 pb-10">
                    <CopyrightAll headersetting={headersetting} />
                </div>
            </div>

            <WhatsApp />
        </div>
    );
};

export default FooterFortyFour;

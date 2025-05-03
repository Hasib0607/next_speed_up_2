'use client';

import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import Newsletter from './components/newsletter';
import { imgUrl } from '@/site-settings/siteUrl';
import CopyrightAll from './components/copyrightall';
import CategoryList from './components/category-list';
import MenuList from './components/menu-list';
import FollowUs from './components/follow-us';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import PageList from './components/page-list';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const FooterNine = ({ headersetting, design, menu, page }: any) => {
    const store_id = design?.store_id || null;

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const customDesign = `
    .footerColor:hover{
    color:${design?.header_color};
    }
    .searchBtn:hover{
        background-color:${design?.header_color};
        color:${design?.text_color}
    }
    .footerFiveBorderCustom {
        margin: 0;
        padding-bottom: 7px;
        position: relative;
        width: 50%;
    }
    
    .footerFiveBorderCustom:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        right: 0;
        left: 0;
    }
    `;
    const clsMenu = 'text-base font-normal leading-relaxed';
    const clsFollow = 'text-3xl footerColor';

    return (
        <div style={{ background: '#f6f6f6' }}>
            <div className="sm:container px-5 pb-20 lg:pb-0">
                <style>{customDesign}</style>
                <Newsletter headersetting={headersetting} store_id={store_id} />
                <footer className="grid xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 ">
                    <div>
                        <div className="py-5 px-5 lg:grid xl:justify-items-end">
                            <div className="py-3">
                                <img
                                    className="w-auto h-14"
                                    src={imgUrl + headersetting?.logo}
                                    alt=""
                                />
                                <p className="py-5 text-base font-light">
                                    {headersetting?.short_description}
                                </p>
                                <div className="py-8 flex flex-row xl:gap-4 space-x-4 gap-3 items-center">
                                    <div>
                                        <FiPhoneCall
                                            style={{
                                                color: design?.header_color,
                                            }}
                                            className="text-3xl"
                                        />
                                    </div>
                                    <div className="lg:px-4 md:px-4 ">
                                        <h5>NEED HELP ?</h5>
                                        <h1 className="font-semibold">
                                            {headersetting?.phone}
                                        </h1>
                                    </div>
                                </div>
                                <div className="sm:container px-5 mt-8 mb-7">
                                    <AllPaymantGateway
                                        headersetting={headersetting}
                                    />
                                </div>
                                <CopyrightAll headersetting={headersetting} />
                            </div>
                        </div>
                    </div>

                    <div
                        className="xl:col-span-2"
                        style={{ background: '#efefef' }}
                    >
                        <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4 py-8 px-5">
                            <div>
                                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                                    Products
                                </h1>
                                <div className="mt-5">
                                    <CategoryList
                                        cls={clsMenu}
                                        category={category}
                                    />
                                </div>
                            </div>
                            <div>
                                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                                    Our Pages
                                </h1>
                                <div className="mt-5">
                                    <MenuList cls={clsMenu} menu={menu} />
                                </div>
                            </div>
                            <div>
                                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                                    Legal
                                </h1>
                                <div className="mt-5">
                                    <PageList cls={clsMenu} page={page} />
                                </div>
                            </div>
                            <div className="xl:col-span-2 lg:col-span-2">
                                <h1 className="footerFiveBorder footerFiveBorderCustom text-lg font-semibold">
                                    Follow Us
                                </h1>
                                <div className="flex gap-2 mt-5">
                                    <FollowUs
                                        cls={clsFollow}
                                        headersetting={headersetting}
                                        design={design}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Messenger /> */}
                    <WhatsApp headersetting={headersetting} />
                </footer>
            </div>
        </div>
    );
};

export default FooterNine;

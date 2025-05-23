import React from 'react';
import { MdDeliveryDining, MdSecurity, MdSupportAgent } from 'react-icons/md';
import Newsletter from './components/newsletter';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import MyAccount from './components/myaccount';
import MenuList from './components/menu-list';
import CopyrightAll from './components/copyrightall';
import FollowUs from './components/follow-us';
import WhatsApp from './components/whatsApp';
import PageList from './components/page-list';
import AllPaymantGateway from './components/all-payment-gateway';

const FooterSixteen = ({ headersetting, menu, page, design }: any) => {
    const store_id = design?.store_id || null;
    const cls = 'text-2xl text-gray-600';

    return (
        <div className="bg-gray-100 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between justify-items-start sm:container px-5 sm:py-10 py-5 pb-14 gap-5 overflow-hidden items-center border-b-[1px] border-gray-300 text-gray-600">
                <div className="flex gap-3 items-center ">
                    <div>
                        <MdSecurity className="text-[42px]" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-semibold ">
                            MONEY BACK GUARANTEE
                        </h1>
                        <p className="text-[13px] ">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center ">
                    <div>
                        <MdSupportAgent className="text-[42px]" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-semibold ">
                            24/7 CUSTOMER SUPPORT
                        </h1>
                        <p className="text-[13px] ">{headersetting?.phone}</p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <div>
                        <MdDeliveryDining className="text-[42px] bs-telephone" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-semibold ">
                            FAST AND LOW COST DELIVERY
                        </h1>
                        <p className="text-[13px] ">
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                    </div>
                </div>
            </div>

            <div className="sm:container px-5 mt-10">
                <Newsletter headersetting={headersetting} store_id={store_id} />
                <div className="grid lg:grid-cols-5 grid-cols-2 py-6 gap-5 ">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/">
                            <img
                                className="h-14"
                                src={imgUrl + headersetting?.logo}
                                alt=""
                            />{' '}
                        </Link>
                        <p className="text-gray-600 pt-4">
                            {headersetting?.short_description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
                        <div>
                            <h1 className="text-lg font-semibold ">
                                CONTACT INFO
                            </h1>
                        </div>
                        <div className="flex flex-col gap-3 text-gray-500 text-base ">
                            <p className="menu-hover">{headersetting?.email}</p>
                            <p className="menu-hover">
                                Call Us: {headersetting?.phone}
                            </p>
                            <p className="menu-hover">
                                Address: {headersetting?.address}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg font-semibold ">
                                QUICK LINKS
                            </h1>
                        </div>
                        <div className="flex flex-col gap-3 text-gray-500 text-base ">
                            <MyAccount />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg font-semibold  ">
                                TOP MENU
                            </h1>
                        </div>
                        <div className="flex flex-col gap-3 text-base text-gray-500">
                            <MenuList menu={menu} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-lg font-semibold  ">LEGAL</h1>
                        </div>
                        <div className="flex flex-col gap-3 text-base text-gray-500">
                            <PageList page={page} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:container px-5 mt-8">
                <AllPaymantGateway headersetting={headersetting} />
            </div>
            <hr />
            <div className="flex md:flex-row flex-col gap-3 md:justify-between text-center items-center sm:container px-5 pt-5 pb-20 lg:pb-5 ">
                <div>
                    <CopyrightAll headersetting={headersetting} />
                </div>

                <div className="flex gap-3 text-gray-500 text-base">
                    <FollowUs
                        cls={cls}
                        headersetting={headersetting}
                        design={design}
                    />
                </div>
            </div>
            {/* <Messenger /> */}
            <WhatsApp headersetting={headersetting} />
        </div>
    );
};

export default FooterSixteen;

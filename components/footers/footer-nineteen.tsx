import React from 'react';
import Newsletter from './components/newsletter';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import FollowUs from './components/follow-us';
import MenuList from './components/menu-list';
import CategoryList from './components/category-list';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';

const FooterNineteen = ({
    headersetting,
    store_id,
    design,
    page,
    menu,
    category,
}: any) => {
    const cls = 'text-2xl';

    return (
        <>
            <div className="bg-[#f2efe4] pt-10">
                <div className="sm:container px-5">
                    <Newsletter
                        headersetting={headersetting}
                        store_id={store_id}
                    />
                    <div className="py-10">
                        <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-y-10">
                            <div className="col-span-2 xl:col-span-4 lg:col-span-2 md:col-span-2">
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
                                <p className="mt-6">
                                    TEL:+ {headersetting?.phone}
                                </p>
                                <p> Email: {headersetting?.email}</p>
                                <div className="flex gap-x-3 mt-4">
                                    <FollowUs
                                        cls={cls}
                                        headersetting={headersetting}
                                        design={design}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <MenuList page={page} menu={menu} />
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <CategoryList category={category} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border mb-16 lg:mb-0">
                <div className="sm:container px-5">
                    <div className="py-2">
                        <CopyrightAll headersetting={headersetting} />
                    </div>
                </div>
            </div>
            <WhatsApp headersetting={headersetting} />
            {/* <Messenger /> */}
        </>
    );
};

export default FooterNineteen;

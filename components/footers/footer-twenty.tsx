import React from 'react';
import Newsletter from './components/newsletter';
import { imgUrl } from '@/site-settings/siteUrl';
import MenuList from './components/menu-list';
import MyAccount from './components/myaccount';
import FollowUs from './components/follow-us';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';

const FooterTwenty = ({ headersetting, page, menu, store_id, design }: any) => {
    const cls = 'text-xl';
    return (
        <div className=" bg-[#f5f5f5] ">
            <div className="sm:container px-5 relative pt-10 group">
                <Newsletter headersetting={headersetting} store_id={store_id} />
                <div className="">
                    <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-y-10 border-b-2 py-5">
                        <div className="col-span-2 xl:col-span-4 lg:col-span-2 md:col-span-2">
                            <img
                                className="w-auto h-20  sm:h-10"
                                src={imgUrl + headersetting?.logo}
                                alt=""
                            />
                            <p className="mt-2">
                                {headersetting?.short_description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <MenuList menu={menu} page={page} />
                        </div>

                        <div className="flex flex-col gap-y-3">
                            <MyAccount />
                        </div>
                    </div>
                    <div className="pt-2 lg:pb-5 pb-20 ">
                        <div className="flex flex-col gap-y-2 md:flex-row justify-center items-center md:justify-between ">
                            <div className="flex gap-2">
                                <FollowUs
                                    design={design}
                                    headersetting={headersetting}
                                    cls={cls}
                                />
                            </div>
                            <div>
                                <CopyrightAll headersetting={headersetting} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Messenger /> */}
            <WhatsApp headersetting={headersetting} />
        </div>
    );
};

export default FooterTwenty;

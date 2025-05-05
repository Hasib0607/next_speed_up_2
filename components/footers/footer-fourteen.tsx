import React from 'react';
import Newsletter from './components/newsletter';
import CopyrightAll from './components/copyrightall';
import MenuList from './components/menu-list';
import FollowUs from './components/follow-us';
import WhatsApp from './components/whatsApp';
import AllPaymantGateway from './components/all-payment-gateway';
import PageList from './components/page-list';

const FooterFourteen = ({ design, headersetting, menu, page }: any) => {
    const store_id = design?.store_id || null;

    const customDesign = `
    .footer-color:hover{
    color:${design?.header_color};
    }
    .searchBtn:hover{
        background-color:${design?.header_color};
        color:${design?.text_color}
    }
    `;
    const cls = 'footer-color';

    return (
        <div className="sm:container px-5 sm:pt-10 pt-5 pb-20 lg:pb-3">
            <Newsletter headersetting={headersetting} store_id={store_id} />
            <div className="sm:container px-5 mt-8">
                <AllPaymantGateway headersetting={headersetting} />
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 justify-items-center items-start border-t-2 py-4 sm:pb-4 pb-20">
                <style>{customDesign}</style>
                <div>
                    <CopyrightAll headersetting={headersetting} />
                </div>
                <div className="flex flex-wrap md:space-x-5 space-x-3 justify-center py-2 md:py-0">
                    <MenuList cls={cls} menu={menu} />
                </div>
                <div className="flex flex-wrap md:space-x-5 space-x-3 justify-center py-2 md:py-0">
                    <PageList cls={cls} page={page} />
                </div>
                <div className="text-gray-500 text-3xl flex gap-2">
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

export default FooterFourteen;

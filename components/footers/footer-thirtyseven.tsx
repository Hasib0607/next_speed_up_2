import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import React from 'react';
import FollowUs from './components/follow-us';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';

const FooterThirtySeven = ({
    headersetting,
    category,
    menu,
    design,
    page,
}: any) => {
    const result = page.filter(
        (item: any) => !menu.find((menuItem: any) => menuItem.url === item.link)
    );

    const customDesign = `
    .footerColor:hover{
        color:${design?.header_color};
    }
    .searchBtn:hover{
        background-color:${design?.header_color};
        color:${design?.text_color}
    }
    .footerThirtySeven {
        margin: 0;
        padding-bottom: 7px;
        position: relative;
    }
    
    .footerThirtySeven:before {
        position: absolute;
        background: linear-gradient(to right, ${design?.header_color} 60px, rgb(235, 235, 235) 10px) !important;
        height: 2px;
        content: '';
        bottom: 0;
        width: 30px;
        left: 0;
    }
    `;

    return (
        <div className={`bg-[#191919] text-white`}>
            <footer className="">
                <style>{customDesign}</style>
                <div className="grid lg2:grid-cols-3 sm:grid-cols-1 gap-1 sm:container px-5">
                    <div className="py-8 xl:bg-transparent">
                        <div className="">
                            <div className="">
                                <img
                                    className="w-auto h-14"
                                    src={imgUrl + headersetting?.logo}
                                    alt=""
                                />
                                <p className="py-5 text-base font-light">
                                    {headersetting?.short_description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-2 lg:col-span-2">
                        <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-4 py-8 ">
                            <div>
                                <h1 className="footerFiveBorder footerThirtySeven text-lg font-semibold">
                                    Products
                                </h1>
                                <div className="mt-5">
                                    {category?.slice(0, 6)?.map((data: any) => (
                                        <Link
                                            href={'/category/' + data?.id}
                                            key={data?.id}
                                            className="text-base footerColor font-normal leading-relaxed "
                                        >
                                            {' '}
                                            {data.name} <br />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h1 className="footerFiveBorder footerThirtySeven text-lg font-semibold">
                                    Pages
                                </h1>
                                <div className="mt-5 list-none">
                                    {menu?.map(
                                        (m: any) =>
                                            m?.status == 1 && (
                                                <li key={m?.id}>
                                                    <Link
                                                        href={
                                                            m?.custom_link ||
                                                            (m?.url
                                                                ? `/${m?.url}`
                                                                : '/')
                                                        }
                                                        className="text-base footerColor font-normal leading-relaxed"
                                                    >
                                                        {m?.name}
                                                    </Link>
                                                </li>
                                            )
                                    )}
                                </div>
                            </div>
                            <div>
                                <h1 className="footerFiveBorder footerThirtySeven text-lg font-semibold">
                                    Legal
                                </h1>
                                <div className="mt-5 list-none">
                                    {result?.map((m: any) => (
                                        <li key={m?.id}>
                                            <Link
                                                href={'/' + m?.link}
                                                className="text-base footerColor font-normal leading-relaxed "
                                            >
                                                {' '}
                                                {m?.name}
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            </div>
                            <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
                                <h1 className="footerThirtySeven text-lg font-semibold">
                                    Follow Us
                                </h1>
                                <div className="flex gap-x-3 mt-3 text-3xl">
                                    <FollowUs
                                        headersetting={headersetting}
                                        design={design}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Messenger /> */}
                <WhatsApp headersetting={headersetting} />
            </footer>
            <div className="pb-20 lg:pb-5 sm:container px-5">
                <CopyrightAll headersetting={headersetting} />
            </div>
        </div>
    );
};

export default FooterThirtySeven;

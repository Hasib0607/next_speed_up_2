import { imgUrl } from '@/site-settings/siteUrl';
import Link from 'next/link';
import React from 'react';
import FollowUs from './components/follow-us';
import CopyrightAll from './components/copyrightall';
import WhatsApp from './components/whatsApp';
import { BsFillTelephoneFill } from 'react-icons/bs';

const FooterFortyEight = ({
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
    `;

    return (
        <div className="bg-[#130101] text-white">
            <footer>
                <style>{customDesign}</style>
                <div className="sm:container px-5">
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 md:justify-items-center md:text-left">
                            {/* Company */}
                            <div>
                                <h1 className="text-lg font-semibold">
                                    Company
                                </h1>
                                <div className="mt-5 space-y-2">
                                    {category?.slice(0, 6)?.map((data: any) => (
                                        <Link
                                            href={'/category/' + data?.id}
                                            key={data?.id}
                                            className="text-base footerColor font-normal leading-relaxed block"
                                        >
                                            {data.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Pages */}
                            <div>
                                <h1 className="text-lg font-semibold">Pages</h1>
                                <div className="mt-5 list-none space-y-2">
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

                            {/* Privacy & Terms */}
                            <div>
                                <h1 className="text-lg font-semibold">
                                    Privacy & Terms
                                </h1>
                                <div className="mt-5 list-none space-y-2">
                                    {result?.map((m: any) => (
                                        <li key={m?.id}>
                                            <Link
                                                href={'/' + m?.link}
                                                className="text-base footerColor font-normal leading-relaxed"
                                            >
                                                {m?.name}
                                            </Link>
                                        </li>
                                    ))}
                                </div>
                            </div>

                            {/* Follow Us */}
                            <div>
                                <h1 className="text-lg font-semibold">
                                    Follow Us
                                </h1>
                                <div className="flex gap-x-3 mt-3 text-3xl justify-start">
                                    <FollowUs
                                        headersetting={headersetting}
                                        design={design}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-b border-[#176b87] py-2">
                    <a
                        href={`tel:${headersetting?.phone}`}
                        className="flex gap-3 items-center justify-center"
                    >
                        <BsFillTelephoneFill />
                        <p>{headersetting?.phone}</p>
                    </a>
                </div>

                <WhatsApp headersetting={headersetting} />
            </footer>

            <div className="py-16 lg:py-5 sm:container text-center px-5">
                <CopyrightAll headersetting={headersetting} />
            </div>
        </div>
    );
};

export default FooterFortyEight;

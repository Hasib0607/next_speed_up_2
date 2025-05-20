'use client';

import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import MotionLink from '@/utils/motion-link';
import Link from 'next/link';
import {
    AiFillLinkedin,
    AiFillYoutube,
    AiOutlineWhatsApp,
} from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { RiInstagramLine } from 'react-icons/ri';
import AllPaymantGateway from './components/all-payment-gateway';
import MenuList from './components/menu-list';
import PageList from './components/page-list';
import WhatsApp from './components/whatsApp';
import { footerBgImg, imgUrl } from '@/site-settings/siteUrl';
import { FaLocationArrow } from 'react-icons/fa';
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import CategoryList from './components/category-list';

const FooterFortySeven = ({ headersetting, design, menu, page }: any) => {
    const { custom_design } = headersetting || {};
    const footerData = custom_design?.footer?.[0] || {};
    const { bg_image } = footerData;

    const store_id = design?.store_id || null;

    const date = new Date().getFullYear();

    const cls = 'hover:ml-2 duration-500';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div
            style={{
                backgroundImage: `url(${footerBgImg + bg_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                clipPath: 'ellipse(100% 100% at 50% 100%)',
            }}
            className="w-full relative z-[-1]"
        >
            <footer className="">
                <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
                    <div className="flex flex-wrap gap-10">
                        <div className="my-20">
                            <div className="flex flex-col sm:items-center space-y-4 bg-black bg-opacity-50 px-6 py-14 md:py-20 rounded-xl shadow">
                                {headersetting?.logo && (
                                    <Link href="/">
                                        <img
                                            className="h-8 w-auto sm:h-10"
                                            src={imgUrl + headersetting?.logo}
                                            alt=""
                                        />
                                    </Link>
                                )}
                                {headersetting?.short_description && (
                                    <div className=" text-left sm:text-justify text-sm text-[--text-color]">
                                        <p>
                                            {headersetting?.short_description}
                                        </p>
                                    </div>
                                )}

                                <div className="">
                                    <div className="flex gap-2 my-3 justify-center ">
                                        {headersetting?.facebook_link && (
                                            <div
                                                className="p-2"
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            >
                                                <a
                                                    href={`${headersetting?.facebook_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {' '}
                                                    <FaFacebookF className="text-xl footerColor  " />
                                                </a>
                                            </div>
                                        )}
                                        {headersetting?.youtube_link && (
                                            <div
                                                className="p-2"
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            >
                                                <a
                                                    href={`${headersetting?.youtube_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {' '}
                                                    <AiFillYoutube className="text-2xl footerColor" />
                                                </a>
                                            </div>
                                        )}
                                        {headersetting?.instagram_link && (
                                            <div
                                                className="p-2"
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            >
                                                <a
                                                    href={`${headersetting?.instagram_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {' '}
                                                    <RiInstagramLine className="text-2xl footerColor" />
                                                </a>
                                            </div>
                                        )}
                                        {headersetting?.lined_in_link && (
                                            <div
                                                className="p-2"
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            >
                                                <a
                                                    href={`${headersetting?.lined_in_link}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {' '}
                                                    <AiFillLinkedin className="text-2xl footerColor" />
                                                </a>
                                            </div>
                                        )}
                                        {headersetting?.whatsapp_phone && (
                                            <div
                                                className="p-2"
                                                style={{
                                                    background:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            >
                                                <a
                                                    href={
                                                        'https://api.whatsapp.com/send?phone=' +
                                                        headersetting?.whatsapp_phone
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {' '}
                                                    <AiOutlineWhatsApp className="text-2xl footerColor" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-20">
                            <div className="flex flex-col sm:items-center space-y-4 bg-[--header-color] bg-opacity-25 px-6 py-14 md:py-20 rounded-xl shadow">
                                <div className="mb-10 space-y-5">
                                    <div className="flex items-center gap-8">
                                        <MdOutlineMail className="text-3xl" />
                                        {headersetting?.email}
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <BsFillTelephoneFill className="text-3xl" />
                                        {headersetting?.phone}
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <FaLocationArrow className="text-3xl" />
                                        {headersetting?.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-20">
                            <div className="flex flex-col sm:items-center space-y-4 bg-black bg-opacity-50 px-6 py-14 md:py-20 rounded-xl shadow">
                                <div className="mb-10 space-y-5 text-[--text-color]">
                                    <div className="font-semibold text-lg">
                                        Menu
                                    </div>
                                    <div className="">
                                        <MenuList cls={cls} menu={menu} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 mb-14 lg:mb-0">
                    <div className="sm:container px-5 py-4 flex flex-wrap justify-center">
                        <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
                            © {date} All Rights Reserved{' '}
                            <Link
                                href="/"
                                className="font-semibold text-red-700 menu-hover"
                            >
                                {headersetting?.website_name}
                            </Link>{' '}
                            | Developed by{' '}
                            <a href="https://ebitans.com/" target="_blank">
                                <span className="font-semibold text-red-700">
                                    eBitans{' '}
                                </span>
                            </a>
                        </span>
                    </div>
                </div>
                {/* <Messenger /> */}
                <WhatsApp headersetting={headersetting} />
            </footer>
        </div>
    );
};

export default FooterFortySeven;

'use client';

import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
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
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdOutlineMail, MdOutlineStyle } from 'react-icons/md';
import { CiDeliveryTruck } from "react-icons/ci";
import { TbCircleDashedNumber7 } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";

const FooterFortySeven = ({ headersetting, design, menu, page }: any) => {
    const { custom_design } = headersetting || {};
    const footerData = custom_design?.footer?.[0] || {};
    const { bg_image } = footerData;

    const store_id = design?.store_id || null;

    const date = new Date().getFullYear();

    const cls = 'hover:ml-2 duration-500';

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    const customCss = `
        @layer utilities {
        .clip-footer {
            clip-path: ellipse(100% 100% at 40% 100%);
        }

        @media (max-width: 768px) {
            .clip-footer {
            clip-path: ellipse(100% 85% at 50% 100%);
            }
        }

        @media (max-width: 480px) {
            .clip-footer {
            clip-path: ellipse(100% 60% at 50% 65%);
            }
        }
        }
    `;

    return (
        <>
            <div className='sm:container px-5 flex flex-col md:flex-row justify-center'>
                <div className='bg-[#fafafa] flex items-center gap-5 p-10 w-80'>
                    <CiDeliveryTruck className='text-9xl text-[#bababa]' />
                    <div className='space-y-4'>
                        <h2 className='uppercase font-bold text-2xl text-[#429131]'> FREE DELIVERY </h2>
                        <p className='text-gray-400'>Free delivery over 1000 BDT shopping.</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-5 p-10 w-80'>
                    <TbCircleDashedNumber7 className='text-6xl text-[#bababa]' />
                    <div className='space-y-4'>
                        <h2 className='uppercase font-bold text-2xl text-[#429131]'> EASY Policies </h2>
                        <p className='text-gray-400'>Delivery/Return in easy way</p>
                    </div>
                </div>
                <div className='bg-[#fafafa] flex items-center gap-5 p-10 w-80'>
                    <RiSecurePaymentLine className='text-9xl text-[#bababa]'/>
                    <div className='space-y-4'>
                        <h2 className='uppercase font-bold text-2xl text-[#429131]'> Secure Payment </h2>
                        <p className='text-gray-400'>COD/bKash/Cards</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-5 p-10 w-80'>
                    <MdOutlineStyle className='text-6xl text-[#bababa]' />
                    <div className='space-y-4'>
                        <h2 className='uppercase font-bold text-2xl text-[#429131]'> Over Thousands Styles </h2>
                        <p className='text-gray-400'>Everything you need</p>
                    </div>
                </div>
            </div>
            <style>{customCss}</style>
            <div className="flex items-center justify-center my-10">
                <h2 className="font-semibold text-gray-900 tracking-widest text-xl md:mr-10 mr-3">
                    Follow Us --
                </h2>

                <div className="">
                    <div className="flex gap-4 md:gap-8 my-3 justify-center ">
                        {headersetting?.facebook_link && (
                            <div
                                className="p-2"
                                style={{
                                    background: design?.header_color,
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
                                    background: design?.header_color,
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
                                    background: design?.header_color,
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
                                    background: design?.header_color,
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
                                    background: design?.header_color,
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

            <div
                style={{
                    backgroundImage: `url(${footerBgImg + bg_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
                className="w-full relative z-10 clip-footer"
            >
                <footer className="">
                    <div className="sm:container px-5 mx-auto">
                        <div className="flex flex-wrap justify-center gap-10 pb-10 md:py-16">
                            <div className="md:mt-20 mt-56">
                                <div className="flex flex-col sm:items-center space-y-4 bg-black bg-opacity-50 px-6 py-14 md:py-20 rounded-xl shadow">
                                    {headersetting?.logo && (
                                        <Link href="/">
                                            <img
                                                className="h-8 w-auto sm:h-10"
                                                src={
                                                    imgUrl + headersetting?.logo
                                                }
                                                alt=""
                                            />
                                        </Link>
                                    )}
                                    {headersetting?.short_description && (
                                        <div className=" text-left sm:text-justify text-sm text-[--text-color]">
                                            <p>
                                                {
                                                    headersetting?.short_description
                                                }
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
                            <div className="md:my-20">
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
                            <div className="md:my-20">
                                <div className=" bg-black bg-opacity-50 px-6 py-10 rounded-xl shadow">
                                    <div className="flex flex-row gap-10 md:gap-20 sm:items-start space-y-4">
                                        <div className="flex flex-col">
                                            <div className="mb-10 space-y-5 text-[--text-color]">
                                                <div className="font-semibold text-lg">
                                                    Menu & Legal
                                                </div>
                                                <div className="">
                                                    <MenuList
                                                        cls={cls}
                                                        menu={menu}
                                                    />
                                                    <PageList
                                                        cls={cls}
                                                        page={page}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-[--text-color]">
                                            <ul className="flex flex-col gap-2">
                                                <Link href="/login">
                                                    <li> Sign In</li>
                                                </Link>
                                                <Link href="/sign-up">
                                                    <li> Sign Up</li>
                                                </Link>
                                                <Link href="/profile">
                                                    <li>Profile</li>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>
                                    <Link
                                        href="/shop"
                                        className="block text-center bg-[--header-color] text-[--text-color] font-semibold py-2 px-4 rounded md:cursor-pointer w-full"
                                    >
                                        Go to Shop
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 mb-14 lg:mb-0 flex flex-wrap justify-between items-center">
                        <div className="sm:container px-5 py-4">
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
                        <div className="px-5">
                            <AllPaymantGateway headersetting={headersetting} />
                        </div>
                    </div>
                    {/* <Messenger /> */}
                    <WhatsApp headersetting={headersetting} />
                </footer>
            </div>
        </>
    );
};

export default FooterFortySeven;

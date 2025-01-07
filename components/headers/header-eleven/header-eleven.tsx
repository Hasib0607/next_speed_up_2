'use client';

import { imgUrl } from '@/site-settings/siteUrl';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import './header-eleven.css';
import HeaderElevenCategory from './header-eleven-category';
import HeaderElevenHeaderMenu from './header-eleven-headermenu';
import { GiHamburgerMenu } from 'react-icons/gi';
import SideMenu from '../components/side-menu';

const HeaderEleven = ({ headersetting, design, menu }: any) => {
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        const changeNavbar = () => {
            if (window.scrollY >= 140) {
                setOpenMenu(true);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    });

    return (
        <div className="pb-0 ">
            <div className="lg:block hidden ">
                <HeaderElevenHeaderMenu
                    headersetting={headersetting}
                    design={design}
                />
            </div>
            <div className="bg-white border lg:block hidden w-full ">
                <div
                    className={`${openMenu && 'navbarEleven openMenuEleven'} py-2`}
                >
                    <HeaderElevenCategory
                        menu={menu}
                        headersetting={headersetting}
                        design={design}
                    />
                </div>
            </div>
            {/* sticky navbar  */}

            {/* tablet and mobile view  */}
            <div
                className={`px-5 py-2 lg:py-0 lg:hidden ${
                    openMenu && 'navbarEleven openMenuEleven'
                }`}
            >
                <div className="flex justify-between items-center mb-1 lg:hidden">
                    <div onClick={() => setOpen(!open)}>
                        <GiHamburgerMenu className="h-6" />
                    </div>

                    <div className="">
                        <div className="ml-8">
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
                        </div>
                    </div>
                </div>
            </div>
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="block px-4 lg:hidden">
                <ul
                    className={`
                lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0  pb-5
                duration-1000 z-50 lg:cursor-pointer ${
                    open ? 'left-0' : 'left-[-120%]'
                }
                `}
                >
                    <div className="flex py-4 z-50 justify-between items-center lg:hidden px-10 border-b-2 border-gray-100 pb-8 ">
                        <div>
                            <Link href="/">
                                <img
                                    className="h-8"
                                    src={imgUrl + headersetting?.logo}
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <div>
                            <XMarkIcon
                                onClick={() => setOpen(!open)}
                                className="h-5 basis-2/4"
                            />
                        </div>
                    </div>
                    <div className="z-50 px-10">
                        <SideMenu
                            setOpen={setOpen}
                            design={design}
                            menu={menu}
                            menuLoading={false}
                        />
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderEleven;

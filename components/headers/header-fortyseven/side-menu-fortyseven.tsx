'use client';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { btnhover } from '@/site-settings/style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const SideMenuFortySeven = React.memo(
    ({ setOpen, design, menu, menuLoading, openMenu }: any) => {
        const [showPagesSidebar, setShowPagesSidebar] = useState(false);
        const [showShopSidebar, setShowShopSidebar] = useState(false);

        useEffect(() => {
            if (showPagesSidebar || showShopSidebar) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }

            return () => {
                document.body.style.overflow = 'auto';
            };
        }, [showPagesSidebar, showShopSidebar]);

        const isAuthenticated = useAuth();
        const router = useRouter();

        const { data: pageData } = useGetPageQuery({});
        const page = pageData?.data || [];

        const { data: categoryData } = useGetCategoryQuery({});

        const category = categoryData?.data || [];

        const [logOut] = useLogOutMutation();

        const handleLogOut = () => {
            logOut({});
            removeFromLocalStorage(REDUX_PERSIST);
            router.push('/');
        };

        const bgColor = design?.header_color;

        const styleCss = `
            .menu-hover:hover {
            color:  ${bgColor};
            }
        `;

        return (
            <div className="lg:hidden mt-5 z-50">
                <style>{styleCss}</style>

                {/* Shop Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-500 ${
                        showShopSidebar ? 'translate-x-0' : 'translate-x-full'
                    } z-50 flex flex-col`}
                >
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Shop</h2>
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setShowShopSidebar(false)}
                            />
                        </div>
                    </div>
                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="group-hover:block bg-gray-50 p-4">
                            <div className="flex flex-wrap flex-col sm:flex-col lg:flex-row">
                                {category?.map((item: any, index: number) => (
                                    <div
                                        className={`px-4 md:px-10 pb-4`}
                                        key={item?.id}
                                    >
                                        {/* Category Name */}
                                        <Link href={`/category/${item?.id}`}>
                                            <p className="font-semibold text-gray-800 my-3 cursor-pointer hover:text-[var(--header-color)]">
                                                {item.name}
                                            </p>
                                        </Link>

                                        {/* Subcategories under this Category */}
                                        {item?.subcategories?.map(
                                            (sub: any) => (
                                                <Link
                                                    href={`/category/${sub?.id}`}
                                                    key={sub?.id}
                                                >
                                                    <p className="text-sm text-gray-600 mb-1 hover:text-[var(--header-color)] cursor-pointer">
                                                        {sub.name}
                                                    </p>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pages Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-500 ${
                        showPagesSidebar ? 'translate-x-0' : 'translate-x-full'
                    } z-50 flex flex-col`}
                >
                    <div className="p-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Pages</h2>
                            <XMarkIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setShowPagesSidebar(false)}
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <div className="space-y-2 p-4">
                                {page?.map((pageItem: any) => (
                                    <Link
                                        key={pageItem?.id}
                                        href={'/' + pageItem?.link}
                                        onClick={() => {
                                            setOpen(false);
                                            setShowPagesSidebar(false);
                                        }}
                                        className="block px-4 py-2 hover:bg-gray-100 rounded"
                                    >
                                        <h1 className="font-seven text-sm text-black">
                                            {pageItem?.name}
                                        </h1>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Backdrop */}
                {(showPagesSidebar || showShopSidebar) && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => {
                            setShowPagesSidebar(false);
                            setShowShopSidebar(false);
                        }}
                    />
                )}

                <div className="flex flex-col gap-3">
                    {menuLoading ? (
                        <p>loading menu...</p>
                    ) : (
                        <>
                            <ul
                                className={`lg:flex lg:flex-row  lg:justify-center gap-10 font-seven text-[16px] `}
                            >
                                {menu?.length > 0 &&
                                    menu?.slice(0, 5)?.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="group relative"
                                        >
                                            <li
                                                className={`menu-seven relative ${openMenu ? 'py-4' : 'py-4'}`}
                                            >
                                                <div
                                                    className="border-menu flex items-center justify-between cursor-pointer"
                                                    onClick={() => {
                                                        if (
                                                            item.name === 'Shop'
                                                        ) {
                                                            setShowShopSidebar(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Link
                                                        href={
                                                            item?.custom_link ||
                                                            (item?.url
                                                                ? `/${item?.url}`
                                                                : '/')
                                                        }
                                                    >
                                                        <h1>{item.name}</h1>
                                                    </Link>
                                                    {item.name === 'Shop' && (
                                                        <ArrowRightIcon className="h-4 transition-all duration-500 ease-linear" />
                                                    )}
                                                </div>
                                            </li>
                                        </div>
                                    ))}

                                <li className="relative menu-seven">
                                    <div
                                        className={`border-menu cursor-pointer font-seven py-4`}
                                        onClick={() =>
                                            setShowPagesSidebar(true)
                                        }
                                    >
                                        <div className="flex items-center justify-between">
                                            <h1>Pages</h1>
                                            <ArrowRightIcon className="h-4 transition-all duration-500 ease-linear" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </>
                    )}
                </div>
                <div className="mt-24 pr-4">
                    {isAuthenticated ? (
                        <p
                            onClick={() => {
                                handleLogOut();
                                setOpen(false);
                            }}
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer ${btnhover}`}
                        >
                            Logout
                        </p>
                    ) : (
                        <Link
                            onClick={() => setOpen(false)}
                            href="/sign-up"
                            style={{
                                backgroundColor: design?.header_color,
                                color: design?.text_color,
                            }}
                            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer ${btnhover}`}
                        >
                            <button>Sign up</button>
                        </Link>
                    )}
                    {!isAuthenticated && (
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                            Existing customer?{' '}
                            <Link
                                onClick={() => setOpen(false)}
                                href="/login"
                                className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
                            >
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

SideMenuFortySeven.displayName = 'SideMenu';

export default SideMenuFortySeven;

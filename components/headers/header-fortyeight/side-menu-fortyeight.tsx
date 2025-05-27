'use client';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const SideMenuFortyEight = React.memo(
    ({ design, categoryLoading, openMenu }: any) => {
        const [showPagesSidebar, setShowPagesSidebar] = useState(false);
        const [showShopSidebar, setShowShopSidebar] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState<any>(null);

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

                {/* Sub category Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-500 ${
                        showShopSidebar ? 'translate-x-0' : 'translate-x-full'
                    } z-50 flex flex-col`}
                >
                    <div className="p-4 border-b">
                        <div className="flex justify-end items-center">
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
                                {selectedCategory && (
                                    <div
                                        className={`px-4 md:px-10 pb-4`}
                                        key={selectedCategory?.id}
                                    >
                                        {/* Category Name */}
                                        <Link
                                            href={`/category/${selectedCategory?.id}`}
                                        >
                                            <p className="font-semibold text-gray-800 my-3 cursor-pointer hover:text-[var(--header-color)]">
                                                {selectedCategory.name}
                                            </p>
                                        </Link>

                                        {/* Subcategories under this Category */}
                                        {selectedCategory?.subcategories?.map(
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
                                )}
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
                    {categoryLoading ? (
                        <p>loading category...</p>
                    ) : (
                        <>
                            <ul
                                className={`lg:flex lg:flex-row  lg:justify-center gap-10 font-seven text-[16px] `}
                            >
                                <Link href="/shop">
                                    <p className="text-sm font-medium">
                                        shop now
                                    </p>
                                </Link>

                                {category?.length > 0 &&
                                    category?.slice(0, 7)?.map((item: any) => (
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
                                                            item.subcategories
                                                                ?.length > 0
                                                        ) {
                                                            setSelectedCategory(
                                                                item
                                                            );
                                                            setShowShopSidebar(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <Link
                                                        href={`/category/${item?.id}`}
                                                    >
                                                        <ul>
                                                            <li className="text-sm font-medium uppercase cursor-pointer">
                                                                {item?.name}
                                                            </li>
                                                        </ul>
                                                    </Link>
                                                    {item.subcategories
                                                        ?.length > 0 && (
                                                        <ArrowRightIcon className="h-4 transition-all duration-500 ease-linear" />
                                                    )}
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        );
    }
);

SideMenuFortyEight.displayName = 'SideMenu';

export default SideMenuFortyEight;

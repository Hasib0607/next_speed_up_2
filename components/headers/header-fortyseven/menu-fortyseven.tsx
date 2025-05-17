'use client';

import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';

const MenuFortySeven = ({ openMenu, menu, menuLoading }: any) => {
    const { data: pageData } = useGetPageQuery({});
    const page = pageData?.data || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    return (
        <nav>
            <ul
                className={`lg:flex lg:flex-row  lg:justify-center gap-10 font-seven text-[16px] text-[var(--header-color)]`}
            >
                {menu?.length > 0 &&
                    menu?.slice(0, 5)?.map((item: any) => (
                        <div key={item.id} className="group relative">
                            <li
                                className={`menu-seven relative ${openMenu ? 'py-4' : 'py-4'}`}
                            >
                                <Link
                                    href={
                                        item?.custom_link ||
                                        (item?.url ? `/${item?.url}` : '/')
                                    }
                                >
                                    <h1
                                        className={`border-menu flex items-center `}
                                    >
                                        {item.name}
                                        {item.name === 'Shop' && (
                                            <span>
                                                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500 ease-linear lg:cursor-pointer inline" />
                                            </span>
                                        )}
                                    </h1>
                                </Link>
                                {item.name === 'Shop' && (
                                    <div className="absolute z-50 group-hover:block hidden bg-gray-50 w-[900px] top-[100%] p-4">
                                        <div className="flex flex-wrap flex-col sm:flex-col lg:flex-row">
                                            {category?.map(
                                                (item: any, index: number) => (
                                                    <div
                                                        className={`px-4 md:px-10 pb-4`}
                                                        key={item?.id}
                                                    >
                                                        {/* Category Name */}
                                                        <Link
                                                            href={`/category/${item?.id}`}
                                                        >
                                                            <p className="font-semibold text-gray-800 my-3 cursor-pointer hover:text-[var(--header-color)]">
                                                                {item.name}
                                                            </p>
                                                        </Link>

                                                        {/* Subcategories under this Category */}
                                                        {item?.subcategories?.map(
                                                            (sub: any) => (
                                                                <Link
                                                                    href={`/category/${sub?.id}`}
                                                                    key={
                                                                        sub?.id
                                                                    }
                                                                >
                                                                    <p className="text-sm text-gray-600 mb-1 hover:text-[var(--header-color)] cursor-pointer">
                                                                        {
                                                                            sub.name
                                                                        }
                                                                    </p>
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </li>
                        </div>
                    ))}

                <li className="relative group menu-seven flex items-center justify-between">
                    <div
                        className={`border-menu lg:cursor-pointer font-seven ${
                            openMenu ? 'py-4' : 'py-4'
                        }`}
                    >
                        <h1>
                            Pages{' '}
                            <span>
                                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline " />
                            </span>
                        </h1>
                    </div>
                    <div
                        className={`absolute z-50 group-hover:block hidden bg-gray-50 w-[250px] left-[-50%] lg:cursor-pointer ${
                            openMenu ? 'top-[100%]' : 'top-[100%]'
                        }`}
                    >
                        {menuLoading ? (
                            <Skeleton className="h-4 w-[200px]" />
                        ) : (
                            <>
                                {page?.length > 0 &&
                                    page?.map(
                                        (pageItem: any, index: number) => (
                                            <div
                                                key={pageItem?.id}
                                                className="relative"
                                            >
                                                <div
                                                    className={`px-6 py-2 hover:bg-gray-200 ${index !== pageItem.length - 1 ? 'border-b' : ''}`}
                                                >
                                                    <Link
                                                        href={
                                                            '/' + pageItem?.link
                                                        }
                                                    >
                                                        <h1 className="menu-hover font-seven text-sm text-black">
                                                            {pageItem?.name}{' '}
                                                        </h1>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default MenuFortySeven;

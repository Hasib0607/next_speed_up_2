'use client';

import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';

import './header-seven.css';

const CategorySeven = ({ openMenu, menu, menuLoading }: any) => {
    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    return (
        <nav>
            <ul
                className={`lg:flex lg:flex-row  lg:justify-center  gap-10 font-seven text-[16px] `}
            >
                <li
                    className={`relative group menu-seven flex items-center justify-between ${
                        openMenu ? 'py-4' : 'py-4'
                    }`}
                >
                    <Link href="/" className="border-menu">
                        <h1>Home</h1>
                    </Link>
                </li>

                {category?.length > 0 &&
                    category?.slice(0, 3)?.map((item: any) => (
                        <div key={item.id} className="group relative">
                            <li
                                className={`menu-seven relative ${openMenu ? 'py-4' : 'py-4'}`}
                            >
                                <Link href={'/category/' + item?.id}>
                                    <h1
                                        className={`border-menu flex items-center `}
                                    >
                                        {item.name}
                                    </h1>
                                </Link>
                                {subCategory?.length > 0 &&
                                    subCategory?.map((dataId: any) => (
                                        <div key={dataId.id}>
                                            {item.id ===
                                                Number(dataId.parent) && (
                                                <ChevronDownIcon
                                                    className={`h-4 group-hover:rotate-180 transition-all duration-500 group ease-linear lg:cursor-pointer absolute -right-5 ${
                                                        openMenu
                                                            ? 'top-5'
                                                            : 'top-5'
                                                    }`}
                                                />
                                            )}
                                        </div>
                                    ))}
                            </li>

                            <li
                                className={`absolute z-50 bg-gray-50 w-[250px] left-[-50%] lg:cursor-pointer ${
                                    openMenu ? 'top-[100%]' : 'top-[100%]'
                                }`}
                            >
                                {subCategory?.length > 0 &&
                                    subCategory?.map((subItem: any) => (
                                        <div
                                            key={subItem.id}
                                            className="relative group-hover:block hidden"
                                        >
                                            {item.id ===
                                                Number(subItem.parent) && (
                                                <div className="px-6 py-2 hover:bg-gray-200 ">
                                                    <Link
                                                        href={
                                                            '/category/' +
                                                            subItem?.id
                                                        }
                                                    >
                                                        <h1 className=" text-sm capitalize text-black menu-hover">
                                                            {subItem.name}
                                                        </h1>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
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
                                {menu?.length > 0 &&
                                    menu?.map((menuItem: any) => (
                                        <div
                                            key={menuItem?.id}
                                            className="relative "
                                        >
                                            <div className="px-6 py-2 hover:bg-gray-200 ">
                                                <Link
                                                    href={'/' + menuItem?.url}
                                                >
                                                    <h1 className="menu-hover font-seven text-sm text-black">
                                                        {menuItem?.name}{' '}
                                                    </h1>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default CategorySeven;

'use client';

import {
    ChevronDownIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import NavLinks from './navlinks';
import { useState } from 'react';
import Link from 'next/link';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const SideMenu = ({ setOpen, open, menu }: any) => {
    const [heading, setHeading] = useState('');

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div>
            <div className="">
                <ul className="flex lg:flex-row flex-col lg:items-center lg:gap-10 gap-4">
                    {menu?.slice(0, 6)?.map((item: any) => (
                        <div key={item.id} className="relative lg:pt-0 pt-4">
                            {item?.status == 1 && (
                                <li
                                    className="border-t lg:border-t-0"
                                    onClick={() => {
                                        heading !== item.name
                                            ? setHeading(item.name)
                                            : setHeading('');
                                    }}
                                >
                                    <Link
                                        href={
                                            item?.custom_link ||
                                            (item?.url ? `/${item?.url}` : '/')
                                        }
                                    >
                                        <h1 className="hover-color w-max uppercase font-semibold text-base lg:text-white menu-hover">
                                            {item.name}
                                        </h1>
                                    </Link>
                                </li>
                            )}
                            {item.url === 'category' && (
                                <ChevronDownIcon
                                    onClick={() => {
                                        heading !== item.name
                                            ? setHeading(item.name)
                                            : setHeading('');
                                    }}
                                    className={`${
                                        heading === item.name
                                            ? 'rotate-180'
                                            : 'rotate-0'
                                    } hover-color h-4 absolute transition-all duration-500  ease-linear lg:cursor-pointer lg:-right-5 lg:top-[6px] top-[20px] lg:text-white right-0 `}
                                />
                            )}
                            <div
                                className={`${
                                    heading === item.name
                                        ? 'lg:block hidden bg-white absolute z-10 top-[46px] -left-[500%]'
                                        : 'hidden'
                                }`}
                            >
                                {item.url === 'category' ? (
                                    <div className="">
                                        <div>
                                            <NavLinks setHeading={setHeading} category={category}/>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div
                                className={`${
                                    heading === item.name
                                        ? 'lg:hidden block'
                                        : 'hidden'
                                }`}
                            >
                                {item.url === 'category' && (
                                    <div className="">
                                        <div className="flex flex-col gap-3 md:w-[40%] w-[90%]">
                                            {category?.map((item: any) => (
                                                <SingleCat
                                                    key={item?.id}
                                                    item={item}
                                                    setOpen={setOpen}
                                                    open={open}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;

const SingleCat = ({ item, setOpen, open }: any) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    href={'/category/' + item.id}
                    className="flex-1 text-sm text-gray-900 font-medium px-4 hover-color"
                >
                    {' '}
                    <p onClick={() => setOpen(!open)}>{item.name}</p>
                </Link>
                {item?.cat ? (
                    <div className="px-4 h-full">
                        {show ? (
                            <MinusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 hover-color text-gray-800"
                            />
                        ) : (
                            <PlusIcon
                                onClick={() => setShow(!show)}
                                className="h-4 w-4 hover-color text-gray-800"
                            />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.cat?.map((sub: any) => (
                            <div key={sub?.id} className="py-2">
                                <Link href={'/category/' + sub?.id}>
                                    {' '}
                                    <p
                                        onClick={() => setOpen(!open)}
                                        className="pb-2 text-sm hover-color text-gray-500"
                                    >
                                        {sub?.name}
                                    </p>
                                </Link>
                                <div className="pr-4">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

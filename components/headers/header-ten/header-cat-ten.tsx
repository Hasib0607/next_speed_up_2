'use client';

import { CartSideBar } from '@/components/_shopping-cart/_components/cart-side-bar';
import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Search3 from '../components/search3';

const HeaderCatTen = ({ menu, design }: any) => {
    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    const [searchTxt, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const handleClose = () => {
        setSearchInput(false);
        setSearch('');
    };

    return (
        <div>
            {/* CartSideBar open  */}
            <CartSideBar
                open={openCart}
                setOpen={setOpenCart}
                design={design}
            />
            <nav
                style={{
                    background: design?.header_color,
                    color: design?.text_color,
                }}
                className="lg:block hidden"
            >
                <div className="sm:container px-5 justify-between lg:flex hidden">
                    <ul className="lg:flex lg:flex-row  gap-10">
                        <li className="relative group menu-seven font-bold flex items-center text-sm justify-between py-6">
                            <Link href="/" className="border-menu">
                                <h1>Home</h1>
                            </Link>
                        </li>

                        {category?.slice(0, 5).map((item: any) => (
                            <div key={item.id} className="group relative">
                                <li className="menu-seven relative py-6">
                                    <Link href={'/category/' + item?.id}>
                                        <h1
                                            className={`border-menu flex group items-center group font-bold text-sm`}
                                        >
                                            {item.name}
                                        </h1>
                                    </Link>
                                    {subCategory?.map((dataId: any) => (
                                        <div key={dataId.id}>
                                            {item.id ===
                                                Number(dataId.parent) && (
                                                <ChevronDownIcon className="h-4 group-hover:rotate-180 transition-all duration-500 group ease-linear lg:cursor-pointer absolute top-7 -right-5 " />
                                            )}
                                        </div>
                                    ))}
                                </li>

                                <li
                                    style={{
                                        background: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                    className="absolute z-50 w-[250px] top-[67px] left-[-50%] lg:cursor-pointer"
                                >
                                    {subCategory?.map((subItem: any) => (
                                        <div
                                            key={subItem.id}
                                            className="relative group-hover:block hidden"
                                        >
                                            {item.id ===
                                                Number(subItem.parent) && (
                                                <div className="px-6 py-2 hover:bg-gray-300 hover:text-gray-900 text-base">
                                                    <Link
                                                        href={
                                                            '/category/' +
                                                            subItem?.id
                                                        }
                                                    >
                                                        <h1>{subItem.name} </h1>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </li>
                            </div>
                        ))}

                        <li className="relative group menu-seven  flex items-center  justify-between">
                            <Link
                                href=""
                                className="border-menu font-bold text-sm"
                            >
                                <h1>
                                    Pages{' '}
                                    <span>
                                        <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline " />
                                    </span>
                                </h1>
                            </Link>
                            <div
                                style={{
                                    background: design?.header_color,
                                    color: design?.text_color,
                                }}
                                className="absolute z-50 group-hover:block hidden w-[250px] top-[67px] left-[-50%] lg:cursor-pointer"
                            >
                                {menu?.slice(0, 6)?.map(
                                    (menuItem: any, j: any) =>
                                        menuItem.status == 1 && (
                                            <div
                                                key={menuItem.id}
                                                className="relative "
                                            >
                                                <div className="px-6 py-2 hover:bg-gray-300 hover:text-gray-900 ">
                                                    <Link
                                                        href={
                                                            menuItem?.custom_link ||
                                                            (menuItem?.url
                                                                ? `/${menuItem?.url}`
                                                                : '/')
                                                        }
                                                    >
                                                        <h1>
                                                            {menuItem.name}{' '}
                                                        </h1>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        </li>
                    </ul>
                    <div className="flex gap-3 items-center">
                        <div className="flex items-center relative">
                            {searchTxt.length === 0 && (
                                <p
                                    className="lg:cursor-pointer absolute right-2"
                                    onClick={() => setSearchInput(!searchInput)}
                                >
                                    <BsSearch className="text-2xl" />
                                </p>
                            )}
                            {searchInput && (
                                <div className="relative -top-6">
                                    <input
                                        autoFocus
                                        value={searchTxt}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        type="text"
                                        className="xl:w-60 absolute -left-60 lg:w-60 h-12 border-gray-300 outline-none focus:outline-none focus:border-gray-200 focus:ring-0 text-black"
                                        placeholder="Search your products "
                                    />
                                    <p
                                        style={{
                                            color: design?.header_color,
                                        }}
                                        className="absolute z-10 -left-6 top-4"
                                        onClick={handleClose}
                                    >
                                        <AiOutlineClose className="text-md lg:cursor-pointer" />
                                    </p>
                                </div>
                            )}
                            {searchTxt && (
                                <div className="lg:w-[800px] -left-[820px] absolute -top-2  z-50">
                                    <Search3
                                        search={searchTxt}
                                        setSearch={setSearch}
                                        design={design}
                                    />
                                </div>
                            )}
                        </div>

                        <div
                            onClick={() => setOpenCart(!openCart)}
                            className="flex items-center"
                        >
                            <p className={`pr-1 lg:cursor-pointer`}>
                                <HiOutlineShoppingBag className="text-3xl font-thin" />
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderCatTen;

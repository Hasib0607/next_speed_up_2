'use client';

import img from '@/assets/custom_menu_icon.png';

import { iconImg, imgUrl } from '@/site-settings/siteUrl';

import Link from 'next/link';
import { RiMenu2Line } from 'react-icons/ri';
import { useState } from 'react';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const colors = [
    '#40af64',
    '#6e45a7',
    '#f7be24',
    '#de5648',
    '#4775c9',
    '#23b4ca',
    '#91c547',
];

const HeaderDown = ({ headersetting, menu }: any) => {
    const [open, setOpen] = useState(false);
    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];
    
    return (
        <div>
            <div className="sm:container px-5 lg:h-[120px] h-12 flex justify-between items-center my-2">
                <div className="max-w-[200px] w-[80px] xl:w-auto h-full overflow-hidden flex items-center">
                    {headersetting?.logo ? (
                        <Link href="/">
                            <img
                                src={imgUrl + headersetting?.logo}
                                className="lg:h-[120px] h-12"
                                alt=""
                            />
                        </Link>
                    ) : (
                        <Link href="/">{headersetting?.website_name}</Link>
                    )}
                </div>
                <div
                    onClick={() => setOpen(!open)}
                    className="lg:cursor-pointer lg:hidden block"
                >
                    <RiMenu2Line className="text-4xl menu-hover text-black" />
                </div>
                <div className="hidden lg:flex space-x-3 mt-2">
                    {category?.slice(0, 5)?.map((item: any, id: any) => (
                        <Link href={'/category/' + item?.id} key={item?.id}>
                            <SingleCats item={item} color={colors[id]} />
                        </Link>
                    ))}

                    <SingleCats
                        item={{ name: 'pages', cat: menu }}
                        color={'#91C547'}
                    />
                </div>
            </div>

            {/* tablet and mobile view  */}
            {/* on screen touch menu hide  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className={`px-4 z-[7]`}>
                <ul
                    className={`pt-5 top-0 bg-white duration-500 fixed md:w-96 w-64 sm:w-80 overflow-y-auto bottom-0 pb-5 z-[7] lg:cursor-pointer ${
                        open ? 'left-0 ' : 'left-[-140%] '
                    }`}
                >
                    <div className="pb-7 pt-3 px-6">
                        <div className=" text-xl border-b-[2px] pb-5 text-center text-color">
                            Menu
                        </div>
                        <div className="flex flex-col gap-3 md:w-[40%] w-[90%] mt-4">
                            {menu
                                ?.slice(0, 6)
                                ?.map((item: any) => (
                                    <SingleCat
                                        item={item}
                                        setOpen={setOpen}
                                        key={item?.id}
                                    />
                                ))}
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HeaderDown;

const SingleCats = ({ item, color }: any) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                className="duration-300 transition-all ease-linear p-1 flex flex-col gap-2 justify-center items-center w-[120px] lg:h-[120px] h-12  relative"
                style={{ backgroundColor: color }}
            >
                {item?.icon ? (
                    <img
                        className="h-[50px] w-[50px]"
                        src={iconImg + item?.icon}
                        alt=""
                    />
                ) : (
                    <img className="h-[50px] w-[50px]" src={img.src} alt="" />
                )}
                <p className="text-white text-sm tracking-tight capitalize font-medium text-center">
                    {item?.name}
                </p>
                <div
                    className={` absolute top-[80px] xl:top-[120px] right-0 bg-white shadow-md rounded-md z-20  ${
                        show
                            ? 'visible opacity-100 block min-w-[200px]'
                            : 'invisible opacity-0 hidden'
                    } duration-300 transition-all ease-linear`}
                >
                    <ul className={`list-none ${item?.cat && 'p-2'}`}>
                        {item?.cat &&
                            item?.cat?.slice(0, 6)?.map(
                                (sub: any) =>
                                    sub.status == 1 && (
                                        <Link
                                            href={
                                                sub?.custom_link ||
                                                (sub?.url
                                                    ? `/${sub?.url}`
                                                    : `/category/${sub?.id}`)
                                            }
                                            key={sub?.id}
                                            className="px-2 py-2 mx-2 hover:bg-gray-200 hover:scale-[1.05] transition-all duration-300 ease-linear rounded-md flex gap-2"
                                        >
                                            {sub?.icon && (
                                                <div className="h-6 w-6">
                                                    <img
                                                        className="w-full h-full"
                                                        src={
                                                            iconImg + sub?.icon
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                            <p>
                                                {sub?.name !== 'Home'
                                                    ? sub?.name
                                                    : null}
                                            </p>
                                        </Link>
                                    )
                            )}
                    </ul>
                </div>
            </div>
        </>
    );
};

const SingleCat = ({ item, setOpen }: any) => {
    return (
        <>
            <div className="w-full flex py-2 lg:cursor-pointer">
                {item.status == 1 && (
                    <Link
                        onClick={() => setOpen(false)}
                        href={
                            item?.custom_link ||
                            (item?.url ? `/${item?.url}` : '/')
                        }
                        className="flex-1 text-sm text-gray-900 font-medium"
                    >
                        {' '}
                        <p>{item.name}</p>
                    </Link>
                )}
            </div>
        </>
    );
};

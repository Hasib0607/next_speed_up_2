'use client';

import { classNames } from '@/helpers/littleSpicy';
import useAuth from '@/hooks/useAuth';
import { imgUrl } from '@/site-settings/siteUrl';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch, BsTelephone } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { RiArrowDownSLine } from 'react-icons/ri';
import { TbLayoutGrid } from 'react-icons/tb';
import Search3 from '../components/search3';
import SideMenu from '../components/side-menu';
import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';
import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const HeaderThirtyThree = ({ headersetting, design, menu }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [open, setOpen] = useState(false);
    const [searchTxt, setSearch] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const [openCat, setOpenCat] = useState(false);

    const [heading, setHeading] = useState('');
    const [active, setActive] = useState(true);
    const [border, setBorder] = useState(true);

    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    const authStore = useSelector((state: RootState) => state?.auth);
    const user = authStore?.user || {};

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const handleClose = () => {
        setSearch('');
    };

    // for category open
    if (openCat === true) {
        setTimeout(() => {
            setActive(false);
        }, 800);
    } else {
        setTimeout(() => {
            setActive(true);
        }, 0);
    }
    if (openCat === true) {
        setTimeout(() => {
            setBorder(false);
        }, 0);
    } else {
        setTimeout(() => {
            setBorder(true);
        }, 1000);
    }

    useEffect(() => {
        // sticky navbar
        const changeNavbar = () => {
            if (window.scrollY >= 120) {
                setOpenMenu(true);
                setOpenCat(false);
            } else {
                setOpenMenu(false);
            }
        };
        window.addEventListener('scroll', changeNavbar);
    }, []);

    // CSS START FROM HERE

    const styleCss = `
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
        .navbarTwentyOne.openMenu {
            position: fixed;
            background: ${design?.header_color};
            opacity:1;
            width: 100%;
            z-index: 10;
            top:0;
            animation: fadeIn 0.2s ease-in both;
          }
        .navbarSixteen.openMenu:hover {
            opacity: 1;
          }
        .all-hover:hover {
          color:  ${design?.text_color};
          background: ${design?.header_color};
      }
        .bg-color {
          color:  ${design?.text_color};
          background: ${design?.header_color};
      }
        .menu-hover:hover {
          color:  ${design?.header_color};
         
      }

      .border-cat {
        border: 2px solid ${design?.header_color};
      }
      .border-hover-menu:hover{
        border: 1px solid ${design?.text_color};
      }
      
      .font-twenty-one {
        font-family: 'Work Sans', sans-serif;
      }
    
      h1, p, span, button, li, ul, a, div, h2, h3, h4, h5, h6  {
        font-family: 'Work Sans', sans-serif;
      }
`;

    return (
        <div className="">
            <style>{styleCss}</style>
            {/* top menu  */}

            <div className="flex justify-between items-center sm:container px-5 py-3">
                <div onClick={() => setOpen(!open)} className="lg:hidden block">
                    <HiMenu className="text-3xl" />
                </div>
                <div>
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
                <div className="lg:block hidden">
                    <div className="xl:w-[700px] lg:w-[600px] relative">
                        <div className=" relative overflow-hidden">
                            <div>
                                <input
                                    value={searchTxt}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Enter your search key ..."
                                    className="w-full py-3 pl-3 outline-none focus:outline-none focus:border-gray-200 border focus:ring-0"
                                />
                            </div>
                            <div className="bg-color all-hover text-white lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-4">
                                {searchTxt.length === 0 ? (
                                    <BsSearch className="text-xl" />
                                ) : (
                                    <AiOutlineClose
                                        onClick={handleClose}
                                        className="text-xl lg:cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>

                        {searchTxt && (
                            <div
                                className={`absolute z-20 top-3 left-0 w-full ${
                                    openMenu ? 'hidden' : 'block'
                                }`}
                            >
                                <Search3
                                    design={design}
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:flex items-center gap-3">
                    {/* Authenticate routes dropdown  */}
                    {isAuthenticated ? (
                        <Menu
                            as="div"
                            className="ml-3 relative lg:block hidden"
                        >
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none ">
                                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                        {isAuthenticated ? (
                                            <img
                                                src={
                                                    user?.image
                                                        ? user?.image
                                                        : user?.social_img
                                                }
                                                alt="user"
                                                className="object-fit"
                                            />
                                        ) : (
                                            <svg
                                                className="h-full w-full text-gray-300"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        )}
                                    </span>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {isAuthenticated ? (
                                        <>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="/profile"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="profile/order"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Order
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <div
                                                        onClick={handleLogOut}
                                                        className={classNames(
                                                            active
                                                                ? 'bg-gray-100'
                                                                : '',
                                                            'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
                                                        )}
                                                    >
                                                        Sign out
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        </>
                                    ) : (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="/login"
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700 lg:cursor-pointer'
                                                    )}
                                                >
                                                    Login
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ) : (
                        <Link href="/login">
                            <FiUser className="text-3xl font-semibold text-[#212121] lg:block hidden" />
                        </Link>
                    )}
                </div>
            </div>

            {/* bottom menu */}

            {/* category section  */}
            <div
                className={`${
                    openMenu && 'navbarTwentyOne openMenu py-3'
                } bg-color items-center h-14 lg:flex hidden`}
            >
                <div className="sm:container px-5 flex justify-between items-center">
                    <div
                        className={`${
                            openMenu ? 'justify-between' : ''
                        } flex gap-10 items-center`}
                    >
                        <div className={`lg:block  hidden relative`}>
                            <div
                                onClick={() => setOpenCat(!openCat)}
                                className={`bg-white bg-opacity-20 rounded-md text-[14px] flex justify-between lg:cursor-pointer pl-3 pr-12 gap-2 py-2 items-center z-[12] relative w-max`}
                            >
                                <div>
                                    <TbLayoutGrid className="text-[28px] text-white rotate-90" />
                                </div>
                                <div>
                                    <h1 className="font-medium text-white text-lg">
                                        Shop By Category
                                    </h1>
                                </div>
                                <div>
                                    <RiArrowDownSLine className="text-[28px] text-white" />
                                </div>
                            </div>

                            <div
                                className={` z-10 w-60 absolute bg-white text-black left-0 top-[48px]`}
                            >
                                <ul
                                    onMouseLeave={() => setHeading('')}
                                    className={`flex flex-col font-twelve menu-twelve ${
                                        openCat
                                            ? 'max-h-[1000px] '
                                            : 'max-h-[0] '
                                    } ${active ? 'overflow-hidden' : ''} ${
                                        border ? 'border-0' : 'border-cat'
                                    }`}
                                >
                                    {category?.map((item: any) => (
                                        <div key={item.id} className="">
                                            <li
                                                onClick={() =>
                                                    setOpenCat(!openCat)
                                                }
                                                onMouseEnter={() => {
                                                    heading !== item.name
                                                        ? setHeading(item.name)
                                                        : setHeading('');
                                                }}
                                                className="group relative hover:bg-gray-100 w-full rounded"
                                            >
                                                <Link
                                                    href={
                                                        '/category/' + item?.id
                                                    }
                                                >
                                                    <h1
                                                        className={`menu-hover group p-3 font-twelve text-[13px] hover:font-bold `}
                                                    >
                                                        {item.name}
                                                    </h1>
                                                </Link>
                                                {subCategory?.map(
                                                    (dataId: any) => (
                                                        <div key={dataId.id}>
                                                            {item.id ===
                                                                Number(
                                                                    dataId.parent
                                                                ) && (
                                                                <IoIosArrowForward
                                                                    className={`h-4 absolute transition-all duration-500  ease-linear lg:cursor-pointer right-5 top-3 `}
                                                                />
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </li>

                                            <div
                                                className={`z-50 bg-gray-100 py-2 lg:cursor-pointer absolute left-[100%] top-0 h-full flex flex-col`}
                                            >
                                                {subCategory?.map(
                                                    (subItem: any) => (
                                                        <div
                                                            key={subItem.id}
                                                            className={`relative`}
                                                        >
                                                            {item.id ===
                                                                Number(
                                                                    subItem.parent
                                                                ) && (
                                                                <div
                                                                    onClick={() =>
                                                                        setOpenCat(
                                                                            !openCat
                                                                        )
                                                                    }
                                                                    className={`min-w-[240px] px-3 text-[13px] font-twelve leading-loose capitalize ${
                                                                        heading ===
                                                                        item.name
                                                                            ? 'lg:block'
                                                                            : 'hidden'
                                                                    }`}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            '/category/' +
                                                                            subItem?.id
                                                                        }
                                                                    >
                                                                        <h1 className="hover:ml-2 border-b duration-300 font-medium menu-hover">
                                                                            {
                                                                                subItem.name
                                                                            }{' '}
                                                                        </h1>
                                                                    </Link>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* menu section  */}
                        <div
                            className={`flex gap-5 uppercase text-[14px] ${
                                openMenu ? 'hidden' : 'block'
                            }`}
                        >
                            {/* check here */}
                            {menu?.slice(0, 6)?.map(
                                (menu: any) =>
                                    menu.status == 1 && (
                                        <ul key={menu.id}>
                                            <Link
                                                href={
                                                    menu?.custom_link ||
                                                    (menu?.url
                                                        ? `/${menu?.url}`
                                                        : '/')
                                                }
                                            >
                                                <li className="duration-500 px-3 py-1.5 hover:text-yellow-200 rounded-full">
                                                    {menu.name}
                                                </li>
                                            </Link>
                                        </ul>
                                    )
                            )}
                        </div>
                    </div>
                    <div
                        className={`xl:w-[700px] lg:w-[600px] relative ${
                            openMenu ? 'block' : 'hidden'
                        }`}
                    >
                        <div className="relative overflow-hidden">
                            <div>
                                <input
                                    value={searchTxt}
                                    onChange={(e) => setSearch(e.target.value)}
                                    type="text"
                                    placeholder="Enter your search key ..."
                                    className="text-black w-full py-3 pl-3 outline-none focus:outline-none focus:border-gray-200 border-gray-200 focus:ring-0"
                                />
                            </div>
                            <div className="bg-white lg:cursor-pointer absolute right-0 top-0 px-4 font-thin py-4 text-black">
                                {searchTxt.length === 0 ? (
                                    <BsSearch className="text-xl" />
                                ) : (
                                    <AiOutlineClose
                                        onClick={handleClose}
                                        className="text-xl lg:cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                        {searchTxt && (
                            <div
                                className={`absolute z-20 top-3 left-0 w-full`}
                            >
                                <Search3
                                    design={design}
                                    search={searchTxt}
                                    setSearch={setSearch}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <BsTelephone className="text-3xl" />
                        <p className="text-2xl">{headersetting?.phone}</p>
                    </div>
                </div>
            </div>

            {/* tablet and mobile view  */}
            {/* screen touch menu close  */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="bottom-0 right-0 left-0 fixed top-0 z-[6] bg-black bg-opacity-40 lg:cursor-pointer"
                ></div>
            )}

            <div className="block lg:hidden">
                <ul
                    className={`lg:hidden bg-white fixed sm:w-[350px] md:w-[400px] w-[250px] top-0 overflow-y-auto bottom-0 pb-5 duration-1000 z-10 lg:cursor-pointer ${
                        open ? 'left-0' : 'left-[-160%]'
                    } `}
                >
                    <div className="flex justify-between px-6 py-4 lg:hidden">
                        <div>
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
                        <XMarkIcon
                            onClick={() => setOpen(!open)}
                            className="h-7"
                        />
                    </div>

                    <div className="px-6">
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

export default HeaderThirtyThree;

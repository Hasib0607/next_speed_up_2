'use client';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    AiFillLinkedin,
    AiOutlineInstagram,
    AiOutlineWhatsApp,
    AiOutlineYoutube,
} from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

const HeaderTop = ({ headerSetting, design }: any) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    return (
        <div
            style={{
                background: design?.header_color,
                color: design?.text_color,
            }}
            className={`w-full flex justify-between h-6 sm:px-10 px-5`}
        >
            <div className="flex items-center space-x-1">
                {headerSetting?.facebook_link && (
                    <a
                        href={headerSetting?.facebook_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
                    >
                        <FaFacebookF className="text-[10px] text-black" />
                    </a>
                )}
                {headerSetting?.instagram_link && (
                    <a
                        href={headerSetting?.instagram_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
                    >
                        <AiOutlineInstagram className=" text-[10px] text-black" />
                    </a>
                )}
                {headerSetting?.whatsapp_phone && (
                    <a
                        href={
                            'https://api.whatsapp.com/send?phone=' +
                            headerSetting?.whatsapp_phone
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
                    >
                        <AiOutlineWhatsApp className=" text-[10px] text-black" />
                    </a>
                )}
                {headerSetting?.youtube_link && (
                    <a
                        href={headerSetting?.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
                    >
                        <AiOutlineYoutube className="text-[10px] text-black" />
                    </a>
                )}
                {headerSetting?.lined_in_link && (
                    <a
                        href={headerSetting?.lined_in_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white p-1  transition-all duration-300 ease-linear lg:cursor-pointer"
                    >
                        <AiFillLinkedin className="text-[10px] text-black" />
                    </a>
                )}
            </div>
            <div className="space-x-4 flex pr-2 text-sm items-center font-medium ">
                <div className="items-center space-x-1 lg:flex hidden">
                    <PhoneIcon className="h-4 w-4 group-hover:stroke-red-600  group-hover:text-red-600 transition-all duration-300 ease-linear" />

                    <p className=" group-hover:text-red-600">
                        {headerSetting?.phone}
                    </p>
                </div>
                {/* login */}
                {!isAuthenticated && (
                    <>
                        <div className="">
                            <Link href="/login" className=" hover:text-red-600">
                                Login
                            </Link>
                        </div>

                        <div className="">
                            <Link
                                href={'/sign-up'}
                                className=" hover:text-red-600"
                            >
                                {' '}
                                Sign Up
                            </Link>
                        </div>
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <Link href="/profile" className="">
                            <p className=" hover:text-red-600">Profile</p>
                        </Link>
                        <div
                            onClick={handleLogOut}
                            className="lg:cursor-pointer"
                        >
                            <p className=" hover:text-red-600">Logout</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderTop;

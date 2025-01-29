'use client';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { btnhover } from '@/site-settings/style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SideMenu = React.memo(({ setOpen, design, menu, menuLoading }: any) => {
    const isAuthenticated = useAuth();
    const router = useRouter();

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
            <div className="flex flex-col gap-3">
                {menuLoading ? (
                    <p>loading menu...</p>
                ) : (
                    <>
                        {menu?.length > 0 &&
                            menu?.map((item: any) => (
                                <div key={item.id}>
                                    <Link
                                        onClick={() => setOpen(false)}
                                        href={item?.url ? `/${item.url}` : '/'}
                                    >
                                        <p className="menu-hover uppercase sm:text-base text-sm text-gray-500 font-medium">
                                            {item.name}
                                        </p>
                                    </Link>
                                </div>
                            ))}
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
});

SideMenu.displayName = 'SideMenu';

export default SideMenu;

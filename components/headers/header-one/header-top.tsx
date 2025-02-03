'use client';

import { location, logoutIcon, mobile, userIcon } from '@/assets/svg';
import Link from 'next/link';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';

const HeaderTop = ({ headersetting, design }: any) => {
    const isAuthenticated = useAuth();
    const router = useRouter();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const { phone, address } = headersetting || {};

    return (
        <div
            className=" w-full py-2 text-sm hidden md:block"
            style={{
                backgroundColor: design?.header_color,
                color: design?.text_color,
            }}
        >
            <div className="sm:container px-5 mx-auto flex justify-between items-center">
                <div className="flex items-center divide-x">
                    <HeaderTopMenu icon={mobile} doc={phone} />
                    <HeaderTopMenu icon={location} doc={address} />
                </div>

                <div className="flex items-center gap-x-4">
                    {isAuthenticated ? (
                        <div
                            className="lg:cursor-pointer"
                            onClick={handleLogOut}
                        >
                            <HeaderTopMenu icon={logoutIcon} doc={'Logout'} />
                        </div>
                    ) : (
                        <Link href="/login">
                            {' '}
                            <HeaderTopMenu
                                icon={userIcon}
                                doc={'Log In/Sign Up'}
                            />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;

export const HeaderTopMenu = (props: any) => {
    return (
        <div className="flex items-center gap-1 px-4">
            {props?.icon}
            <p>{props?.doc}</p>
        </div>
    );
};

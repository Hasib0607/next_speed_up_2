'use client';

import { REDUX_PERSIST } from '@/consts';
import { removeFromLocalStorage } from '@/helpers/localStorage';
import useAuth from '@/hooks/useAuth';
import { useLogOutMutation } from '@/redux/features/auth/authApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SideCategoryFortyFive = ({ design, setOpen }: any) => {
    const isAuthenticated = useAuth();
    const router = useRouter();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };

    const { data: categoryData } = useGetCategoryQuery({});

    const category = categoryData?.data || [];

    const styleCss = `
        .text-hover:hover {
            color: ${design?.header_color};
        }
    `;

    return (
        <div>
            <nav>
                <style>{styleCss}</style>
                <ul className="flex flex-col gap-6 mt-3">
                    {category?.map((item: any) => (
                        <li
                            key={item.id}
                            className="relative group flex items-center justify-between"
                        >
                            <Link href={'/category/' + item?.id}>
                                <h1 className="menu-hover flex items-center group text-base text-hover">
                                    {item.name}
                                </h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="mt-24 pr-4">
                <p className='py-5 font-bold text-lg'>My Account</p>
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
                        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer`}
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
                        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium cursor-pointer`}
                    >
                        <button>Register</button>
                    </Link>
                )}
                {!isAuthenticated && (
                    <Link
                        onClick={() => setOpen(false)}
                        href="/login"
                        className="w-full flex items-center justify-center px-4 py-2 mt-4 border border-[var(--header-color)] text-[var(--header-color)] rounded-md shadow-sm text-base font-medium cursor-pointer"
                    >
                        Log in
                    </Link>
                )}
            </div>
        </div>
    );
};

export default SideCategoryFortyFive;

'use client';

import { EMAIL_REGEX } from '@/consts/index';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { imgUrl } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import Link from 'next/link';
import Loading from '../loaders/loading';
import { toast } from 'react-toastify';
import {
    useRegisterByEmailMutation,
    useRegisterByPhoneMutation,
} from '@/redux/features/auth/authApi';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import { useRouter } from 'next/navigation';

export const cls =
    'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12';

type FormValues = {
    email: string;
    phone: number;
    password: any;
    type: string;
    error: string;
};

const RegisterSeven = ({ headersetting, appStore }: any) => {
    const module_id = 120;
    const store_id = appStore?.id || null;

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [userNewOne, setUserNewOne] = useState<any>(null);
    const [show, setShow] = useState(false);
    const [userType, setUserType] = useState('customer');

    const localStorageAuthTypeName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_AUTH_TYPE_NAME as any;
    const localStorageNewAuthName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_NEW_AUTH_NAME as any;

    saveToLocalStorage(localStorageNewAuthName, userNewOne);

    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    const [registerByEmail] = useRegisterByEmailMutation();
    const [registerByPhone] = useRegisterByPhoneMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: any) => {
        saveToLocalStorage(
            localStorageAuthTypeName,
            data?.email || data?.phone
        );
        setLoading(true);

        if (
            appStore?.auth_type === 'phone' ||
            appStore?.auth_type === 'EasyOrder'
        ) {
            registerByPhone({ ...data, store_id })
                .unwrap()
                .then((res: any) => {
                    setUserNewOne(res?.token);
                    if (res?.token) {
                        toast.success(res?.message || 'Verify Otp');
                        router.push('/verify-otp');
                    }
                })
                .catch((error: any) => {
                    toast.error(error?.data?.message || 'Something went wrong');
                    setLoading(false);
                });
        } else {
            registerByEmail({ ...data, store_id })
                .unwrap()
                .then((res: any) => {
                    setUserNewOne(res?.token);
                    if (res?.token) {
                        toast.success(res?.message || 'Verify Otp');
                        router.push('/verify-otp');
                    }
                })
                .catch((error: any) => {
                    toast.error(error?.data?.message || 'Something went wrong');
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (moduleIdDetailError) {
            toast.error('Failed to fetch module data. Please try again.');
        }
    }, [moduleIdDetailError]);

    return (
        <div>
            <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
                <div className="container">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 md:mb-16 text-center">
                                    {headersetting?.logo === null ? (
                                        <Link
                                            href="/"
                                            className="inline-block max-w-[160px] mx-auto"
                                        >
                                            <p className="text-xl uppercase">
                                                {headersetting?.website_name}
                                            </p>
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/"
                                            className="inline-block max-w-[160px] mx-auto"
                                        >
                                            <img
                                                className="h-auto min-w-full overflow-hidden"
                                                src={
                                                    imgUrl + headersetting?.logo
                                                }
                                                alt="logo"
                                            />
                                        </Link>
                                    )}
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {(appStore?.auth_type === 'phone' ||
                                        appStore?.auth_type ===
                                            'EasyOrder') && (
                                        <div className="mb-6 text-left">
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                autoComplete="tel"
                                                type="Number"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className={cls}
                                            />
                                        </div>
                                    )}

                                    {appStore?.auth_type === 'email' && (
                                        <div className="mb-6 text-left">
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                            >
                                                Email
                                            </label>
                                            <input
                                                autoComplete="email"
                                                type="email"
                                                {...register('email', {
                                                    required: true,
                                                    pattern: {
                                                        value: EMAIL_REGEX,
                                                        message:
                                                            'Entered value does not match email format',
                                                    },
                                                })}
                                                className={cls}
                                            />
                                            {errors.email && (
                                                <span
                                                    role="alert"
                                                    className="text-red-500 text-sm"
                                                >
                                                    {errors.email?.message}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {appStore?.auth_type === 'email' && (
                                        <div className="mb-6 relative text-left">
                                            <label
                                                htmlFor="email"
                                                className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                            >
                                                Password
                                            </label>
                                            <input
                                                autoComplete="new-password"
                                                type={`${show ? 'text' : 'password'}`}
                                                {...register('password', {
                                                    required: true,
                                                })}
                                                className={cls}
                                            />
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] lg:cursor-pointer">
                                                {show ? (
                                                    <BsEye
                                                        onClick={() =>
                                                            setShow(!show)
                                                        }
                                                    />
                                                ) : (
                                                    <BsEyeSlash
                                                        onClick={() =>
                                                            setShow(!show)
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* User Type Selection Dropdown */}
                                    {moduleIdDetailSuccess && activeModule && (
                                        <div className="mb-6">
                                            <label className="block mb-2 text-sm text-gray-500">
                                                Select User Type
                                            </label>
                                            <select
                                                {...register('type', {
                                                    required:
                                                        'User type is required',
                                                })}
                                                value={userType}
                                                onChange={(e) =>
                                                    setUserType(e.target.value)
                                                } // Update the userType state based on selection
                                                className={cls}
                                            >
                                                <option value="customer">
                                                    Customer
                                                </option>
                                                <option value="customerAffiliate">
                                                    Affiliator
                                                </option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="mb-10">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                type="submit"
                                                value="Register"
                                                className={`w-full rounded-md font-semibold tracking-wider py-3 px-5 bg-black text-base text-white lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
                                            />
                                        )}
                                    </div>
                                </form>

                                <p className="text-base font-medium text-[#5A5A5A]">
                                    Already have an account?
                                    <Link
                                        href="/login"
                                        className="text-primary underline font-sans font-bold text-black pl-1"
                                    >
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterSeven;

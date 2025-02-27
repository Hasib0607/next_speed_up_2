'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import { toast } from 'react-toastify';
import { useLogInMutation } from '@/redux/features/auth/authApi';
import Loading from '../loaders/loading';

export const cls =
    'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12';

const LoginSeven = ({ headersetting, appStore, activeModule }: any) => {
    const store_id = appStore?.id || null;

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const router = useRouter();

    const [logIn] = useLogInMutation();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true);

        logIn({ ...data, store_id })
            .unwrap()
            .then(({ status, token, verify, message }: any) => {
                if (status) {
                    if (verify) {
                        if (token) {
                            toast.success(message || 'Login Successful');
                            router.push('/profile');
                        } else {
                            toast.warning(
                                message || 'Please Verify Your Accouct First'
                            );
                            router.push('/login');
                            setLoading(false);
                        }
                    }
                }
            })
            .catch((error: any) => {
                if (error?.status === 404) {
                    toast.error(
                        error?.data?.message || `Credential Doesn"t Match`
                    );
                }
                if (error?.status === 422) {
                    toast.error(error?.data?.message || `Try again!`);
                }
                setLoading(false);
            });
    };

    return (
        <div>
            <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
                <div className="container">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4">
                            <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 md:mb-6 text-center">
                                    <Link
                                        href="/"
                                        className="inline-block max-w-[160px]  mx-auto"
                                    >
                                        {headersetting?.logo === null ? (
                                            <p className="text-xl uppercase">
                                                {headersetting?.website_name}
                                            </p>
                                        ) : (
                                            <img
                                                className="h-auto min-w-full overflow-hidden"
                                                src={
                                                    imgUrl + headersetting?.logo
                                                }
                                                alt="logo"
                                            />
                                        )}
                                    </Link>
                                    <h2 className="text-sm md:text-base text-[#5A5A5A] mt-2 mb-8 ">
                                        Login with your email & password
                                    </h2>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {appStore?.auth_type === 'phone' ||
                                    appStore?.auth_type === 'EasyOrder' ? (
                                        <div className="mb-6">
                                            <label
                                                htmlFor="email"
                                                className="block text-left text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                autoComplete="tel"
                                                type="Number"
                                                placeholder="Phone"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className={cls}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-6">
                                            <label
                                                htmlFor="email"
                                                className="block text-left text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                            >
                                                Email
                                            </label>
                                            <input
                                                autoComplete="tel"
                                                type="email"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className={cls}
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-start flex-col items-start mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                        >
                                            Password
                                        </label>
                                        <div className="relative w-full">
                                            <input
                                                type={`${show ? 'text' : 'password'}`}
                                                {...register('password', {
                                                    required: true,
                                                })}
                                                className={
                                                    'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12'
                                                }
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
                                    </div>

                                    <Link
                                        href="/forgot-password"
                                        className="text-sm flex justify-end  mb-2 text-[#5A5A5A] underline font-medium"
                                    >
                                        Forget Password?
                                    </Link>
                                    <div className="mb-10">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                type="submit"
                                                value="Login"
                                                className={`w-full rounded-md font-semibold tracking-wider py-3 px-5 bg-black text-base text-white lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
                                            />
                                        )}
                                    </div>
                                </form>

                                {(appStore?.auth_type !== 'EasyOrder' ||
                                    activeModule) && (
                                    <p className="text-base font-medium text-[#5A5A5A]">
                                        Don&apos;t have any account?
                                        <Link
                                            href="/sign-up"
                                            className="text-primary underline font-sans font-bold text-black pl-1"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginSeven;

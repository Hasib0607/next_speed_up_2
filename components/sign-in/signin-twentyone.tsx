'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import Loading from '../loaders/loading';
import { btnhover } from '@/site-settings/style';
import { toast } from 'react-toastify';
import { useLogInMutation } from '@/redux/features/auth/authApi';
import { getActiveAuthTypes } from '@/helpers/getActiveAuthTypes';

export const cls =
    'w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ';

const LoginTwentyOne = ({
    headersetting,
    design,
    appStore,
    activeModule,
}: any) => {
    const store_id = appStore?.id || null;
    const authTypes = getActiveAuthTypes(appStore);

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

    const styleCss = `
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .cart-btn {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
      `;

    return (
        <div className="py-20 lg:py-[120px] sm:container px-5 xl:px-24">
            <div className="">
                {headersetting?.logo === null ? (
                    <Link href="/">
                        <p className="text-xl uppercase">
                            {headersetting?.website_name}
                        </p>
                    </Link>
                ) : (
                    <Link href="/">
                        <img
                            className="h-auto max-w-[160px] overflow-hidden mx-auto"
                            src={imgUrl + headersetting?.logo}
                            alt="logo"
                        />
                    </Link>
                )}
            </div>

            <div
                className={`grid grid-cols-1 ${
                    appStore?.auth_type === 'EasyOrder'
                        ? 'md:grid-cols-1 max-w-[500px] mx-auto'
                        : 'mx-auto'
                }`}
            >
                <style>{styleCss}</style>
                <section className="" id="sign-in">
                    <div className="flex flex-wrap mx-auto">
                        <div className="w-full px-4">
                            <div className="w-full mx-auto text-center bg-white rounded-lg relative overflow-hidden py-5 sm:px-10">
                                <div className="mb-10 md:mb-6 text-center">
                                    <div className="inline-block">
                                        <h2 className="text-xl font-bold mt-2 uppercase">
                                            Login
                                        </h2>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {authTypes.phone || authTypes.EasyOrder ? (
                                        <div className="mb-6">
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
                                            <input
                                                autoComplete="tel"
                                                type="email"
                                                placeholder="Email"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className={cls}
                                            />
                                        </div>
                                    )}
                                    <div className="mb-6 relative">
                                        <input
                                            type={`${show ? 'text' : 'password'}`}
                                            placeholder="Password"
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
                                    <div className="mb-10">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                type="submit"
                                                value="Sign In"
                                                className={`w-full font-bold tracking-wider rounded-md py-3 px-5 cart-btn text-base lg:cursor-pointer transition ${btnhover}`}
                                            />
                                        )}
                                    </div>
                                </form>

                                <Link
                                    href="/forgot-password"
                                    className="text-base inline-block mb-2 text-[#adadad] hover:underline hover:text-primary"
                                >
                                    Forgot Password?
                                </Link>
                                {(!authTypes.EasyOrder ||
                                    !authTypes.EmailEasyOrder ||
                                    activeModule) && (
                                    <p className="text-base text-[#adadad]">
                                        Don&apos;t Have an Account?
                                        <Link
                                            href="/sign-up"
                                            className="text-primary hover:underline text-color"
                                        >
                                            Sign Up
                                        </Link>
                                    </p>
                                )}
                                <div></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LoginTwentyOne;

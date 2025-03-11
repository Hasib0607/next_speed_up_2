'use client';

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import { toast } from 'react-toastify';
import { useLogInMutation } from '@/redux/features/auth/authApi';
<<<<<<< HEAD
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import Loading from '../loaders/loading';
import RegisterFive from '../register/register-five';
=======
import Loading from '../loaders/loading';
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b

export const cls =
    'w-full text-black rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ';

<<<<<<< HEAD
const LoginTwentyNine = ({ design, appStore, headersetting }: any) => {
    const module_id = 120;
=======
const LoginTwentyNine = ({
    design,
    appStore,
    headersetting,
    activeModule,
}: any) => {
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
    const store_id = appStore?.id || null;

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const router = useRouter();
    const [logIn] = useLogInMutation();

<<<<<<< HEAD
    const {
        data: moduleIdDetailsData,
        isLoading: moduleIdDetailLoading,
        isError: moduleIdDetailError,
        isSuccess: moduleIdDetailSuccess,
    } = useGetModuleStatusQuery({ store_id, module_id });
    const activeModule = moduleIdDetailsData?.status || false;

    useEffect(() => {
        if (moduleIdDetailError) {
            toast.error('Failed to fetch module data. Please try again.');
        }
    }, [moduleIdDetailError]);

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true);

=======
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true);

>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
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
        <div className="border mt-32 max-w-2xl mx-auto py-5 rounded-lg shadow-2xl">
            <style>{styleCss}</style>
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
            <div>
                <section className="mb-10">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4">
                            <div className="w-full mx-auto text-center rounded-lg relative overflow-hidden py-16 sm:px-10">
                                <div className="mb-10 md:mb-6 text-center">
                                    <Link href="/" className="inline-block">
                                        <h2 className="text-xl font-bold mt-2 uppercase">
                                            Login
                                        </h2>
                                    </Link>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {appStore?.auth_type === 'phone' ||
                                    appStore?.auth_type === 'EasyOrder' ? (
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
                                    {/* <div className="mb-6">
                                                    <input
                                                        autoComplete='tel'
                                                        type="Number"
                                                        placeholder="Phone"
                                                        {...register("phone", { required: true })}
                                                        className={cls}
                                                    />
                                                </div> */}
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
                                                    className="text-black"
                                                />
                                            ) : (
                                                <BsEyeSlash
                                                    onClick={() =>
                                                        setShow(!show)
                                                    }
                                                    className="text-black"
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
                                {(appStore?.auth_type !== 'EasyOrder' ||
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

export default LoginTwentyNine;

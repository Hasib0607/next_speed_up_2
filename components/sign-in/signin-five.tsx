'use client';

import Link from 'next/link';
import { useLogInMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../loaders/loading';
import { toast } from 'react-toastify';
import { getActiveAuthTypes } from '@/helpers/getActiveAuthTypes';

export const cls =
    'w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ';

const LoginFive = ({ appStore, activeModule }: any) => {
    const store_id = appStore?.id || null;
    const authTypes = getActiveAuthTypes(appStore);

    const [loading, setLoading] = useState(false);

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
        <>
            <section className="py-20 px-4">
                <div className="container">
                    <h3 className="text-2xl text-center mb-4 font-bold text-[#423b3b]">
                        Log in to your account
                    </h3>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {authTypes.phone || authTypes.EasyOrder ? (
                                        <div className="flex items-center text-left">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
                                            >
                                                Phone:
                                            </label>
                                            <input
                                                type="number"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                autoComplete="name"
                                                className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-left">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
                                            >
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                autoComplete="name"
                                                className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    )}
                                    <PasswordField register={register} />

                                    <Link
                                        href="/forgot-password"
                                        className="text-base inline-block my-3 text-[#423b3b] hover:underline hover:text-primary"
                                    >
                                        Forgot your password?
                                    </Link>
                                    <div className="mb-3">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                type="submit"
                                                value="Login"
                                                className=" font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear"
                                            />
                                        )}
                                    </div>
                                </form>
                                <div className="h-[1px] w-full bg-gray-300 mb-2"></div>

                                {(!authTypes.EasyOrder ||
                                    !authTypes.EmailEasyOrder ||
                                    activeModule) && (
                                    <p className="text-base text-[#423b3b]">
                                        <Link
                                            href="/sign-up"
                                            className="hover:underline"
                                        >
                                            No account?{' '}
                                            <span className="font-bold">
                                                Create one here
                                            </span>
                                        </Link>
                                    </p>
                                )}

                                <div className="flex justify-center w-full">
                                    {/* <LoginWith /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginFive;

const PasswordField = ({ register }: any) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex items-center my-3 relative text-left">
            <label
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-right"
            >
                Password:
            </label>
            <input
                type={show ? 'text' : 'password'}
                {...register('password', { required: true })}
                autoComplete="name"
                className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
            />
            <p
                onClick={() => setShow(!show)}
                className="ab absolute right-0 top-1 font-semibold bottom-0 bg-gray-400 flex justify-center items-center px-2"
            >
                {show ? 'hide' : 'show'}
            </p>
        </div>
    );
};

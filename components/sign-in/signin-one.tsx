'use client';

import { useLogInMutation } from '@/redux/features/auth/authApi';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';

const cls =
    'py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0 w-full';

const LoginOne = ({ design, appStore }: any) => {
    const module_id = 120;
    const store_id = appStore?.id || null;

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const router = useRouter();

    const [logIn] = useLogInMutation();

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

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
        <div className=" max-w-xl w-full mx-auto">
            <form
                className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h4 className="text-3xl font-semibold my-3 text-black">
                    Login
                </h4>

                {appStore?.auth_type === 'phone' ||
                appStore?.auth_type === 'EasyOrder' ? (
                    <div className="mb-6 w-full">
                        <input
                            autoComplete="tel"
                            type="Number"
                            placeholder="Phone"
                            {...register('phone', { required: true })}
                            className={cls}
                        />
                    </div>
                ) : (
                    <div className="mb-6 w-full">
                        <input
                            autoComplete="tel"
                            type="email"
                            placeholder="Email"
                            {...register('phone', { required: true })}
                            className={cls}
                        />
                    </div>
                )}

                <p className="text-red-400">
                    {' '}
                    {errors.phone?.type === 'required' &&
                        'phone Number is required'}
                </p>

                <div className="mb-6 relative">
                    <input
                        type={`${show ? 'text' : 'password'}`}
                        placeholder="Password"
                        {...register('password', { required: true })}
                        className={cls}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] lg:cursor-pointer">
                        {show ? (
                            <BsEye onClick={() => setShow(!show)} />
                        ) : (
                            <BsEyeSlash onClick={() => setShow(!show)} />
                        )}
                    </div>
                </div>

                <p className="text-red-400">
                    {' '}
                    {errors.password?.type === 'required' &&
                        'Password is required'}
                </p>

                <div className="flex justify-end items-center ">
                    <Link
                        href="/forgot-password"
                        className="label-text -mt-5 mb-5"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="">
                    {loading ? (
                        <p
                            className="text-left py-3 px-8 w-28 rounded-md text-gray-400"
                            style={{ backgroundColor: design?.header_color }}
                        >
                            Loading
                        </p>
                    ) : (
                        <input
                            type="submit"
                            value="Login"
                            className="text-left py-3 px-8 rounded-md text-white"
                            style={{ backgroundColor: design?.header_color }}
                        />
                    )}
                </div>

                {(appStore?.auth_type !== 'EasyOrder' || activeModule) && (
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
            </form>
            <div className="flex justify-center w-full">
                {/* <LoginWith /> */}
            </div>
        </div>
    );
};

export default LoginOne;

'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import {
    useRegisterByEmailMutation,
    useRegisterByPhoneMutation,
} from '@/redux/features/auth/authApi';
import { saveToLocalStorage } from '@/helpers/localStorage';

const cls =
    'py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0 w-full';

type FormValues = {
    email: string;
    phone: number;
    password: any;
    type: string;
    error: string;
};

const RegisterFive = ({ appStore }: any) => {
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

    const onSubmit = (data: any, e: any) => {
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
                    toast.error(error?.status || 'Something went wrong');
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
                    toast.error(error?.status || 'Something went wrong');
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
            <section className=" py-20 px-4">
                <div className="container">
                    <h3 className="text-2xl text-center mb-4 font-bold text-[#423b3b]">
                        {' '}
                        Create an account
                    </h3>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {(appStore?.auth_type === 'phone' ||
                                        appStore?.auth_type ===
                                            'EasyOrder') && (
                                        <div className="mb-6">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                                            >
                                                Phone:
                                            </label>
                                            <input
                                                autoComplete="tel"
                                                type="Number"
                                                placeholder="Phone"
                                                {...register('phone', {
                                                    required: true,
                                                })}
                                                className="mt-1 pl-2 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border border-gray-300"
                                            />
                                        </div>
                                    )}
                                    {appStore?.auth_type === 'email' && (
                                        <div className="mb-6">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                                            >
                                                Email:
                                            </label>
                                            <input
                                                autoComplete="email"
                                                type="Email"
                                                placeholder="Email"
                                                {...register('email', {
                                                    required: true,
                                                })}
                                                className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    )}
                                    {appStore?.auth_type === 'email' && (
                                        <div className="mb-6">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-semibold text-gray-700 mr-4 gap-3 min-w-[80px] text-left"
                                            >
                                                Password:
                                            </label>
                                            <div className="relative">
                                                <input
                                                    autoComplete="new-password"
                                                    type={`${show ? 'text' : 'password'}`}
                                                    placeholder="Password"
                                                    {...register('password', {
                                                        required: true,
                                                    })}
                                                    className="mt-1 focus:ring-gray-500 focus:border-gray-500 block w-full shadow-sm sm:text-sm border-gray-300"
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

                                    <div className="my-3 flex justify-center">
                                        {loading ? (
                                            <p className="font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear lg:cursor-pointer w-max">
                                                Loading
                                            </p>
                                        ) : (
                                            <input
                                                type="submit"
                                                value="sign-up"
                                                className="font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear lg:cursor-pointer"
                                            />
                                        )}
                                    </div>
                                </form>
                                <div className="h-[1px] w-full bg-gray-300 mb-2"></div>
                                <p className="text-base text-[#423b3b]">
                                    <Link
                                        href="/login"
                                        className="hover:underline"
                                    >
                                        Already have an account?{' '}
                                        <span className="font-bold">
                                            Log in{' '}
                                        </span>
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

export default RegisterFive;

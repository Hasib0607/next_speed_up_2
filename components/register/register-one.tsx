'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { useGetModuleStatusQuery } from '@/redux/features/modules/modulesApi';
import {
    useRegisterByEmailMutation,
    useRegisterByPhoneMutation,
} from '@/redux/features/auth/authApi';

const cls =
    'py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0 w-full';

type FormValues = {
    email: string;
    phone: number;
    password: any;
    type: string;
    error: string;
};

const RegisterOne = ({ design, appStore }: any) => {
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
        <div className=" max-w-xl w-full mx-auto">
            <form
                className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h4 className="text-3xl font-semibold my-3 text-black">
                    Create an Account
                </h4>
                <p className="pb-6 text-black text-sm">
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy
                </p>
                {(appStore?.auth_type === 'phone' ||
                    appStore?.auth_type === 'EasyOrder') && (
                    <div className="mb-6">
                        <input
                            autoComplete="tel"
                            type="Number"
                            placeholder="Phone"
                            {...register('phone', { required: true })}
                            className={cls}
                        />
                    </div>
                )}

                {appStore?.auth_type === 'email' && (
                    <div className="mb-6">
                        <input
                            autoComplete="email"
                            type="Email"
                            placeholder="Email"
                            {...register('email', { required: true })}
                            className={cls}
                        />
                    </div>
                )}

                {appStore?.auth_type === 'email' && (
                    <div className="mb-6 relative">
                        <input
                            autoComplete="new-password"
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
                )}

                <p className="text-red-400">
                    {' '}
                    {errors.phone?.type === 'required' &&
                        'phone Number is required'}
                </p>

                {/* User Type Selection Dropdown */}
                {moduleIdDetailSuccess && activeModule && (
                    <div className="mb-6">
                        <label className="block mb-2 text-sm text-gray-500">
                            Select User Type
                        </label>
                        <select
                            {...register('type', {
                                required: 'User type is required',
                            })}
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)} // Update the userType state based on selection
                            className={cls}
                        >
                            <option value="customer">Customer</option>
                            <option value="customerAffiliate">
                                Affiliator
                            </option>
                        </select>
                    </div>
                )}

                {/* Submit button */}
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
                            value="Register"
                            className="text-left py-3 px-8 rounded-md text-white"
                            style={{ backgroundColor: design?.header_color }}
                        />
                    )}
                </div>

                <p className="text-base font-medium text-[#5A5A5A]">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-primary underline font-sans font-bold text-black pl-1"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterOne;

'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SinglePassword from './components/single-password';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useUpdateUserPasswordMutation } from '@/redux/features/user/userApi';

const ChangePasswordSeven = ({ design, appStore }: any) => {
    const store_id = appStore?.id || null;

    const { register, handleSubmit } = useForm();

    const [currentPasswordErr, setCurrentPasswordErr] = useState(null);
    const [passwordErr, setPasswordErr] = useState(null);
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);

    const [updateUserPassword] = useUpdateUserPasswordMutation();

    const onSubmit = (data: any) => {
        //
        if (data.password === data.confirm_password) {
            updateUserPassword({ store_id, ...data })
                .unwrap()
                .then((res: any) => {
                    if (res?.status) {
                        toast.success(res?.message || 'Success!');
                    }
                })
                .catch((error) => {
                    if ('data' in error) {
                        const errorData = error as any;
                        if (errorData?.status == 422) {
                            toast.error(errorData?.data?.message);
                            const err = errorData?.data?.errors || {};
                            setCurrentPasswordErr(
                                err?.current_password &&
                                    err?.current_password[0]
                            );
                            setPasswordErr(err?.password && err?.password[0]);
                            setConfirmPasswordErr(
                                err?.confirm_password &&
                                    err?.confirm_password[0]
                            );
                        }
                        if (errorData?.status == 401) {
                            toast.error(errorData?.data?.message);
                        }
                    }
                });
        } else {
            toast.error('Please enter the same Password!');
        }
    };
    return (
        <div>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-3">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
                                Change Your Password
                            </h3>
                        </div>
                    </div>

                    <motion.div
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                        className="mt-5 md:mt-0 md:col-span-3"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-5 gap-6">
                                        <div className="col-span-3 ">
                                            <SinglePassword
                                                label={'Current Password'}
                                                register={register}
                                                registerName={
                                                    'current_password'
                                                }
                                            />
                                            {currentPasswordErr && (
                                                <span
                                                    role="alert"
                                                    className="text-red-500 text-sm"
                                                >
                                                    {currentPasswordErr}
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-span-3 ">
                                            <SinglePassword
                                                label={'New Password'}
                                                register={register}
                                                registerName={'password'}
                                            />
                                            {passwordErr && (
                                                <span
                                                    role="alert"
                                                    className="text-red-500 text-sm"
                                                >
                                                    {passwordErr}
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-span-3 ">
                                            <SinglePassword
                                                label={'Re-Type New Password'}
                                                register={register}
                                                registerName={
                                                    'confirm_password'
                                                }
                                            />
                                        {confirmPasswordErr && (
                                            <span
                                                role="alert"
                                                className="text-red-500 text-sm"
                                            >
                                                {confirmPasswordErr}
                                            </span>
                                        )}
                                        </div>
                                    </div>

                                    <div className=" py-3  text-left">
                                        <button
                                            type="submit"
                                            className="bg-black text-[13px] md:text-sm leading-4 inline-flex items-center lg:cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center  border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-heading text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-13 mt-3"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordSeven;

const SinglePasswor = ({ label, register, registerName }: any) => {
    const [hide, setHide] = useState(false);
    return (
        <>
            <label
                htmlFor="first-name"
                className="block font-sans text-[#3a3a3a] font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    {...register(registerName)}
                    type={!hide ? 'password' : 'text'}
                    autoComplete="given-name"
                    className="mt-1 p-2 focus:ring-0 focus:shadow-md focus:border-gray-800 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                />
                {hide ? (
                    <EyeIcon
                        onClick={() => setHide(!hide)}
                        color={'gray'}
                        className="absolute right-2 top-2"
                        height={20}
                        width={20}
                    />
                ) : (
                    <EyeSlashIcon
                        onClick={() => setHide(!hide)}
                        color={'gray'}
                        className="absolute right-2 top-2"
                        height={20}
                        width={20}
                    />
                )}
            </div>
        </>
    );
};

'use client';

import { useUpdateUserPasswordMutation } from '@/redux/features/user/userApi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SinglePassword from './components/single-password';

const ChangePasswordFour = () => {
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    const {store} = useSelector((state: any) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

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
        <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-3">
                    <div className="px-4 sm:px-0">
                        <h3
                            className={`text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 ${
                                design?.template_id === '34'
                                    ? 'text-gray-300'
                                    : 'text-gray-800'
                            }`}
                        >
                            Change Your Password
                        </h3>
                    </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div
                                className={`${
                                    design?.template_id === '34'
                                        ? 'bg-thirty-one'
                                        : 'bg-white'
                                } px-4 py-5 sm:p-6`}
                            >
                                <div className="grid grid-cols-5 gap-6">
                                    <div className="col-span-3 ">
                                        <SinglePassword
                                            label={'Current Password'}
                                            register={register}
                                            registerName={'current_password'}
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
                                            registerName={'confirm_password'}
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
                            </div>
                            <div
                                className={`px-4 py-3 ${
                                    design?.template_id === '34'
                                        ? 'bg-thirty-one'
                                        : 'bg-gray-50'
                                } text-right sm:px-6`}
                            >
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Update Password
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordFour;



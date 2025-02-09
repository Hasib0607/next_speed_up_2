'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
    getFromLocalStorage,
    removeFromLocalStorage,
} from '@/helpers/localStorage';
import {
    useResendOtpMutation,
    useVerifyOtpMutation,
} from '@/redux/features/auth/authApi';
import Link from 'next/link';

import Loading from '@/components/loaders/loading';
import { imgUrl } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import { toast } from 'react-toastify';

const VerifyOtpSeven = ({ appStore, headersetting, design }: any) => {
    const localStorageAuthTypeName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_AUTH_TYPE_NAME as any;
    const localStorageNewAuthName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_NEW_AUTH_NAME as any;

    const [verifyOtp] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(120);
    const [resend, setResend] = useState(false);
    const [userNewOne, setUserNewOne] = useState(
        getFromLocalStorage(localStorageNewAuthName)
    );

    const authType = getFromLocalStorage(localStorageAuthTypeName);

    // resend timer
    useEffect(() => {
        setTimeout(() => {
            if (resend === true) {
                setResend(false);
                setCounter(120);
            } else {
                setResend(false);
            }
        }, 120000);
    }, [resend]);

    // resend otp function
    const handleClick = () => {
        resendOtp({ token: userNewOne })
            .unwrap()
            .then(({ token, message }: any) => {
                if (token) {
                    toast.success(message || 'OTP Resend Successfully');
                    setUserNewOne(token);
                    setLoading(false);
                } else {
                    router.push('/verify-otp');
                    toast.error(message || 'Try again');
                    setLoading(false);
                }
            })
            .catch((error: any) => {
                toast.error(`Something went wrong! Please try again`);
                setLoading(false);
            });
    };

    // resend timer
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (resend && counter > 0) {
            timer = setInterval(
                () => setCounter((prevCounter) => prevCounter - 1),
                1000
            );
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [counter, resend]);

    // verify otp
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        setLoading(true);

        verifyOtp({ ...data, token: userNewOne })
            .unwrap()
            .then(({ status, token, verify, message }: any) => {
                if (status) {
                    if (verify) {
                        if (token) {
                            toast.success(message || 'Login Successful');
                            router.push('/');
                            removeFromLocalStorage(localStorageAuthTypeName);
                        } else {
                            toast.success(message || 'Please Login');
                            router.push('/login');
                            removeFromLocalStorage(localStorageAuthTypeName);
                        }
                    } else {
                        router.push('/verify-otp');
                        toast.error(message || 'Otp Not Match');
                        setLoading(false);
                    }
                } else {
                    router.push('/verify-otp');
                    toast.error(message || 'Try Again');
                    setLoading(false);
                }
            })
            .catch((error: any) => {
                toast.error(`Something went wrong! Please try again`);
                setLoading(false);
            });
    };

    return (
        <div>
            <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full px-4">
                            <div className="max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 md:mb-6 text-center">
                                    <Link
                                        href="/"
                                        className="inline-block max-w-[160px]  mx-auto"
                                    >
                                        <img
                                            className="max-h-[50px] w-full h-full object-fill"
                                            src={imgUrl + headersetting?.logo}
                                            alt="logo"
                                        />
                                    </Link>
                                    <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
                                        {appStore?.auth_type === 'phone' ||
                                        appStore?.auth_type === 'EasyOrder'
                                            ? `The OTP code has been sent to ${authType}.`
                                            : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
                                    </h3>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="flex justify-start flex-col items-start mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block text-gray-600 font-semibold text-sm leading-none mb-3 lg:cursor-pointer"
                                        >
                                            OTP
                                        </label>
                                        <input
                                            type="Number"
                                            {...register('otp', {
                                                required: true,
                                            })}
                                            className={
                                                'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12'
                                            }
                                        />
                                    </div>
                                    {errors?.otp &&
                                        errors?.test?.message &&
                                        typeof errors.test.message ===
                                            'string' && (
                                            <p>{errors.test.message}</p>
                                        )}

                                    <div className="text-right w-full lg:cursor-pointer">
                                        {resend === false && (
                                            <p
                                                onClick={() => {
                                                    setResend(true);
                                                    handleClick();
                                                }}
                                                className="text-gray-600 -mt-5 mb-5"
                                            >
                                                Resend OTP
                                            </p>
                                        )}

                                        {resend === true && counter > 0 && (
                                            <p className="text-gray-600 -mt-5 mb-5">
                                                Resend OTP in {counter} Seconds
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-10 lg:cursor-pointer">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                type="submit"
                                                value="Verify"
                                                className={`text-center lg:cursor-pointer py-3 px-8 rounded-md block w-full font-sans font-bold tracking-wider ${btnhover}`}
                                                style={{
                                                    backgroundColor:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                            />
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VerifyOtpSeven;

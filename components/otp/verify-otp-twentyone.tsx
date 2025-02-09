'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { imgUrl } from '@/site-settings/siteUrl';
import { btnhover } from '@/site-settings/style';
import { toast } from 'react-toastify';
import {
    useResendOtpMutation,
    useVerifyOtpMutation,
} from '@/redux/features/auth/authApi';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
} from '@/helpers/localStorage';
import Loading from '../loaders/loading';

export const cls =
    'w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ';

const VerifyOtpTwentyOne = ({ appStore, headersetting, design }: any) => {
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
                // console.log(token, message);
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
        // console.log('token',userNewOne,data);
        verifyOtp({ ...data, token: userNewOne })
            .unwrap()
            .then(({ status, token, verify, message }: any) => {
                // console.log( status,token, verify, message);
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
                            <div className=" max-w-[525px] mx-auto text-center bg-white rounded-lg relative overflow-hidden py-16 px-10 sm:px-12 md:px-[60px]">
                                <div className="mb-10 md:mb-6 text-center">
                                    <Link
                                        href="/"
                                        className="inline-block max-w-[160px] mx-auto"
                                    >
                                        <img
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
                                    <div className="mb-6">
                                        <input
                                            autoComplete="tel"
                                            type="Number"
                                            placeholder="Type Your OTP"
                                            {...register('otp', {
                                                required: true,
                                            })}
                                            className={cls}
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

                                    <div className="mb-10">
                                        {loading ? (
                                            <Loading />
                                        ) : (
                                            <input
                                                style={{
                                                    backgroundColor:
                                                        design?.header_color,
                                                    color: design?.text_color,
                                                }}
                                                type="submit"
                                                value="Verify Otp"
                                                className={` w-full rounded-md border bordder-blue-300 py-3 px-5 text-base  font-sans font-bold tracking-wider lg:cursor-pointer hover:bg-opacity-90 transition ${btnhover}`}
                                            />
                                        )}
                                    </div>
                                </form>

                                <div>
                                    <span className="absolute top-1 right-1">
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="1.39737"
                                                cy="38.6026"
                                                r="1.39737"
                                                transform="rotate(-90 1.39737 38.6026)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.39737"
                                                cy="1.99122"
                                                r="1.39737"
                                                transform="rotate(-90 1.39737 1.99122)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="13.6943"
                                                cy="38.6026"
                                                r="1.39737"
                                                transform="rotate(-90 13.6943 38.6026)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="13.6943"
                                                cy="1.99122"
                                                r="1.39737"
                                                transform="rotate(-90 13.6943 1.99122)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="25.9911"
                                                cy="38.6026"
                                                r="1.39737"
                                                transform="rotate(-90 25.9911 38.6026)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="25.9911"
                                                cy="1.99122"
                                                r="1.39737"
                                                transform="rotate(-90 25.9911 1.99122)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="38.288"
                                                cy="38.6026"
                                                r="1.39737"
                                                transform="rotate(-90 38.288 38.6026)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="38.288"
                                                cy="1.99122"
                                                r="1.39737"
                                                transform="rotate(-90 38.288 1.99122)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.39737"
                                                cy="26.3057"
                                                r="1.39737"
                                                transform="rotate(-90 1.39737 26.3057)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="13.6943"
                                                cy="26.3057"
                                                r="1.39737"
                                                transform="rotate(-90 13.6943 26.3057)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="25.9911"
                                                cy="26.3057"
                                                r="1.39737"
                                                transform="rotate(-90 25.9911 26.3057)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="38.288"
                                                cy="26.3057"
                                                r="1.39737"
                                                transform="rotate(-90 38.288 26.3057)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="1.39737"
                                                cy="14.0086"
                                                r="1.39737"
                                                transform="rotate(-90 1.39737 14.0086)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="13.6943"
                                                cy="14.0086"
                                                r="1.39737"
                                                transform="rotate(-90 13.6943 14.0086)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="25.9911"
                                                cy="14.0086"
                                                r="1.39737"
                                                transform="rotate(-90 25.9911 14.0086)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="38.288"
                                                cy="14.0086"
                                                r="1.39737"
                                                transform="rotate(-90 38.288 14.0086)"
                                                fill="#3056D3"
                                            />
                                        </svg>
                                    </span>
                                    <span className="absolute left-1 bottom-1">
                                        <svg
                                            width="29"
                                            height="40"
                                            viewBox="0 0 29 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="2.288"
                                                cy="25.9912"
                                                r="1.39737"
                                                transform="rotate(-90 2.288 25.9912)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="14.5849"
                                                cy="25.9911"
                                                r="1.39737"
                                                transform="rotate(-90 14.5849 25.9911)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="26.7216"
                                                cy="25.9911"
                                                r="1.39737"
                                                transform="rotate(-90 26.7216 25.9911)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="2.288"
                                                cy="13.6944"
                                                r="1.39737"
                                                transform="rotate(-90 2.288 13.6944)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="14.5849"
                                                cy="13.6943"
                                                r="1.39737"
                                                transform="rotate(-90 14.5849 13.6943)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="26.7216"
                                                cy="13.6943"
                                                r="1.39737"
                                                transform="rotate(-90 26.7216 13.6943)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="2.288"
                                                cy="38.0087"
                                                r="1.39737"
                                                transform="rotate(-90 2.288 38.0087)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="2.288"
                                                cy="1.39739"
                                                r="1.39737"
                                                transform="rotate(-90 2.288 1.39739)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="14.5849"
                                                cy="38.0089"
                                                r="1.39737"
                                                transform="rotate(-90 14.5849 38.0089)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="26.7216"
                                                cy="38.0089"
                                                r="1.39737"
                                                transform="rotate(-90 26.7216 38.0089)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="14.5849"
                                                cy="1.39761"
                                                r="1.39737"
                                                transform="rotate(-90 14.5849 1.39761)"
                                                fill="#3056D3"
                                            />
                                            <circle
                                                cx="26.7216"
                                                cy="1.39761"
                                                r="1.39737"
                                                transform="rotate(-90 26.7216 1.39761)"
                                                fill="#3056D3"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VerifyOtpTwentyOne;

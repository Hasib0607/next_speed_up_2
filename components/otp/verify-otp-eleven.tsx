import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
    getFromLocalStorage,
    removeFromLocalStorage,
} from '@/helpers/localStorage';
import {
    useResendOtpMutation,
    useVerifyOtpMutation,
} from '@/redux/features/auth/authApi';
import Link from 'next/link';

import { toast } from 'react-toastify';

const VerifyOtpEleven = () => {
    const localStorageAuthTypeName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_AUTH_TYPE_NAME as any;
    const localStorageNewAuthName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_NEW_AUTH_NAME as any;

    const [verifyOtp] = useVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const router = useRouter();

    const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state

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
    const { register, handleSubmit } = useForm();

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
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container">
                <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
                    {store?.auth_type === 'phone' ||
                    store?.auth_type === 'EasyOrder'
                        ? `The OTP code has been sent to ${authType}.`
                        : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
                </h3>
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4">
                        <div className="max-w-[560px] mx-auto text-center bg-white relative overflow-hidden  py-6 px-6 sm:px-8 md:px-[60px] drop-shadow-xl">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="block items-center text-left">
                                    <label
                                        htmlFor="otp"
                                        className="block text-lg font-semibold text-gray-700 gap-3 min-w-[80px] text-left"
                                    >
                                        Your OTP:
                                    </label>
                                    <input
                                        type="number"
                                        {...register('otp', { required: true })}
                                        autoComplete="name"
                                        className="shadow-xs flex w-full items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl remove-arrow"
                                    />
                                </div>

                                <div className="text-right w-full lg:cursor-pointer">
                                    {resend === false && (
                                        <p
                                            onClick={() => {
                                                setResend(true);
                                                handleClick();
                                            }}
                                            className="text-gray-600 mt-1 mb-5"
                                        >
                                            Resend OTP
                                        </p>
                                    )}
                                    {resend === true && counter > 0 && (
                                        <p className="text-gray-600 mt-1 mb-5">
                                            Resend OTP in {counter} Seconds
                                        </p>
                                    )}
                                </div>

                                <div className="my-3 flex justify-center">
                                    {loading ? (
                                        <p
                                            className={`font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear`}
                                        >
                                            Loading
                                        </p>
                                    ) : (
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="lg:cursor-pointer font-semibold bg-gray-700 uppercase py-2 px-6 text-white hover:bg-orange-500 transition-all duration-500 ease-linear"
                                        />
                                    )}
                                </div>
                            </form>
                            <div className="h-[1px] w-full bg-gray-300 mb-2"></div>

                            <p className="text-base text-[#423b3b]">
                                <Link href="/login" className="hover:underline">
                                    Go to login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyOtpEleven;

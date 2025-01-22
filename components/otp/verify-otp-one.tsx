'use client';
import {
    getFromLocalStorage,
    removeFromLocalStorage,
} from '@/helpers/localStorage';
import {
    useResendOtpMutation,
    useVerifyOtpMutation,
} from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const VerifyOtpOne = () => {
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
        <>
            <div className="max-w-md mx-auto">
                <form
                    className="border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full "
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h3 className="font-medium text-[#423b3b] text-center mb-3 max-w-[560px] mx-auto">
                        {store?.auth_type === 'phone' ||
                        store?.auth_type === 'EasyOrder'
                            ? `The OTP code has been sent to ${authType}.`
                            : `The OTP code has been sent to ${authType}. Please check in spam/ junk folder as well.`}
                    </h3>
                    <input
                        type="Number"
                        {...register('otp', { required: true })}
                        placeholder="Your OTP"
                        className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
                    />

                    <p className="text-red-400">
                        {' '}
                        {errors?.otp?.type === 'required' && 'OTP is required'}
                    </p>

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

                    {loading ? (
                        <p
                            className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
                        >
                            Loading
                        </p>
                    ) : (
                        // disable ?
                        //     <input type="submit" value="Resend Otp" disabled className='text-left py-3 px-8 rounded-md text-white' style={{ backgroundColor: button1.color }} /> :
                        <input
                            type="submit"
                            value="Verify"
                            className={`text-center lg:cursor-pointer py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
                        />
                    )}

                    {/* <div className="flex justify-center">
        <Countdown
            date={Date.now() + 60000}
            renderer={renderer}
        />
    </div> */}
                </form>
            </div>
        </>
    );
};

export default VerifyOtpOne;

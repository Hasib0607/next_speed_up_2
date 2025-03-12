'use client';

import { useSubscribeNewsletterMutation } from '@/redux/features/blog/blogApi';
import { IoIosPaperPlane } from 'react-icons/io';

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const NewsletterFortyThree = ({ store_id }: any) => {
    const emailRef = useRef<any>(null);

    const [subscribeNewsletter] = useSubscribeNewsletterMutation();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const email = emailRef.current.value;

        async function fetchData() {
            subscribeNewsletter({ store_id, email })
                .unwrap()
                .then((res: any) => {
                    if (res?.error) {
                        toast.success(
                            res?.error || 'Your email has already been taken'
                        );
                        emailRef.current.value = '';
                    } else {
                        toast.success(
                            res?.message ||
                                'Successfully Subscribe to Our Newsletter'
                        );
                        emailRef.current.value = '';
                    }
                })
                .catch((error: any) => {
                    toast.error(error?.status || 'Something went wrong');
                });
        }
        if (email) {
            fetchData();
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-y-3 justify-center lg:gap-x-3 bg-[var(--header-color)] py-10 overflow-hidden items-center mb-10 ">
                <div className="">
                    <p className="text-gray-800 my-8 text-lg uppercase text-center">
                        SUBSCRIBE TO THE MAILING LIST
                    </p>
                    <h1 className="text-4xl font-bold text-center mb-10">
                        Newsletter
                    </h1>
                </div>
                <div className="lg:w-1/2">
                    <div className="max-w-4xl mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center gap-4 sm:flex-row lg:justify-center"
                        >
                            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[600px]">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="w-full h-12 bg-transparent border-b-2 border-gray-400 text-white placeholder-gray-400 focus:border-[var(--text-color)] focus:outline-none focus:ring-0 px-2 py-2 sm:text-left box-border"
                                    placeholder="Email Address"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-12 flex items-center gap-2 bg-transparent hover:bg-[var(--text-color)] border-b-2 border-gray-400 text-white uppercase hover:border-[var(--text-color)] px-3 py-2 transition-colors duration-300 w-auto lg:text-lg box-border leading-none"
                            >
                                Submit
                                <IoIosPaperPlane className="text-lg lg:text-xl" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterFortyThree;

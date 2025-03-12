'use client';

import { useSubscribeNewsletterMutation } from '@/redux/features/blog/blogApi';

import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const NewsletterThree = ({ store_id }: any) => {
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
            <div className="flex flex-col gap-y-3 lg:flex-row justify-between lg:gap-x-3 bg-black rounded-lg py-10 overflow-hidden items-center mb-10 ">
                <div className="lg:w-1/2">
                    <h1 className="text-4xl font-bold text-white">
                        Subscribe{' '}
                        <span className="text-red-800">Newsletter</span>
                    </h1>
                    <p className="text-gray-500 mt-1 text-lg">
                        Subscribe to our newsletter and stay updated.
                    </p>
                </div>
                <div className="lg:w-1/2">
                    <form onSubmit={handleSubmit} className="sm:flex">
                        <input
                            ref={emailRef}
                            type="email"
                            className="w-full bg-gray-800 pl-3 placeholder-gray-400 text-gray-400 border-0 outline-none focus:outline-none focus:border-none focus:ring-0"
                            placeholder="Enter your email"
                            required
                        />
                        <button
                            type="submit"
                            className="px-5 md:py-2 py-1 mt-1 sm:mt-0 w-60 bg-red-800 hover:opacity-80 text-white uppercase"
                        >
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterThree;

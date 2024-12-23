'use client';

import { useSubscribeNewsletterMutation } from '@/redux/features/blog/blogApi';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const NewsletterTwo = ({ store_id }: any) => {
    const emailRef = useRef<any>(null);

    const [subscribeNewsletter] = useSubscribeNewsletterMutation()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const email = emailRef.current.value;

        async function fetchData() {
            subscribeNewsletter({store_id,email})
            .unwrap()
                .then((res: any) => {
                    if (res?.error) {
                        toast.success(res?.error || 'Your email has already been taken');
                        emailRef.current.value = '';
                    }else{
                        toast.success(res?.message || 'Successfully Subscribe to Our Newsletter');
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
            <div className="">
                <div className="">
                    <div className="py-5">
                        <p className="text-gray-500">
                            Sign up for our e-mail to get latest news.
                        </p>
                    </div>
                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="flex relative">
                            <input
                                ref={emailRef}
                                type="email"
                                className="w-full h-[41px] pl-4 text-xs lg:text-[15px] rounded-full border-gray-200 opacity-100 outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-black text-black"
                                placeholder="Write your email here"
                                required
                            />
                            <button
                                type="submit"
                                className="px-3 h-[41px] hover:opacity-80 bg-black text-white text-sm rounded-r-full absolute right-0 top-0"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterTwo;

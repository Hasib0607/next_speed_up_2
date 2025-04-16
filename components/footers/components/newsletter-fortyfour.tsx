'use client';

import { useSubscribeNewsletterMutation } from '@/redux/features/blog/blogApi';
import { AiOutlineMail } from 'react-icons/ai';
import { MdPhone } from 'react-icons/md';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const NewsletterFortyFour = ({ store_id, headersetting }: any) => {
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
            <div className="bg-[var(--header-color)] py-12 overflow-hidden items-center">
                <div className="flex flex-col lg:flex-row justify-between max-w-[1200px] mx-auto px-4 gap-10">
                    <div className="w-full lg:w-3/5">
                        <p className="flex items-center gap-2 text-md font-semibold">
                            <AiOutlineMail /> GET SPECIAL DISCOUNTS IN YOUR
                            INBOX
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-1 sm:flex-row lg:justify-start mt-2"
                        >
                            <div className="relative w-full">
                                <input
                                    ref={emailRef}
                                    type="email"
                                    className="w-full h-12 bg-transparent border-b-2 border-gray-400 placeholder-gray-400 focus:border-[var(--text-color)] focus:outline-none focus:ring-0 px-2 py-2 sm:text-left box-border"
                                    placeholder="Enter email to get offers, discounts and more."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-12 flex items-center gap-2 bg-[var(--text-color)] text-white px-2 transition-colors duration-300 lg:text-lg leading-none"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="lg:w-2/5">
                        <p className="flex items-center gap-2 text-md font-semibold">
                            <MdPhone /> FOR ANY HELP YOU MAY CALL US AT
                        </p>
                        <p>{headersetting?.phone}</p>
                        <p>Open 24 hours a day, 7 Days a week</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterFortyFour;

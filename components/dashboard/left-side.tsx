'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { usePathname } from 'next/navigation';

import { useSelector } from 'react-redux';

const LeftSide = () => {
    const pathname = usePathname();

    const { referralCode } = useSelector((state: any) => state.auth); // Access updated Redux state

    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        // Generate the referral link based on the code
        const fetchReferralCode = () => {
            const link = `${document.location.href}?referral=${referralCode}`;
            setReferralLink(link);
        };
        
        if (referralCode) {
            fetchReferralCode();
        }
    }, [referralCode]);

    return (
        <>
            <div className="mt-5 md:mt-0 md:col-span-1">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className=" py-5 space-y-3  flex flex-col">
                        <Link
                            href="/profile"
                            className={`${
                                pathname === '/profile'
                                    ? ' active_color'
                                    : 'border-white '
                            }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
                        >
                            Profile
                        </Link>

                        <Link
                            href="/profile/order"
                            className={`${
                                pathname === '/profile/order'
                                    ? ' active_color'
                                    : 'border-white '
                            }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
                        >
                            Your Order
                        </Link>

                        <Link
                            href="/profile/change-password"
                            className={`${
                                pathname === '/profile/change-password'
                                    ? ' active_color'
                                    : 'border-white '
                            }  border-l-4 text-md font-semibold  pl-5 py-1 tracking-wider`}
                        >
                            Change Password
                        </Link>

                        {referralCode && (
                            <Link
                                href={`/profile/affiliate-info`}
                                className={`${
                                    pathname === '/profile/affiliate-info'
                                        ? ' active_color'
                                        : 'border-white '
                                }  border-l-4 text-md font-semibold pl-5 py-1 tracking-wider`}
                            >
                                Affiliate Info
                            </Link>
                        )}

                        {referralCode && (
                            <Link
                                href="/profile/withdraw-history"
                                className={`${
                                    pathname === '/profile/withdraw-history'
                                        ? ' active_color'
                                        : 'border-white '
                                }  border-l-4 text-md font-semibold pl-5 py-1 tracking-wider`}
                            >
                                Withdraw History
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftSide;

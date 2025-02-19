'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TiTickOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';

const ThankYou = () => {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg');
    const tId = searchParams.get('transaction_id');

    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return; // Wait for hydration

        if (msg) {
            toast.success(decodeURIComponent(msg));
        }
    }, [isHydrated, msg]);

    return (
        <div className="flex flex-col gap-3 justify-center items-center font-bold  h-auto md:h-[calc(100vh-300px)]">
            <TiTickOutline className="text-green-500 text-6xl" />
            <p className="text-2xl lg:text-3xl">Thank you for your order</p>

            {!msg && (
                <p className="px-4 text-center text-sm md:text-xl lg:text-2xl">
                    Your order has been placed successfully!
                </p>
            )}

            {msg && (
                <p className="px-4 text-center text-sm md:text-xl lg:text-2xl">
                    Order successfully placed with message: {msg}
                </p>
            )}

            {tId && (
                <p className="text-sm md:text-xl lg:text-2xl">
                    Transaction ID: {tId}
                </p>
            )}

            <Link href="/profile/order">
                <button className="bg-[var(--header-color)] text-[var(--text-color)] py-2 px-4 text-base rounded-md">
                    Order Info
                </button>
            </Link>

            <Link href="/shop">
                <button className="text-base rounded-md underline text-[#f1593a]">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};

export default ThankYou;

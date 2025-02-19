'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const PaymentFailed = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return; // Wait for hydration

        const errorMessage = searchParams.get('error_msg');
        if (errorMessage) {
            toast.error(decodeURIComponent(errorMessage));
            router.push('/profile/order');
        }
    }, [searchParams, router, isHydrated]);

    return null;
};

export default PaymentFailed;

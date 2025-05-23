'use client';

import { ReactNode, FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

interface UnProtectedProps {
    children: ReactNode;
    path?: string | undefined;
}

const GuestLayer: FC<UnProtectedProps> = ({ children, path = '/profile' }) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push(path);
        }
    }, [isAuthenticated, router, path]);

    if (isAuthenticated) {
        return null; // Prevent rendering until redirection
    }

    return children;
};

export default GuestLayer;

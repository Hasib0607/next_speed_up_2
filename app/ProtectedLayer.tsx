'use client';

import { ReactNode, FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

interface ProtectedProps {
    children: ReactNode;
}

const ProtectedLayer: FC<ProtectedProps> = ({ children }) => {
    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // Prevent rendering until redirection
    }

    return children;
};

export default ProtectedLayer;

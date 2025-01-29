'use client';

import GuestLayer from '@/app/GuestLayer';
import { DEFAULT } from '@/consts';
import useAuth from '@/hooks/useAuth';
import { RootState } from '@/redux/store';
import { register_pages } from '@/utils/dynamic-import/registerPages/registerPages';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Register = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const RegisterComponent =
        register_pages[design?.login_page] || register_pages[DEFAULT];

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state

    const router = useRouter();
    const isAuthenticated = useAuth();

    useEffect(() => {
        if (store?.auth_type === 'EasyOrder') {
            router.push('/login');
        }
    }, [isAuthenticated, router, store]);

    return (
        <>
            <GuestLayer>
                {design?.login_page && RegisterComponent && (
                    <RegisterComponent />
                )}
            </GuestLayer>
        </>
    );
};

export default Register;

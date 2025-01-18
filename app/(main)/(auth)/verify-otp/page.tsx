'use client';

import { getFromLocalStorage } from '@/helpers/localStorage';
import { RootState } from '@/redux/store';
import { verify_otp_pages } from '@/utils/dynamic-import/verifyPages/verifyPages';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
    const localStorageAuthTypeName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_AUTH_TYPE_NAME as any;
    const authType = getFromLocalStorage(localStorageAuthTypeName);

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const VerifyOtpComponent = !authType
        ? null
        : verify_otp_pages[design?.login_page];

    const router = useRouter();

    useEffect(() => {
        if (!authType) {
            router.push('/');
            toast.warning('Please Give Your Registration Credential First');
        }
    }, [localStorageAuthTypeName, router, authType]);

    return (
        <>
            {design?.login_page && VerifyOtpComponent ? (
                <VerifyOtpComponent />
            ) : null}
        </>
    );
};

export default VerifyOtp;

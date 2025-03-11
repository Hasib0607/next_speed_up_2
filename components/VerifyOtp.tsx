'use client';

import { DEFAULT } from '@/consts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { verify_otp_pages } from '@/utils/dynamic-import/verifyPages/verifyPages';

const VerifyOtp = ({ design, appStore, headersetting }: any) => {
    const localStorageAuthTypeName = process.env
        .NEXT_PUBLIC_LOCAL_STORAGE_AUTH_TYPE_NAME as any;
    const authType = getFromLocalStorage(localStorageAuthTypeName);

    const VerifyOtpComponent = !authType
        ? null
        : verify_otp_pages[design?.login_page] || verify_otp_pages[DEFAULT];

    const router = useRouter();

    useEffect(() => {
        if (!authType) {
            router.push('/');
            toast.warning('Please Give Your Registration Credential First');
        }
    }, [router, authType]);

    return (
        design?.login_page !== 'null' &&
        VerifyOtpComponent && (
            <VerifyOtpComponent
                design={design}
                appStore={appStore}
                headersetting={headersetting}
            />
        )
    );
};

export default VerifyOtp;

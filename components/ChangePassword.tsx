'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { change_password_pages } from '@/utils/dynamic-import/changePasswordPages/changePasswordPages';
import { useSelector } from 'react-redux';

const ChangePassword = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const ChangePasswordComponent =
        change_password_pages[design?.profile_page] ||
        change_password_pages[DEFAULT];

    return (
        <>
            {design?.profile_page !== "null" && ChangePasswordComponent && (
                <ChangePasswordComponent />
            )}
        </>
    );
};

export default ChangePassword;

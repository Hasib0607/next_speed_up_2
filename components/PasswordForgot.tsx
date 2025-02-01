'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { forgot_password_pages } from '@/utils/dynamic-import/forgotPasswordPages/forgotPasswordPages';
import { useSelector } from 'react-redux';

const PasswordForgot = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const ForgotPasswordComponent =
        forgot_password_pages[design?.login_page] ||
        forgot_password_pages[DEFAULT];

    return <>{design?.login_page !== "null" && ForgotPasswordComponent && <ForgotPasswordComponent />}</>;
};

export default PasswordForgot;

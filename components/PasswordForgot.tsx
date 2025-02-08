import { DEFAULT } from '@/consts';
import { forgot_password_pages } from '@/utils/dynamic-import/forgotPasswordPages/forgotPasswordPages';

const PasswordForgot = ({ design, appStore, headersetting }: any) => {
    const ForgotPasswordComponent =
        forgot_password_pages[design?.login_page] ||
        forgot_password_pages[DEFAULT];

    return (
        design?.login_page !== 'null' &&
        ForgotPasswordComponent && (
            <ForgotPasswordComponent
                design={design}
                appStore={appStore}
                headersetting={headersetting}
            />
        )
    );
};

export default PasswordForgot;

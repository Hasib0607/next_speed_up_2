import { DEFAULT } from '@/consts';
import { change_password_pages } from '@/utils/dynamic-import/changePasswordPages/changePasswordPages';

const ChangePassword = ({ design, appStore }: any) => {
    const ChangePasswordComponent =
        change_password_pages[design?.profile_page] ||
        change_password_pages[DEFAULT];

    return (
        design?.profile_page !== 'null' &&
        ChangePasswordComponent && <ChangePasswordComponent design={design} appStore={appStore}/>
    );
};

export default ChangePassword;

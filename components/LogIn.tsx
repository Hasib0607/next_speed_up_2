import { DEFAULT } from '@/consts';
import GuestLayer from '@/app/GuestLayer';
import { login_pages } from '@/utils/dynamic-import/logInPages/logInPages';

const LogIn = ({ design, appStore, headersetting }: any) => {
    const SignInComponent =
        login_pages[design?.login_page] || login_pages[DEFAULT];

    return (
        <GuestLayer>
            {design?.login_page !== 'null' && SignInComponent && (
                <SignInComponent
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                />
            )}
        </GuestLayer>
    );
};

export default LogIn;

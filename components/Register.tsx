import { DEFAULT } from '@/consts';
import GuestLayer from '@/app/GuestLayer';
import { redirect } from 'next/navigation';
import { register_pages } from '@/utils/dynamic-import/registerPages/registerPages';

const Register = ({ design, appStore, headersetting }: any) => {
    const RegisterComponent =
        register_pages[design?.login_page] || register_pages[DEFAULT];

    if (appStore?.auth_type === 'EasyOrder') {
        redirect('/login');
    }

    return (
        <GuestLayer>
            {design?.login_page !== 'null' && RegisterComponent && (
                <RegisterComponent
                    design={design}
                    appStore={appStore}
                    headersetting={headersetting}
                />
            )}
        </GuestLayer>
    );
};

export default Register;

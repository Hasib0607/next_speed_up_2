'use client';

import { login_pages } from '@/utils/dynamic-import/logInPages/logInPages';

import GuestLayer from '@/app/GuestLayer';
import { useSelector } from 'react-redux';
import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';

const SignIn = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};


    const SignInComponent =
        login_pages[design?.login_page] || login_pages[DEFAULT];

    return (
        <GuestLayer>
            {design?.login_page && SignInComponent && <SignInComponent />}
        </GuestLayer>
    );
};



export default SignIn;

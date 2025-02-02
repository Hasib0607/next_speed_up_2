'use client';

import { RootState } from '@/redux/store';
import { headers } from '@/utils/dynamic-import/_homepageSections/header/header';
import { useSelector } from 'react-redux';

const Header = ({ design }: any) => {
    const HeaderComponent = headers[design?.header];

    const authStore = useSelector((state: RootState) => state?.auth);
    const { cartList } = useSelector((state: RootState) => state?.cart);

    const home = useSelector((state: any) => state?.home);
    const { headersetting, menu } = home || {};

    const user = authStore?.user || {};

    return (
        <>
            {design?.header !== 'null' && HeaderComponent && (
                <HeaderComponent
                    design={design}
                    headersetting={headersetting}
                    menu={menu}
                    user={user}
                    cartList={cartList}
                />
            )}
        </>
    );
};

export default Header;

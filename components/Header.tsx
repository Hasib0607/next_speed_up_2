'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { headers } from '@/utils/dynamic-import/_homepageSections/header/header';
import { useSelector } from 'react-redux';

const Header = ({ design }: any) => {
    const HeaderComponent = design?.header && headers[design?.header]||headers[DEFAULT];

    const authStore = useSelector((state: RootState) => state?.auth);
    const {cartList} = useSelector((state: RootState) => state?.cart);

    const home = useSelector((state: any) => state?.home);
    const { headersetting, menu } = home || {};

    const user = authStore?.user || {};

    return (
        <>
            {/* <Suspense
                fallback={
                    <div className="mb-5 px-5 pt-5">
                        <div className="animate-pulse w-full bg-gray-300 h-20 rounded-lg flex justify-center items-center"></div>
                    </div>
                }
            >
            </Suspense> */}
            {HeaderComponent && (
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

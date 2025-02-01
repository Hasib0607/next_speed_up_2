'use client';

import { footers } from '@/utils/dynamic-import/_homepageSections/footer/footer';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Footer = ({ design }: any) => {
    const FooterComponent = footers[design?.footer];

    const { data: pageData } = useGetPageQuery({});
    const page = pageData?.data || [];

    const categoryStore = useSelector((state: RootState) => state?.category);
    const category = categoryStore?.categories || [];

    const home = useSelector((state: RootState) => state?.home);
    const { headersetting, menu } = home || {};

    const storeData = useSelector((state: RootState) => state.appStore.store); // Access updated Redux state
    const store_id = storeData?.id || null;

    return (
        <>

            {design?.footer !== "null" && FooterComponent && (

                <FooterComponent
                    design={design}
                    category={category}
                    headersetting={headersetting}
                    store_id={store_id}
                    menu={menu}
                    page={page}
                />
            )}
        </>
    );
};

export default Footer;

// <div className='mt-5 px-5 pb-5'>
//     <div className="animate-pulse w-full bg-gray-300 h-28 rounded-lg flex justify-center items-center"></div>
// </div>

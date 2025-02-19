'use client';

import { footers } from '@/utils/dynamic-import/_homepageSections/footer/footer';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const Footer = ({ design, headersetting, menu }: any) => {
    const store_id = design?.store_id || null;

    const FooterComponent = footers[design?.footer];

    const { data: pageData } = useGetPageQuery({});
    const page = pageData?.data || [];

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        design?.footer !== 'null' &&
        FooterComponent && (
            <FooterComponent
                design={design}
                category={category}
                headersetting={headersetting}
                store_id={store_id}
                menu={menu}
                page={page}
            />
        )
    );
};

export default Footer;

// <div className='mt-5 px-5 pb-5'>
//     <div className="animate-pulse w-full bg-gray-300 h-28 rounded-lg flex justify-center items-center"></div>
// </div>

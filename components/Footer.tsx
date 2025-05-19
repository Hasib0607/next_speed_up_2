import { footers } from '@/utils/dynamic-import/footer/footer';
// import { useGetPageQuery } from '@/redux/features/page/pageApi';
// import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const Footer = (props: any) => {
    const store_id = props?.design?.store_id || null;

    const FooterComponent = footers[props?.design?.footer];

    // const { data: pageData } = useGetPageQuery({});
    // const page = pageData?.data || [];

    // const { data: categoryData } = useGetCategoryQuery({});
    // const category = categoryData?.data || [];

    return (
        props?.design?.footer !== 'null' &&
        FooterComponent && (
            <FooterComponent
                {...props}
                store_id={store_id}
            />
        )
    );
};

export default Footer;

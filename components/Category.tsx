'use client';

import { DEFAULT } from '@/consts';
import { categories } from '@/utils/dynamic-import/categories/categories';
import { useSelector } from 'react-redux';

const Category = ({ catId }: any) => {
    const home = useSelector((state: any) => state?.home);
    const { design } = home || {};

    const storeData = useSelector((state: any) => state.appStore.store); // Access updated Redux state
    const store_id = storeData?.id || null;

    console.log(design?.shop_page)

    const CategoryComponent =
        categories[design?.shop_page];
        //  || categories[DEFAULT];

    console.log("design?.shop_page", design?.shop_page);

    return (
        <>
            {design?.shop_page && CategoryComponent && (
                <CategoryComponent
                    design={design}
                    store_id={store_id}
                    catId={catId}
                />
            )}
        </>
    );
};

export default Category;

'use client';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { shops } from '@/utils/dynamic-import/shops/shops';
import { DEFAULT } from '@/consts';

const Shop = () => {
    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const {store} = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const ShopComponent = shops[design?.shop_page] || shops[DEFAULT];

    // console.log(design?.shop_page);
    
    return (
        <>
            {design?.shop_page !== "null" && ShopComponent && (
                <ShopComponent design={design} store_id={store_id} />
            )}
        </>
    );
};

export default Shop;

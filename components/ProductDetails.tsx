'use client';

import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux';
import { product_details_pages } from '@/utils/dynamic-import/productDetailsPages/productDetailsPages';
import { RootState } from '@/redux/store';
import { DEFAULT } from '@/consts';

type ParamsType = {
    productId: string;
};

const ProductDetails = () => {
    const { productId } = useParams<ParamsType>();

    const home = useSelector((state: RootState) => state?.home);
    const { design } = home || {};

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;

    const ProductDetailsPageComponent =
        product_details_pages[design?.single_product_page] ||
        product_details_pages[DEFAULT];

    return (
        <>
            {ProductDetailsPageComponent && store_id && (
                <ProductDetailsPageComponent
                    productId={productId}
                    store_id={store_id}
                />
            )}
        </>
    );
};

export default ProductDetails;

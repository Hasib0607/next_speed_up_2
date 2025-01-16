'use client';

import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux';
import { product_details_pages } from '@/utils/dynamic-import/productDetailsPages/productDetailsPages';
import { RootState } from '@/redux/store';
import { DEFAULT } from '@/consts';

type ParamsType = {
    productId: string;
};

const ProductDetails = ({ design, product }: any) => {
    const { productId } = useParams<ParamsType>();

    const ProductDetailsPageComponent =
        product_details_pages[design?.single_product_page] ||
        product_details_pages[DEFAULT];

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const store_id = store?.id || null;
    
console.log("eerfew",design?.single_product_page);

    return (
        <>
            {ProductDetailsPageComponent && store_id && (
                <ProductDetailsPageComponent
                    productId={productId}
                    design={design}
                    store_id={store_id}
                    product={product}
                />
            )}
        </>
    );
};

export default ProductDetails;

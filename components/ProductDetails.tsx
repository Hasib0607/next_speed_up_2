import { DEFAULT } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import { product_details_pages } from '@/utils/dynamic-import/productDetailsPages/productDetailsPages';

const ProductDetails = ({ design, headersetting, product, productId }: any) => {
    const ProductDetailsPageComponent =
        product_details_pages[design?.single_product_page] ||
        product_details_pages[DEFAULT];

    const store_id = numberParser(design?.store_id) || null;

    return (
        design?.single_product_page !== 'null' &&
        ProductDetailsPageComponent &&
        store_id && (
            <ProductDetailsPageComponent
                design={design}
                headersetting={headersetting}
                productId={productId}
                store_id={store_id}
                product={product}
            />
        )
    );
};

export default ProductDetails;

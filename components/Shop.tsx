import { DEFAULT } from '@/consts';
import { numberParser } from '@/helpers/numberParser';
import { shops } from '@/utils/dynamic-import/shops/shops';

const Shop = ({ design }: any) => {
    const store_id = numberParser(design?.store_id) || null;

    const ShopComponent = shops[design?.shop_page] || shops[DEFAULT];

    return (
        design?.shop_page !== 'null' &&
        ShopComponent && <ShopComponent design={design} store_id={store_id} />
    );
};

export default Shop;

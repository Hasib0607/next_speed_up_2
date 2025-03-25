import { DEFAULT } from '@/consts';
import { brand_pages } from '@/utils/dynamic-import/brandPages/brandPages';

const Brand = ({ design, brandId }: any) => {
    const BrandComponent =
        brand_pages[design?.shop_page] || brand_pages[DEFAULT];

    return (
        design?.shop_page !== 'null' &&
        BrandComponent && <BrandComponent brandId={brandId} design={design} />
    );
};

export default Brand;

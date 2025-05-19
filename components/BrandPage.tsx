import { DEFAULT } from '@/consts';
import { brand_pages } from '@/utils/dynamic-import/brandPages/brandPages';

export default async function Brand({ design, brands }: any) {
    const BrandComponent =  brand_pages[DEFAULT]
    // brand_pages[design?.shop_page] || brand_pages[DEFAULT];

    return (
        BrandComponent && (
            <BrandComponent design={design} brands={brands} />
        )
    );
}

import { DEFAULT } from '@/consts';
import { brand_sub_pages } from '@/utils/dynamic-import/brandSubPages/brandSubPages';

export default async function SubBrand({ design, brands, brandId }: any) {
    const BrandComponent =
        brand_sub_pages[design?.shop_page] || brand_sub_pages[DEFAULT];

    return (
        BrandComponent && (
            <BrandComponent brandId={brandId} design={design} brands={brands} />
        )
    );
}

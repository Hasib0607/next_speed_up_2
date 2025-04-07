import { DEFAULT } from '@/consts';
import { brand_sub_pages } from '@/utils/dynamic-import/brandSubPages/brandSubPages';
import getDomain from '@/helpers/getDomain';
import getBrands from '@/utils/fetcher/getBrands';

export default async function SubBrand({ design, brandId }: any) {
    const name = await getDomain();
    const brands = await getBrands(name);

    const BrandComponent =
        brand_sub_pages[design?.shop_page] || brand_sub_pages[DEFAULT];

    return (
        BrandComponent && (
            <BrandComponent brandId={brandId} design={design} brands={brands} />
        )
    );
}

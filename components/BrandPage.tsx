import { DEFAULT } from '@/consts';
import getDomain from '@/helpers/getDomain';
import getBrands from '@/utils/fetcher/getBrands';
import { brand_pages } from '@/utils/dynamic-import/brandPages/brandPages';

export default async function Brand({ design }: any) {
    const name = await getDomain();
    const brands = await getBrands(name);

    const BrandComponent =
    brand_pages[design?.shop_page] || brand_pages[DEFAULT];

    return (
        BrandComponent && (
            <BrandComponent design={design} brands={brands} />
        )
    );
}

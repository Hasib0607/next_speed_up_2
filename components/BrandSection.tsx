import { DEFAULT } from '@/consts';
import getDomain from '@/helpers/getDomain';
import { brand_sections } from '@/utils/dynamic-import/_homepageSections/brands/brands';
import getBrands from '@/utils/fetcher/getBrands';

export default async function BrandSection({ design, headersetting }: any) {
    const name = await getDomain();
    const brands = await getBrands(name);

    const BrandComponent =
        brand_sections[design?.brand] || brand_sections[DEFAULT];

    return (
        design?.brand !== 'null' &&
        BrandComponent && (
            <BrandComponent
                design={design}
                headersetting={headersetting}
                brands={brands}
            />
        )
    );
}

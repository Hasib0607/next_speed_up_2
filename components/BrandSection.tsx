import { DEFAULT, ONE } from '@/consts';
import { getInitialAppData } from '@/lib/getInitialAppData';
import { brand_sections } from '@/utils/dynamic-import/_homepageSections/brandSections/brandSections';
import { Suspense } from 'react';

export default async function BrandSection({ design, headersetting }: any) {
    const { brands } = await getInitialAppData({
        brands: true,
    });

    const BrandComponent =
        // brand_sections[design?.brand] || brand_sections[DEFAULT];
        brand_sections[ONE];

    return (
        <Suspense fallback={<p>Loading brand...</p>}>
            {design?.brand !== 'null' && BrandComponent && (
                <BrandComponent
                    design={design}
                    headersetting={headersetting}
                    brands={brands}
                />
            )}
        </Suspense>
    );
}

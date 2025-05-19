import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { imgUrl, productImg } from '@/site-settings/siteUrl';
import ProductDetails from '@/components/ProductDetails';
import ViewContentGtm from './ViewContentGtm';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getProductDetails from '@/utils/fetcher/getProductDetails';

import { ProductDetailsParamProps } from '@/types';
import { htmlTagsRemover } from '@/helpers/littleSpicy';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata({
    params,
}: ProductDetailsParamProps): Promise<Metadata> {
     const { domain, headersetting, paramsResult } = await getInitialAppData(
        {
            headersetting: true,
            paramsResult: true,
        },
        params
    );

    const productId = paramsResult.productId;

    const storeId = headersetting?.store_id;

    const productData = await getProductDetails(storeId, productId);

    if (productData == undefined || productData == null) {
        redirect('/');
    }

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    const { name, description, seo_keywords, image } = productData || {};

    // Ensure image is a string and not an array
    const imageURL = Array.isArray(image) ? image[0] : image;
    const productImageUrl = `${productImg + imageURL}`;

    const fallbackImage = imgUrl + 'default-product-image.jpg';

    return {
        title: `${websiteName} | ${name}`,
        description:
            htmlTagsRemover(description) || `Buy ${name} at ${websiteName}`,
        icons: { icon: imgUrl + headersetting?.favicon },
        keywords: seo_keywords || `${name}, ${websiteName}, `,
        openGraph: {
            title: `${websiteName} | ${name}`,
            description: description || `Check out ${name} on ${websiteName}`,
            url: domain,
            images: [
                {
                    url: productImageUrl || fallbackImage,
                    width: 800,
                    height: 600,
                    alt: `${name} image`,
                },
            ],
        },
    };
}

export default async function SingleProductDetails({
    params,
}: ProductDetailsParamProps) {
    const { design, headersetting, paramsResult } = await getInitialAppData(
        {
            design: true,
            headersetting: true,
            paramsResult: true,
        },
        params
    );

    const productId = paramsResult.productId;

    const storeId = headersetting?.store_id;

    const productData = await getProductDetails(storeId, productId);

    if (productData == undefined || productData == null) {
        redirect('/');
    }

    return (
        <div>
            <ViewContentGtm
                product={productData}
                headersetting={headersetting}
            />
            <ProductDetails
                design={design}
                headersetting={headersetting}
                product={productData}
                productId={productId}
            />
        </div>
    );
}

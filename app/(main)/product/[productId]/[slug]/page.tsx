import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { imgUrl, productImg } from '@/site-settings/siteUrl';
// components
import ProductDetails from '@/components/ProductDetails';
import ViewContentGtm from './ViewContentGtm';
// helper
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import getDomain from '@/helpers/getDomain';
// data fetchers
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import getProductDetails from '@/utils/fetcher/getProductDetails';
import getDesign from '@/utils/fetcher/getDesign';
import { ProductDetailsParamProps } from '@/types';
import { htmlTagsRemover } from '@/helpers/littleSpicy';

export async function generateMetadata({
    params,
}: ProductDetailsParamProps): Promise<Metadata> {
    const productId = (await params).productId;
    const url = await getDomain();

    const headersetting = await getHeaderSetting();

    if (!headersetting) {
        throw new Error('Data not found');
    }

    const store_id = headersetting?.store_id;

    if (!store_id || !headersetting) {
        throw new Error('Store ID or Header setting not available');
    }

    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    const productData = await getProductDetails({
        store_id,
        productId,
    });

    // if (!productData) {
    //     throw new Error('Product not found');
    // }

    if (productData == undefined || productData == null) {
        redirect('/');
    }

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
            url,
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
    const productId = (await params).productId;
    const design = await getDesign();
    const headersetting = await getHeaderSetting();

    if (!headersetting) {
        throw new Error('Data not found');
    }

    const store_id = headersetting?.store_id;

    if (!store_id) {
        throw new Error('Store ID not available');
    }

    const productData = await getProductDetails({
        store_id,
        productId,
    });

    // if (!productData) {
    //     throw new Error('Product not found');
    // }

    if (productData == undefined || productData == null) {
        redirect('/');
    }

    return (
        <div>
            <ViewContentGtm product={productData} />
            <ProductDetails
                design={design}
                product={productData}
                productId={productId}
            />
        </div>
    );
}

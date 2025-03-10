import { HTML_TAG_PATTERN } from '@/consts';
import { numberParser } from './numberParser';
import { getPrice } from './getPrice';

// find variant and get details
export const getVariantDetailsById = (product: any) => {
    return (
        product?.variant?.find(
            (item: any) => item?.id == product?.variant_id
        ) ?? {}
    );
};

// varivable value converter
export const getCssVariableHex = (variable: string) => {
    const body = document.body; // Select body instead of documentElement
    return getComputedStyle(body).getPropertyValue(variable).trim();
};

// Utility function to truncate the string
export const truncateString = (str: any, maxLength: any) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
};

export const getLastArr = (arr: any[]): any => arr.at(arr.length - 1);
export const getFastArr = (arr: any[]): any => arr.at(0);

export const getCheckedValue = (value: any, regEx: any) => {
    return regEx.test(value.toString());
};

// deprecated! this function is not valid any more
// export const productCurrentPrice = (product: any, variantId?: any) => {
//     const { variant } = product || [];
// const offerPrice = numberParser(product?.product_offer?.offer_price);
//     const productVariant = variant?.find((item: any) => item?.id === variantId);
//     const additionalPrice = productVariant?.additional_price;

//     if (variant?.length > 0 && variantId) {
//         return numberParser(
//             product?.product_offer?.status
//                 ? offerPrice + additionalPrice
//                 : product?.calculate_regular_price + additionalPrice
//         );
//     } else {
//         return numberParser(
//             product?.product_offer?.status
//                 ? offerPrice
//                 : product?.calculate_regular_price
//         );
//     }
// };

export const productCurrentPrice = (product: any, variantId?: any) => {
    const { variant } = product || [];

    const productVariant = variant?.find((item: any) => item?.id === variantId);
    const additionalPrice = numberParser(productVariant?.additional_price);
    const regularPrice = numberParser(product?.regular_price);
    const calculateRegularPrice = numberParser(
        product?.calculate_regular_price
    );

    const calculatedDiscount = getPrice(
        product?.regular_price,
        product?.discount_price,
        product?.discount_type,
        true
    );

    if (variant?.length > 0 && variantId) {
        const calculatedVariantPrice =
            regularPrice + additionalPrice - (calculatedDiscount ?? 0);

        return numberParser(calculatedVariantPrice, true);
    } else {
        return numberParser(calculateRegularPrice, true);
    }
};

export const isRegularPriceLineThrough = (product: any) => {
    const regularPrice = numberParser(product?.regular_price);
    const calculateRegularPrice = numberParser(
        product?.calculate_regular_price
    );

    return regularPrice != calculateRegularPrice;
};

export const isAvailable = (product: any) => {
    const productQty = numberParser(product?.quantity);
    return productQty > 0;
};

export const howMuchSave = (product: any, variantId?: any) => {
    const { variant } = product || [];

    const productVariant = variant?.find((item: any) => item?.id === variantId);
    const additionalPrice = numberParser(productVariant?.additional_price);
    const regularPrice = numberParser(product?.regular_price);
    const variantRegularPrice = regularPrice + additionalPrice;
    const calculateRegularPrice = numberParser(
        product?.calculate_regular_price
    );

    const calculateDiscount = getPrice(
        variantRegularPrice,
        product?.discount_price,
        product?.discount_type,
        true
    );

    if (variant?.length > 0 && variantId) {
        return numberParser(calculateDiscount, true) ?? 0;
    } else {
        return numberParser(regularPrice - calculateRegularPrice, true);
    }
};

export const getCampainOfferDiscount = (product: any | undefined) => {
    const { price, qty } = product || {};

    const calculatedDiscountPrice = getPrice(
        price,
        product?.product_offer?.discount_amount,
        product?.product_offer?.discount_type,
        true
    );

    if (product?.product_offer?.status) {
        const productCalculatedDiscount = (calculatedDiscountPrice ?? 0) * qty;
        return productCalculatedDiscount;
    } else {
        return 0;
    }
};

export const getPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[1];
export const getSecondPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[2];

export const classNames = (
    ...classes: (string | boolean | null | undefined)[]
): string => classes.filter(Boolean).join(' ');

export const htmlTagsRemover = (htmlString: any) => {
    return htmlString.replace(HTML_TAG_PATTERN, '') || '';
};

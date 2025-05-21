import { EXTRACT_SHIPPING_INFORMATION, HTML_TAG_PATTERN } from '@/consts';
import { numberParser } from './numberParser';
import { getPrice } from './getPrice';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';
import { getFromLocalStorage } from './localStorage';

export const hexToRgba = (hexColor: string = ''): string => {
    if (hexColor === null) return `${255}, ${0}, ${0}`;
    const hexColorArr: any = hexColor.match(/\w\w/g);

    const [r, g, b] =
        hexColorArr?.length > 0 &&
        hexColorArr.map((c: string) => parseInt(c, 16));
    return `${r}, ${g}, ${b}`;
};

// check subunits are greater than 0
export const hasSubunits = (price: number): boolean => {
    return price % 1 === 0;
};

export const getShippingAreaIdByCost = (
    cost: number,
    headersetting: any
): number | null => {
        const shippingMethods = JSON.parse(headersetting?.shipping_methods)


    const shippingAreaId = shippingMethods.find(
        (item: any) => item.cost === cost
    );

    // for (let i = 1; i <= 3; i++) {
    //     if (cost === headersetting?.[`shipping_area_${i}_cost`]) {
    //         return i.toString();
    //     }
    // }

    return shippingAreaId?.id ?? null;
};

export const getShippingCostByAreaId = (
    id: number,
    headersetting: any
): number => {
        const shippingMethods = JSON.parse(headersetting?.shipping_methods)

    const shippingArea =
        Array.isArray(shippingMethods) &&
        shippingMethods?.find((item: any) => item.id === id);

    // if (id) return headersetting?.[`shipping_area_${id}_cost`];
    return shippingArea?.cost;
};

// check phone number
export const checkValidPhoneNumberByCode = (
    phone: string,
    countryCode: CountryCode = 'BD'
) => {
    if (!phone || !countryCode) return;

    // Remove leading 0s — they're not needed for parsing with country code
    // const cleaned = normalize ? phone.replace(/^0+/, '') : phone;
    const cleaned = phone.replace(/^0+/, '');

    const parsedPhoneNumber = parsePhoneNumberFromString(cleaned, countryCode);
    const isValidNumber = parsedPhoneNumber?.isValid() || false;
    const normalizedNumber = parsedPhoneNumber?.format('E.164') || null;

    return { number: normalizedNumber, valid: isValidNumber }; //  as needed
};

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
    if (typeof window !== 'undefined') {
        const body = document.body; // Select body instead of documentElement
        return (
            getComputedStyle(body).getPropertyValue(variable).trim() ??
            '#ff0000'
        );
    }
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

        const isSubunits = hasSubunits(calculatedVariantPrice);

        return numberParser(calculatedVariantPrice, isSubunits);
        // if (isSubunits) {
        //     return numberParser(calculatedVariantPrice, true);
        // } else {
        //     return numberParser(calculatedVariantPrice);
        // }
    } else {
        const isSubunits = hasSubunits(calculateRegularPrice);
        return numberParser(calculateRegularPrice, isSubunits);
    }
};

export const productMinMaxPrice = (item: any) => {
    const price = productCurrentPrice(item);
    const vPrice = item?.variant?.map((item: any) => item?.additional_price);
    const minPrice = price + Math.min(...vPrice);
    const maxPrice = price + Math.max(...vPrice);
    const smallest = numberParser(minPrice, hasSubunits(minPrice));
    const largest = numberParser(maxPrice, hasSubunits(maxPrice));
    return { smallest, largest };
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

    const calculateDiscount =
        getPrice(
            variantRegularPrice,
            product?.discount_price,
            product?.discount_type,
            true
        ) || 0;

    if (variant?.length > 0 && variantId) {
        return numberParser(calculateDiscount, hasSubunits(calculateDiscount));
    } else {
        return numberParser(
            regularPrice - calculateRegularPrice,
            hasSubunits(regularPrice - calculateRegularPrice)
        );
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

export const cleanTwClassWithPrefix = (
    classString: string,
    prefixes: string[]
): string => {
    return classString
        .split(' ')
        .filter((cls) => !prefixes.some((prefix) => cls.startsWith(prefix)))
        .join(' ');
};

export const htmlTagsRemover = (htmlString: any) => {
    return htmlString.replace(HTML_TAG_PATTERN, '') || '';
};

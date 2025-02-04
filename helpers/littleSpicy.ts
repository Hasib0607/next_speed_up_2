import { numberParser } from './numberParser';

export const getLastArr = (arr: any[]): any => arr.at(arr.length - 1);
export const getFastArr = (arr: any[]): any => arr.at(0);

export const productCurrentPrice = (product: any) =>
    numberParser(
        product?.product_offer?.status
            ? product?.product_offer?.offer_price
            : product?.calculate_regular_price
    );

export const isRegularPriceLineThrough = (product: any) => {
    const offerPrice = numberParser(product?.product_offer?.offer_price);
    const regularPrice = numberParser(product?.regular_price);
    const calculateRegularPrice = numberParser(
        product?.calculate_regular_price
    );

    if (product?.product_offer?.status) {
        return offerPrice != calculateRegularPrice;
    } else {
        return regularPrice != calculateRegularPrice;
    }
};

export const isAvailable = (product: any) => {
    const productQty = numberParser(product?.quantity);
    return productQty > 0;
};

export const howMuchSave = (product: any) => {
    const offerPrice = numberParser(product?.product_offer?.offer_price);
    const regularPrice = numberParser(product?.regular_price);
    const calculateRegularPrice = numberParser(
        product?.calculate_regular_price
    );

    if (product?.product_offer?.status) {
        return numberParser(offerPrice - calculateRegularPrice);
    } else {
        return numberParser(regularPrice - calculateRegularPrice);
    }
};

export const getPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[1];
export const getSecondPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[2];

export const classNames = (
    ...classes: (string | boolean | null | undefined)[]
): string => classes.filter(Boolean).join(' ');

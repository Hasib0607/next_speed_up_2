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

export const getPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[1];
export const getSecondPathName = (pathname: any): string =>
    pathname?.toLowerCase().split('/')[2];

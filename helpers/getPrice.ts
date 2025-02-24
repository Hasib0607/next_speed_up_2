import { numberParser } from './numberParser';

export const getPrice = (
    regular_price: any,
    discount_price: any,
    discount_type: string,
    getTypeWiseDiscount?: boolean
) => {
    const regularPrice = numberParser(regular_price);
    const discountPrice = numberParser(discount_price);

    if (discount_type === 'percent') {
        const price = numberParser(
            regularPrice - (discountPrice / 100) * regularPrice
        );
        if (getTypeWiseDiscount) {
            return numberParser((discountPrice / 100) * regularPrice);
        } else {
            return price;
        }
    }
    if (discount_type === 'fixed') {
        const price = numberParser(regularPrice - discountPrice, true);
        if (getTypeWiseDiscount) {
            return numberParser(discountPrice, true);
        } else {
            return price;
        }
    }
    if (discount_type === 'no_discount') {
        const price = numberParser(regularPrice, true);
        if (getTypeWiseDiscount) {
            return numberParser(regularPrice, true);
        } else {
            return price;
        }
    }
};

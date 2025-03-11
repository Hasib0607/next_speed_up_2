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
        const price = regularPrice - (discountPrice / 100) * regularPrice;
        if (getTypeWiseDiscount) {
            return (discountPrice / 100) * regularPrice;
        } else {
            return price;
        }
    }
    if (discount_type === 'fixed') {
        const price = regularPrice - discountPrice;
        if (getTypeWiseDiscount) {
            return discountPrice;
        } else {
            return price;
        }
    }
    if (discount_type === 'no_discount') {
        if (getTypeWiseDiscount) {
            return 0;
        } else {
            return regularPrice;
        }
    }
};

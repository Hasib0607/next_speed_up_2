import { numberParser } from './numberParser';

export const getTypeWiseDiscountPrice = (
    regular_price: any,
    discount_price: any,
    discount_type: string
) => {
    const regularPrice = numberParser(regular_price);
    const discountPrice = numberParser(discount_price);
    const discountType = discount_type;

    if (discountType === 'percent') {
        const price = numberParser((discountPrice / 100) * regularPrice);
        return price;
    }
    if (discountType === 'fixed') {
        const price = numberParser(discountPrice, true);
        return price;
    }
    if (discountType === 'no_discount') {
        const price = numberParser(regularPrice, true);
        return price;
    }
};

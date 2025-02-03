import { numberParser } from './numberParser';

export const getDiscount = (
    total: any,
    discount_amount: any,
    discount_type: any
) => {
    if (discount_type === 'percent') {
        const price = numberParser(
            total - (parseInt(discount_amount) / 100) * total
        );
        return price;
    }
    if (discount_type === 'fixed') {
        const price = numberParser(total - parseInt(discount_amount));
        return price;
    }
};

import { numberParser } from './numberParser';

export const getDiscountAmount = (
    total: any,
    discount_type: any,
    discount_amount?: any,
    delivery_charge?: number | undefined
) => {
    if (discount_type === 'percent') {
        const price = numberParser(
            total - (numberParser(discount_amount) / 100) * total
        );
        return price;
    }
    if (discount_type === 'fixed') {
        const price = numberParser(total - numberParser(discount_amount));
        return price;
    }
    if (discount_type === 'delivery_charge') {
        const price = numberParser(total - (delivery_charge ?? 0));
        return price;
    }
};

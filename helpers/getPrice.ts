/* eslint-disable no-cond-assign */

export const getPrice = (
    regular_price: any,
    discount_price: any,
    discount_type: any
) => {
    if (discount_type === 'percent') {
        const price = Math.ceil(
            regular_price -
                (parseFloat(discount_price) / 100) * parseFloat(regular_price)
        );
        return price;
    }
    if (discount_type === 'fixed') {
        const price = Math.ceil(
            parseFloat(regular_price) - parseFloat(discount_price)
        );
        return price;
    }
    if (discount_type === 'no_discount') {
        const price = Math.ceil(parseFloat(regular_price));
        return price;
    }
};

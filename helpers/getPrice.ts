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
<<<<<<< HEAD
        const price = numberParser(
            regularPrice - (discountPrice / 100) * regularPrice
        );
        if (getTypeWiseDiscount) {
            return numberParser((discountPrice / 100) * regularPrice);
=======
        const price = regularPrice - (discountPrice / 100) * regularPrice;
        if (getTypeWiseDiscount) {
            return (discountPrice / 100) * regularPrice;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
        } else {
            return price;
        }
    }
    if (discount_type === 'fixed') {
<<<<<<< HEAD
        const price = numberParser(regularPrice - discountPrice, true);
        if (getTypeWiseDiscount) {
            return numberParser(discountPrice, true);
=======
        const price = regularPrice - discountPrice;
        if (getTypeWiseDiscount) {
            return discountPrice;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
        } else {
            return price;
        }
    }
    if (discount_type === 'no_discount') {
<<<<<<< HEAD
        const price = numberParser(regularPrice, true);
        if (getTypeWiseDiscount) {
            return numberParser(regularPrice, true);
        } else {
            return price;
=======
        if (getTypeWiseDiscount) {
            return 0;
        } else {
            return regularPrice;
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
        }
    }
};

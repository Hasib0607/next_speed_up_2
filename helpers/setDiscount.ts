import { getDiscountAmount } from './getDiscount';
import { numberParser } from './numberParser';

export const setDiscount = (res: any, total: any, shippingArea?: number) => {
    if (total > 0) {
        const disResult = getDiscountAmount(
            total,
            res?.discount_type,
            res?.discount_amount,
            shippingArea
        );

        const dis = numberParser(total - (disResult ?? 0));
        return dis;
    } else {
        return 0;
    }
};

export const setCouponShow = (res: any, total: any, shippingArea?: number) => {
    const status = res?.code_status;

    if (status) {
        const disResult =
            getDiscountAmount(
                total,
                res?.discount_type,
                res?.discount_amount,
                shippingArea
            ) || 0;

        return disResult >= 0;
    } else {
        return status;
    }
};

        // setCoupon(res?.code);
        // const sTotal = subTotal(cartList);
        // const minPurchase = numberParser(res?.min_purchase);
        // const maxPurchase = numberParser(res?.max_purchase);
        // const total = numberParser(sTotal);

        // if (maxPurchase >= total && minPurchase <= total) {
        //     const result: any = getDiscountAmount(
        //         total,
        //         res?.discount_amount,
        //         res?.discount_type
        //     );
        //     const dis = numberParser(total - result);
        //     return dis;
        // } else if (!numberParser(res?.max_purchase) && minPurchase <= total) {
        //     const result: any = getDiscountAmount(
        //         total,
        //         res?.discount_amount,
        //         res?.discount_type
        //     );
        //     const dis = numberParser(total - result);
        //     return dis;
        // } else {
        //     toast.warning(
        //         `Please purchase minimum ${res?.min_purchase}tk ${
        //             res?.max_purchase && `to maximum ${res?.max_purchase}tk`
        //         }`,
        //         { toastId: res.id }
        //     );
        //     return 0;
        // }
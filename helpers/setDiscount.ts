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

export const setCouponShow = (res: any, total: any, shippingArea: number) => {
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

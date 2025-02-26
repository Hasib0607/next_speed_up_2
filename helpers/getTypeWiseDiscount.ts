export const isDeliveryChargeDiscount = (
    product: any,
    selectedShippingArea: any
) => {
    const shippingArea = product?.product_offer?.shipping_area;
    const discountType = product?.product_offer?.discount_type;
    const shippingAreaArr = shippingArea && shippingArea.split(',');

    if (discountType === "delivery_charge") {
        if (shippingAreaArr?.length > 0) {
            const foundSelectedShipping =
                shippingAreaArr.includes(selectedShippingArea);
            return foundSelectedShipping;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

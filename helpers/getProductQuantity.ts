import { numberParser } from "./numberParser";

export const getProductQuantity = ({
    product,
    size = null,
    color = null,
    unit = null,
}: {
    product: { quantity: number };
    size?: { quantity?: number } | null;
    color?: { quantity?: number } | null;
    unit?: { quantity?: number } | null;
}): number => {
    // Return the quantity based on priority: size -> color -> unit -> product
    return numberParser(
        size?.quantity || color?.quantity || unit?.quantity || product?.quantity
    );
};

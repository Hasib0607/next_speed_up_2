import { AppDispatch } from '@/redux/store';
import { Operations, OpsType } from '@/types/cart';
import { getFromLocalStorage } from './localStorage';
import { DB_CART_STATUS } from '@/consts';
import { trackCartEvents } from '@/app/actions/trackCartEvents';

export const addCartItemInDb = async (dispatch: AppDispatch, item: any) => {
    const dbCartData = await getFromLocalStorage(DB_CART_STATUS);
    if (dbCartData?.dbCart) {
        await trackCartEvents({
            dispatch,
            ops: { operations: OpsType.ADD },
            item: { ...item, store_id: dbCartData?.store_id },
        });
    }
};

export const updateCartItemInDb = async (
    dispatch: AppDispatch,
    item: any,
    ops: Operations
) => {
    const dbCartData = await getFromLocalStorage(DB_CART_STATUS);
    if (dbCartData?.dbCart) {
        const { qty, price, id, dbCartId, cartId } = item;

        let mutatedQty;

        switch (ops.operations) {
            case OpsType.INC:
                mutatedQty = qty + 1;
                break;
            case OpsType.DEC:
                mutatedQty = qty - 1;
                break;
            default:
                mutatedQty = qty;
                break;
        }

        await trackCartEvents({
            dispatch,
            ops,
            item: {
                qty: mutatedQty,
                price,
                cartId,
                store_id: dbCartData?.store_id,
                product_id: id,
                cart_id: dbCartId,
            },
        });
    }
};

export const removeCartItemInDb = async (dispatch: AppDispatch, item: any) => {
    const dbCartData = await getFromLocalStorage(DB_CART_STATUS);
    if (dbCartData?.dbCart) {
        await trackCartEvents({
            dispatch,
            ops: { operations: OpsType.REMOVE },
            item: {
                store_id: dbCartData?.store_id,
                ...item,
            },
        });
    }
};

export const clearCartItemInDb = async (dispatch: AppDispatch) => {
    const dbCartData = await getFromLocalStorage(DB_CART_STATUS);
    if (dbCartData?.dbCart) {
        await trackCartEvents({
            dispatch,
            ops: { operations: OpsType.CLEAR },
            item: {
                store_id: dbCartData?.store_id,
            },
        });
    }
};

// confidentials
export const sendContactToDb = async (dispatch: AppDispatch, item: any) => {
    const dbCartData = await getFromLocalStorage(DB_CART_STATUS);
    if (dbCartData?.dbCart) {
        await trackCartEvents({
            dispatch,
            ops: { operations: OpsType.SEND },
            item: item,
        });
    }
};

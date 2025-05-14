import { cartApi } from '@/redux/features/cart/cartApi';
import { AppDispatch } from '@/redux/store';
import { Operations, OpsType } from '@/types/cart';

type TrackCartEventProps = {
    dispatch: AppDispatch;
    ops: Operations;
    item: any;
};

export async function trackCartEvents({
    dispatch,
    ops,
    item,
}: TrackCartEventProps) {
    switch (ops.operations) {
        case OpsType.ADD:
            return await AddToCartInDb(dispatch, ops, item);

        case OpsType.DEC:
            return await UpdateCartItemInDb(dispatch, ops, item);

        case OpsType.INC:
            return await UpdateCartItemInDb(dispatch, ops, item);

        case OpsType.REMOVE:
            return await RemoveCartItemInDb(dispatch, ops, item);

        case OpsType.CLEAR:
            return await ClearCartItemInDb(dispatch, ops, item);

        case OpsType.SEND:
            return await SendContactToDb(dispatch, ops, item);

        default:
            console.warn(`Unhandled cart event: ${ops.operations}`);
            return;
    }
}

// API Call func

async function AddToCartInDb(
    dispatch: AppDispatch,
    ops: Operations,
    item: any
) {
    try {
        dispatch(cartApi.endpoints.sendCartInfo.initiate({ ops, item }));
    } catch (error) {
        console.warn(`Error at store/cart/add`, error);
    }
}

async function UpdateCartItemInDb(
    dispatch: AppDispatch,
    ops: Operations,
    item: any
) {
    try {
        dispatch(cartApi.endpoints.sendCartInfo.initiate({ ops, item }));
    } catch (error) {
        console.warn(`Error at store/cart/add`, error);
    }
}

async function RemoveCartItemInDb(
    dispatch: AppDispatch,
    ops: Operations,
    item: any
) {
    try {
        dispatch(cartApi.endpoints.removeFromDbCart.initiate({ ops, item }));
    } catch (error) {
        console.warn(`Error at store/cart/remove`, error);
    }
}

async function ClearCartItemInDb(
    dispatch: AppDispatch,
    ops: Operations,
    item: any
) {
    try {
        dispatch(cartApi.endpoints.clearFromDbCart.initiate({ ops, item }));
    } catch (error) {
        console.warn(`Error at store/cart/clear`, error);
    }
}

async function SendContactToDb(
    dispatch: AppDispatch,
    ops: Operations,
    item: any
) {
    try {
        dispatch(cartApi.endpoints.addContactToDbCart.initiate({ ops, item }));
    } catch (error) {
        console.warn(`Error at store/cart/clear`, error);
    }
}

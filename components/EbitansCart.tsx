'use client';

import { DB_CART_STATUS } from '@/consts';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { setHasSynced } from '@/redux/features/auth/authSlice';
import { useFingerprint } from '@/hooks/useFingerprint';
import { useGetDbCartQuery } from '@/redux/features/cart/cartApi';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

const EbitansCart = () => {
    // update sessionId ** it must me on **
    const fingerprint = useFingerprint();

    const dbCartData = getFromLocalStorage(DB_CART_STATUS);
    const dispatch = useAppDispatch();

    const hasSynced = useAppSelector(
        (state: RootState) => state.auth.hasSynced
    ); // ✅ To prevent multiple refetches

    const {
        isFetching: dbCartListFetching,
        refetch: dbCartListRefetch,
        isSuccess: dbCartListSuccess,
    } = useGetDbCartQuery(
        { store_id: dbCartData?.store_id },
        { skip: !dbCartData?.dbCart }
    );

    // const hasRefetched = useRef(false);

    useEffect(() => {
        if (dbCartData?.store_id && dbCartListSuccess) {
            if (!hasSynced) {
                dbCartListRefetch();
                dispatch(setHasSynced(true));
            }
            // hasRefetched.current = true;
        }
    }, [dbCartData, dbCartListSuccess, dbCartListRefetch, dispatch, hasSynced]);

    // reset when store_id changes
    // useEffect(() => {
    //     hasRefetched.current = false;
    // }, [dbCartData?.store_id]);

    // console.log('fingerprint', fingerprint?.visitorId);

    return null;
};

export default EbitansCart;

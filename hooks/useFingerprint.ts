'use client';

import { useEffect, useState } from 'react';
import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs';
import { setUserSessionToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import {
    getFromLocalStorage,
    saveToLocalStorage,
} from '@/helpers/localStorage';
import { FINGERPRINT_DATA_PERSIST } from '@/consts';
import { AppDispatch } from '@/redux/store';

export function useFingerprint() {
    const [fingerprint, setFingerprint] = useState<GetResult | null>(null);
    const dispatch:AppDispatch = useAppDispatch()

    useEffect(() => {
        const cachedSession = getFromLocalStorage(FINGERPRINT_DATA_PERSIST);

        const loadFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerprint(result);
            dispatch(setUserSessionToken(result?.visitorId))
            saveToLocalStorage(FINGERPRINT_DATA_PERSIST, result);
        };

        if (!cachedSession) {
            loadFingerprint();
        } else {
            try {
                if (typeof cachedSession.visitorId === 'string') {
                    setFingerprint(cachedSession);
                    dispatch(setUserSessionToken(cachedSession.visitorId));
                    return;
                }
            } catch (e) {
                // return;
            }
        }
    }, [dispatch]);

    return fingerprint;
}

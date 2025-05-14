import { sendContactToDb } from '@/helpers/cartDbOps';
import { checkValidPhoneNumberByCode } from '@/helpers/littleSpicy';
import { useAppDispatch } from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch } from '@/redux/store';
import { useEffect, useMemo, useRef } from 'react';

const useSendConfidentials = (data: any) => {
    const dispatch: AppDispatch = useAppDispatch();

    const confidentials = useMemo(() => {
        let phoneWithCode = data.phone_code + data.phone || null;
        let selectedCountryCode = data.country_code || 'BD';

        const normalizedPhone = checkValidPhoneNumberByCode(
            phoneWithCode,
            selectedCountryCode
        );
        return {
            ...normalizedPhone,
            store_id: data.store_id,
        };
    }, [data]);

    const hasSent = useRef(false);

    useEffect(() => {
        if (confidentials.valid && !hasSent.current) {
            let payload = {
                store_id: confidentials.store_id,
                phone: confidentials.number,
            };
            sendContactToDb(dispatch, payload);
            hasSent.current = true;
        }

        if (!confidentials?.valid) {
            hasSent.current = false;
        }
    }, [confidentials, dispatch]);

    return null;
};

export default useSendConfidentials;

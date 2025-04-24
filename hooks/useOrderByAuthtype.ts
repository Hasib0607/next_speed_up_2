import { getActiveAuthTypes } from '@/helpers/getActiveAuthTypes';
import { showfieldStatus } from '@/lib/schema';
import { OrderRequireTypes } from '@/types';
import { useEffect, useState } from 'react';

const useOrderByAuthtype = (appStore: any, formFieldsArr: any) => {
    const [isEmailRequired, setIsEmailRequired] = useState(false);
    const [isPhoneRequired, setIsPhoneRequired] = useState(false);

    const authTypes = getActiveAuthTypes(appStore);

    useEffect(() => {
        if (authTypes.EasyOrder || authTypes.phone) {
            const isPhoneField = showfieldStatus('phone', formFieldsArr);
            setIsPhoneRequired(isPhoneField);
        }

        if (authTypes.EmailEasyOrder || authTypes.email) {
            const isEmailField = showfieldStatus('email', formFieldsArr);
            setIsEmailRequired(isEmailField);
        }
    }, [authTypes, formFieldsArr]);

    return { isEmailRequired, isPhoneRequired } as OrderRequireTypes;
};

export default useOrderByAuthtype;

import { getActiveAuthTypes } from './getActiveAuthTypes';

export const checkEasyNotUser = (
    appStore: any,
    easyOrderValue: any,
    defaultValue: any,
    isAuthenticated: boolean
) => {
    const authTypes = getActiveAuthTypes(appStore);

    if ((authTypes.EasyOrder || authTypes.EmailEasyOrder) && !isAuthenticated) {
        return easyOrderValue;
    }

    return defaultValue;
};

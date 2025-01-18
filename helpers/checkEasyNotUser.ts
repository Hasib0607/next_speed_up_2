export const checkEasyNotUser = (
    store: any,
    easyOrderValue: any,
    defaultValue: any,
    isAuthenticated: boolean
) =>
    store?.auth_type === 'EasyOrder' && !isAuthenticated
        ? easyOrderValue
        : defaultValue;

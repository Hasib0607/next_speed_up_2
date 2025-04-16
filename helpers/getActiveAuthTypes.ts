import { AuthType } from "@/types";

export const getActiveAuthTypes = (appStore: any) => {
    const types: AuthType[] = ['phone', 'EasyOrder', 'email', 'EmailEasyOrder'];

    const typeObj = types.reduce((acc, type) => {
        acc[type] = appStore?.auth_type === type;
        return acc;
    }, {} as Record<AuthType, boolean>);

    return typeObj
};

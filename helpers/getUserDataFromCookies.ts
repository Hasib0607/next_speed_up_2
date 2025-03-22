import { cookies } from 'next/headers';

export const getUserDataFromCookies = async () => {
    const previousUrl =
        (await cookies()).get('referrer')?.value || 'No referrer found';
    const userIp = (await cookies()).get('ip')?.value || 'No IP found';

    const userData = {
        referrer: previousUrl,
        ip: userIp,
    };
    
    return userData;
};

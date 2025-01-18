import { name } from '@/consts';
import { apiSlice } from '../api/apiSlice';

export const offerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEbiAnalytics: builder.mutation<any, any>({
            query: ({
                store_id,
                user,
                device,
                ip,
                city,
                countryCode,
                countryName,
                latitude,
                longitude,
                postal,
                state,
                address,
                browser,
                mobileOs,
                os,
            }) => ({
                url: `ebi-analytics/store?store_id=${store_id}&user_id=${
                    user ? user?.id : null
                }&device=${device}&ip=${ip}&mac=${'c5-65-89-45'}&url=${name}&city=${city}&countryCode=${countryCode}&countryName=${countryName}&latitude=${latitude}&longitude=${longitude}&postal=${postal}&state=${state}&location=${address}&page_title=${'Offer Page'}&category_id=${''}&product_id=${''}&browser=${browser}&os=${
                    mobileOs === 'Unknown' ? os : mobileOs
                }`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetEbiAnalyticsMutation } = offerApi;

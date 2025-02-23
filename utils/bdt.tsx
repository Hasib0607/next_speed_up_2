'use client';

import { numberParser } from '@/helpers/numberParser';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';

const BDT = ({ price }: any) => {
    const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    const { currency } = headerSettingData?.data || {};

    return (
        <>
            {currency?.symbol && numberParser(currency?.status) === 1
                ? currency?.symbol
                : currency?.code}
            {price}
        </>
    );
};

export default BDT;

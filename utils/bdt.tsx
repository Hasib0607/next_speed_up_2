'use client';

import { EXTRACT_HEADER_INFORMATION } from '@/consts';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
// import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';

const BDT = ({ price }: any) => {
    // const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    // const { currency } = headerSettingData?.data || {};

    const headerSettingData = getFromLocalStorage(EXTRACT_HEADER_INFORMATION);

    return (
        <>
            {headerSettingData?.currency?.symbol &&
            numberParser(headerSettingData?.currency?.status) === 1
                ? headerSettingData?.currency?.symbol
                : headerSettingData?.currency?.code}{' '}
            {price}
        </>
    );
};

export default BDT;

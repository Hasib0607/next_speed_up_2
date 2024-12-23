'use client';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const Taka = ({ tk }: any) => {
    const home = useSelector((state: RootState) => state.home); // Access updated Redux state
    const { currency } = home?.headersetting || {};

    // ৳ default
    return (
        <>
            {currency?.symbol} {tk}
        </>
    );
};

export default Taka;

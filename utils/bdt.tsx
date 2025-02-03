'use client';

import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const BDT = ({ price }: any) => {
    const home = useSelector((state: RootState) => state.home); // Access updated Redux state
    const { currency } = home?.headersetting || {};
    
    return (
        <>
            {currency?.symbol && parseInt(currency?.status) === 1 ? currency?.symbol : currency?.code} {price}
        </>
    );
};

export default BDT;

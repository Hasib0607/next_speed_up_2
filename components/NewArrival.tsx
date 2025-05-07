'use client';

import { DEFAULT } from '@/consts';
import { RootState } from '@/redux/store';
import { new_arrival } from '@/utils/dynamic-import/_homepageSections/NewArrival/NewArrival';
import { useSelector } from 'react-redux';

const NewArrival = ({ design, headersetting }: any) => {
    const NewArrivalComponent =
        new_arrival[design?.new_arrival] ;

    const products = useSelector((state: RootState) => state?.products);
    const product = products?.product || [];

    return (
        design?.new_arrival !== 'null' &&
        NewArrivalComponent &&
        product && (
            <NewArrivalComponent
                product={product}
                design={design}
                headersetting={headersetting}
            />
        )
    );
};

export default NewArrival;

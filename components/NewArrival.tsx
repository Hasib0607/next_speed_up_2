'use client';

import { new_arrival } from '@/utils/dynamic-import/_homepageSections/NewArrival/NewArrival';

const NewArrival = ({ design, headersetting, products }: any) => {
    const NewArrivalComponent = new_arrival[design?.new_arrival];

    return (
        design?.new_arrival !== 'null' &&
        NewArrivalComponent &&
        products.length > 0 && (
            <NewArrivalComponent
                product={products}
                design={design}
                headersetting={headersetting}
            />
        )
    );
};

export default NewArrival;

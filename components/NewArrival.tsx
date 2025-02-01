'use client'
import { DEFAULT } from '@/consts';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { new_arrival } from '@/utils/dynamic-import/_homepageSections/NewArrival/NewArrival';


const NewArrival = ({ design }: any) => {
    const NewArrivalComponent =
        new_arrival[design?.new_arrival] || new_arrival[DEFAULT];

    const {
        data: productData,
        isLoading: productLoading,
        isSuccess: productSuccess,
    } = useGetProductQuery({});

    const product = productData?.data || [];

    return (
        <>
            {design?.new_arrival !== "null" && NewArrivalComponent && productSuccess && (
                <NewArrivalComponent product={product} design={design} />
            )}
        </>
    );
};

export default NewArrival;

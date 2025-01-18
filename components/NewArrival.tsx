import { DEFAULT } from '@/consts';
import { useGetProductQuery } from '@/redux/features/products/productApi';
import { RootState } from '@/redux/store';
import { new_arrival } from '@/utils/dynamic-import/_homepageSections/NewArrival/NewArrival';
import { useSelector } from 'react-redux';

const NewArrival = ({ design, store_id }: any) => {
    const NewArrivalComponent =
        new_arrival[design?.new_arrival] || new_arrival[DEFAULT];

    const home = useSelector((state: RootState) => state?.home);
    const banner = home?.banner || {};
    const brand = home?.brand || {};
    const category = home?.category || {};

    const {
        data: productData,
        isLoading: productLoading,
        isSuccess: productSuccess,
    } = useGetProductQuery({});

    const product = productData?.data || [];

    return (
        <>
            {NewArrivalComponent && productSuccess && (
                <NewArrivalComponent
                    design={design}
                    banner={banner}
                    brand={brand}
                    product={product}
                    store_id={store_id}
                    category={category}
                />
            )}
        </>
    );
};

export default NewArrival;

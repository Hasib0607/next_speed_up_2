'use client';
import { RootState } from '@/redux/store';
import Card64 from '../card/card64';
import { useSelector } from 'react-redux';

const NewArrivalProductThirtySeven = ({ product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headerdata || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    if (product.length === 0) {
        return null;
    }
    return (
        <div className="shadow-lg py-5 sm:py-10 rounded-sm bg-[#F1F9DD]">
            <div className="sm:container px-5">
                <div>
                    <h1
                        style={{ color: title_color }}
                        className="text-2xl text-center"
                    >
                        {title || 'NEW ARRIVAL PRODUCTS'}
                    </h1>
                </div>
                <div className="flex justify-center mt-10">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
                        {product
                            ?.slice(0, 12)
                            .map((item: any, id: any) => (
                                <Card64
                                    design={design}
                                    store_id={store_id}
                                    item={item}
                                    key={id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivalProductThirtySeven;

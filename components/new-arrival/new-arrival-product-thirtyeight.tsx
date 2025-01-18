'use client';
import { RootState } from '@/redux/store';
import Card65 from '../card/card65';
import { useSelector } from 'react-redux';

const NewArrivalProductThirtyEight = ({ product, design }: any) => {
    const store = useSelector((state: RootState) => state.appStore.store);
    const store_id = store?.id || null;

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headerdata || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="py-5 sm:py-10 bg-[#F2F4F8]">
            <div className="container px-5">
                <div className="text-center pb-10">
                    <p
                        style={{ color: title_color }}
                        className="font-bold text-[20px]"
                    >
                        {title}
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center">
                        {product
                            ?.slice(0, 12)
                            .map((item: any, id: any) => (
                                <Card65
                                    item={item}
                                    design={design}
                                    store_id={store_id}
                                    key={id}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivalProductThirtyEight;

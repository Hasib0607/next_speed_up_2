'use client';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Card17 from '../../card/card17';
import SectionHeadingSeven from '../../section-heading/section-heading-seven';

const NewArrivalProductTwelve = ({ product, design }: any) => {
    let arrayItem = product.slice(0, 10);

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
        <div className="sm:container px-5 sm:py-10 py-5">
            <SectionHeadingSeven
                title={title}
                subtitle={''}
                titleColor={title_color || '#000'}
            />
            <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 lg2:grid-cols-4 md:grid-cols-3 gap-5 ">
                {arrayItem?.map((productData: any) => (
                    <Card17
                        item={productData}
                        design={design}
                        store_id={store_id}
                        key={productData.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewArrivalProductTwelve;

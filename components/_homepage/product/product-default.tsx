'use client';
import Card14 from '@/components/card/card14';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const DefaultProduct = ({ product }: any) => {
    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );

    const { custom_design } = headerdata || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <>
            <div className="container my-9">
                <h4
                    style={{ color: title_color }}
                    className="font-semibold text-3xl text-left mx-4 md:m-0"
                >
                    {title || 'Products'}
                </h4>
            </div>
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 sm:px-4">
                    {product?.slice(0, 8)?.map((item: any, id: any) => (
                        <>
                            <p>{item.name}</p>
                            <Card14 item={item} key={id} />
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DefaultProduct;

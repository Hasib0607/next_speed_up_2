'use client';
import { useSelector } from 'react-redux';
import Card47 from '../card/card47';
import SectionHeadingTwentyThree from '../section-heading/section-heading-twentythree';
import { RootState } from '@/redux/store';

const NewArrivalProductTwentyThree = ({ product, design }: any) => {
    const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;
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
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="">
                <div>
                    <SectionHeadingTwentyThree
                        title={title}
                        title_color={title_color || '#000'}
                        design={design}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {product?.slice(0, 8).map((productData: any) => (
                    <div key={productData.id}>
                        {' '}
                        <Card47
                            item={productData}
                            design={design}
                            store_id={store_id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivalProductTwentyThree;

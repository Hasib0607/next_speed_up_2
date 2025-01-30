'use client';
import { useState } from 'react';
import SectionHeadingTwentyFour from '@/components/section-heading/section-heading-twenty-four';
import './product-twentyfour.css';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';

const ProductTwentyFour = ({ design, category }: any) => {
    const [id, setId] = useState(category[0]?.id);

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state

    const { custom_design } = headerdata || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    const styleCss = `
    .active-cat-twenty-four {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
        
    }
 `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>

            <div>
                <SectionHeadingTwentyFour
                    title={title || 'POPULAR PRODUCTS'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
            </div>

            <div className="flex flex-wrap gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5 justify-center">
                {category?.slice(0, 5).map((item: any) => (
                    <div key={item.id}>
                        <h1
                            className={`${
                                id === item?.id ? 'active-cat-twenty-four' : ''
                            } px-5 py-1 pb-6 border-b-2 border-transparent`}
                            onClick={() => {
                                setId(item?.id);
                            }}
                        >
                            {item.name}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="h-[2px] w-full bg-gray-300 mb-5 -mt-0.5"></div>
            <CatProductsList
                id={id}
                className={
                    'grid grid-cols-2 xl:grid-cols-5 xl3:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-5'
                }
                card={'49'}
                count={8}
            >
                <div className="text-red-500 text-center py-10 text-4xl">
                    No Products Available
                </div>
            </CatProductsList>
        </div>
    );
};

export default ProductTwentyFour;

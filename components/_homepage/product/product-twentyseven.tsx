'use client';

import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';

const ProductTwentySeven = ({ category, design }: any) => {
    const [id, setId] = useState(category[0]?.id);

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state

    const { custom_design } = headerdata || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    const styleCss = `
    .active-cat {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
 `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5  w-full">
            <style>{styleCss}</style>
            <div className='flex flex-col "text-2xl md:text-3xl text-black font-semibold mb-6 mt-14'>
                <div className="xl:text-5xl text-2xl md:text-3xl">
                    <p style={{ color: title_color }}>
                        {title || "What's trending now"}
                    </p>
                </div>
                <div className="flex gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5">
                    {category?.slice(0, 3).map((item: any) => (
                        <div key={item?.id}>
                            <h1
                                className={`${
                                    id === item?.id
                                        ? 'bg-gray-800 text-white'
                                        : ''
                                } px-2 py-1 rounded-full`}
                                onClick={() => {
                                    setId(item?.id);
                                }}
                            >
                                {item?.name}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
            <CatProductsList
                id={id}
                className={
                    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-2'
                }
                card={'51'}
                count={8}
            >
                <div className="text-red-500 text-center py-10 text-xl">
                    No Products Available
                </div>
            </CatProductsList>
        </div>
    );
};

export default ProductTwentySeven;

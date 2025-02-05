'use client';

import { useState } from 'react';
import CatProductsList from './components/cat-products-list';
import SectionHeadingTwentyOne from '@/components/section-heading/section-heading-twentyone';

const ProductTwentyOne = ({ design, category, headersetting }: any) => {
    const [id, setId] = useState(category[0]?.id);
    const { custom_design } = headersetting || {};
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
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                <div>
                    <SectionHeadingTwentyOne
                        title={title || 'POPULAR'}
                        subtitle={''}
                        title_color={title_color || '#000'}
                    />
                </div>
                <div className="flex gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 mt-5">
                    {category?.slice(0, 3).map((item: any) => (
                        <div key={item?.id}>
                            <h1
                                className={`${
                                    id === item?.id ? 'active-cat' : ''
                                } px-2 py-2 rounded`}
                                onClick={() => {
                                    setId(item?.id);
                                }}
                            >
                                {item.name}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[1px] w-full bg-gray-300 mb-5"></div>
            <CatProductsList
                id={id}
                className={
                    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
                }
                card={'45'}
                count={8}
            >
                <div className="text-red-500 text-center py-10 text-xl">
                    No Products Available
                </div>
            </CatProductsList>
        </div>
    );
};

export default ProductTwentyOne;

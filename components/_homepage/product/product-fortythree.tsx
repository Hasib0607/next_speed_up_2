'use client';

import { useState } from 'react';
import CatProductsList from './components/cat-products-list';
import SectionHeadingTen from '@/components/section-heading/section-heading-ten';

const ProductFortyThree = ({ category, headersetting }: any) => {
    const [id, setId] = useState(category[0]?.id);

    const { custom_design } = headersetting || {};

    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000', subtitle = 'Default Sub-title', subtitle_color = '#000' } =
        sectionHeadingData || {};

    const styleCss = `
        .active-cat {
        color: red;
        }
    `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 mx-auto">
            <style>{styleCss}</style>
            <div className="">
                <div className='text-center uppercase'>
                    <h2 style={{ color: subtitle_color }}>{subtitle}</h2>
                </div>
                <SectionHeadingTen
                    title={title || 'Our Products'}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div className="flex flex-wrap gap-y-3 gap-x-5 text-lg justify-center pb-8 lg:cursor-pointer uppercase">
                    {category?.slice(0, 3)?.map((item: any) => (
                        <div key={item?.id}>
                            <h1
                                className={`${id === item?.id ? 'active-cat' : ''} underline pt-3`}
                                onClick={() => {
                                    setId(item?.id);
                                }}
                            >
                                {item?.name}
                            </h1>
                        </div>
                    ))}
                </div>
                <CatProductsList
                    id={id}
                    className={
                        'grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-5'
                    }
                    card={'ProductCardTen'}
                    count={10}
                >
                    <div className="text-red-500 text-center py-10 text-xl">
                        No Products Available
                    </div>
                </CatProductsList>
            </div>
        </div>
    );
};

export default ProductFortyThree;

'use client';

import { useState } from 'react';
import CatProductsList from './components/cat-products-list';

const ProductThirtyEight = ({ category, design, headersetting }: any) => {
    const [id, setId] = useState(category[0]?.id);

    const styleCss = `
    .active-cat-twenty-four {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
        
    }
    .sec-twenty-nine{
        border-bottom: 2px solid ${design?.header_color};
    }
    `;

    const { custom_design } = headersetting || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    return (
        <div className="bg-[#F2F4F8]">
            <div className="sm:container px-5 sm:py-10 py-5 w-full">
                <style>{styleCss}</style>

                <div className="w-full relative flex flex-col gap-5">
                    <div className="text-center pb-10">
                        <p
                            style={{ color: title_color }}
                            className="font-bold text-[20px]"
                        >
                            {title || 'Products'}
                        </p>
                    </div>
                    <div
                        className={`flex justify-center items-center flex-wrap gap-x-16 gap-y-3 lg:cursor-pointer font-medium mb-5`}
                    >
                        {category?.slice(0, 5)?.map((item: any) => (
                            <div key={item.id}>
                                <h1
                                    className={`${
                                        id === item?.id
                                            ? 'active-cat-twenty-four'
                                            : ''
                                    } px-5 pb-[16px] border-b-2 border-transparent z-[1] relative`}
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

                <CatProductsList
                    id={id}
                    className={
                        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-3 justify-center'
                    }
                    card={'65'}
                    count={5}
                >
                    <div className="text-red-500 text-center py-10 text-4xl">
                        No Products Available
                    </div>
                </CatProductsList>
            </div>
        </div>
    );
};

export default ProductThirtyEight;

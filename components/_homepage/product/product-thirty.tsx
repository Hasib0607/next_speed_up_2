'use client';

import SectionHeadingThirty from '@/components/section-heading/section-heading-thirty';
import { useState } from 'react';
import CatProductsList from './components/cat-products-list';
import { useSelector } from 'react-redux';

const ProductThirty = ({ category, design }: any) => {
    const home = useSelector((state: any) => state?.home);
    const { headersetting } = home || {};

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

    const { title, title_color } =
        headersetting?.custom_design?.product?.[0] || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="my-5 w-full relative flex flex-col gap-5">
                <div className="">
                    <SectionHeadingThirty
                        title={title || 'Shop Across Popular Category'}
                        title_color={title_color || '#000'}
                    />
                </div>
                <div
                    className={`flex flex-wrap gap-x-16 gap-y-3 lg:cursor-pointer text-xl font-medium ${
                        design?.template_id === '34'
                            ? 'text-gray-300'
                            : 'text-gray-600'
                    } pt-5 lg2:pt-0`}
                >
                    {category?.slice(0, 5).map((item: any) => (
                        <div key={item.id}>
                            <h1
                                className={`${
                                    id === item?.id
                                        ? 'active-cat-twenty-four'
                                        : ''
                                } px-2 border-b-2 border-transparent z-[1] relative`}
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
                    'grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg2:grid-cols-3 xl:grid-cols-4 gap-5'
                }
                card={'54'}
                count={6}
            >
                <div className="text-red-500 text-center py-10 text-4xl">
                    No Products Available
                </div>
            </CatProductsList>
        </div>
    );
};

export default ProductThirty;

'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';
import { RootState } from '@/redux/store';


const ProductTwentyNine = ({ category, design }: any) => {
    const home = useSelector((state: RootState) => state?.home);
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

            <div className="my-5 w-full relative flex flex-col lg2:flex-row justify-between lg2:items-center">
                <div className="z-[1] relative">
                    <h3
                        style={{ color: title_color }}
                        className="text-lg md:text-xl text-black pb-[10px] w-max font-bold capitalize sec-twenty-nine"
                    >
                        {title || 'Top Selling Products'}
                    </h3>
                </div>
                <div className="flex flex-wrap gap-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600 justify-center pt-10 lg2:pt-0">
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
                <div className="absolute h-[1px] bg-gray-300 w-full top-[39px]"></div>
            </div>
            <CatProductsList
                id={id}
                className={
                    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'
                }
                card={'53'}
                count={6}
            >
                <div className="text-red-500 text-center py-10 text-4xl">
                    No Products Available
                </div>
            </CatProductsList>
        </div>
    );
};

export default ProductTwentyNine;

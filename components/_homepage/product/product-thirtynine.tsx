'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';

const ProductThirtyNine = ({ category, design }: any) => {
    const home = useSelector((state: any) => state?.home);
    const { headersetting } = home || {};

    const [id, setId] = useState(category[0]?.id);
    const [animate, setAnimate] = useState(false);

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
        <div className="">
            <div className="sm:container px-5 sm:py-10 py-5 w-full">
                <style>{styleCss}</style>

                <div className="w-full relative flex flex-col gap-5">
                    <div className="text-center pb-10">
                        <p
                            style={{ color: title_color }}
                            className="font-semibold text-[24px]"
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
                                    } pb-2 border-b-2 border-transparent z-[1] relative`}
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
                    className={`${
                        animate ? 'translate-y-0' : 'translate-y-[25px]'
                    } duration-1000 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 sm:gap-4 justify-center`}
                    card={'67'}
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

export default ProductThirtyNine;

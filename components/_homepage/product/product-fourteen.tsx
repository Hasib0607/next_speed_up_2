'use client';

import SectionHeadingSixteen from '@/components/section-heading/section-heading-sixteen';
import { RootState } from '@/redux/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';

const ProductFourteen = ({ category, design }: any) => {
    const [id, setId] = useState(category[0]?.id);

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );

    const { custom_design } = headerdata || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    const styleCss = `
    .active-cat {
      color:  ${design?.header_color};
      border-bottom: 2px solid ${design?.header_color};
      
  }

    `;

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5 mx-auto">
            <style>{styleCss}</style>
            <div className="bg-white">
                <SectionHeadingSixteen
                    title={title || 'Products'}
                    title_color={title_color || '#000'}
                />
                <div className="flex sm:gap-x-5 gap-x-2 justify-center pb-8 lg:cursor-pointer uppercase">
                    {category?.slice(0, 4).map((item: any) => (
                        <div key={item.id}>
                            <h1
                                className={`${
                                    id === item?.id ? 'active-cat' : ''
                                } font-medium text-sm sm:text-base`}
                                onClick={() => {
                                    setId(item?.id);
                                }}
                            >
                                {item.name}
                            </h1>
                        </div>
                    ))}
                </div>
                <CatProductsList
                    id={id}
                    className={
                        'grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:gap-5 gap-1'
                    }
                    card={'29'}
                    count={8}
                >
                    <div className="text-red-500 text-center py-10 text-xl">
                        No Products Available
                    </div>
                </CatProductsList>
            </div>
        </div>
    );
};

export default ProductFourteen;

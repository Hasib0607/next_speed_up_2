'use client';

import { RootState } from '@/redux/store';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CatProductsList from './components/cat-products-list';

const ProductTwentySix = ({ category, design }: any) => {
    const router = useRouter();

    const [id, setId] = useState(category[0]?.id);

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state

    const { custom_design } = headerdata || {};
    const sectionHeadingData = custom_design?.product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        sectionHeadingData || {};

    const styleCss = `
    .active-cat-ps {
        color:  ${design?.header_color};
    }
  `;

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-5">
                <div className="pb-2 md:pb-0 text-2xl">
                    <p style={{ color: title_color }}>
                        {title || 'POPULAR PRODUCTS'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-x-5 lg:cursor-pointer uppercase text-sm font-medium text-gray-600">
                    {category?.slice(0, 5)?.map((item: any) => (
                        <div key={item?.id}>
                            <h1
                                className={`${
                                    id === item?.id ? 'active-cat-ps' : ''
                                } px-2 py-1 rounded`}
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

            <CatProductsList
                id={id}
                className={
                    'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg2:grid-cols-4 xl:grid-cols-5 xl3:grid-cols-6 gap-2 sm:gap-5'
                }
                card={'56'}
                count={8}
            >
                <div className="text-red-500 text-center py-10 text-4xl">
                    No Products Available
                </div>
            </CatProductsList>
            {/* Load More Button */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => router.push('/category')}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    Load More
                </button>
            </div>
        </div>
    );
};

export default ProductTwentySix;

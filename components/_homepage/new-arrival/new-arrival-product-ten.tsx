'use client';

import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Card15 from '../../card/card15';
import SectionHeadingTen from '../../section-heading/section-heading-ten';

const NewArrivalProductTen = ({ headersetting }: any) => {
    const categoryStore = useSelector((state: RootState) => state?.category);
    const category = categoryStore?.categories || [];

    const [id, setId] = useState(category[0]?.id);
    const [products, setProducts] = useState([]);

    const { data, isLoading, isFetching, isError, isSuccess } =
        useGetCategoryProductQuery({ id });

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.products);
        }
    }, [data, isSuccess]);

    const styleCss = `
    .active-cat {
      color:  red;
    }
`;

    const { custom_design } = headersetting || {};

    const newArrivalProduct = custom_design?.new_arrival?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } =
        newArrivalProduct || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <style>{styleCss}</style>
            <SectionHeadingTen
                title={title || 'New Arrivals'}
                subtitle={''}
                title_color={title_color || '#000'}
            />

            <div className="flex gap-5 text-lg justify-center pb-8 lg:cursor-pointer uppercase">
                {category?.slice(0, 3).map((item: any) => (
                    <div key={item.id}>
                        <h1
                            className={`${id === item?.id ? 'active-cat' : ''} `}
                            onClick={() => {
                                setId(item?.id);
                            }}
                        >
                            {item.name}
                        </h1>
                    </div>
                ))}
            </div>

            {products?.length > 0 ? (
                <div className="grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 gap-4">
                    {products?.slice(0, 10)?.map((item: any) => {
                        return (
                            <Card15
                                item={item}
                                key={item?.id}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="text-red-500 text-center py-10 text-xl">
                    No Products Available
                </div>
            )}
        </div>
    );
};

export default NewArrivalProductTen;

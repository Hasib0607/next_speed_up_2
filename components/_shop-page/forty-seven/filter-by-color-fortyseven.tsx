'use client';

import React from 'react';
import { setColor } from '@/redux/features/filters/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetColorsQuery } from '@/redux/features/shop/shopApi';
import { getFromLocalStorage } from '@/helpers/localStorage';
import { EXTRACT_HEADER_INFORMATION } from '@/consts';

const FilterByColorFortySeven = () => {
    const headerSettingData = getFromLocalStorage(EXTRACT_HEADER_INFORMATION);
    const store_id = headerSettingData?.store_id || null;

    const {
        data: colorsData,
        isLoading: colorsLoading,
        isSuccess: colorsSuccess,
    } = useGetColorsQuery({ store_id });

    const colors = colorsData?.data || [];

    const dispatch = useDispatch();

    const filtersData = useSelector((state: RootState) => state.filters);

    // get the activecolor, pricevalue, selectedSort
    const { color: activeColor } = filtersData || {};

    const handleClick = (color: any) => {
        dispatch(setColor(color));
    };

    return (
        <>
            <div className="flex flex-wrap gap-2 mt-3 mb-5 pl-1">
                <div
                    onClick={() => handleClick(null)}
                    className={`h-6 w-6 bg-white border-2 border-red-500 hover:cursor-pointer relative overflow-hidden ${activeColor === null && 'ring-1 ring-offset-2 ring-red-500'}`}
                >
                    <p className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] text-center mx-auto bg-red-500 rotate-45 "></p>
                    <p className="absolute right-1/2 translate-x-1/2 top-0 h-full w-[2px] text-center mx-auto bg-red-500 -rotate-45 "></p>
                </div>

                {colors?.map((item: any, index: any) => (
                    <div key={index}>
                        <div
                            onClick={() => handleClick(item?.code)}
                            style={{ background: item?.code }}
                            className={`h-6 w-6 border border-gray-800 hover:cursor-pointer
                                ${activeColor === item?.code && 'ring-2 ring-offset-2 ring-red-500'}`}
                        ></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FilterByColorFortySeven;

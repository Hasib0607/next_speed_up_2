"use client"

import { setPrice } from '@/redux/features/filters/filterSlice';
import { RootState } from '@/redux/store';
import BDT from '@/utils/bdt';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FilterByPriceFortyFive = () => {
    const inputRef = useRef<any>(null);
    const filtersData = useSelector((state: RootState) => state.filters);

    // get the activecolor, pricevalue, selectedSort
    const { price: priceValue } = filtersData || {};

    const dispatch = useDispatch();

    const handleInputChange = () => {
        // if (inputRef.current.value === '0') {
        //     dispatch(setPrice(null));
        // }else{
        // }
        dispatch(setPrice(inputRef.current.value));
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <label htmlFor="range" className=" mb-2 text-sm font-semibold">
                    <BDT price={0} />
                </label>
                <label htmlFor="range" className=" mb-2 text-sm font-semibold">
                    <BDT price={priceValue} />
                </label>
            </div>
            <input
                min="0"
                max="10000"
                defaultValue={priceValue ?? 0}
                onChange={handleInputChange}
                id="range"
                type="range"
                className="mb-6 w-full h-2 rounded-lg bg-gray-300 lg:cursor-pointer focus:outline-none"
                ref={inputRef}
            ></input>
        </>
    );
};

export default FilterByPriceFortyFive;

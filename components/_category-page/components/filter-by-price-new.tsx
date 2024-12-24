"use client"

import { setPrice } from '@/redux/features/filters/filterSlice';
import BDT from '@/utils/bdt';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const FilterByPriceNew = ({ priceValue, setHasMore, setPage }: any) => {
    const inputRef = useRef<any>(null);
    const dispatch = useDispatch();

    const handleInputChange = () => {
        dispatch(setPrice(inputRef.current.value));
        setPage(1);
        setHasMore(true);
    };

    return (
        <>
            <h1 className="font-medium text-[#252525] text-xl pb-3">
                Filter by Price
            </h1>
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
                defaultValue={0}
                onChange={handleInputChange}
                id="range"
                type="range"
                className="mb-6 w-full h-2 rounded-lg bg-gray-300 lg:cursor-pointer focus:outline-none"
                ref={inputRef}
            ></input>
        </>
    );
};

export default FilterByPriceNew;

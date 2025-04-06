'use client';

import { setActiveBrands } from '@/redux/features/filters/filterSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '@/redux/features/rtkHooks/rtkHooks';
import { AppDispatch, RootState } from '@/redux/store';

const FilterByBrandNew = ({ brands }: any) => {
    const dispatch: AppDispatch = useAppDispatch();
    
    const { activeBrands } = useAppSelector(
        (state: RootState) => state.filters
    );

    const handleCheckboxChange = (brand: string) => {
        let updatedBrands: any = [];
        if (activeBrands.includes(brand)) {
            updatedBrands = activeBrands.filter((item: any) => item !== brand);
        } else {
            updatedBrands = [...activeBrands, brand];
        }
        dispatch(setActiveBrands(updatedBrands));
    };

    return (
        <>
            <h1 className="font-medium text-[#252525] text-xl ">
                Filter by Brand
            </h1>
            <div className="flex flex-wrap gap-4 mt-3">
                {brands?.map((brand: any) => (
                    <label
                        key={brand.id}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value={brand.name}
                            checked={activeBrands.includes(brand.name) ?? false}
                            onChange={() => handleCheckboxChange(brand.name)}
                            className="accent-blue-500"
                        />
                        <span className="text-[#252525]">{brand.name}</span>
                    </label>
                ))}
            </div>
        </>
    );
};

export default FilterByBrandNew;

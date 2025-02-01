'use client';

const FilterByBrand = () => {
    const staticBrands = ['brand1', 'brand2', 'brand3', 'brand4', 'brand5'];

    // const handleCheckboxChange = (brand: string) => {
    //     let updatedBrands;
    //     if (activeBrands.includes(brand)) {
    //         updatedBrands = activeBrands.filter((b) => b !== brand);
    //     } else {
    //         updatedBrands = [...activeBrands, brand];
    //     }

    //     setActiveBrands(updatedBrands);
    //     setPage(1); // Reset to first page whenever the filter changes
    //     setHasMore(true); // Reset pagination status
    // };

    return (
        <>
            <h1 className="font-medium text-[#252525] text-xl ">
                Filter by Brand
            </h1>
            <div className="flex flex-wrap gap-4 mt-3">
                {staticBrands.map((brand, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            value={brand}
                            // checked={activeBrands.includes(brand)}
                            // onChange={() => handleCheckboxChange(brand)}
                            className="accent-blue-500"
                        />
                        <span className="text-[#252525]">{brand}</span>
                    </label>
                ))}
            </div>
        </>
    );
};

export default FilterByBrand;

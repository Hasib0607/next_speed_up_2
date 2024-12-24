

const Filters = ({ onChange }: any) => {
    return (
        <div>
            <div className="flex py-0 px-0 rounded-xl lg:px-3 justify-between items-center gap-2">
                <div className="md:block hidden lg:mr-28 xl:mr-0">Sort By:</div>
                <div className="flex items-center gap-3 lg:-ml-28 xl:-ml-0 md:-ml-0 ml-2 justify-center">
                    {/* Short by  */}
                    <div className="relative">
                        <select
                            onChange={onChange}
                            className="selectdd w-48 font-medium lg:cursor-pointer h-12 text-md  rounded-md  focus:ring-transparent outline-none focus:outline-none bg-transparent border border-gray-500 appearance-none pl-3"
                            id="category"
                            name="category"
                        >
                            <option className="lg:cursor-pointer" value="null">
                                Sorting Options
                            </option>
                            <option className="lg:cursor-pointer" value="az">
                                Name, A to Z
                            </option>
                            <option className="lg:cursor-pointer" value="za">
                                Name, Z to A
                            </option>
                            <option className="lg:cursor-pointer" value="lh">
                                Price, Low to High
                            </option>
                            <option className="lg:cursor-pointer" value="hl">
                                Price, High to Low
                            </option>
                        </select>
                        {/* Custom caret on the left */}
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            ▼
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters
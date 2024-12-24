export const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
    return (
        <>
            {variant?.length > 0 && (
                <div className="">
                    <h3 className="font-medium font-sans text-xl mb-2">
                        Units
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {variant?.map((item: any, id: any) => (
                            <Unit
                                key={id}
                                item={item}
                                select={unit}
                                setSelect={setUnit}
                                setActiveImg={setActiveImg}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export const ColorsOnly = ({ color, setColor, variant, setActiveImg }: any) => {
    return (
        <>
            {variant?.length > 0 && (
                <div className="">
                    <h3 className="font-medium font-sans text-xl mb-2">
                        Colors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {variant?.map((item: any, id: any) => (
                            <ColorSet
                                key={id}
                                text={item}
                                select={color}
                                setSelect={setColor}
                                itemImage={item?.image}
                                setActiveImg={setActiveImg}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export const Sizes = ({ size, setSize, variant, setActiveImg }: any) => {
    return (
        <>
            {variant?.length > 0 && (
                <div className="">
                    <h3 className="font-medium font-sans text-xl mb-2">Size</h3>
                    <div className="flex flex-wrap gap-2">
                        {variant?.map((item: any, id: any) => (
                            <Size
                                key={id}
                                item={item}
                                select={size}
                                setSelect={setSize}
                                setActiveImg={setActiveImg}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export const Colors = ({
    color,
    setColor,
    variant_color,
    setSize,
    setActiveImg,
}: any) => {
    return (
        <>
            {variant_color?.length > 0 && (
                <div className="">
                    <h3 className="font-medium font-sans text-xl mb-2">
                        Colors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {variant_color?.map((item: any, index: any) => (
                            <Color
                                key={index}
                                item={item}
                                itemColorImage={item?.color_image}
                                select={color}
                                setSelect={setColor}
                                setSize={setSize}
                                setActiveImg={setActiveImg}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

// sub components

export const Unit = ({ item, select, setSelect, setActiveImg }: any) => {
    return (
        <div
            onClick={() => {
                setSelect(item);
                setActiveImg(item?.image);
            }}
            className={`border px-1 w-auto h-10 flex justify-center items-center font-sans text-sm rounded ${
                item === select ? 'border-gray-900' : 'border-gray-300'
            }`}
        >
            {item?.volume + ' ' + item?.unit}
        </div>
    );
};

export const Size = ({ item, select, setSelect, setActiveImg }: any) => {
    return (
        <div
            onClick={() => {
                setSelect(item);
                setActiveImg(item?.image);
            }}
            className={`border px-4 py-3 w-auto h-10 flex justify-center items-center font-sans font-medium rounded cursor-pointer ${
                item?.size === select?.size
                    ? 'border-gray-900'
                    : 'border-gray-300'
            }`}
        >
            {item?.size}
        </div>
    );
};

export const Color = ({
    item,
    itemColorImage,
    select,
    setSelect,
    setSize,
    setActiveImg,
}: any) => {
    return (
        <div
            onClick={() => {
                setSelect(item);
                setActiveImg(itemColorImage);
                setSize(null);
            }}
            className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white cursor-pointer ${
                item?.color === select?.color
                    ? 'border-gray-900'
                    : 'border-gray-300'
            }`}
        >
            <div
                style={{ backgroundColor: item?.color }}
                className="w-7 h-7"
            ></div>
        </div>
    );
};

export const ColorSet = ({
    text,
    select,
    setSelect,
    itemImage,
    setActiveImg,
}: any) => {
    return (
        <div
            onClick={() => {
                setSelect(text);
                setActiveImg(itemImage);
            }}
            className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white ${
                text === select ? 'border-gray-900' : 'border-gray-300'
            }`}
        >
            <div
                style={{ backgroundColor: text?.color }}
                className="w-7 h-7"
            ></div>
        </div>
    );
};

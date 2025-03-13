import { classNames } from '@/helpers/littleSpicy';

const itemText = 'font-medium font-sans text-md mb-1'
const commonItem =
    'border px-5 py-1 flex justify-center items-center font-sans font-medium cursor-pointer';
const selectedItem = 'bg-[var(--header-color)] text-[var(--text-color)]';
const unSelectedItem =
    'border-gray-400 shadow-sm-forty-four-hover hover:border-transparent transition-all duration-300';

export const Units = ({ unit, setUnit, variant, setActiveImg }: any) => {
    return (
        variant?.length > 0 && (
            <div className="">
                <h3 className="font-medium font-sans text-xl mb-2">
                    Select Unit:
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
        )
    );
};

export const ColorsOnly = ({ color, setColor, variant, setActiveImg }: any) => {
    return (
        variant?.length > 0 && (
            <div className="">
                <h3 className={itemText}>Select Colors:</h3>
                <div className="flex flex-wrap gap-2">
                    {variant?.map((item: any, id: any) => (
                        <ColorSet
                            key={id}
                            item={item}
                            select={color}
                            setSelect={setColor}
                            itemImage={item?.image}
                            setActiveImg={setActiveImg}
                        />
                    ))}
                </div>
            </div>
        )
    );
};

export const Sizes = ({ size, setSize, variant, setActiveImg }: any) => {
    return (
        variant?.length > 0 && (
            <div className="">
                <h3 className={itemText}>
                    Select Size:
                </h3>
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
        )
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
        variant_color?.length > 0 && (
            <div className="">
                <h3 className={itemText}>Select Colors:</h3>
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
        )
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
            className={classNames(
                commonItem,
                item === select ? selectedItem : unSelectedItem
            )}
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
            className={classNames(
                commonItem,
                item === select ? selectedItem : unSelectedItem
            )}
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
            className={
                item?.color === select?.color
                    ? 'border border-gray-900 p-1'
                    : 'border border-gray-300 p-1'
            }
        >
            <div
                onClick={() => {
                    setSelect(item);
                    setActiveImg(itemColorImage);
                    setSize(null);
                }}
                style={{ backgroundColor: item?.color }}
                className={classNames(
                    commonItem,
                    'h-6 w-14 border-transparent'
                )}
            ></div>
        </div>
    );
};

export const ColorSet = ({
    item,
    select,
    setSelect,
    itemImage,
    setActiveImg,
}: any) => {
    return (
         <div
         className={
             item?.color === select?.color
                 ? 'border border-gray-900 p-1'
                 : 'border border-gray-300 p-1'
         }
     >
         <div
             onClick={() => {
                setSelect(item);
                if (itemImage != null) {
                    setActiveImg(itemImage);
                }
            }}
             style={{ backgroundColor: item?.color }}
             className={classNames(
                 commonItem,
                 'h-6 w-14 border-transparent'
             )}
         ></div>
     </div>
    );
};

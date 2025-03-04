import { productImg } from '@/site-settings/siteUrl';

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

export const ColorsOnly = ({
    color,
    setColor,
    variant,
    variant_color,
    setActiveImg,
    productImage
}: any) => {
    const isNullImage = variant_color?.some(
        (item: any) => item?.color_image === null
    );

    return (
        <>
            {variant?.length > 0 && (
                <div className="">
                    <h3 className="font-medium font-sans text-xl mb-2">
                        Colors:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {isNullImage
                            ? variant?.map((item: any, index: any) => (
                                  <ColorSet
                                      key={index}
                                      item={item}
                                      select={color}
                                      setColor={setColor}
                                      itemImage={item?.image}
                                      setActiveImg={setActiveImg}
                                  />
                              ))
                            : variant_color?.map((item: any, id: any) => (
                                  <div
                                      onClick={() => {
                                          setColor(item);
                                          setActiveImg(item?.color_image);
                                      }}
                                      key={id}
                                      className="focus:outline-none w-[50px] cursor-pointer"
                                  >
                                      <img
                                          className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${color?.color_image == item?.color_image ? 'border-[var(--header-color)]' : 'inset-1 shadow'}`}
                                          src={
                                              item?.color_image != null
                                                  ? productImg +
                                                    item?.color_image
                                                  : productImg + productImage
                                          }
                                          alt=""
                                      />
                                  </div>
                              ))}
                    </div>
                </div>
            )}
        </>
    );
};

export const Sizes = ({ size, setSize, variant, setActiveImg }: any) => {
    const hasImages = variant?.some((item: any) => item?.image);

    return (
        variant?.length > 0 && (
            <div className="">
                <h3 className="font-medium font-sans text-md mb-2">
                    {hasImages ? 'Pattern:' : 'Size:'}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {hasImages
                        ? // Render variants with valid 'image'
                          variant
                              ?.filter((item: any) => item?.image)
                              ?.map((item: any, id: any) => (
                                  <div
                                      key={id}
                                      onClick={() => {
                                          setSize(item);
                                          setActiveImg(item?.image);
                                      }}
                                      className="focus:outline-none w-[50px] cursor-pointer"
                                  >
                                      <img
                                          className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${
                                              item?.size === size?.size
                                                  ? 'border-[var(--header-color)]'
                                                  : 'inset-1 shadow'
                                          }`}
                                          src={productImg + item?.image}
                                          alt=""
                                      />
                                  </div>
                              ))
                        : variant?.map((item: any, id: any) => (
                              <Size
                                  key={id}
                                  item={item}
                                  size={size}
                                  setSize={setSize}
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
    productImage,
}: any) => {
    const isNullImage = variant_color?.some(
        (item: any) => item?.color_image === null
    );

    return (
        variant_color?.length > 0 && (
            <div className="">
                <h3 className="font-medium font-sans text-md mb-2">Colors:</h3>
                <div className="flex flex-wrap gap-2">
                    {isNullImage
                        ? variant_color?.map((item: any, index: any) => (
                              <Color
                                  key={index}
                                  item={item}
                                  itemColorImage={item?.color_image}
                                  select={color}
                                  setSelect={setColor}
                                  setSize={setSize}
                                  setActiveImg={setActiveImg}
                              />
                          ))
                        : variant_color?.map((item: any, id: any) => (
                              <div
                                  onClick={() => {
                                      setColor(item);
                                      setActiveImg(item?.color_image);
                                      setSize(null);
                                  }}
                                  key={id}
                                  className="focus:outline-none w-[50px] cursor-pointer"
                              >
                                  <img
                                      className={`h-[50px] w-[50px] rounded-full object-cover object-center bg-gray-100 border ${color?.color_image == item?.color_image ? 'border-[var(--header-color)]' : 'inset-1 shadow'}`}
                                      src={
                                          item?.color_image != null
                                              ? productImg + item?.color_image
                                              : productImg + productImage
                                      }
                                      alt=""
                                  />
                              </div>
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
            className={`border px-1 w-auto h-10 flex justify-center items-center font-sans text-sm rounded cursor-pointer ${
                item === select
                    ? 'bg-[var(--header-color)] text-[var(--text-color)]'
                    : 'border-gray-900'
            }`}
        >
            {item?.volume + ' ' + item?.unit}
        </div>
    );
};

export const Size = ({ item, size, setSize, setActiveImg }: any) => {
    return (
        <div
            onClick={() => {
                setSize(item);
                setActiveImg(item?.image);
            }}
            className={`border px-4 py-3 w-auto h-10 flex justify-center items-center font-sans font-medium rounded cursor-pointer ${
                item?.size === size?.size
                    ? 'bg-[var(--header-color)] text-[var(--text-color)]'
                    : 'border-gray-900'
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
    item,
    select,
    setColor,
    itemImage,
    setActiveImg,
}: any) => {
    return (
        <div
            onClick={() => {
                setColor(item);
                if (itemImage != null) {
                    setActiveImg(itemImage);
                }
            }}
            className={`border w-10 h-10 flex justify-center items-center font-sans font-medium rounded bg-white cursor-pointer ${
                item === select ? 'border-gray-900' : 'border-gray-300'
            }`}
        >
            <div
                style={{ backgroundColor: item?.color }}
                className="w-7 h-7"
            ></div>
        </div>
    );
};

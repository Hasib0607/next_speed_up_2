import { productImg } from '@/site-settings/siteUrl';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import Link from 'next/link';
import BDT from '@/utils/bdt';
import { numberParser } from '@/helpers/numberParser';

const ProductCardSix = ({ item }: any) => {
    const overlyImage = `
    .image{
        transition: .5s ease;
         backface-visibility: hidden;
          opacity: 1;
         display: block;
    }
    .mainContainer:hover .image {
        opacity: 0.3;
    }
      
    `;

    const price = productCurrentPrice(item);
    const save = howMuchSave(item);

    return (
        <div className="bg-gray-200 group xl:h-[300px] lg:h-[300px] relative overflow-hidden mainContainer">
            <style>{overlyImage}</style>
            {item ? (
                <>
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <div className="xl:h-[520px] lg:h-[520px]">
                            <img
                                src={productImg + item.image[0]}
                                alt="Mountain"
                                className="block object-cover object-center h-auto xl:h-[300px] lg:h-[300px] w-[100%] ml-auto mr-auto  group-hover:scale-105 transition-all duration-300 ease-linear image"
                            />
                        </div>

                        <div className=" ml-4 mr-4 my-5 lg:my-0 xl:justify-between md:justify-between lg:justify-between lg:absolute top-5 left-5 duration-1000 lg:opacity-0 lg:group-hover:opacity-100">
                            <div>
                                <p
                                    className="text-sm  font font-medium w-[130px]"
                                    style={{
                                        height: '30px',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {item?.name.charAt(0).toUpperCase() +
                                        item?.name.slice(1)}
                                </p>
                            </div>
                            <div className="flex">
                                {save > 0 && (
                                    <p className="line-through text-sm">
                                        {' '}
                                        <BDT
                                            price={numberParser(
                                                item?.regular_price
                                            )}
                                        />
                                    </p>
                                )}
                                <div className="text-sm font-medium">
                                    <BDT />
                                    {price}
                                </div>
                            </div>
                        </div>
                    </Link>
                </>
            ) : (
                <div className="text-2xl text-black flex items-center justify-center h-96 xl:h-[800px] lg:h-[800px] md:h-96 ">
                    <h2> Product Not Available</h2>
                </div>
            )}
        </div>
    );
};

export default ProductCardSix;

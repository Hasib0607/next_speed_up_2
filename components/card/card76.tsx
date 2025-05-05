'use client';
import Link from 'next/link';
import {
    isAvailable,
    isRegularPriceLineThrough,
    productCurrentPrice,
} from '@/helpers/littleSpicy';
import { productImg } from '@/site-settings/siteUrl';
import BDT from '@/utils/bdt';
import ProdMultiCategory from '@/utils/prod-multi-category';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useState } from 'react';
import QuickView from '@/utils/quick-view';
import Details from '../_product-details-page/components/details';
import { CartSideBar } from '../_shopping-cart/_components/cart-side-bar';

const Card76 = ({ item, design }: any) => {
    const category = item?.category || [];

    const price = productCurrentPrice(item);
    const priceLineThrough = isRegularPriceLineThrough(item);
    const productAvailablity = isAvailable(item);

    const [open, setOpen] = useState<any>(false);
    const [openCart, setOpenCart] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const handleQuickAdd = () => {
        if (item?.variant?.length > 0) {
            setOpen(true); // Show QuickView for variant selection
        } else {
            addToCart({
                dispatch,
                product: item,
                cartList,
                price,
                qty: 1,
                productQuantity: item?.quantity,
            });
            setOpenCart(true); // Open Cart Sidebar after adding
        }
    };

    return (
        <>
            <div className="group border">
                <CartSideBar
                    open={openCart}
                    setOpen={setOpenCart}
                    design={design}
                />
                <div className="flex justify-center overflow-hidden">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <img
                            src={productImg + item.image[0]}
                            alt="Product"
                            className="h-auto min-w-full object-cover group-hover:scale-105 transition-all duration-300 ease-linear"
                        />
                    </Link>
                </div>

                <div className="p-5 bg-white flex flex-col items-center text-center space-y-2">
                    <Link href={'/product/' + item?.id + '/' + item?.slug}>
                        <h6 className="text-base text-gray-800 font-bold whitespace-nowrap overflow-hidden text-ellipsis sm:max-w-[170px] max-w-[150px]">
                            {item?.name}
                        </h6>
                    </Link>

                    {Array.isArray(category) && category.length > 0 && (
                        <ProdMultiCategory
                            category={category}
                            count={1}
                            className={
                                'text-sm bg-[var(--header-color)] text-[var(--text-color)] rounded-xl px-1'
                            }
                        />
                    )}

                    <div className="flex flex-wrap justify-center items-center gap-x-3 xl:gap-3 md:gap-3 lg:gap-3">
                        <div className="text-base font-semibold">
                            <BDT price={price} />
                        </div>
                        {priceLineThrough && (
                            <div className="line-through text-gray-400 text-sm">
                                <BDT price={Math.trunc(item?.regular_price)} />
                            </div>
                        )}
                    </div>
                </div>

                {productAvailablity && (
                    <div className="flex justify-center my-3">
                        <button
                            onClick={handleQuickAdd}
                            className="w-fit bg-[var(--header-color)] text-[var(--text-color)] px-6 py-2 hover:border-4 border-[var(--header-color)] rounded-md shadow-sm text-base font-medium cursor-pointer"
                        >
                            Quick Add
                        </button>
                    </div>
                )}
                <QuickView open={open} setOpen={setOpen}>
                    <Details product={item} />
                </QuickView>
            </div>
        </>
    );
};

export default Card76;

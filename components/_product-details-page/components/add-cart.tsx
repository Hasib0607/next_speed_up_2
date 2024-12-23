'use client';

import { numberParser } from '@/helpers/numberParser';
import { RootState } from '@/redux/store';
import { isEqlQty, isQtyLeft } from '@/utils/_cart-utils/cart-utils';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddCart = ({
    setQty,
    qty,
    variantId,
    filterV,
    onClick,
    buttonOne,
    product,
}: any) => {
    const { cartList } = useSelector((state: any) => state.cart);

    const inputRef = useRef<HTMLInputElement>(null);

    const { headersetting } = useSelector((state: RootState) => state.home); // Access updated Redux state

    const { custom_design } = headersetting || {};
    const singleProductPageData = custom_design?.single_product_page?.[0] || {};
    const { button } = singleProductPageData || {};

    const isDisabled = useMemo(
        () => isEqlQty(product, variantId, cartList),
        [product, variantId, cartList]
    );

    const incNum = () => {
        const isAbleToAdd = isQtyLeft(product, variantId, qty + 1, cartList);
        if (filterV?.length === 0) {
            toast.warning('Please Select Variant', {
                toastId: filterV?.length,
            });
        } else if (!isAbleToAdd) {
            toast.warning('Cannot add more than available stock', {
                toastId: variantId,
            });
        } else if (isAbleToAdd && filterV?.length !== 0) {
            setQty((prevCount: any) => prevCount + 1);
        }
    };

    const decNum = () => {
        setQty((prevCount: any) => (prevCount > 1 ? prevCount - 1 : 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = numberParser(e.target.value) || 1;
        const isAbleQtyChange = isQtyLeft(
            product,
            variantId,
            inputValue,
            cartList
        );

        if (filterV?.length === 0) {
            toast.warning('Please Select Variant', {
                toastId: filterV?.length,
            });
        } else if (!isAbleQtyChange) {
            toast.warning('Cannot add more than available stock', {
                toastId: variantId,
            });
        } else if (isAbleQtyChange && filterV?.length !== 0) {
            setQty(inputValue);
        }
    };

    return (
        <div className="flex lg2:flex-row flex-col justify-start lg2:items-center gap-8 py-10">
            <div className="flex border border-gray-300 divide-x-2 rounded-md w-max">
                <div
                    className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-l-md hover:text-white font-semibold transition-all duration-300 ease-linear"
                    onClick={decNum}
                >
                    <MinusIcon width={15} />
                </div>
                {isDisabled ? (
                    <div className="center w-24 py-2 text-lg font-semibold">
                        {qty}
                    </div>
                ) : (
                    <input
                        type="number"
                        className="form-control w-24 text-center border-0 outline-none py-2 text-lg font-semibold remove-arrow"
                        value={qty}
                        ref={inputRef}
                        onChange={(e) => handleInputChange(e)}
                    />
                )}
                <div
                    className="h-12 w-12  flex justify-center items-center hover:bg-black rounded-r-md hover:text-white font-semibold transition-all duration-300 ease-linear"
                    onClick={incNum}
                >
                    <PlusIcon width={15} />
                </div>
            </div>
            <div className="">
                {product?.quantity === 0 ? (
                    <button className={buttonOne}>Out of Stock</button>
                ) : (
                    <button className={buttonOne} onClick={onClick}>
                        {button || 'Add to cart'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddCart;

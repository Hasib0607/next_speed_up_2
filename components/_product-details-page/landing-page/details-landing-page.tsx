/* eslint-disable no-case-declarations */
'use client';

import BDT from '@/utils/bdt';
import CallForPrice from '@/utils/call-for-price';
import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch, RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Colors,
    ColorsOnly,
    Sizes,
    Units,
} from './imageVariations-landing-page';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { productImg } from '@/site-settings/siteUrl';
import CheckoutBtn from './checkout-btn';
import CheckOutForm from './checkout-form/checkout-form';

const DetailsLandingPage = ({ product, design, headersetting, children }: any) => {
  
    const store_id = numberParser(design?.store_id) || null;
    const { cartList } = useSelector((state: RootState) => state.cart);
    const { referralCode } = useSelector((state: RootState) => state.auth);

    const dispatch: AppDispatch = useDispatch();

    const { variant, variant_color, category, layout } = product || {};

    const vrcolor = useMemo(
        () => variant_color?.map((item: any) => item?.color) || [],
        [variant_color]
    );

    const [filterV, setFilterV] = useState<any>([]);

    const [variantId, setVariantId] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [size, setSize] = useState<any>(null);
    const [unit, setUnit] = useState<any>(null);
    const [qty, setQty] = useState<any>(1);

    const [activeImg, setActiveImg] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [copied, setCopied] = useState(false);

    const sizeV = useMemo(
        () => variant?.find((item: any) => item?.size !== null),
        [variant]
    );

    const productQuantity = useMemo(
        () => getProductQuantity({ product, size, color, unit }),
        [product, size, color, unit]
    );

    const currentVariation = useMemo(() => {
        const colorsAndSizes = vrcolor?.length > 0 && sizeV !== undefined;
        const colorsOnly = vrcolor?.length > 0 && sizeV === undefined;
        const sizesOnly = vrcolor?.length === 0 && sizeV !== undefined;
        const unitsOnly =
            vrcolor?.length === 0 && variant?.[0]?.unit ? true : false;

        return {
            colorsAndSizes,
            colorsOnly,
            sizesOnly,
            unitsOnly,
        };
    }, [vrcolor, sizeV, variant]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const referral = params.get('referral');
        if (referral) {
            saveToLocalStorage('referralCode', referral);
        }
    }, []);

    useEffect(() => {
        if (referralCode) {
            const link = `${document.location.href}?referral=${referralCode}`;
            setReferralLink(link);
        }
    }, [referralCode]);

    useEffect(() => {
        setFilterV(
            variant?.filter((item: any) => item?.color === color?.color)
        );
    }, [color, variant]);

    useEffect(() => {
        variant?.filter((item: any) => {
            if (currentVariation?.colorsAndSizes) {
                if (item?.color === color?.color && item?.size === size?.size) {
                    setVariantId(item?.id);
                }
            }
            if (currentVariation?.unitsOnly) {
                if (item?.unit === unit?.unit) {
                    setVariantId(item?.id);
                }
            }
            if (currentVariation?.colorsOnly) {
                if (item?.color === color?.color) {
                    setVariantId(item?.id);
                }
            }
            if (currentVariation?.sizesOnly) {
                if (item?.size === size?.size) {
                    setVariantId(item?.id);
                }
            }
        });
    }, [variant, size, color, unit, currentVariation]);

    const price = useMemo(
        () => productCurrentPrice(product, variantId),
        [product, variantId]
    );

    const save = useMemo(
        () => howMuchSave(product, variantId),
        [product, variantId]
    );

    const handleAddToCart = () => {
        addToCart({
            dispatch,
            product,
            cartList,
            price,
            qty,
            variant,
            currentVariation,
            variantId,
            unit,
            size,
            color,
            filterV,
            productQuantity,
        });
    };

    const styleCss = `
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
`;

    const buttonSix =
        'btn-hover text-white font-bold sm:py-[16px] py-3 w-60 text-center';

    const sortedLayout = useMemo(() => {
        if (!layout) return [];
        return [...layout].sort((a, b) => a.position - b.position);
    }, [layout]);

    return (
        <div className="px-5 md:px-20">
            <style>{styleCss}</style>
            <div className="py-5">
                {sortedLayout.map((item: any, index: number) => {
                    switch (item.type) {
                        case 'title':
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                        
                                    }}
                                >
                                    <DangerouslySafeHTML
                                        content={item.text || ''}
                                        className="font-semibold mb-4 text-center"
                                    />
                                </div>
                            );
                        case 'subtitle':
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                        
                                    }}
                                >
                                    <DangerouslySafeHTML
                                        content={item.text || ''}
                                        className=" mb-4 text-center"
                                    />
                                </div>
                            );
                        case 'description':
                            return (
                                <div
                                    key={item.id}
                                    className="rounded-md"
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                    }}
                                >
                                    <DangerouslySafeHTML
                                        content={item.text || ''}
                                        className=""
                                    />
                                </div>
                            );
                        case 'button':
                            return (
                                <div
                                    key={item.id}
                                    className="flex justify-center my-3"
                                >
                                    <CheckoutBtn
                                        qty={qty}
                                        setQty={setQty}
                                        variant={variant}
                                        variantId={variantId}
                                        productQuantity={productQuantity}
                                        currentVariation={currentVariation}
                                        color={color}
                                        size={size}
                                        unit={unit}
                                        filterV={filterV}
                                        product={product}
                                        onClick={handleAddToCart}
                                        buttonOne={buttonSix}
                                        productButton={item}
                                    />
                                </div>
                            );
                        case 'image':
                            // Check if this is the first image in the array
                            const isFirstImage =
                                index === 0 ||
                                sortedLayout[index - 1]?.type !== 'image';

                            if (!isFirstImage) return null;

                            // Get all consecutive images
                            const imageGroup = [];
                            let currentIndex = index;
                            while (
                                currentIndex < sortedLayout.length &&
                                sortedLayout[currentIndex]?.type === 'image'
                            ) {
                                imageGroup.push(sortedLayout[currentIndex]);
                                currentIndex++;
                            }

                            return (
                                <div
                                    key={`image-group-${index}`}
                                    className="my-4 flex flex-wrap justify-center gap-6"
                                >
                                    {imageGroup.map((imgItem) => (
                                        <div
                                            key={imgItem.id}
                                            className="flex-1 min-w-[300px] max-w-[500px]"
                                        >
                                            <img
                                                src={productImg + imgItem.link}
                                                alt=""
                                                className="rounded-md w-full h-auto object-cover"
                                            />
                                            {imgItem.text && (
                                                <DangerouslySafeHTML
                                                    content={imgItem.text}
                                                    className=" my-3 text-center"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        case 'product_image':
                            return (
                                <div key={item.id} className="my-4">
                                    <img
                                        src={productImg + product?.image}
                                        alt=""
                                        className="rounded-md w-full h-auto"
                                    />
                                </div>
                            );
                        case 'product_price':
                            return (
                                <div
                                    key={item.id}
                                    className="flex justify-start items-center gap-x-2 my-3"
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                        fontSize:
                                            item.design?.size !== '0'
                                                ? `${item.design?.size}px`
                                                : '16px',
                                    }}
                                >
                                    <p className="font-bold">Price: </p>
                                    <div className="">
                                        <div className="flex justify-start items-center gap-4">
                                            <BDT />
                                            {price}{' '}
                                            {save > 0 && (
                                                <span className="text-gray-500 font-thin line-through">
                                                    <BDT />
                                                    {variantId !== null
                                                        ? save
                                                        : numberParser(
                                                              product?.regular_price
                                                          )}
                                                </span>
                                            )}{' '}
                                        </div>
                                    </div>
                                </div>
                            );
                        case 'product_name':
                            return (
                                <div
                                    key={item.id}
                                    className="mb-3 capitalize text-center my-2"
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                        fontSize:
                                            item.design?.size !== '0'
                                                ? `${item.design?.size}px`
                                                : '16px',
                                    }}
                                >
                                    {product?.name}
                                </div>
                            );
                        case 'product_description':
                            return (
                                <div
                                    key={item.id}
                                    className=" "
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                    }}
                                >
                                    <DangerouslySafeHTML
                                        content={product?.description || ''}
                                        className=""
                                    />
                                </div>
                            );
                        default:
                            return null;
                    }
                })}

<div className="h-max">
                    {currentVariation.colorsAndSizes && (
                        <>
                            <Colors
                                color={color}
                                setColor={setColor}
                                variant_color={variant_color}
                                setSize={setSize}
                                setActiveImg={setActiveImg}
                            />
                            <Sizes
                                size={size}
                                setSize={setSize}
                                variant={filterV}
                                setActiveImg={setActiveImg}
                            />
                        </>
                    )}

                    {currentVariation.unitsOnly && (
                        <Units
                            unit={unit}
                            setUnit={setUnit}
                            variant={variant}
                            setActiveImg={setActiveImg}
                        />
                    )}

                    {currentVariation.colorsOnly && (
                        <ColorsOnly
                            color={color}
                            setColor={setColor}
                            variant={variant}
                            setActiveImg={setActiveImg}
                        />
                    )}

                    {currentVariation.sizesOnly && (
                        <Sizes
                            size={size}
                            setSize={setSize}
                            variant={variant}
                            setActiveImg={setActiveImg}
                        />
                    )}

                    <div className="">
                        <CallForPrice
                            headersetting={headersetting}
                            cls={buttonSix}
                            price={price}
                        />
                    </div>

                    {/* {productQuantity !== 0 && price !== 0 && (
                        <CheckoutBtn
                            qty={qty}
                            setQty={setQty}
                            variant={variant}
                            variantId={variantId}
                            productQuantity={productQuantity}
                            currentVariation={currentVariation}
                            color={color}
                            size={size}
                            unit={unit}
                            filterV={filterV}
                            product={product}
                            onClick={handleAddToCart}
                            buttonOne={buttonSix}
                            productButton={layout?.find(
                                (item: any) => item.type === 'button'
                            )}
                        />
                    )} */}

                    {children}
                </div>

                <CheckOutForm />
            </div>
        </div>
    );
};

export default DetailsLandingPage;

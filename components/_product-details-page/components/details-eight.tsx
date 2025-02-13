'use client';

import BDT from '@/utils/bdt';

import Rate from '@/utils/rate';

import parse from 'html-react-parser';

import { useEffect, useMemo, useState } from 'react';

import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch, RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import CallForPrice from '@/utils/call-for-price';
import { useDispatch, useSelector } from 'react-redux';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';
import { toast } from 'react-toastify';
import AddCartBtn from './add-cart-btn';
import { Colors, ColorsOnly, Sizes, Units } from './imageVariations';
import { HSlider } from './slider';

const DetailsEight = ({
    product,
    design,
    children,
    buttonStyle,
    roundedBtn,
    social,
    headersetting,
}: any) => {
    const { cartList } = useSelector((state: RootState) => state.cart);
    const { referralCode } = useSelector((state: RootState) => state.auth); // Access updated Redux statei

    const dispatch: AppDispatch = useDispatch();

    const { variant, variant_color } = product || [];

    const vrcolor = useMemo(
        () => variant_color?.map((item: any) => item?.color) || [],
        [variant_color]
    );

    const vPrice = useMemo(
        () =>
            variant
                ? variant.map((item: any) => item?.additional_price ?? 0)
                : [0],
        [variant]
    );

    const smallest = Math.min(...vPrice);
    const largest = Math.max(...vPrice);

    const [filterV, setFilterV] = useState<any>([]);

    // all selected state
    const [variantId, setVariantId] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [size, setSize] = useState<any>(null);
    const [unit, setUnit] = useState<any>(null);
    const [qty, setQty] = useState<any>(1);

    // image selector
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
        // Set the referral code to localStorage
        if (referral) {
            saveToLocalStorage('referralCode', referral);
        }
    });

    // Generate the referral link based on the code
    useEffect(() => {
        if (referralCode) {
            const link = `${document.location.href}?referral=${referralCode}`;
            setReferralLink(link);
        }
    }, [referralCode]);

    // Copy the referral link to the clipboard
    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(referralLink)
            .then(() => {
                setCopied(true);
                // Display the toast notification
                toast.success('Link copied!', {
                    position: 'top-right',
                    autoClose: 2000, // close after 2 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => setCopied(false), 2000); // Reset "copied" status after 2 seconds
            })
            .catch((err) => console.error('Failed to copy the link', err));
    };

    // set which color is selected
    useEffect(() => {
        setFilterV(
            variant?.filter((item: any) => item?.color === color?.color)
        );
    }, [color, variant]);

    // set which varient is selected
    useEffect(() => {
        variant?.filter((item: any) => {
            {
                /* color and size  */
            }
            if (currentVariation?.colorsAndSizes) {
                if (item?.color === color?.color && item?.size === size?.size) {
                    setVariantId(item?.id);
                }
            }
            {
                /* unit only */
            }
            if (currentVariation?.unitsOnly) {
                if (item?.unit === unit?.unit) {
                    setVariantId(item?.id);
                }
            }
            {
                /* color only  */
            }
            if (currentVariation?.colorsOnly) {
                if (item?.color === color?.color) {
                    setVariantId(item?.id);
                }
            }
            {
                /* size only  */
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
    const save = howMuchSave(product);
    const parsedRating = numberParser(product?.rating, true);

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
    .select-color {
        border: 1px solid ${design?.header_color};
    }
    .select-size {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .select-unit {
        color : ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-twenty-one {
        color:   ${design?.text_color};
        background:${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-twenty-one:hover {
        color:   ${design?.header_color};
        background:transparent;
        border: 1px solid ${design?.header_color};
    }
    `;

    const buttonEight = buttonStyle
        ? buttonStyle
        : 'cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full cursor-pointer';

    return (
        <div className=" bg-white h-full ">
            <style>{styleCss}</style>
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8">
                <div className="w-[80%]">
                    <HSlider
                        design={design}
                        product={product}
                        variant={variant}
                        activeImg={activeImg}
                        setActiveImg={setActiveImg}
                    />
                </div>
                <div className="space-y-4 sticky top-28 h-max">
                    <h1 className="text-2xl font-bold mb-3 capitalize">
                        {product?.name}
                    </h1>
                    {/* price range  */}
                    {variant?.length !== 0 && !color && !size && !unit && (
                        <div className="flex items-center gap-1">
                            <p className="text-color text-lg font-bold">
                                <BDT />
                                {price + smallest}
                            </p>
                            {largest > smallest && (
                                <p className="text-color text-lg font-bold">
                                    - <BDT />
                                    {price + largest}
                                </p>
                            )}
                            {largest === smallest &&
                                price + smallest !== price && (
                                    <p className="text-gray-500 font-thin line-through text-xl font-seven ml-2">
                                        <BDT />
                                        {price}
                                    </p>
                                )}
                        </div>
                    )}
                    {(variant?.length === 0 || color || size || unit) && (
                        <div className="flex justify-start items-center gap-x-4">
                            <div className="text-color text-lg font-bold flex justify-start items-center gap-4">
                                <BDT />
                                {price}{' '}
                                {save > 0 && (
                                    <span className="text-gray-500 font-thin line-through text-xl font-seven">
                                        <BDT />
                                        {numberParser(product?.regular_price)}
                                    </span>
                                )}{' '}
                            </div>
                            {product?.discount_type === 'percent' &&
                                product?.discount_price > 0 && (
                                    <p className="text-md text-gray-400">
                                        {' '}
                                        {numberParser(product?.discount_price)}%
                                        Off
                                    </p>
                                )}
                        </div>
                    )}
                    <div className="flex items-center gap-x-1 pt-2">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({product?.number_rating})
                        </div>
                    </div>
                    <div className="h-[1px] bg-gray-300 w-full"></div>
                    <div className="text-sm text-[#5a5a5a] leading-6 apiHtml">
                        {parse(`${product?.description?.slice(0, 250)}`)}{' '}
                        {product?.description?.length > 250 && '...'}
                    </div>

                    {/* color and size  */}
                    {currentVariation?.colorsAndSizes && (
                        <>
                            {' '}
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

                    {/* unit only */}
                    {currentVariation?.unitsOnly && (
                        <Units
                            unit={unit}
                            setUnit={setUnit}
                            variant={variant}
                            setActiveImg={setActiveImg}
                        />
                    )}

                    {/* color only  */}
                    {currentVariation?.colorsOnly && (
                        <>
                            {' '}
                            <ColorsOnly
                                color={color}
                                setColor={setColor}
                                variant={variant}
                                setActiveImg={setActiveImg}
                            />
                        </>
                    )}

                    {/* size only  */}
                    {currentVariation?.sizesOnly && (
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
                            cls={buttonEight}
                            price={price}
                        />
                    </div>

                    {productQuantity !== 0 && price !== 0 && (
                        <AddCartBtn
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
                            buttonOne={buttonEight}
                            roundedBtn={roundedBtn}
                        />
                    )}

                    <div className="flex items-center gap-x-3">
                        <div className="">Availability:</div>
                        <div className="text-[#212121] ">
                            {productQuantity !== 0 ? (
                                <p className="space-x-2">
                                    <span className="font-medium">
                                        {productQuantity}
                                    </span>
                                    <span className="text-green-500">
                                        In Stock!
                                    </span>
                                </p>
                            ) : (
                                <span className="text-red-600">
                                    Out of Stock!
                                </span>
                            )}
                        </div>
                    </div>

                    {social && (
                        <div className="flex items-center gap-x-3">
                            <p className="font-medium">Share :</p>
                            <span className="flex space-x-2">
                                <FacebookShareButton url={window.location.href}>
                                    <FacebookIcon size={32} round={true} />
                                </FacebookShareButton>
                                <WhatsappShareButton url={window.location.href}>
                                    <WhatsappIcon size={32} round={true} />
                                </WhatsappShareButton>
                            </span>
                        </div>
                    )}

                    {children}

                    {/* Display the referral link */}
                    <div>
                        {/* Display referral link and copy button */}
                        {referralLink && (
                            <div className="flex items-center gap-4">
                                {/* Underlined referral link */}
                                <p>
                                    Referral Link:{' '}
                                    <a
                                        href={referralLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-600 hover:text-blue-800"
                                    >
                                        {referralLink}
                                    </a>
                                </p>

                                {/* Copy button */}
                                <button
                                    className={`px-2 py-2 font-semibold rounded-lg transition-all duration-300 
                  ${copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                                    onClick={handleCopyLink}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 10h6a2 2 0 002-2v-8a2 2 0 00-2-2h-6a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsEight;

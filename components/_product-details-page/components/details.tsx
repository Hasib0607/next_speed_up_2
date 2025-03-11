'use client';

import BDT from '@/utils/bdt';
import CallForPrice from '@/utils/call-for-price';

import Rate from '@/utils/rate';

import parse from 'html-react-parser';

import { useEffect, useMemo, useState } from 'react';
import { VscCreditCard } from 'react-icons/vsc';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

import { toast } from 'react-toastify';
import { HSlider } from './slider';
import ZoomHSlider from './zoom-slider';

import { Colors, ColorsOnly, Sizes, Units } from './imageVariations';

// helper
import { useDispatch, useSelector } from 'react-redux';

import { numberParser } from '@/helpers/numberParser';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';

import { saveToLocalStorage } from '@/helpers/localStorage';
import { AppDispatch, RootState } from '@/redux/store';

import ProdMultiCategory from '@/utils/prod-multi-category';
import AddCartBtn from './add-cart-btn';
import {
    useGetDesignQuery,
    useGetHeaderSettingsQuery,
} from '@/redux/features/home/homeApi';

const Details = ({ product, children, cod, zoomable, buttonStyle }: any) => {
    const { data: designData } = useGetDesignQuery({});
    const design = designData?.data || {};

    const { data: headerData } = useGetHeaderSettingsQuery({});
    const headersetting = headerData?.data || {};

    const { cartList } = useSelector((state: RootState) => state.cart);
    const { referralCode } = useSelector((state: RootState) => state.auth); // Access updated Redux state

    const dispatch: AppDispatch = useDispatch();

    const { variant, variant_color, category } = product || [];

    const vrcolor = useMemo(
        () => variant_color?.map((item: any) => item?.color) || [],
        [variant_color]
    );

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

    const save = useMemo(
        () => howMuchSave(product, variantId),
        [product, variantId]
    );

    const parsedNumberRating = numberParser(product?.number_rating);
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

    const buttonOne = buttonStyle
        ? buttonStyle
        : 'font-bold text-white bg-gray-600 rounded-md w-60 py-3 text-center lg:cursor-pointer';

    return (
        <div className="grid md:grid-cols-8 grid-cols-1 gap-4 w-full">
            <div className="md:col-span-4 lg2:col-span-3 col-span-1 h-full overflow-hidden">
                <div className="md:col-span-5">
                    {zoomable ? (
                        <ZoomHSlider
                            design={design}
                            product={product}
                            variant={variant}
                            activeImg={activeImg}
                            setActiveImg={setActiveImg}
                        />
                    ) : (
                        <HSlider
                            design={design}
                            product={product}
                            variant={variant}
                            activeImg={activeImg}
                            setActiveImg={setActiveImg}
                        />
                    )}
                </div>
            </div>

            <div className="md:col-span-4 lg2:col-span-4 md:px-2">
                <h2 className="text-xl sm:text-3xl font-semibold text-black">
                    {product?.name}
                </h2>
                <div className="flex flex-col gap-3 sm:mt-6 mt-1">
                    {/* copy from here */}
                    {Array.isArray(category) && category?.length > 0 && (
                        <div className="flex items-center gap-2">
                            <p className="capitalize">
                                {' '}
                                <span className="text-black">
                                    Category:{' '}
                                </span>{' '}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <ProdMultiCategory
                                    category={category}
                                    design={design}
                                    className={'text-[var(--header-color)]'}
                                    commaColor={'text-black'}
                                />
                            </div>
                        </div>
                    )}
                    {/* copy from here */}
                    <div className="flex justify-start items-center gap-2">
                        <div className="text-xs">
                            <Rate rating={parsedRating} />
                        </div>
                        <p>({parsedNumberRating})</p>
                    </div>
                </div>
                <div className="md:divider mt-2"></div>
                <div className="flex justify-start items-center gap-x-4">
                    <div className="text-[#212121] text-2xl font-seven font-bold flex justify-start items-center gap-4">
                        <BDT />
                        {price}{' '}
                        {save > 0 && (
                            <span className="text-gray-500 font-thin line-through text-xl font-seven">
                                <BDT />
                                {variantId !== null ? price + save : numberParser(product?.regular_price)}
                            </span>
                        )}{' '}
                    </div>

                    {product?.discount_type === 'percent' &&
                        product?.discount_price > 0 && (
                            <p className="text-md text-gray-400">
                                {' '}
                                {numberParser(product?.discount_price)}% Off
                            </p>
                        )}
                </div>
                <div className="md:divider mt-2"></div>
                <div className="mb-5">
                    <div className="text-black apiHtml">
                        {parse(`${product?.description?.slice(0, 250)}`)}{' '}
                        {product?.description?.length > 250 && '...'}
                    </div>
                </div>
                {cod && (
                    <>
                        <div className="text-black flex items-center gap-2 mb-5">
                            <VscCreditCard size={20} />
                            <p>Cash on Delivery available</p>
                        </div>
                    </>
                )}

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

                <div className="mt-5">
                    <CallForPrice
                        headersetting={headersetting}
                        cls={buttonOne}
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
                        buttonOne={buttonOne}
                    />
                )}

                <div className="flex items-center gap-x-3">
                    <div className="">Availability:</div>
                    <div className="text-[#212121] ">
                        {productQuantity !== 0 ? (
                            <p>
                                <span className="font-medium">
                                    {productQuantity}
                                </span>{' '}
                                <span className="text-green-500">
                                    In Stock!
                                </span>
                            </p>
                        ) : (
                            <span className="text-red-600">Out of Stock!</span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-x-3 mt-3">
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
    );
};

export default Details;

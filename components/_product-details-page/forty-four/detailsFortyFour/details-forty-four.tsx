'use client';

import BDT from '@/utils/bdt';
import CallForPrice from '@/utils/call-for-price';

import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
} from 'react-share';

import { FaFacebookF, FaSquareWhatsapp } from 'react-icons/fa6';

import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch, RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddToCartBtnFortyFour from '../addToCartBtnFortyFour/add-cart-btn-forty-four';
import {
    Colors,
    ColorsOnly,
    Sizes,
    Units,
} from '../imageVariationFortyFour/image-variations';

import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import HorizontalSlider from '../horizontalSliderFortyFour/horizontal-slider-forty-four';
import Card1 from '@/components/card/card1';
import SectionHeadingFortyFour from '@/components/section-heading/section-heading-forty-four';

const DetailsFortyFour = ({
    product,
    design,
    children,
    frequentProduct = {},
}: any) => {
    const { headersetting } = useSelector((state: RootState) => state.home);
    const store_id = numberParser(design?.store_id) || null;
    const { cartList } = useSelector((state: RootState) => state.cart);
    const { referralCode } = useSelector((state: RootState) => state.auth); // Access updated Redux statei

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

    const hassFrequentProduct = useMemo(
        () => Object.keys(frequentProduct).length !== 0,
        [frequentProduct]
    );

    const handleAddToCart = () => {
        setQty(1);
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
  }
`;

    return (
        <div className="bg-transparent h-full w-auto">
            <style>{styleCss}</style>

            <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                <div className="md:col-span-4 lg:col-span-5 space-y-2 px-3 md:px-0">
                    <HorizontalSlider
                        design={design}
                        product={product}
                        variant={variant}
                        activeImg={activeImg}
                        setActiveImg={setActiveImg}
                    />
                    {hassFrequentProduct && (
                        <>
                            <SectionHeadingFortyFour
                                title={'Frequently Bought Together'}
                            />
                            <Card1 item={frequentProduct} />
                        </>
                    )}
                </div>
                <div className="md:col-span-6 lg:col-span-5 px-3 md:px-0 space-y-4 lg:sticky top-28 h-max">
                    <h2 className="text-2xl text-[#212121] font-light capitalize">
                        {product?.name}
                    </h2>
                    <div className="flex justify-start items-baseline gap-x-2">
                        <div className="flex justify-start items-baseline space-x-2">
                            {save > 0 && (
                                <p className="text-gray-500 font-thin text-sm line-through space-x-1">
                                    <span>
                                        <BDT />
                                    </span>
                                    <span className="text-lg">
                                        {variantId !== null
                                            ? price + save
                                            : numberParser(
                                                  product?.regular_price
                                              )}
                                    </span>
                                </p>
                            )}{' '}
                            <p className="space-x-1">
                                <span>
                                    <BDT />
                                </span>
                                <span className="text-2xl font-bold">
                                    {price}{' '}
                                </span>
                            </p>
                        </div>
                        {product?.discount_type === 'percent' &&
                            product?.discount_price > 0 && (
                                <p className="text-lg text-gray-400">
                                    {numberParser(product?.discount_price)}% Off
                                </p>
                            )}
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

                    <AddToCartBtnFortyFour
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
                    />

                    <div className="">
                        <CallForPrice
                            headersetting={headersetting}
                            price={price}
                        />
                    </div>

                    <div className="h-[1px] bg-gray-900 w-full"></div>

                    <div className="text-sm text-[#5A5A5A] leading-6">
                        <DangerouslySafeHTML content={product?.description} />
                    </div>
                    <div className="flex flex-col items-start gap-x-3">
                        <p className="font-medium">Share:</p>
                        <span className="flex gap-x-2">
                            {/* <FacebookShareButton url={window.location.href}>
                                <FaFacebookF
                                    size={20}
                                    className="hover:text-blue-500"
                                />
                            </FacebookShareButton>
                            <WhatsappShareButton url={window.location.href}>
                                <FaSquareWhatsapp
                                    size={24}
                                    className="hover:text-green-500"
                                />
                            </WhatsappShareButton> */}
                            <FacebookShareButton url={window.location.href}>
                                <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>
                            <WhatsappShareButton url={window.location.href}>
                                <WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                        </span>
                    </div>
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

                    {children}

                    {/* <div className="text-sm flex flex-col gap-y-1 text-[#5a5a5a]">
                        {multiCat && (
                            <div className="flex flex-col gap-3 sm:mt-6 mt-1">
                      
                                {Array.isArray(category) &&
                                    category?.length > 0 && (
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
                                                    className={
                                                        'text-[var(--header-color)]'
                                                    }
                                                    commaColor={'text-black'}
                                                />
                                            </div>
                                        </div>
                                    )}
            
                            </div>
                        )}
                        <p>
                            Availability:{' '}
                            {productQuantity !== 0 ? (
                                <span>
                                    {productQuantity}
                                    In Stock!
                                </span>
                            ) : (
                                'Out Of Stock'
                            )}
                        </p>
                        </div> */}
                </div>
            </div>
        </div>
    );
};

export default DetailsFortyFour;

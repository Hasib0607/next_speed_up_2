'use client';

import BDT from '@/utils/bdt';
import CallForPrice from '@/utils/call-for-price';
import Rate from '@/utils/rate';
import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch, RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import ProdMultiCategory from '@/utils/prod-multi-category';
import QuickView from '@/utils/quick-view';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AddCartBtn from './add-cart-btn-fortythree';
import { Colors, ColorsOnly, Sizes, Units } from './imageVariations-fortythree';
import { ProductSlider } from '../components/product-slider';
import { HSlider } from '../components/slider';
import ZoomHSlider from '../components/zoom-slider';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { PiTruckTrailer } from "react-icons/pi";
import ShareButton from './share-button';

const DetailsFortyThree = ({
    product,
    design,
    children,
    open,
    setOpen,
    multiCat,
    buttonStyle,
    zoomable,
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
    .text-color {
        color:  ${design?.text_color};
    }
    .cart-color {
        color:  ${design?.header_color};
        border-bottom: 2px solid ${design?.header_color};
    }
    .border-hover:hover {
        border: 1px solid ${design?.header_color};
    }
`;

    const buttonSix =
        'btn-hover text-white font-bold sm:py-[16px] py-3 w-60 text-center';

    return (
        <div className="bg-white h-full ">
            <style>{styleCss}</style>
            <div className='bg-gray-100 py-16 mt-20 mb-10'>
                <p className='text-3xl text-center font-bold'>Product</p>
                <p className='text-center'>All / {product?.name}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-5">
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
                <div className="md:col-span-5 space-y-4 lg:sticky top-28 h-max">
                    <h2 className="text-2xl text-[#212121] font-bold mb-3 capitalize">
                        {product?.name}
                    </h2>
                    <div className="text-sm text-[#5a5a5a] leading-6">
                        <DangerouslySafeHTML
                            content={product?.description}
                            className="line-clamp-3"
                        />
                    </div>
                    <Rate rating={parsedRating} />
                    <div className="flex justify-start items-center gap-x-10">
                        <p className="font-bold">Price: </p>
                        <div className="">
                            <div className="text-[#212121] font-seven flex justify-start items-center gap-4">
                                <BDT />
                                {price}{' '}
                                {save > 0 && (
                                    <span className="text-gray-500 font-thin line-through text-xl font-seven">
                                        <BDT />
                                        {variantId !== null
                                            ? save
                                            : numberParser(
                                                  product?.regular_price
                                              )}
                                    </span>
                                )}{' '}
                            </div>
                            {product?.discount_type === 'percent' &&
                                product?.discount_price > 0 && (
                                    <p className="text-md text-gray-400">
                                        {numberParser(product?.discount_price)}%
                                        Off
                                    </p>
                                )}
                        </div>
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
                            cls={buttonSix}
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
                            buttonOne={buttonSix}
                        />
                    )}
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

                    <div className="text-sm flex flex-col gap-y-1 text-[#5a5a5a]">
                        {multiCat && (
                            <div className="flex flex-col gap-3 sm:mt-6 mt-1">
                                {/* copy from here */}
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
                                {/* copy from here */}
                            </div>
                        )}
                        <p className='flex items-center gap-2 my-2'>
                            <PiTruckTrailer /> Estimated deliver 5-7 days
                        </p>
                        {/* <ShareButton /> */}
                    </div>
                </div>
            </div>
            {open && (
                <QuickView open={open} setOpen={setOpen}>
                    <ProductSlider
                        product={product}
                        open={open}
                        setOpen={setOpen}
                        design={design}
                    />
                </QuickView>
            )}
        </div>
    );
};

export default DetailsFortyThree;

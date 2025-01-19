"use client";

import BDT from "@/utils/bdt";
import Rate from "@/utils/rate";

import parse from "html-react-parser";

import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { saveToLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch, RootState } from '@/redux/store';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import CallForPrice from '@/utils/call-for-price';
import { toast } from 'react-toastify';

import { FaShippingFast } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { BiSolidCustomize } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { HSlider } from "../components/slider";
import { Colors, ColorsOnly, Sizes, Units } from "../components/imageVariations";
import AddCartBtn from "../components/add-cart-btn";
import { useRouter } from "next/navigation";

const DetailsFortyOne = ({
  product, design, children, buttonStyle
}: any) => {
  const { headersetting } = useSelector(
    (state: RootState) => state.home
);

const { cartList } = useSelector((state: RootState) => state.cart);
const { referralCode } = useSelector((state: RootState) => state.auth); // Access updated Redux statei

const dispatch: AppDispatch = useDispatch();
 const router = useRouter();

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

const price = productCurrentPrice(product);
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
        color:   ${design?.text_color};
        background:${design?.header_color};
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
    .cart-btn-forty-one {
        color:   ${design?.header_color};
        background:${design?.text_color};
        border: 1px solid ${design?.header_color};
    }
    .cart-btn-twenty-one:hover {
        color:   ${design?.header_color};
        background:transparent;
        border: 1px solid ${design?.header_color};
    }
  `;
  const buttonFortyOne = buttonStyle
  ? buttonStyle
  : "cart-btn-twenty-one font-bold py-[11px] px-10 w-max rounded-full"

  return (
    <div className=" bg-white h-full ">
      <style>{styleCss}</style>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
        <HSlider
                        design={design}
                        product={product}
                        variant={variant}
                        activeImg={activeImg}
                        setActiveImg={setActiveImg}
                    />
        </div>
        <div className="space-y-4 sticky top-28 h-max">
          <h2 className="text-2xl font-bold mb-3 capitalize">
            {product?.name}
          </h2>
          {/* price range  */}
          {variant?.length !== 0 && !color && !size && !unit && (
            <div className="flex items-center gap-1">
              <p
                className="text-color text-lg font-bold"
              >
                <BDT />
                {price + smallest}
              </p>
              {largest > smallest && (
                <p
                  className="text-color text-lg font-bold"
                >
                  {" "}
                  - <BDT />  {price + largest}
                </p>
              )}
              {largest === smallest && (
                <p className="text-gray-500 font-thin line-through text-xl font-seven ml-2">
                  <BDT />
                  {price}
                </p>
              )}
            </div>
          )}
          {(variant?.length === 0 || color || size || unit) &&
              <div className="flex justify-start items-center gap-x-4">
                <div
                  className={`text-color text-lg font-bold flex justify-start items-center gap-4`}
                >
                  <BDT />
                                {price}{' '}
                                {save > 0 && (
                                    <span className="text-gray-500 font-thin line-through text-xl font-seven">
                                        <BDT />
                                        {numberParser(product?.regular_price)}
                                    </span>
                                )}{' '}
                </div>
                {product?.discount_type === "percent" &&
                  product?.discount_price > 0 && (
                    <p className="text-md text-gray-400">
                      {" "}
                      {numberParser(product?.discount_price)}% Off
                    </p>
                  )}
              </div>
           }

<div className="flex gap-x-1 pt-2">
                        <div>
                            <Rate rating={parsedRating} />
                        </div>
                        <div className="text-gray-500 sm:text-sm text-xs">
                            ({product?.number_rating})
                        </div>
                    </div>
          <div className="h-[1px] bg-gray-300 w-full"></div>
          <div className="text-sm text-[#5a5a5a] leading-6 apiHtml">
            {parse(`${product?.description?.slice(0, 300)}`)}{" "}
            {product?.description?.length > 300 && "..."}
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
                                <span className="text-red-600">
                                    Out of Stock!
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="">
                        <CallForPrice
                            headersetting={headersetting}
                            cls={buttonFortyOne}
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
                            buttonOne={buttonFortyOne}
                        />
                    )}

{children}

          {/* Display the referral link */}
          <div>
            {/* Display referral link and copy button */}
            {referralLink && (
              <div className="flex items-center gap-4">
                {/* Underlined referral link */}
                <p>
                  Referral Link:{" "}
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
                  ${copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"} text-white`}
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

          <div className="grid sm:grid-cols-2 gap-5">
            <div
              className="bg-[#FEF2F2] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/terms_and_condition")}
            >
              <FaShippingFast className="text-2xl" />
              <p className="font-bold mt-1">Free shipping</p>
              <p className="text-sm text-gray-600">Nationwide Free Delivery</p>
            </div>
            <div className="bg-[#F0F9FF] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer">
              <TbTruckReturn className="text-2xl" />
              <p className="font-bold mt-1">Do it your installation</p>
              <p className="text-sm text-gray-600">
                (DIY) do-it-yourself installation within 10 minutes
              </p>
            </div>
            <div
              className="bg-[#F0FDF4] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <BiSolidCustomize className="text-2xl" />
              <p className="font-bold mt-1">Easy Customization</p>
              <p className="text-sm text-gray-600">
                Call Us to know more. +8801678004256
              </p>
            </div>
            <div
              className="bg-[#FFFBEB] h-28 w-full rounded-md flex flex-col justify-center pl-5 cursor-pointer"
              onClick={() => router.push("/contact")}
            >
              <FaHome className="text-2xl" />
              <p className="font-bold mt-1">Remodelling your Home?</p>
              <p className="text-sm text-gray-600">
                We provide full turnkey solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsFortyOne;
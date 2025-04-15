/* eslint-disable no-case-declarations */
'use client';

import BDT from '@/utils/bdt';
import { getProductQuantity } from '@/helpers/getProductQuantity';
import { howMuchSave, productCurrentPrice } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import { AppDispatch } from '@/redux/store';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { productImg } from '@/site-settings/siteUrl';
import CheckoutBtn from './components/checkout-btn';
import CheckOutForm from './checkout-form/checkout-form';
import { addToCart } from './components/add-to-cart';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getEmbedYoutubeUrl } from '@/components/you-tube/components/getEmbedYoutubeUrl';

const DetailsLandingPage = ({
    product,
    design,
    headersetting,
    children,
}: any) => {
    const store_id = numberParser(design?.store_id) || null;
    const router = useRouter();

    const dispatch: AppDispatch = useDispatch();

    const youtubeVideoLink = product?.video_link;
    const embedUrl = youtubeVideoLink
        ? getEmbedYoutubeUrl(youtubeVideoLink)
        : null;

    const { variant, variant_color, layout } = product || {};

    // Add ref for checkout form
    const checkoutFormRef = useRef<HTMLDivElement>(null);

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
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // Determine if product has variants
    const hasVariants = useMemo(
        () => Object.values(currentVariation).some((val) => val),
        [currentVariation]
    );

    // Scroll to form handler
    const scrollToForm = () => {
        checkoutFormRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

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

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const success = addToCart({
                dispatch,
                product,
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

            if (success) {
                router.push('/checkout');
            }
        } catch (error) {
            toast.error('Failed to proceed to checkout');
        } finally {
            setIsLoading(false);
        }
    };

    const styleCss = `
    .btn-hover:hover {
        color:   ${design?.text_color};
        background:${design?.header_color};
    }
`;

    const buttonStyle =
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
                                        ['--color' as any]:
                                            item.design?.color || '#f1593a',
                                    }}
                                    className="layout-custom-styles"
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
                                        ['--color' as any]:
                                            item.design?.color || '#f1593a',
                                    }}
                                    className="layout-custom-styles"
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
                                    style={{
                                        backgroundColor:
                                        item.design?.bg_color || '#ffffff',
                                        ['--color' as any]:
                                        item.design?.color || '#f1593a',
                                    }}
                                    className="layout-custom-styles flex justify-center items-center"
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
                                        setQty={setQty}
                                        variantId={variantId}
                                        productQuantity={productQuantity}
                                        onClick={handleCheckout}
                                        buttonStyle={buttonStyle}
                                        productButton={item}
                                        product={product}
                                        hasVariants={hasVariants}
                                        scrollToForm={scrollToForm}
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
                                            className="flex-1 min-w-[300px] max-w-[500px] layout-custom-styles"
                                            style={{
                                                backgroundColor:
                                                item.design?.bg_color || '#ffffff',
                                                ['--color' as any]:
                                                item.design?.color || '#f1593a',
                                            }}
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
                                        className="md:rounded-md w-full h-auto"
                                    />
                                </div>
                            );
                        case 'product_price':
                            return (
                                <div
                                    key={item.id}
                                    className="flex justify-center items-center gap-x-2 my-3"
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
                                        <div className="flex items-center gap-4">
                                            <BDT />
                                            {price}{' '}
                                            {save > 0 &&
                                                price !==
                                                    product?.calculate_regular_price && (
                                                    <span className="text-gray-500 font-thin line-through">
                                                        <BDT />
                                                        {variantId !== null
                                                            ? save
                                                            : numberParser(
                                                                  product?.calculate_regular_price
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
                                    style={{
                                        backgroundColor:
                                        item.design?.bg_color || '#ffffff',
                                        ['--color' as any]:
                                        item.design?.color || '#f1593a',
                                    }}
                                    className="layout-custom-styles flex justify-center items-center" 
                                >
                                    <DangerouslySafeHTML
                                        content={product?.description || ''}
                                        className=""
                                    />
                                </div>
                            );
                        case 'product_video_link':
                            return (
                                <div
                                    key={item.id}
                                    className="my-5"
                                    style={{
                                        backgroundColor:
                                            item.design?.bg_color || '#ffffff',
                                        color: item.design?.color || '#f1593a',
                                    }}
                                >
                                    {embedUrl && (
                                        <iframe
                                            className="youtube-embed"
                                            width="100%"
                                            height="500"
                                            src={`${embedUrl}?autoplay=1`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}

                <CheckOutForm
                    ref={checkoutFormRef}
                    product={product}
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
                    onClick={handleCheckout}
                    buttonStyle={buttonStyle}
                    setColor={setColor}
                    variant_color={variant_color}
                    setSize={setSize}
                    setActiveImg={setActiveImg}
                    setUnit={setUnit}
                    price={price}
                    handleCheckout={handleCheckout}
                />
            </div>
        </div>
    );
};

export default DetailsLandingPage;

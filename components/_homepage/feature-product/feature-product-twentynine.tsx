'use client';
import Details from '@/components/_product-details-page/components/details';
import SectionHeadingTwentyNine from '@/components/section-heading/section-heading-twentynine';
import { productCurrentPrice } from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import BDT from '@/utils/bdt';
import QuickView from '@/utils/quick-view';
import Rate from '@/utils/rate';
import parse from 'html-react-parser';
import Link from 'next/link';
import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const FeatureProductTwentyNine = ({ feature_product, design }: any) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { cartList } = useSelector((state: RootState) => state.cart);

    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headerdata || {};
    const featuredProduct = custom_design?.feature_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = featuredProduct;

    if (feature_product.length === 0) {
        return null;
    }

    const styleCss = `
    .bg-color {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .btn-feature-product {
        color: ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
    .btn-feature-product:hover {
        color: ${design?.text_color};
        border: 1px solid ${design?.header_color};
    }
 `;

    const item = feature_product[0] || {};

    const price = productCurrentPrice(item);

    const handleAddToCart = () => {
        if (item?.variant?.length > 0) {
            setOpen(!open);
        } else {
            addToCart({
                dispatch,
                product: item,
                cartList,
                price,
                qty: 1,
                productQuantity: item?.quantity,
            });
        }
    };

    return (
        <div className="sm:container px-5 sm:py-10 py-5 w-full">
            <style>{styleCss}</style>
            <div>
                <SectionHeadingTwentyNine
                    title={title}
                    title_color={title_color}
                />
            </div>
            <div className="md:grid lg2:grid-cols-2 md:grid-cols-1 gap-5">
                <div className="hidden md:block w-full">
                    {feature_product?.slice(0, 1)?.map((productData: any) => (
                        <div
                            key={productData.id}
                            className="grid grid-cols-2 gap-x-3 p-5 justify-items-center group"
                        >
                            <Link
                                href={
                                    '/product/' +
                                    productData?.id +
                                    '/' +
                                    productData?.slug
                                }
                            >
                                <div className="w-full relative">
                                    <img
                                        src={productImg + productData?.image[0]}
                                        alt=""
                                        className="h-auto min-w-full"
                                    />
                                    <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
                                </div>
                            </Link>
                            <div>
                                <Link
                                    href={
                                        '/product/' +
                                        productData?.id +
                                        '/' +
                                        productData?.slug
                                    }
                                >
                                    <p>{productData?.name}</p>
                                </Link>
                                <Rate rating={productData?.rating} />
                                <div className="flex items-center gap-2">
                                    <p className="text-sm py-1 rounded-lg">
                                        <BDT price={price} />
                                    </p>
                                    <h1 className="line-through text-xs">
                                        {productData?.discount_type ===
                                            'no_discount' ||
                                        productData?.discount_price ===
                                            '0.00' ? (
                                            ' '
                                        ) : (
                                            <p>
                                                {' '}
                                                <BDT
                                                    price={
                                                        productData?.regular_price
                                                    }
                                                />
                                            </p>
                                        )}
                                    </h1>
                                </div>
                                <div>
                                    {parse(
                                        `${productData?.description?.slice(0, 250)}`
                                    )}{' '}
                                    {productData?.description?.length > 250 &&
                                        '...'}
                                </div>

                                {productData?.quantity !== '0' && (
                                    <div
                                        onClick={handleAddToCart}
                                        className=" bg-black text-white flex px-2 py-2 justify-center gap-1 items-center lg:cursor-pointer mt-10"
                                    >
                                        <FaCartPlus />
                                        <p className="">Add to Cart</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5">
                    {feature_product?.slice(1, 5)?.map((productData: any) => (
                        <div
                            key={productData.id}
                            className="grid grid-cols-2 gap-x-5 group"
                        >
                            <div className="h-full w-full relative">
                                <img
                                    src={productImg + productData?.image[0]}
                                    alt=""
                                    className="h-auto min-w-full"
                                />
                                <div className="absolute bg-gray-100 z-[1] group-hover:h-full h-0 w-full left-0 bottom-0 bg-opacity-10 duration-500 "></div>
                            </div>
                            <div>
                                <Link
                                    href={
                                        '/product/' +
                                        productData?.id +
                                        '/' +
                                        productData?.slug
                                    }
                                >
                                    <p>{productData?.name}</p>
                                </Link>
                                <Rate rating={productData?.rating} />
                                <div className="flex flex-col gap-1">
                                    <p className="text-sm py-1 rounded-lg">
                                        <BDT price={price} />
                                    </p>
                                    <h1 className="line-through text-xs">
                                        {productData?.discount_type ===
                                            'no_discount' ||
                                        productData.discount_price ===
                                            '0.00' ? (
                                            ' '
                                        ) : (
                                            <p>
                                                {' '}
                                                <BDT
                                                    price={
                                                        productData.regular_price
                                                    }
                                                />
                                            </p>
                                        )}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <QuickView open={open} setOpen={setOpen}>
                <Details data={{ product_id: feature_product[0]?.id }} />
            </QuickView>
        </div>
    );
};

export default FeatureProductTwentyNine;

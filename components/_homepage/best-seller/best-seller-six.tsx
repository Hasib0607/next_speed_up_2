'use client';
import Card7 from '@/components/card/card7';
import SectionHeadingSix from '@/components/section-heading/section-heading-six';
import GridSliderFive from '@/components/slider/grid-slider/grid-slider-five';

import { productImg } from '@/site-settings/siteUrl';
import ArrowSquare from '@/utils/arrow-square';

import { useDispatch, useSelector } from 'react-redux';

import { SwiperSlide } from 'swiper/react';

import './best-seller-six.css';
import { RootState } from '@/redux/store';
import { productCurrentPrice } from '@/helpers/littleSpicy';
import BDT from '@/utils/bdt';
import { useState } from 'react';
import { addToCart } from '@/utils/_cart-utils/cart-utils';

const BestSellerSix = ({ product, design }: any) => {
    const dispatch = useDispatch();

    const { cartList } = useSelector((state: RootState) => state.cart);
    const [open, setOpen] = useState(false);

    const prev = 'feature_product_prev';
    const next = 'feature_product_next';

    const price = productCurrentPrice(product);
    const store = useSelector((state: RootState) => state.appStore.store); // Access updated Redux state
    const store_id = store?.id || null;

    const headersetting = useSelector(
        (state: RootState) => state.home.headersetting
    ); // Access updated Redux state
    const { custom_design } = headersetting || {};

    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    const handleAddToCart = () => {
        if (product?.variant?.length > 0) {
            setOpen(!open);
        } else {
            addToCart({
                dispatch,
                product: product,
                cartList,
                price,
                qty: 1,
                productQuantity: product?.quantity,
            });
        }
    };

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="">
                <SectionHeadingSix
                    title={title || 'Best Sellers '}
                    subtitle={''}
                    title_color={title_color || '#000'}
                />
                <div
                    className="grid grid-cols-1 mt-10 lg:grid-cols-3 md:grid-cols-2 py-3 group"
                    style={{ border: '2px solid #f5f5f5', padding: '10px' }}
                >
                    <div className="lg:col-span-1 md:col-span-2 mt-4 px-4">
                        <img
                            className="w-full xl:h-[520px] lg:h-[520px] block m-auto h-auto object-cover object-center"
                            src={productImg + product[1]?.image[0]}
                            alt=""
                        />
                        <div className="mt-3">
                            <div
                                className="font-sans text-lg sm:text-base font-normal antialiased mb-2 card5itemCategory"
                                style={{
                                    height: '25px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    width: '130px',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {product[1]?.name.charAt(0).toUpperCase() +
                                    product[1]?.name.slice(1)}
                            </div>
                            <BDT price={price} />
                            <div onClick={handleAddToCart}>
                                <button
                                    className="border py-2 px-6 mt-2 font-semibold font-six"
                                    style={{
                                        background: design?.header_color,
                                        color: design?.text_color,
                                    }}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                    {product?.length > 0 && (
                        <div className="lg:col-span-2 md:col-span-2 relative bestSellerCustomHover">
                            <div className="flex px-1 -top-10 absolute inset-1 items-center">
                                <ArrowSquare prevEl={prev} nextEl={next}>
                                    {' '}
                                </ArrowSquare>
                            </div>
                            {/* start here */}
                            <GridSliderFive
                                prevEl={prev}
                                nextEl={next}
                                isLoop={product?.length > 1}
                            >
                                {product?.map((item: any) => (
                                    <SwiperSlide
                                        className="swiperjs-slide"
                                        key={item?.id}
                                    >
                                        <Card7
                                            item={item}
                                            design={design}
                                            store_id={store_id}
                                        />
                                    </SwiperSlide>
                                ))}
                            </GridSliderFive>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BestSellerSix;

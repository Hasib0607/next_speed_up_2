'use client';

import Card7 from '@/components/card/card7';
import SectionHeadingSix from '@/components/section-heading/section-heading-six';
import GridSliderFive from '@/components/slider/grid-slider/grid-slider-five';
import { productCurrentPrice } from '@/helpers/littleSpicy';
import { RootState } from '@/redux/store';
import { productImg } from '@/site-settings/siteUrl';
import { addToCart } from '@/utils/_cart-utils/cart-utils';
import ArrowSeventeenHero from '@/utils/arrow-seventeen-hero';
import BDT from '@/utils/bdt';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import './best-seller-six.css';
import Image from 'next/image';

const BestSellerSix = ({ product, design, headersetting }: any) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { cartList } = useSelector((state: RootState) => state.cart);

    const prev = 'feature_product_prev';
    const next = 'feature_product_next';

    const price = productCurrentPrice(product[1]);

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    const handleAddToCart = () => {
        if (product[1]?.variant?.length > 0) {
            router.push('/product/' + product[1]?.id + '/' + product[1]?.slug);
        } else {
            addToCart({
                dispatch,
                product: product[1],
                cartList,
                price,
                qty: 1,
                productQuantity: product[1]?.quantity,
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
                <div className="grid grid-cols-1 mt-10 lg:grid-cols-3 md:grid-cols-2 gap-2 p-4 group border-2 border-[#f5f5f5]">
                    <div className="flex flex-col gap-y-2 lg:col-span-1 md:col-span-2">
                        <Image
                            className="w-full xl:h-[520px] lg:h-[520px] block h-auto object-cover object-center"
                            src={productImg + product[1]?.image[0]}
                            alt={`${product[1]?.name}`}
                            width={500}
                            height={500}
                        />
                        <div>
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
                            <div>
                                <button
                                    onClick={handleAddToCart}
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
                    <div className="lg:col-span-2 md:col-span-2 relative bestSellerCustomHover">
                        <ArrowSeventeenHero nextEl={next} prevEl={prev} />
                        {/* start here */}
                        <GridSliderFive
                            prevEl={prev}
                            nextEl={next}
                        >
                            {product?.length > 0 &&
                                product?.map((item: any) => (
                                    <SwiperSlide key={item?.id}>
                                        <Card7 item={item} />
                                    </SwiperSlide>
                                ))}
                        </GridSliderFive>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellerSix;

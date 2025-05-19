'use client';

import Card77 from '@/components/card/card77';
import SectionHeadingThirtyFour from '@/components/section-heading/section-heading-thirtyfour';
import Link from 'next/link';

const BestSellerThirtyFour = ({
    best_sell_product,
    design,
    headersetting,
}: any) => {
    const styleCss = `
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }

    .dynamic-hover {
        background-color: var(--header-color);
        color: var(--text-color);
        transition: all 0.3s;
    }

    .dynamic-hover:hover {
        filter: brightness(85%);
    }
 `;

    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="">
            <div className="sm:container px-5 sm:py-10 py-5">
                <style>{styleCss}</style>
                <div className="relative arrow-hov">
                    <div className="text-center mb-5">
                        <SectionHeadingThirtyFour
                            title={title || 'Best Sell Product'}
                            title_color={title_color || '#000'}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-5">
                        {best_sell_product?.length > 0 &&
                            best_sell_product?.slice(0, 8)?.map((item: any) => (
                                <div key={item.id}>
                                    <Card77 item={item} />
                                </div>
                            ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Link
                            href="/shop"
                            className="inline-block px-6 py-2 rounded dynamic-hover"
                        >
                            Shop All
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellerThirtyFour;

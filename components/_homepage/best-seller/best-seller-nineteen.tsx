'use client';

import Card39 from '@/components/card/card39';
import Link from 'next/link';

const BestSellerNineteen = ({ best_sell_product, headersetting }: any) => {
    const { custom_design } = headersetting || {};
    const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
    const { title = 'Default Title', title_color = '#000' } = bestSellProduct;

    return (
        <div className="bg-[#faf8f1]">
            <div className="sm:container px-5 grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-10 py-16">
                <div className="">
                    <p
                        style={{ color: title_color || '#000' }}
                        className="text-sm"
                    >
                        {title || 'BEST CATEGORIES'}
                    </p>

                    <p>
                        Amet minim mollit non deserunt ullamco est sit aliqua
                        dolor do amet sint. Exercitation veniam. Amet minim
                        mollit non deserunt ullamco est sit aliqua dolor do amet
                        sint. <br />
                        Exercitation veniam.
                    </p>
                    <Link href="/shop">
                        <button className="tracking-wider hover:bg-[#f7f3e3] bg-[#F1EBD1] text-[#2c291d] border border-black px-3 py-2 mt-10">
                            SHOP NOW
                        </button>
                    </Link>
                </div>
                <div className="md:col-span-2">
                    <div className="grid sm:grid-cols-2 gap-5">
                        {best_sell_product?.length > 0 &&
                            best_sell_product
                                ?.slice(0, 2)
                                ?.map((item: any) => (
                                    <Card39 item={item} key={item?.id} />
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSellerNineteen;

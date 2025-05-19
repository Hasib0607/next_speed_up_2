import { brandImg } from '@/site-settings/siteUrl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BrandForFortySix = ({ headersetting, brands }: any) => {
    const { custom_design } = headersetting || {};
    const brandData = custom_design?.brand || {};
    return (
        <div className="relative w-full">
            <div className="relative z-10 flex h-full items-center justify-center text-start">
                <div className="px-4 md:px-8">
                    <h1 className="mb-6 text-3xl font-bold md:text-4xl text-center">
                        {brandData?.[0]?.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6 text-center">
                        {brandData?.[0]?.subtitle}
                    </p>
                    <div className="py-5">
                        {brands?.data?.data?.map((item: any) => (
                            <Link href={`/brand/${item?.id}`} key={item?.id}>
                                <div className="flex items-center justify-between gap-1 my-3 border p-1 px-3 cursor-pointer hover:shadow transition">
                                    <div className="relative w-14 h-14 overflow-hidden group">
                                        <Image
                                            className="w-full h-full object-cover border rounded-lg p-1"
                                            src={brandImg + item?.image}
                                            alt={item.name}
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                    <h3 className="font-bold text-lg">
                                        {item?.name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandForFortySix;

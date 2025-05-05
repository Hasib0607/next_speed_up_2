import { brandImg } from '@/site-settings/siteUrl';
import Image from 'next/image';
import React from 'react';

const BrandFortyFour = ({ headersetting, brands }: any) => {
    const { custom_design } = headersetting || {};
    const brandData = custom_design?.brand || {};
    return (
        <>
            <div className="relative w-full">
                <div className="relative z-10 flex h-full items-center justify-center text-start">
                    <div className="px-4 md:px-8">
                        <h1 className="mb-6 text-3xl font-bold md:text-4xl text-center">
                            {brandData?.[0]?.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-center">
                            {brandData?.[0]?.subtitle}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 py-5">
                            {brands?.map((item: any) => (
                                <div
                                    className="flex flex-col items-center gap-1 my-3"
                                    key={item.id}
                                >
                                    <div className="relative w-14 md:w-20 h-14 md:h-20 rounded-full overflow-hidden group">
                                        <Image
                                            className="w-full h-full object-cover"
                                            src={brandImg + item.image}
                                            alt={item.name}
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                    <h3>{item.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BrandFortyFour;

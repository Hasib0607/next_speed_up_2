import { brandBgImg, brandImg } from '@/site-settings/siteUrl';
import Image from 'next/image';
import React from 'react';

const BrandFortyThree = ({ headersetting, brands }: any) => {
    const { custom_design } = headersetting || {};
    const brandData = custom_design?.brand || {};

    return (
        <div className="relative h-screen w-full">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${brandBgImg + brandData?.[0]?.bg_image || ''})`,
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full items-center justify-start md:justify-end pr-0 md:pr-80 text-start">
                <div className="max-w-2xl px-4 md:px-8">
                    <h1 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                        {brandData?.[0]?.title}
                    </h1>
                    <p className="text-lg text-gray-200 md:text-xl mb-6">
                        {brandData?.[0]?.subtitle}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 py-5">
                        {brands?.map((item: any) => (
                            <div
                                className="text-white flex items-center gap-3 my-3"
                                key={item.id}
                            >
                                <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full overflow-hidden group">
                                    <Image
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-100"
                                        src={brandImg + item.image}
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                    />
                                    <div className="absolute inset-0 bg-gray-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out opacity-50"></div>
                                </div>
                                <h3>{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandFortyThree;

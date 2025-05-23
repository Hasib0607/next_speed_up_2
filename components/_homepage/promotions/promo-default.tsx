import { bannerImg } from '@/site-settings/siteUrl';
import { Banner, BannerProps } from '@/types/banner';
import Link from 'next/link';
import React from 'react';

const DefaultPromo = ({ banner }: BannerProps) => {
    return (
        <div className="bg-white py-8 container">
            <div className="flex flex-wrap justify-between mx-4 md:mx-0 items-center gap-4 px-6">
                {banner?.length > 0 &&
                    banner?.map((ban: Banner) => (
                        <div
                            key={ban?.id}
                            className="w-full sm:w-[45%] md:w-[30%] h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden"
                        >
                            <Link
                                href={`${process.env.NEXT_PUBLIC_BASE}/design/homepage/banner`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="w-full h-full hover:scale-[1.03] transition-all duration-200 ease-in"
                                    src={bannerImg + ban.image}
                                    alt=""
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DefaultPromo;

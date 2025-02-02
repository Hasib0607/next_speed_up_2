import { bannerImg } from '@/site-settings/siteUrl';
import { Banner, BannerProps } from '@/types';
import React from 'react';

const PromoBottomDefault = ({ banner }: BannerProps) => {
    
    return (
        <div className="bg-white py-8">
            <div className="container">
                <div className="flex flex-wrap justify-between mx-4 md:mx-0  items-center gap-4 px-6">
                    {banner?.length > 0 &&
                        banner?.map((ban: Banner) => (
                            <div
                                key={ban.id}
                                className="w-full sm:w-[45%] md:w-[30%] h-[200px] sm:h-[300px] md:h-[350px] overflow-hidden"
                            >
                                <img
                                    className="w-full h-full hover:scale-[1.03] transition-all duration-200 ease-in"
                                    src={bannerImg + ban.image}
                                    alt=""
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PromoBottomDefault;

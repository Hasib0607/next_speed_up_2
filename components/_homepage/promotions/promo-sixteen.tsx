import { bannerImg } from '@/site-settings/siteUrl';
import React from 'react';
const PromoSixteen = ({ banner }: any) => {
    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="flex gap-8 flex-col lg:flex-row">
                <div className="basis-1/2">
                    {banner?.slice(0, 1).map((ban: any) => (
                        <div
                            key={ban?.id}
                            className="relative overflow-hidden "
                        >
                            <a
                                href={ban?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="w-full xl:h-[520px] lg:h-[450px] h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                    src={bannerImg + ban?.image}
                                />
                            </a>
                        </div>
                    ))}
                </div>
                <div className="basis-1/2">
                    {banner?.slice(1, 3).map((ban: any) => (
                        <div
                            key={ban?.id}
                            className="relative overflow-hidden flex flex-col mb-[30px]"
                        >
                            <a
                                href={ban?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="w-full xl:h-[245px] lg:h-[210px] h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                    src={bannerImg + ban?.image}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoSixteen;

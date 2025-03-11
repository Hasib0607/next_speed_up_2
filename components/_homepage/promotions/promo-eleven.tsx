import { bannerImg } from '@/site-settings/siteUrl';
import React from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';

const PromoEleven = ({ banner }: any) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap gap-8">
                {banner?.length > 0 &&
                    banner?.slice(0, 3)?.map((ban: any) => (
                        <div
                            key={ban?.id}
                            className="relative overflow-hidden rounded-xl "
                        >
                            <a
                                href={ban?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="min-h-[150px] min-w-full object-cover object-center"
                                    src={bannerImg + ban?.image}
                                />
                            </a>
                            {ban?.link && (
                                <div className="absolute bottom-2 left-4 justify-start items-center ">
                                    <button className="rounded-lg py-2 px-6 mt mt-2 xl:mt-8 lg:mt-8 md:mt-8 hover:pr-8 duration-500 font-bold flex gap-4 justify-between item-center bg-[var(--header-color)] text-[var(--text-color)]">
                                        {' '}
                                        Shop now{' '}
                                        <AiOutlineArrowRight className="mt-1 ml-2 xl:ml-0  text-base" />{' '}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoEleven;

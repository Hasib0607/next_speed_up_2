'use client';
import React from 'react';
import { sliderImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const HeroFortyFive = ({ slider, design }: any) => {
    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .hero-btn {
        border: 1px solid ${bgColor};
        color: ${bgColor};  
    }
    .hero-btn:hover {
        border: 1px solid ${bgColor};
        color: ${textColor};
        background: ${bgColor};
    }
    `;

    // Take the first slider item if available
    const singleSlide = slider?.[0];

    return (
        <div className="relative">
            <style>{styleCss}</style>
            {singleSlide && (
                <div className="relative">
                    <img
                        className="min-h-[200px] w-full object-cover"
                        src={`${sliderImg}${singleSlide.image}`}
                        alt={singleSlide.title || 'Hero image'}
                    />
                    <div className="mt-32 md:mt-16">
                        <div
                            style={{ color: singleSlide?.color }}
                            className="absolute z-[1] text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] md:max-w-[450px] px-4 sm:px-0 flex flex-col gap-y-2 md:gap-y-4 items-center"
                        >
                            {singleSlide?.link && (
                                <Link
                                    href={singleSlide?.link ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h1 className="lg:px-6 px-3 md:py-2 py-1 hero-btn duration-300 lg:text-base text-xs sm:text-center w-max md:mx-auto lg:cursor-pointer uppercase font-medium">
                                        Explore
                                    </h1>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroFortyFive;

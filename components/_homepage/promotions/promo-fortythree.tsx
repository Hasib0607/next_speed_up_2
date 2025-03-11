"use client"

import { useEffect, useState } from 'react';
import { bannerImg } from '@/site-settings/siteUrl';

const PromoFortyThree = ({ banner }: any) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="bg-white pb-10 relative overflow-hidden">
            {/* Third Image - Fixed Background only inside this section */}
            {banner?.length > 2 && (
                <div
                    className="absolute top-10 left-0 w-full h-[120vh] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bannerImg + banner[2]?.image})`,
                        transform: `translateY(${scrollY * 0.3}px)`, // Parallax Effect
                    }}
                />
            )}

            {/* Wrapper for first two banners */}
            <div className="relative z-10">
                <div className="grid sm:grid-cols-2">
                {banner?.slice(0, 2)?.map((ban: any) => (
                        <div key={ban.id} className="relative overflow-hidden">
                            {/* Image Container */}
                            <div className="min-h-[150px] overflow-hidden">
                                <img
                                    alt="gallery"
                                    className="w-full h-full object-cover object-center hover:scale-110 ease-in-out duration-1000"
                                    src={bannerImg + ban?.image}
                                />
                            </div>
                            <a href={ban?.link} target="_blank" rel="noopener noreferrer">
                                <div
                                    className="absolute border border-[var(--text-color)] hover:border-[var(--header-color)] px-6 py-3 duration-300 uppercase text-sm font-medium text-[var(--text-color)] hover:bg-[var(--header-color)]
                                bottom-10 left-1/2 transform -translate-x-1/2 sm:bottom-60 sm:right-20 sm:left-auto sm:translate-x-0"
                                >
                                    Details
                                </div>
                            </a>
                            <div className='h-0 md:h-36'></div>
                        </div>
                    ))}
                </div>

                {/* Details Button for Third Image */}
                {banner?.length > 2 && (
                    <div className="mt-10 flex justify-center relative z-10">
                        <a href={banner[2]?.link} target="_blank" rel="noopener noreferrer">
                            <div
                                className="border border-[var(--text-color)] hover:border-[var(--header-color)] px-6 py-3 duration-300 uppercase text-sm font-medium text-[var(--text-color)] hover:bg-[var(--header-color)]"
                            >
                                Details
                            </div>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PromoFortyThree;



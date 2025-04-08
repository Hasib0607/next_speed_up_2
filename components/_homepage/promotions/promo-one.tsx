import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import React from 'react';

const PromoOne = ({ banner }: any) => {
    return (
        <>
            {banner?.length > 0 &&
                banner?.map((ban: any) => (
                    <div
                        className="sm:container px-5 sm:py-10 py-5"
                        key={ban?.id}
                    >
                        <Link
                            href={ban?.link ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={bannerImg + ban?.image}
                                alt=""
                                className="min-w-full object-cover h-auto object-center"
                            />
                        </Link>
                    </div>
                ))}
        </>
    );
};

export default PromoOne;

import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoFortyEight = ({ banner }: any) => {
    const ban = banner?.[0];

    if (!ban) return null;

    return (
        <div className="bg-white py-10 container px-5">
            <div className="">
                <div className="relative overflow-hidden">
                    <img
                        alt="gallery"
                        className="min-h-[150px] min-w-full object-cover object-center hover:scale-105 ease-in-out duration-700"
                        src={bannerImg + ban?.image}
                    />
                    <Link
                        href={ban?.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="absolute menu-hover hover:underline hover:-translate-y-2 duration-300 hover:font-semibold bottom-1/2 left-1/2 uppercase text-white font-bold">
                            Shop Now
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PromoFortyEight;

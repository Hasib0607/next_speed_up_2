import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoBottomFortyEight = ({ banner }: any) => {
    const singleBanner = banner?.[0];

    return (
        singleBanner && (
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="relative overflow-hidden">
                    <img
                        alt="gallery"
                        className="min-h-[150px] min-w-full object-cover object-center block"
                        src={bannerImg + singleBanner.image}
                    />
                    <Link
                        href={singleBanner?.link ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="absolute menu-hover hover:underline hover:-translate-y-2 duration-300 hover:font-semibold bottom-1/2 left-1/2 uppercase text-white font-bold">
                            Shop Now
                        </div>
                    </Link>
                </div>
            </div>
        )
    );
};

export default PromoBottomFortyEight;

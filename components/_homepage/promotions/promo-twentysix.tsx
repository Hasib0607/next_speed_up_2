import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoTwentySix = ({ banner }: any) => {

    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="grid sm:grid-cols-2 gap-6">
                {banner?.length > 0 &&
                    banner?.map((ban: any) => (
                        <div
                            key={ban?.id}
                            className="overflow-hidden rounded-lg"
                        >
                            <Link
                                href={ban?.link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="relative">
                                    <img
                                        alt="gallery"
                                        className="overflow-hidden h-auto min-w-full object-cover object-center lg:cursor-pointer ease-in-out duration-700 rounded-lg"
                                        src={bannerImg + ban?.image}
                                    />
                                    <div className="absolute bg-black top-0 left-0 h-full w-full z-[1] hover:bg-opacity-20 bg-opacity-0"></div>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoTwentySix;

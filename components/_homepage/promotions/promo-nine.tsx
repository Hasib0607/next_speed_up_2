import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoNine = ({ banner }: any) => {
    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="grid sm:grid-cols-2 gap-6">
                {banner?.length > 0 &&
                    banner?.map((ban: any) => (
                        <div key={ban.id} className="relative overflow-hidden">
                            {ban?.link && (
                                <Link
                                    href={ban?.link ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex font-twelve lg:px-5 px-2 lg:py-2 py-1 text-black lg:text-lg text-xs shop-link w-max z-[5] absolute xl:bottom-20 lg:bottom-32 bottom-10 lg:cursor-pointer xl:left-[60px] lg:left-32 md:left-[120px] left-[60px] bg-transparent border-black border duration-500 items-center space-x-1">
                                        <h1 className="">SHOP NOW</h1>
                                    </div>
                                </Link>
                            )}
                            <img
                                alt="gallery"
                                className="h-auto min-w-full object-cover object-center hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                src={bannerImg + ban?.image}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoNine;

import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoFive = ({ banner }: any) => {
    return (
        <div className="bg-white py-10 container px-5">
            <div className="grid sm:grid-cols-2 gap-6">
                {banner?.length > 0 &&
                    banner?.map((ban: any) => (
                        <div key={ban.id} className="relative overflow-hidden">
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
                                <div className="absolute menu-hover hover:underline hover:-translate-y-2 duration-300 hover:font-semibold bottom-10 left-10 uppercase text-sm font-medium text-white ">
                                    Shop Now
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoFive;

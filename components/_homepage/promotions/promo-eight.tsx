import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoEight = ({ banner }: any) => {
    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                {banner?.length > 0 &&
                    banner?.map((banner: any) => (
                        <div
                            key={banner?.id}
                            className="w-full h-full overflow-hidden"
                        >
                            <Link
                                href={banner?.link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="h-auto min-w-full object-cover object-center hover:scale-[1.03] transition-all duration-200 ease-in"
                                    src={bannerImg + banner?.image}
                                    alt=""
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoEight;

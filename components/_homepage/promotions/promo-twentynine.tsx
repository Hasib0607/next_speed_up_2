import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import './promo-three.css';

const PromoTwentyNine = ({ banner }: any) => {
    
    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 ">
                {banner?.length > 0 &&
                    banner?.map((ban: any) => (
                        <div
                            key={ban?.id}
                            className="shine-three shine-three-one"
                        >
                            <Link
                                href={ban?.link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="w-full h-auto lg:cursor-pointer ease-in-out duration-700"
                                    src={bannerImg + ban?.image}
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoTwentyNine;

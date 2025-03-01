import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoThirtyFour = ({ banner }: any) => {
    return (
        <div className="bg-[#F9F8FF]">
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    {banner?.length > 0 &&
                        banner?.map((ban: any) => (
                            <div
                                key={ban.id}
                                className="relative overflow-hidden"
                            >
                                <Link
                                    href={`${ban?.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        alt="gallery"
                                        className="w-full hover:scale-125 object-cover object-center block h-auto lg:cursor-pointer ease-in-out duration-100"
                                        src={bannerImg + ban.image}
                                    />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PromoThirtyFour;

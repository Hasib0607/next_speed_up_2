import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoSix = ({ banner }: any) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5 bg-white">
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6">
                {banner?.length > 0 &&
<<<<<<< HEAD
                    banner?.slice(0, 3)?.map((ban: any) => (
                        <div key={ban?.id} className="relative overflow-hidden">
                            <a
=======
                    banner?.map((ban: any) => (
                        <div key={ban?.id} className="relative overflow-hidden">
                            <Link
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                                href={ban?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="w-full object-cover object-center block h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                    src={bannerImg + ban?.image}
                                />
<<<<<<< HEAD
                            </a>
=======
                            </Link>
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                            <div className="absolute top-0 bottom-0 left-4 flex justify-start items-center "></div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoSix;

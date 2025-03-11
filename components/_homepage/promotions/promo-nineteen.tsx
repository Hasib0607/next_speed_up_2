import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoNineteen = ({ banner }: any) => {
    return (
        <div className="bg-white ">
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center sm:justify-between gap-4">
                    {banner?.length > 0 &&
<<<<<<< HEAD
                        banner?.slice(0, 2)?.map((item: any) => (
=======
                        banner?.map((item: any) => (
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                            <div
                                key={item?.id}
                                className="h-auto min-w-full overflow-hidden"
                            >
<<<<<<< HEAD
                                <a
=======
                                <Link
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                                    href={item?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={bannerImg + item?.image}
                                        alt=""
                                        className="min-w-full h-auto object-cover hover:scale-[1.06] transition-all duration-300  ease-linear"
                                    />
<<<<<<< HEAD
                                </a>
=======
                                </Link>
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PromoNineteen;

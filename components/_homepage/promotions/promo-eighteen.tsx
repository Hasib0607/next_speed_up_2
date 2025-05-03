import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoEighteen = ({ banner }: any) => {
    return (
        <div className="bg-white sm:container px-5 sm:py-10 py-5">
                <div className="grid sm:grid-cols-2 gap-6">
                    {banner?.length > 0 &&
                        banner?.map((ban: any) => (
                            <div
                                key={ban?.id}
                                className="relative overflow-hidden"
                            >
                                <Link
                                    href={ban?.link ?? '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        alt="gallery"
                                        className="min-h-[150px] min-w-full object-cover object-center block hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                        src={bannerImg + ban?.image}
                                    />
                                </Link>
                                <div className="absolute top-0 bottom-0 left-4 flex justify-start items-center "></div>
                            </div>
                        ))}
                </div>
        </div>
    );
};

export default PromoEighteen;

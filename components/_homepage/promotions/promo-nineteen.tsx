import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoNineteen = ({ banner }: any) => {
    return (
        <div className="bg-white ">
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center sm:justify-between gap-4">
                    {banner?.length > 0 &&
                        banner?.map((item: any) => (
                            <div
                                key={item?.id}
                                className="h-auto min-w-full overflow-hidden"
                            >
                                <Link
                                    href={item?.link ?? "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={bannerImg + item?.image}
                                        alt=""
                                        className="min-w-full h-auto object-cover hover:scale-[1.06] transition-all duration-300  ease-linear"
                                    />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PromoNineteen;

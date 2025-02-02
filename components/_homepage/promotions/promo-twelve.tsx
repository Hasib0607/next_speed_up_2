import { bannerImg } from '@/site-settings/siteUrl';

const PromoTwelve = ({ banner }: any) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5 bg-white">
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 ">
                {banner?.length > 0 && banner?.slice(0, 3)?.map((ban: any) => (
                    <div key={ban?.id} className="relative group">
                        <a
                            href={ban?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                alt="gallery"
                                className="w-full block lg:h-48 xl:h-60 md:h-32 h-60 lg:cursor-pointer ease-in-out duration-700"
                                src={bannerImg + ban?.image}
                            />
                        </a>
                        <div className="absolute inset-[4%] border-[3px] border-white group-hover:opacity-100 opacity-0 transition-all duration-500 ease-linear"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromoTwelve;

import { bannerImg } from '@/site-settings/siteUrl';

const PromoThirtyOne = ({ banner, design }: any) => {

    return (
        <div style={{ backgroundColor: `${design?.header_color}` }}>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {banner?.length > 0 && banner?.slice(0, 4)?.map((ban: any) => (
                        <div key={ban?.id} className="relative overflow-hidden">
                            <a
                                href={ban?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    alt="gallery"
                                    className="min-w-full h-auto hover:scale-105 lg:cursor-pointer ease-in-out duration-700"
                                    src={bannerImg + ban.image}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromoThirtyOne;

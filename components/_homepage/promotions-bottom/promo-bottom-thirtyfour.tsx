import { bannerImg } from '@/site-settings/siteUrl';

const PromoBottomThirtyFour = ({ banner }: any) => {
    return (
        <div className="bg-[#F9F8FF] sm:container px-5 sm:py-10 py-5">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {banner?.length > 0 &&
                    banner?.map((ban: any) => (
                        <div key={ban?.id} className="relative overflow-hidden">
                            <img
                                alt="gallery"
                                className="w-full hover:scale-125 object-cover object-center block h-auto lg:cursor-pointer ease-in-out duration-100"
                                src={bannerImg + ban?.image}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PromoBottomThirtyFour;

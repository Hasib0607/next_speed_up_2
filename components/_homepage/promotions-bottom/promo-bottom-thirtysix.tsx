import { bannerImg } from '@/site-settings/siteUrl';

const PromoBottomThirtySix = ({ banner }: any) => {
    return (
        banner?.length > 0 && (
            <div className="sm:container px-5 sm:py-10 py-5">
                {banner?.map((ban: any) => (
                    <div key={ban.id} className="relative overflow-hidden">
                        <img
                            alt="gallery"
                            className="w-full object-cover object-center block h-auto"
                            src={bannerImg + ban.image}
                        />
                    </div>
                ))}
            </div>
        )
    );
};

export default PromoBottomThirtySix;

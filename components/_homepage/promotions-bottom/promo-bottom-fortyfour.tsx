import { bannerImg } from '@/site-settings/siteUrl';

const PromoBottomFortyFour = ({ banner }: any) => {
    const singleBanner = banner?.[0];

    return (
        singleBanner && (
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="relative overflow-hidden h-96">
                    <img
                        alt="gallery"
                        className="w-full h-full object-cover object-center block"
                        src={bannerImg + singleBanner.image}
                    />
                </div>
            </div>
        )
    );
};

export default PromoBottomFortyFour;

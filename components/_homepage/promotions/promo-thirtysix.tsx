import { bannerImg } from '@/site-settings/siteUrl';

const PromoThirtySix = ({ banner }: any) => {
    const styleCss = `
    .promo-bg {
        color: var(--text-color);
        background-color: var(--header-color);
        border: 1px solid var(--text-color);
    }
    .shadow-banner{
        box-shadow: 5px 5px black,5px 5px 0 2px white;
    }
    `;

    return (
        <div className="">
            <style>{styleCss}</style>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {banner?.length > 0 &&
                        banner?.map((ban: any) => (
                            <div
                                key={ban?.id}
                                className="relative overflow-hidden"
                            >
                                <img
                                    alt="gallery"
                                    className="w-full object-cover object-center block h-auto"
                                    src={bannerImg + ban?.image}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PromoThirtySix;

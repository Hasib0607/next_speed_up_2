import SectionHeadingTwentyFive from '@/components/section-heading/section-heading-twenty-five';
import { bannerImg } from '@/site-settings/siteUrl';

const PromoTwentyFive = ({ banner }: any) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            <div className="mt-0 ">
                <SectionHeadingTwentyFive title={'Banner'} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-x-3 gap-y-3">
                {banner?.length > 0 &&
                    banner?.slice(0, 2)?.map((b: any) => (
                        <a
                            href={b?.link}
                            key={b?.id}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="min-h-[100px] min-w-full object-cover object-center"
                                src={bannerImg + b?.image}
                                alt=""
                            />
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default PromoTwentyFive;

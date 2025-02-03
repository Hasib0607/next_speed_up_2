import { bannerImg } from '@/site-settings/siteUrl';

const PromoFourteen = ({ banner }: any) => {

    return (
        <>
            {banner?.length > 0 && (
                <div className="sm:container px-5 sm:py-10 py-5">
                    <div className="grid grid-cols-2 gap-8 ">
                        <div className="lg2:col-span-1 col-span-2 grid grid-cols-2 gap-8">
                            {banner
                                ?.slice(0, 4)
                                ?.map((item: any, index: number) => (
                                    <div className="col-span-1" key={index}>
                                        <a
                                            href={item?.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                className="min-h-[150px] min-w-full object-cover object-center"
                                                src={bannerImg + item?.image}
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                ))}
                        </div>
                        <div className="lg2:col-span-1 col-span-2 ">
                            {banner?.length > 5 && banner
                                ?.slice(4, 5)
                                ?.map((item: any, index: number) => (
                                    <div className="" key={index}>
                                        <img
                                            className="min-h-[345px] w-full object-cover object-center"
                                            src={bannerImg + item?.image}
                                            alt=""
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PromoFourteen;

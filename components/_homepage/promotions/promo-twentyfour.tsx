import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoTwentyFour = ({ banner }: any) => {
    const styleCss = `
        .bg-color {
            color: var(--text-color);
            background-color: var(--header-color);
        }
    `;

    return (
        <div className="bg-white py-8">
            <style>{styleCss}</style>
            {banner?.map((ban: any) => (
                <div
                    key={ban?.id}
                    className="sm:grid grid-cols-4 overflow-hidden "
                >
                    <div className="col-span-3">
                        <img
                            alt="gallery"
                            className="min-w-full h-auto"
                            src={bannerImg + ban?.image}
                        />
                    </div>
                    <div className="col-span-1 sm:bg-[#E0CDBC] flex justify-center items-center sm:mb-0 sm:mt-0 mb-20 -mt-10">
                        <div className="bg-color relative group w-max">
                            <p className="absolute bg-black bg-opacity-20 top-0 left-0 right-0 scale-x-0 group-hover:scale-x-100 transform origin-[0%_100%] group-hover:ease-[cubic-bezier(0.52,1.64,0.87,.70)] ease-[cubic-bezier(0.52,1.64,0.87,0.66)]  duration-500 bottom-0"></p>
                            <Link
                                href={ban?.link ?? '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h1 className="lg:px-14 px-3 lg:py-4 py-2 relative z-[2] duration-300 lg:text-base text-xs w-max lg:cursor-pointer uppercase font-medium">
                                    DISCOVER MORE
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PromoTwentyFour;

import './featuredcat-thirtynine.css';
import { catImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import { IoIosArrowRoundForward } from 'react-icons/io';

const FeaturedThirtyNine = ({ category, design }: any) => {
    const styleCss = `
    .feature-category-prev:hover {
      color:  ${design?.text_color};
      background: ${design?.header_color};
    }
      .feature-category-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    `;

    return (
        <div className="">
            <div className="sm:container px-5 sm:py-10 py-5 relative">
                <style>{styleCss}</style>

                <div
                    className={`translate-y-[25px] duration-1000 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5 justify-center rounded-md`}
                >
                    {category?.map((item: any, id: number) => (
                        <Card key={id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedThirtyNine;

const Card = ({ item }: any) => {
    return (
        <>
            <Link href={'/category/' + item.id}>
                <div className="relative group shine overflow-hidden hover:rotate-1 hover:shadow-2xl duration-[2000ms] ease-in rounded-md">
                    <div className="flex justify-center items-center h-full">
                        <img
                            src={catImg + item?.banner}
                            alt="catImage"
                            className="h-auto min-w-full rounded-md"
                        />
                    </div>
                </div>
                <div className="w-full px-2 py-2 flex items-center gap-3 flex-wrap">
                    <p className="text-gray-800 text-xs md:text-base">
                        {item.name}
                    </p>
                    <IoIosArrowRoundForward className="text-2xl" />
                </div>
            </Link>
        </>
    );
};

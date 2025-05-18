import { catImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const FeaturedFortySeven = ({ category, design }: any) => {
    const bgColor = design?.header_color;

    const styleCss = `
  .category-hover:hover {
    color:  ${bgColor};
    border-bottom: 3px solid ${bgColor};  
  }
    `;

    return (
        <div>
            <style>{styleCss}</style>
            <div className="sm:container px-5 sm:py-10 py-5">
                <div className="md:grid-cols-2 gap-5 bg-white grid ">
                    {category?.slice(0, 2)?.map((item: any) => (
                        <div key={item.id}>
                            <FeatureCatFortySeven item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedFortySeven;

const FeatureCatFortySeven = ({ item }: any) => {
    return (
        <div>
            <Link
                href={`/category/${item.id}`}
                className="relative h-auto w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100 "
            >
                <img
                    src={catImg + item.banner}
                    className="h-full w-full hover:scale-105 duration-500"
                    alt=""
                />
                <div className="absolute top-1/4 -translate-y-1/2 uppercase text-black">
                    <span
                        className={`text-3xl font-bold text-white category-hover`}
                    >
                        {item.name}
                    </span>
                </div>
            </Link>
        </div>
    );
};

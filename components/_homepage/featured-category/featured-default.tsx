'use client';
import { RootState } from '@/redux/store';
import { iconImg } from '@/site-settings/siteUrl';
import { useSelector } from 'react-redux';

const DefaultFeaturedCategory = ({ category }: any) => {
    const headerdata = useSelector(
        (state: RootState) => state.home.headersetting
    );
    const { custom_design } = headerdata || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};
    return (
        <div className="bg-gray-50 py-10">
            <div className="container">
                <h3
                    style={{ color: title_color }}
                    className="font-bold text-center tracking-widest text-3xl my-3"
                >
                    {title || 'Featured Category'}
                </h3>

                <div className="flex flex-wrap justify-center gap-4 py-4">
                    {category?.map((cat: any) => (
                        <div
                            key={cat.id}
                            className="rounded-lg bg-white w-32 h-32"
                        >
                            <div className="flex justify-center items-center">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE}/design/homepage/featurecategory`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={iconImg + cat.icon}
                                        alt=""
                                        className="h-20 w-20"
                                    />
                                </a>
                            </div>
                            <p className="py-2 text-base font-semibold text-center">
                                {cat.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DefaultFeaturedCategory;

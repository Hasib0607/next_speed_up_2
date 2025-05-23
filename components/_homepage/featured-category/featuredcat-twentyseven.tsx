'use client';

import bgImg from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat.svg';
import bgImg1 from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat1.svg';
import bgImg2 from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat2.svg';
import bgImg3 from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat3.svg';
import bgImg4 from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat4.svg';
import bgImg5 from '@/components/_homepage/featured-category/twentyseven-bg-img/bg-cat5.svg';
import { useEffect } from 'react';
import { iconImg, productImg } from '@/site-settings/siteUrl';
import Link from 'next/link';
import { useState } from 'react';
import { useGetCategoryProductQuery } from '@/redux/features/products/productApi';
import Image from 'next/image';

const FeaturedTwentySeven = ({ category, design, headersetting }: any) => {
    const [id, setId] = useState(category[0]?.id);
    const [products, setProducts] = useState([]);

    const { data, isLoading, isFetching, isError, isSuccess } =
        useGetCategoryProductQuery({ id });

    useEffect(() => {
        if (isSuccess && data) {
            setProducts(data?.data?.products);
        }
    }, [data, isSuccess]);

    const bgColor = design?.header_color;
    const textColor = design?.text_color;

    const styleCss = `
    .feature_cat_prev:hover {
        color:${textColor};
        background:${bgColor};
    }
    .feature_cat_next:hover {
        color:${textColor};
        background:${bgColor};
    }
    `;

    const { custom_design } = headersetting || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } = featureCategory || {};

    return (
        <div className="sm:container px-5 sm:py-10 py-5 ">
            <style>{styleCss}</style>
            <div className="bg-gray-100 px-5 sm:py-10 py-5 rounded-3xl">
                <div className="text-2xl md:text-5xl text-black font-semibold mb-14 text-center">
                    <p style={{ color: title_color }}>
                        {title || 'Start exploring.'}
                    </p>
                </div>

                <div className="bg-white flex flex-wrap justify-around lg:rounded-full rounded-md py-2 shadow-2xl xl:mx-40 mx-0 px-5 mb-14">
                    {category?.length > 0 && category?.slice(0, 5)?.map((item: any, index: number) => (
                        <div className="" key={index}>
                            <FeatureCatSix item={item} setId={setId} id={id} />
                        </div>
                    ))}
                </div>

                <div>
                    {products && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {products
                                ?.slice(0, 3)
                                ?.map((item: any, id: any) => (
                                    <Link
                                        key={item.id}
                                        href={`/category/${item.id}`}
                                    >
                                        <div className="bg-white h-72 mt-5 rounded-xl relative">
                                            <p className="text-2xl font-medium pt-40 pl-5">
                                                {item?.name}
                                            </p>
                                            <p className="text-lg font-medium pt-5 pl-5">
                                                See all collection
                                            </p>
                                            <div className="absolute top-5 left-5 w-24 h-24 flex justify-center items-center bg-blue-200 overflow-hidden rounded-full">
                                                <img
                                                    src={
                                                        productImg +
                                                        item?.image[0]
                                                    }
                                                    alt=""
                                                    className="h-24 w-24 object-cover"
                                                />
                                            </div>
                                            <div className="absolute bottom-5 -right-5">
                                                <Image
                                                    src={
                                                        [
                                                            bgImg,
                                                            bgImg1,
                                                            bgImg2,
                                                            bgImg3,
                                                            bgImg4,
                                                            bgImg5,
                                                        ][id] || ''
                                                    }
                                                    alt=""
                                                    className="h-40"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedTwentySeven;

const FeatureCatSix = ({ item, setId, id }: any) => {
    return (
        <div>
            <div
                onClick={() => setId(item?.id)}
                className={`flex items-center gap-2 py-2 lg:px-5 px-3 rounded-full  ${
                    id === item?.id && 'bg-gray-800 text-white'
                }`}
            >
                <div>
                    <img
                        src={iconImg + item.icon}
                        className="lg:h-5 h-3"
                        alt=""
                    />
                </div>
                <div className="">
                    <h1
                        className={`lg:text-lg text-sm font-semibold menu-hover lg:cursor-pointer`}
                    >
                        {item.name} <span>({item?.total_products})</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

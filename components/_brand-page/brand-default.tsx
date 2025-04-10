'use client';

import { getPathName } from '@/helpers/littleSpicy';
import MotionLink from '@/utils/motion-link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandCard from './_components/brand-card';
import BrandTitle from './_components/brand-title';
import BrandTitleBorder from './_components/brand-title-border';
import { useGetCategoryQuery } from '@/redux/features/category/categoryApi';

const BrandDefault = ({ brands }: any) => {
    const pathName = usePathname();
    const currentPath = getPathName(pathName);

    const { data: categoryData } = useGetCategoryQuery({});
    const category = categoryData?.data || [];

    return (
        <div className="container p-5">
            <div className="text-sm my-4 ">
                <ul className="flex items-center gap-x-2">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>{'>'}</li>
                    <li>{currentPath}</li>
                </ul>
            </div>
            <div className="grid grid-cols-12 gap-x-5">
                <div className="hidden lg:block lg:col-span-3">
                    <div className="flex flex-col gap-4">
                        <div className="border border-gray-100 p-4 bg-white rounded shadow">
                            <BrandTitle text={'Category'} color={'black'} />
                            <BrandTitleBorder />

                            <nav className="list-none mb-6 space-y-3 px-4">
                                {category?.map((item: any) => (
                                    <MotionLink
                                        key={item?.id}
                                        text={item?.name}
                                        href={'/category/' + item?.id}
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9 w-full">
                    {brands?.length ? (
                        <div className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                            {brands?.map((item: any) => (
                                <BrandCard key={item?.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center h-[400px] items-center">
                            <h3 className="font-sans font-semibold text-3xl text-gray-400">
                                Brand Not Found!
                            </h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandDefault;

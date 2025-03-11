'use client';

import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useGetPageQuery } from '@/redux/features/page/pageApi';
import { useGetFeatureProductQuery } from '@/redux/features/products/productApi';
import Card7 from '@/components/card/card7';

const MenuFortyThree = ({ openMenu, menu, menuLoading }: any) => {
    const { data: pageData } = useGetPageQuery({});
    const page = pageData?.data || [];

    const {
            data: featureProductData,
            isLoading: featureProductLoading,
            isSuccess: featureProductSuccess,
        } = useGetFeatureProductQuery({});
        const feature_product = featureProductData?.data || [];

    return (
        <nav>
            <ul
                className={`lg:flex lg:flex-row  lg:justify-center gap-10 font-seven text-[16px] `}
            >
                {menu?.length > 0 &&
                    menu?.slice(0, 5)?.map((item: any) => (
                        <div key={item.id} className="group relative">
                            <li
                                className={`menu-seven relative ${openMenu ? 'py-4' : 'py-4'}`}
                            >
                                <Link
                                    href={
                                        item?.custom_link ||
                                        (item?.url ? `/${item?.url}` : '/')
                                    }
                                >
                                    <h1
                                        className={`border-menu flex items-center `}
                                    >
                                        {item.name}
                                        {item.name === 'Shop' && (
                                            <span>
                                                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500 ease-linear lg:cursor-pointer inline" />
                                            </span>
                                        )}
                                    </h1>
                                </Link>
                                {item.name === 'Shop' && (
                                    <div className="absolute z-50 group-hover:block hidden bg-gray-50 w-[900px] left-[-600%] top-[100%] p-4">
                                        <div className="flex flex-wrap flex-col sm:flex-col lg:flex-row">
                                            {feature_product
                                                ?.slice(0, 5)
                                                ?.map((item: any) => (
                                                    <div
                                                        className="w-full sm:w-1/2 lg:w-1/5 p-2"
                                                        key={item?.id}
                                                    >
                                                        <Card7
                                                            item={item}
                                                            key={item?.id}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        </div>
                    ))}

                <li className="relative group menu-seven flex items-center justify-between">
                    <div
                        className={`border-menu lg:cursor-pointer font-seven ${
                            openMenu ? 'py-4' : 'py-4'
                        }`}
                    >
                        <h1>
                            Pages{' '}
                            <span>
                                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500  ease-linear lg:cursor-pointer inline " />
                            </span>
                        </h1>
                    </div>
                    <div
                        className={`absolute z-50 group-hover:block hidden bg-gray-50 w-[250px] left-[-50%] lg:cursor-pointer ${
                            openMenu ? 'top-[100%]' : 'top-[100%]'
                        }`}
                    >
                        {menuLoading ? (
                            <Skeleton className="h-4 w-[200px]" />
                        ) : (
                            <>
                                {page?.length > 0 &&
                                    page?.map(
                                        (pageItem: any, index: number) => (
                                            <div
                                                key={pageItem?.id}
                                                className="relative"
                                            >
                                                <div
                                                    className={`px-6 py-2 hover:bg-gray-200 ${index !== pageItem.length - 1 ? 'border-b' : ''}`}
                                                >
                                                    <Link
                                                        href={
                                                            '/' + pageItem?.link
                                                        }
                                                    >
                                                        <h1 className="menu-hover font-seven text-sm text-black">
                                                            {pageItem?.name}{' '}
                                                        </h1>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default MenuFortyThree;

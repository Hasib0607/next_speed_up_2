'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import OvalLoader from '@/components/loaders/oval-loader';
import { useGetPageDataQuery } from '@/redux/features/page/pageApi';
import { getPathName } from '@/helpers/littleSpicy';
import { numberParser } from '@/helpers/numberParser';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';

// Define the type for the
interface PageData {
    name: string;
    details: string;
    slug: string;
    [key: string]: any;
}

const About = ({ design, menu, page }: any) => {
    const pathName = usePathname();
    const currentPath = getPathName(pathName);
    const store_id = numberParser(design?.store_id) || null;

    const pageItems = useMemo(
        () => page?.find((item: any) => item?.link === currentPath),
        [page, currentPath]
    );

    const slug = pageItems?.slug;

    const [pageDetails, setPageDetails] = useState<PageData | null>(null);

    const {
        data: pageDetailsData,
        isLoading: pageDetailsLoading,
        isSuccess: pageDetailsSuccess,
        isError: pageDetailsError,
    } = useGetPageDataQuery({ store_id, slug });

    useEffect(() => {
        if (pageDetailsSuccess) {
            const pageData = pageDetailsData?.data || {};

            setPageDetails(pageData);
        }
    }, [pageDetailsData, pageDetailsSuccess, pageDetails]);

    const currentLinks = page?.filter(
        (item: any) =>
            !menu?.find((menuItem: any) => menuItem.url === item.link)
    );

    if (pageDetailsLoading && !pageDetailsError) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <OvalLoader />
            </div>
        );
    }

    const styleCss = `
        .page-menu .active {
            color:  ${design?.text_color};
            font-weight: 700;
            background: ${design?.header_color};
        }
    `;

    return (
        <div
            className={`${
                design?.header === 'fourteen'
                    ? 'lg:mt-[80px]'
                    : design?.header === 'twentytwo'
                      ? 'lg:mt-[80px]'
                      : design?.header === 'twentyseven'
                        ? 'mt-[80px]'
                        : design?.header === 'twentyfive'
                          ? 'mt-[80px]'
                          : design?.header === 'thirtyfive'
                            ? 'mt-[80px]'
                            : 'lg:mt-[0px]'
            }`}
        >
            <style>{styleCss}</style>

            {pageDetails && (
                <div className="sm:container px-5 sm:py-10 py-5 lg:flex justify-between gap-20">
                    <div className="">
                        <h1 className="font-bold text-3xl pb-10">
                            {pageDetails?.name}
                        </h1>
                        {/*  Directly pass details */}
                        <DangerouslySafeHTML content={pageDetails?.details} />
                    </div>

                    <div
                        className={`lg:flex hidden flex-col border-2 rounded-md h-max sticky top-20 page-menu ${
                            design?.template_id === '34'
                                ? 'border-white'
                                : 'border-black'
                        }`}
                    >
                        {menu?.map((item: any, id: any) => (
                            <Link
                                key={id}
                                href={`/${item?.url}`}
                                className={`border-b ${
                                    design?.template_id === '34'
                                        ? 'border-white'
                                        : 'border-black'
                                } last:border-b-0 border-solid py-2 px-5 w-[250px]`}
                            >
                                <div>
                                    <h1>{item?.name}</h1>
                                </div>
                            </Link>
                        ))}
                        {currentLinks?.map((item: any, index: any) => (
                            <Link
                                key={index}
                                href={`/${item?.link}`}
                                className={`border-b ${
                                    design?.template_id === '34'
                                        ? 'border-white'
                                        : 'border-black'
                                } last:border-b-0 border-solid py-2 px-5 w-[250px]`}
                            >
                                <div>
                                    <h1>{item?.name}</h1>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {currentPath === 'contact' && store_id === 3685 && (
                <div className="relative w-full mt-[100px]">
                    <div style={{ width: '100%' }}>
                        <iframe
                            title="map"
                            width={'100%'}
                            height={'600'}
                            frameBorder="0"
                            scrolling="no"
                            src="https://maps.google.com/maps?q=23%C2%B045'54.1%22N%2090%C2%B025'41.0%22E&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                        >
                            <a href="https://www.gps.ie/farm-gps/">farm gps</a>
                        </iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;

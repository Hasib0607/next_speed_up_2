'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import parse from 'html-react-parser';
import OvalLoader from '@/components/loaders/oval-loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetPageDataQuery } from '@/redux/features/page/pageApi';

// Define the type for the `data` you are fetching
interface PageData {
    name: string;
    details: string;
    slug: string;
}

const AboutPage = () => {
    const [pageDetails, setPageDetails] = useState<PageData | null>(null);

    const home = useSelector((state: RootState) => state?.home);
    const { design, menu } = home || {};

    const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
    const { page } = useSelector((state: RootState) => state.page); // Access updated Redux state

    const store_id = store?.id || null;

    const [slug, setSlug] = useState(null);
    const pathname = usePathname();
    const currentPath = pathname?.toLowerCase().split('/')[1];

    const {
        data: pageDetailsData,
        isLoading: pageDetailsLoading,
        isSuccess: pageDetailsSuccess,
        isError: pageDetailsError,
    } = useGetPageDataQuery({ store_id, slug });

    useEffect(() => {
        const result = page?.find((item: any) => item?.link === currentPath);

        if (result) {
            setSlug(result?.slug);
        }
    }, [page, pathname, store_id]);

    useEffect(() => {
        if (pageDetailsSuccess) {
            const pageData = pageDetailsData?.data || {};
            setPageDetails(pageData);
        }
    }, [pageDetailsData, pageDetailsSuccess]);

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

            {pageDetails ? (
                <div className="sm:container px-5 sm:py-10 py-5 lg:flex justify-between gap-20">
                    <div className="">
                        <h1 className="font-bold text-3xl pb-10">
                            {pageDetails?.name}
                        </h1>
                        {parse(pageDetails?.details)}{' '}
                        {/*  Directly pass data.details */}
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
            ) : null}

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

export default AboutPage;

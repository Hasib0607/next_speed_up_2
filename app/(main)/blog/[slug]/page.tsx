import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllBlogData, fetchBlogDetailsData } from '../helper/api';
import getDomain from '@/helpers/getDomain';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import getStore from '@/utils/fetcher/getStore';
import { notFound } from 'next/navigation';
import { truncateString } from '@/helpers/littleSpicy';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import EbitansAnalytics from '@/components/EbitansAnalytics';
import getDesign from '@/utils/fetcher/getDesign';
import { getUserDataFromCookies } from '@/helpers/getUserDataFromCookies';

export async function generateMetadata({ params }: any) {
    const url = await getDomain();
    const headersetting = await getHeaderSetting();
    const slug = (await params).slug;
    const details = (await fetchBlogDetailsData(slug, url)) ?? {};
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: details?.title,
        description: details?.sub_title,
        icons: details?.image,
        keywords: details?.key_word[0] || `${slug}, ${websiteName}, `,
        openGraph: {
            title: details?.title,
            description: details?.sub_title,
            images: [
                {
                    url: details?.image,
                    width: 1200,
                    height: 630,
                    alt: `${details?.title}-image`,
                },
            ],
        },
    };
}

const BlogDetails = async ({ params }: any) => {
    const url = await getDomain();
    const appStore = await getStore();
    const store_id = appStore?.id || null;
    const slug = (await params).slug;
    const details = (await fetchBlogDetailsData(slug, url)) ?? {};
    const allBlogData = (await fetchAllBlogData(store_id)) ?? {};
    const blogData = allBlogData?.data?.data ?? [];
    const design = await getDesign();
    const headersetting = await getHeaderSetting();
    const userData = await getUserDataFromCookies();

    const filterBlog = blogData?.filter(
        (blog: any) => blog?.type === details?.type && blog?.id !== details?.id
    );

    if (Object.keys(details).length === 0) {
        notFound();
    }

    return (
        <>
            <div className="bg-[#f7f7f7] md:pt-[10px] pt-[5px] container px-5 lg:px-10 relative z-[1]">
                <div className="relative">
                    <div>
                        <Image
                            width={500}
                            height={500}
                            src={details?.image}
                            alt={truncateString(details?.title || '', 80)}
                            className="h-auto min-w-full"
                        />
                    </div>
                    <div className="bg-black bg-opacity-50 lg:absolute bottom-0 left-0 w-full md:p-10 p-5">
                        <h1 className="lg:text-4xl text-xl font-bold my-2 text-white">
                            {details?.title}
                        </h1>
                        <p className="xl:text-lg text-sm font-medium my-2 text-white">
                            {details?.sub_title}
                        </p>
                        <p className="text-white">
                            Date:{' '}
                            {moment(new Date(details?.created_at)).format(
                                'MMMM Do, YYYY'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-5 py-10">
                    <div className="lg:w-[70%] w-full">
                        <DangerouslySafeHTML content={details?.description} />
                    </div>
                    <div className="lg:w-[30%] w-full">
                        <h1 className="text-2xl pb-5">Related Blogs</h1>
                        {filterBlog?.length > 0 ? (
                            <div>
                                {filterBlog?.slice(0, 4)?.map((blog: any) => {
                                    return (
                                        <Link
                                            href={`/blog/${blog?.permalink ?? blog?.slug}`}
                                            key={blog?.id}
                                        >
                                            <div
                                                key={blog?.id}
                                                className="flex gap-2 border-b-2 py-5"
                                            >
                                                <div className="h-28 w-28">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={blog?.thumbnail}
                                                        alt={truncateString(
                                                            blog?.title ||
                                                                `blog-${blog?.id}`,
                                                            80
                                                        )}
                                                        className="max-h-28 w-28 rounded-lg"
                                                    />
                                                </div>
                                                <div className="w-full h-full">
                                                    <p className="text-lg text-[#f1593a] font-medium xl:mb-3">
                                                        {blog?.type}
                                                    </p>
                                                    <h3 className="xl:text-base text-sm font-semibold">
                                                        {blog?.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div>
                                <h1>No Blog Available</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <EbitansAnalytics
                design={design}
                headersetting={headersetting}
                userData={userData}
            />
        </>
    );
};

export default BlogDetails;

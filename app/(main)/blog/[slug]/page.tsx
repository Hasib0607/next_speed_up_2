import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { fetchAllBlogData, fetchBlogDetailsData } from '../helper/api';
import DangerouslySafeHTML from '@/utils/dangerously-safe-html';
import { notFound } from 'next/navigation';
import { truncateString } from '@/helpers/littleSpicy';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { getInitialAppData } from '@/lib/getInitialAppData';

export async function generateMetadata({ params }: any) {
    const { headersetting, domain, paramsResult } = await getInitialAppData(
        {
            headersetting: true,
            paramsResult: true,
        },
        params
    );

    const slug = paramsResult.slug;

    const details = (await fetchBlogDetailsData(slug, domain)) ?? {};

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
    const { appStore, domain, paramsResult } = await getInitialAppData(
        {
            appStore: true,
            paramsResult: true,
        },
        params
    );
    const store_id = appStore?.id || null;
    const slug = paramsResult.slug;

    const [blogDetails = {}, allBlogData = {}] = await Promise.all([
        fetchBlogDetailsData(slug, domain),
        fetchAllBlogData(store_id),
    ]);

    const blogData = allBlogData?.data?.data ?? [];

    const filterBlog = blogData?.filter(
        (blog: any) =>
            blog?.type === blogDetails?.type && blog?.id !== blogDetails?.id
    );

    if (Object.keys(blogDetails).length === 0) {
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
                            src={blogDetails?.image}
                            alt={truncateString(blogDetails?.title || '', 80)}
                            className="h-auto min-w-full"
                        />
                    </div>
                    <div className="bg-black bg-opacity-50 lg:absolute bottom-0 left-0 w-full md:p-10 p-5">
                        <h1 className="lg:text-4xl text-xl font-bold my-2 text-white">
                            {blogDetails?.title}
                        </h1>
                        <p className="xl:text-lg text-sm font-medium my-2 text-white">
                            {blogDetails?.sub_title}
                        </p>
                        <p className="text-white">
                            Date:{' '}
                            {moment(new Date(blogDetails?.created_at)).format(
                                'MMMM Do, YYYY'
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col gap-5 py-10">
                    <div className="lg:w-[70%] w-full">
                        <DangerouslySafeHTML
                            content={blogDetails?.description}
                        />
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
        </>
    );
};

export default BlogDetails;

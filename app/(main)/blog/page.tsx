import AllBlog from './_components/all-blog';
import Loading from './_components/loading';
import PopularBlog from './_components/popular-blog';
import { Suspense } from 'react';
import BlogType from './_components/blog-type';
import {
    fetchAllBlogData,
    fetchBlogPopularData,
    fetchBlogRecentData,
    fetchBlogTypeData,
} from './helper/api';
import getDomain from '@/helpers/getDomain';
import getStore from '@/utils/fetcher/getStore';
import getHeaderSetting from '@/utils/fetcher/getHeaderSetting';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import { imgUrl } from '@/site-settings/siteUrl';

export async function generateMetadata() {
    const headersetting = await getHeaderSetting();
    const websiteName = capitalizeFirstLetter(headersetting?.website_name);

    return {
        title: `${websiteName} | Blogs`,
        icons: { icon: `${imgUrl}${headersetting?.favicon}` },
    };
}

const BlogPage = async () => {
    const url = await getDomain();
    const appStore = await getStore();
    const store_id = appStore?.id || null;
    const allBlogData = (await fetchAllBlogData(store_id)) ?? {};
    const blogPopularData = (await fetchBlogPopularData(store_id)) ?? [];
    const recentBlogData = (await fetchBlogRecentData(store_id)) ?? [];
    const blogTypeData = (await fetchBlogTypeData(store_id)) ?? [];

    const { data, coverImage } = allBlogData || {};

    return (
        <>
            <div className="md:pt-[10px] pt-[5px] relative z-[1]">
                <div
                    style={{
                        backgroundImage: `url(${coverImage ?? 'https://ebitans.com/Image/cover/eBitans-Web-Bannar4.png'})`,
                    }}
                    className="sm:h-[40vh] h-[15vh] bg-center bg-[length:100%_100%] flex flex-col gap-4 items-center justify-center bg-no-repeat"
                >
                    <h1 className="text-4xl font-bold my-1 text-center text-[#f1593a]">
                        Blogs
                    </h1>
                </div>

                {/* blog section  */}
                <div className="container px-5 lg:px-10 my-10">
                    <div className="flex flex-col lg:flex-row gap-8 ">
                        {/* Recent blogs */}
                        <div className="basis-3/6">
                            <h1 className="text-2xl pb-5">Recent Blogs</h1>
                            <Suspense
                                fallback={
                                    <div>
                                        <Loading />
                                    </div>
                                }
                            >
                                {recentBlogData?.length > 0 &&
                                    recentBlogData
                                        ?.slice(0, 5)
                                        ?.map((blog: any) => (
                                            <PopularBlog
                                                popularBlog={blog}
                                                key={blog?.id}
                                            />
                                        ))}
                            </Suspense>
                        </div>
                        {/* Popular blogs */}
                        <div className="basis-3/6">
                            <h1 className="text-2xl pb-5">Popular Blogs</h1>
                            <Suspense
                                fallback={
                                    <div>
                                        <Loading />
                                    </div>
                                }
                            >
                                {blogPopularData?.length > 0 &&
                                    blogPopularData
                                        ?.slice(0, 5)
                                        ?.map((blog: any) => (
                                            <PopularBlog
                                                popularBlog={blog}
                                                key={blog?.id}
                                            />
                                        ))}
                            </Suspense>
                        </div>
                    </div>
                </div>

                {/* type of blog section  */}
                <div className="container px-5 lg:px-10 my-10">
                    <div>
                        <Suspense
                            fallback={
                                <div>
                                    <Loading />
                                </div>
                            }
                        >
                            <BlogType blogTypeData={blogTypeData} url={url} />
                        </Suspense>
                    </div>
                </div>

                {/* all blog section  */}
                <div className="container px-5 lg:px-10 my-10">
                    <Suspense
                        fallback={
                            <div>
                                <Loading />
                            </div>
                        }
                    >
                        <AllBlog data={data} store_id={store_id} />
                    </Suspense>
                </div>
            </div>
        </>
    );
};

export default BlogPage;

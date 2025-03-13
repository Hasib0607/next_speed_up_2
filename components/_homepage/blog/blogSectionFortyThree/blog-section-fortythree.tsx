'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchAllBlogData } from '@/app/(main)/blog/helper/api';
import BlogCardFortyThree from './blog-card-fortythree';

const BlogSectionFortyThree = ({ design }: any) => {
    const store_id = design?.store_id || null;
    const [allBlogs, setBlogs] = useState<any>([]);
    const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
        const fetchNextBlogData = async () => {
            const allBlogData = (await fetchAllBlogData(store_id)) ?? {};
            const { data: BlogData } = allBlogData || {};

            if (BlogData?.data?.length > 0) {
                let blogs = BlogData?.data || [];
                setBlogs(blogs);
                setLoading(false);
            }
        };
        fetchNextBlogData();
    }, [store_id]);

    let content = null;
    if (loading && allBlogs.length <= 0) {
        return (content = null);
    }

    if (!loading && allBlogs.length > 0) {
        content = (
            <div className="container px-5">
                <h2 className="py-6 md:py-8 lg:py-10 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center">
                    Latest News
                </h2>

                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
                    {allBlogs?.slice(0, 3)?.map((item: any) => {
                        return <BlogCardFortyThree key={item?.id} item={item} />;
                    })}
                </div>

                <div className="py-10 center">
                    <Link href={'/blog'}>
                        <p className="bg-[#f1593a] px-4 py-2 font-semibold rounded-sm">
                            View All Blogs
                        </p>
                    </Link>
                </div>
            </div>
        );
    }

    return content;
};

export default BlogSectionFortyThree;

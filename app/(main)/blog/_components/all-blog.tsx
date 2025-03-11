'use client';

import BlogCard from './blog-card';
import { useEffect, useState } from 'react';
import { fetchAllBlogData } from '../helper/api';
import { numberParser } from '@/helpers/numberParser';
import { NotFoundMsg } from '@/utils/little-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteLoader from '@/components/loaders/infinite-loader';

const AllBlog = ({ data, store_id }: any) => {
    const [page, setPage] = useState(1);
    const [allBlog, setAllBlog] = useState<any>([]);
    const [paginate, setPaginate] = useState<any>({});
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchMore = () => {
        setPage((prevPage: number) => prevPage + 1);
    };

    useEffect(() => {
        if (data?.data?.length > 0 && data?.current_page === 1) {
            setAllBlog(data?.data);
            setPaginate(data);
        }
    }, [data]);

    useEffect(() => {
        const fetchNextBlogData = async () => {
            const allBlogData = (await fetchAllBlogData(store_id, page)) ?? {};
            const { data: moreBlogData } = allBlogData || {};

            if (moreBlogData?.data?.length > 0) {
                let nextBlog = moreBlogData?.data || [];
                setAllBlog((prevBlogs: any) => [...prevBlogs, ...nextBlog]);
                setPaginate(moreBlogData);
            }
        };
        if (page > 1) {
            fetchNextBlogData();
        }
    }, [page, store_id]);

    useEffect(() => {
        const more =
            numberParser(
                numberParser(paginate?.total) /
                    numberParser(paginate?.per_page),
                true
            ) > page;
        setHasMore(more);
    }, [paginate, page]); // ✅ Runs only when `page` updates

    return (
        <div>
            <h1 className="text-4xl mb-5 font-bold">All Blogs</h1>
            <InfiniteScroll
                style={{ height: 'auto', overflow: 'hidden' }}
                dataLength={allBlog?.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<InfiniteLoader />}
                endMessage={<NotFoundMsg message={'No More Blog'} />}
            >
                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
                    {allBlog?.map((item: any) => {
                        return <BlogCard key={item?.id} item={item} />;
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default AllBlog;

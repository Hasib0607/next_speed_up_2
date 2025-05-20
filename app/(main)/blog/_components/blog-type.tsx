'use client';

import Pagination from '@/components/paginations/pagination';
import { useEffect, useState } from 'react';
import { fetchTypeWiseBlogData } from '../helper/api';
import BlogCard from './blog-card';

const BlogType = ({ blogTypeData }: any) => {
    const [blogType, setBlogType] = useState<any>('');
    const [blogTypeId, setBlogTypeId] = useState(blogTypeData[0]?.id);
    const [page, setPage] = useState(1);
    const [paginationType, setTypePagination] = useState(null);

    useEffect(() => {
        const blogTypeWiseFetcher = async () => {
            const blogTypeWiseData =
                (await fetchTypeWiseBlogData(blogTypeId, page)) ?? {};
            const { data } = blogTypeWiseData || {};
            setBlogType(data?.data);
            setTypePagination(data);
        };
        blogTypeWiseFetcher();
    }, [blogTypeId, page]);

    return (
        <>
            <div
                id="type-blog"
                className="flex flex-wrap gap-3 items-center mb-10"
            >
                {blogTypeData?.map((blog: any) => (
                    <p
                        key={blog?.id}
                        onClick={() => {
                            setBlogTypeId(blog?.id);
                            setPage(1);
                        }}
                        className={`${blogTypeId === blog?.id ? 'bg-[#f1593a] text-white' : 'bg-gray-200 text-[#f1593a]'} text-xl  font-semibold  hover:bg-[#f1593a] hover:text-white duration-300 lg:cursor-pointer border px-5 py-2`}
                    >
                        {blog?.type}
                    </p>
                ))}
            </div>
            <div>
                {blogType?.length > 0 ? (
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">
                        {blogType?.map((item: any) => {
                            return <BlogCard key={item?.id} item={item} />;
                        })}
                    </div>
                ) : (
                    <div className="text-center py-10 text-3xl">
                        <h1>No Blog Available</h1>
                    </div>
                )}
                {blogType?.length > 0 && (
                    <div>
                        <Pagination
                            paginate={paginationType}
                            setPage={setPage}
                            initialPage={page}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogType;

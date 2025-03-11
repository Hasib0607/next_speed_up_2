import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const SingleBlog = ({ blog }: any) => {
    return (
        <div className="relative basis-3/5 ">
                <Link
                    href={`blog/${blog[0]?.permalink ?? blog[0]?.slug}`}
                >
                    <div className="group">
                        <Image
                            width={500}
                            height={500}
                            src={blog[0]?.thumbnail}
                            alt="blogImage"
                            className="h-auto min-w-full"
                        />
                        <div className="bg-black text-white p-5 mx-10 -mt-32 relative z-[1] space-y-5">
                            <p className="text-lg text-[#f1593a] font-medium">
                                {blog[0]?.type}
                            </p>
                            <h3 className="text-2xl font-semibold group-hover:underline pb-1 underline-offset-[10px] leading-relaxed">
                                {blog[0]?.title}
                            </h3>
                            <p>
                                Date:{' '}
                                {moment(
                                    new Date(blog[0]?.created_at)
                                ).format('MMMM Do, YYYY')}
                            </p>
                        </div>
                    </div>
                </Link>
        </div>
    );
};

export default SingleBlog;

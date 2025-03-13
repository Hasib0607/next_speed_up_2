import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from "react-icons/fa";

const BlogCardFortyThree = ({ item }: any) => {
    return (
        <Link
            href={`/blog/${item?.permalink ?? item?.slug}`}
            className="border pb-5 relative"
        >
            <div className="relative overflow-hidden">
                <Image
                    width={500}
                    height={500}
                    src={item?.thumbnail}
                    alt="blogImage"
                    className="h-auto min-w-full w-full object-cover object-center hover:scale-110 ease-in-out duration-1000"
                />
            </div>
            <div className='flex items-center justify-center gap-1 mt-8'>
                <FaCalendarAlt className='text-sm'/>
                <div>
                    {(() => {
                        const date = new Date(item?.created_at);
                        const options: Intl.DateTimeFormatOptions = {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                        };
                        const formattedDate = date.toLocaleDateString(
                            'en-US',
                            options
                        );

                        // Manually add a comma after the month
                        return formattedDate.replace(
                            /(\w+)\s(\d+),\s(\d+)/,
                            '$1$2, $3'
                        );
                    })()}
                </div>
            </div>
            <div className="px-5">
                <div className="flex justify-center hover:text-[var(--header-color)]">
                    <h3 className="text-2xl font-semibold py-5 w-full text-center">
                        {item?.title}
                    </h3>
                </div>
                <p className="text-center">
                    {item?.sub_title?.slice(0, 200)}
                    {item?.sub_title?.length > 200 && '...'}
                </p>
            </div>
            <div className="flex justify-center">
                <p className="uppercase border border-[var(--header-color)] px-6 py-2 my-6 text-[var(--header-color)] hover:text-[var(--text-color)] hover:bg-[var(--header-color)]">
                    Read More
                </p>
            </div>
            <div className="absolute bottom-6 left-0 w-full border-b"></div>
        </Link>
    );
};

export default BlogCardFortyThree;

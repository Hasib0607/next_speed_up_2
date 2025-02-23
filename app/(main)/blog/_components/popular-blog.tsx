import Image from 'next/image';
import Link from 'next/link';

const PopularBlog = ({ popularBlog }: any) => {
    return (
        <Link href={`blog/${popularBlog?.permalink ?? popularBlog?.slug}`}>
            <div key={popularBlog?.id} className="flex gap-2 border-b-2 py-5">
                <div className="max-h-28 w-28">
                    <Image
                        width={500}
                        height={500}
                        src={popularBlog?.thumbnail}
                        alt="blogImage"
                        className="max-h-28 w-28 rounded-lg"
                    />
                </div>
                <div className="w-full h-full">
                    <h3 className="xl:text-xl text-sm font-semibold ">
                        {popularBlog?.title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default PopularBlog;

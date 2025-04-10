import { brandImg } from '@/site-settings/siteUrl';
import Image from 'next/image';
import Link from 'next/link';

const BrandCard = ({ item }: any) => {
    return (
        <Link href={'/brand/' + item?.id}>
            <div className="flex justify-between flex-col gap-y-2">
                <div className="h-full w-full md:max-h-64 md:max-w-64">
                    <Image
                        src={`${brandImg}${item.image}`}
                        alt={item.name}
                        width={400}
                        height={400}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="text-center">
                    <p className="line-clamp-1 font-semibold">{item.name}</p>
                </div>
            </div>
        </Link>
    );
};

export default BrandCard;

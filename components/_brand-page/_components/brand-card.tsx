import { brandImg, dymmyImgBaseUrl } from '@/site-settings/siteUrl';
import { MasterImage } from '@/utils/image-controller';
import Link from 'next/link';

const BrandCard = ({ item }: any) => {
    const src =
        item.image === null
            ? `${dymmyImgBaseUrl}/310x4:9/b5b3b5/000000.png&text=brand-${item.id}`
            : `${brandImg}${item.image}`;

    return (
        <Link href={'/brand/' + item?.id}>
            <div className="flex justify-between flex-col gap-y-2 max-h-64 max-w-full">
                <div className="relative h-64 max-w-full">
                    <MasterImage
                        src={src}
                        alt={item.name}
                        className="absolute object-cover object-center"
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

import { brandImg } from '@/site-settings/siteUrl';
import { MasterImage } from '@/utils/image-controller';
import Link from 'next/link';

const Card3 = ({ item }: any) => {
    return (
        <Link href={'/brand/' + item.id}>
            <div className="flex flex-col items-center justify-around lg:justify-between overflow-hidden h-60 rounded-lg border-[1px] border-[var(--header-color)] hover:border-transparent p-2">
                <div className="relative h-40 w-40 lg:h-52 lg:w-52">
                    <MasterImage
                        src={brandImg + item.image}
                        alt={item.name}
                        className="absolute rounded-md duration-500"
                    />
                </div>

                <div className="text-center font-twelve">
                    <p className="uppercase text-sm font-semibold text-gray-800 truncate max-w-[13ch]">
                        {item.name}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card3;

import { bannerImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const PromoTwo = ({ banner }: any) => {
    return (
        <div className="sm:container px-5 sm:py-10 py-5">
            {banner?.length > 0 &&
                banner?.map((b: any) => (
                    <div key={b?.id} className="relative overflow-hidden">
                        <Link
                            href={b?.link ?? '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="min-w-full object-cover min-h-20 max-h-60 hover:scale-105 ease-in-out duration-1000"
                                src={bannerImg + b?.image}
                                alt=""
                            />
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default PromoTwo;

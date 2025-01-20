'use client';

import { iconImg } from '@/site-settings/siteUrl';
import Link from 'next/link';

const FeatureCatSix = ({ item }: any) => {
    return (
        <div>
            <Link
                href={`/category/${item.id}`}
                className="flex items-center justify-between bg-white border border-gray-100 p-5 py-10"
            >
                <div className="flex flex-col gap-5">
                    <span className="text-base font-semibold text-gray-600 menu-hover">
                        {item?.name}
                    </span>
                    <span className="italic text-gray-400 font-medium text-base">
                        {item?.total_products ?? 0} products
                    </span>
                </div>

                <div>
                    <img src={iconImg + item.icon} className="h-20" alt="" />
                </div>
            </Link>
        </div>
    );
};

export default FeatureCatSix;

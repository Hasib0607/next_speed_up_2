import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";

const FeatureCategory = ({ item }: any) => (
    <div className="h-full">
        <Link
            href={`/category/${item.id}`}
            className="relative h-full w-full group overflow-hidden flex flex-col gap-2 items-center justify-center bg-gray-100 hover:shadow-sm transition-shadow"
        >
            <img
                src={catImg + item.banner}
                className="h-full w-full object-cover"
                alt={item.name}
            />
            <div className="absolute bottom-5 -translate-y-1/2 uppercase">
                <span className="text-xl font-bold text-[var(--header-color)]">
                    {item.name}
                </span>
            </div>
        </Link>
    </div>
);

export default FeatureCategory;
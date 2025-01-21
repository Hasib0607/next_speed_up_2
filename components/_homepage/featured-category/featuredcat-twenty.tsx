"use client";
import SectionHeadingEighteen from "@/components/section-heading/section-heading-eighteen";
import { RootState } from "@/redux/store";
import { catImg } from "@/site-settings/siteUrl";
import Link from "next/link";
import { useSelector } from "react-redux";

const FeaturedTwenty = ({ category }: any) => {
  const headerdata = useSelector((state: RootState) => state.home.headersetting);
    const { custom_design } = headerdata || {};
    const featureCategory = custom_design?.feature_category?.[0] || {};
    const { title, title_color } =
        featureCategory || {};

  return (
    <div className="sm:container px-5 sm:py-10 py-5 relative group">
      <SectionHeadingEighteen
        titleColor={title_color}
        title={title || "Featured Categories"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category
          ?.slice(0, 3)
          .map((productData: any, index: number) => (
            <Card key={index} item={productData} />
          ))}
      </div>
    </div>
  );
};

export default FeaturedTwenty;

const Card = ({ item }: any) => {
  return (
    <div>
      <Link href={"/category/" + item.id}>
        <div className="">
          <div className=" h-full overflow-hidden ">
            <img
              src={catImg + item.banner}
              alt="Mountain"
              className="h-auto w-full duration-500 "
            />
          </div>

          <div className="flex justify-center py-4 ">
            <p className="card-text-color uppercase text-sm font-semibold text-gray-800 mb-4 border-b-2 border-transparent">
              {item.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

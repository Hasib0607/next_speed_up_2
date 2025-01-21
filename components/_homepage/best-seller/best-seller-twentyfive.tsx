"use client";

import Card50 from "@/components/card/card50";
import SectionHeadingTwentyFive from "@/components/section-heading/section-heading-twenty-five";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const BestSellerTwentyFive = ({ best_sell_product, design }: any) => {
  const store = useSelector((state: RootState) => state.appStore.store);
  const store_id = store?.id || null;

  const headersetting = useSelector(
      (state: RootState) => state.home.headersetting
  );
  const { custom_design } = headersetting || {};

  const bestSellProduct = custom_design?.best_sell_product?.[0] || {};
  const { title = "Default Title", title_color = "#000" } = bestSellProduct;

  return (
    <div className="sm:px-10 px-5">
      <SectionHeadingTwentyFive title={title} title_color={title_color} />

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 md:grid-cols-3 gap-4">
        {best_sell_product
          ?.slice(0, 10)
          ?.map((item: any) => (
            <Card50
              item={item}
              key={item?.id}
              store_id={store_id}
              design={design}
            />
          ))}
      </div>
    </div>
  );
};

export default BestSellerTwentyFive;

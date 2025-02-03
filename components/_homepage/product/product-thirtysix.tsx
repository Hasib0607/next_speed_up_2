"use client";
import Card63 from "@/components/card/card63";
import DefaultSlider from "@/components/slider/default-slider";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";

const ProductThirtySix = ({ product, design }: any) => {
  let isLoop = product.length > 1;
  const styleCss = `
   
    .new-product-prev {
        color:  ${design?.header_color};
        border: 1px solid ${design?.header_color};
    }
      .new-product-next{
          color:  ${design?.header_color};
          border: 1px solid ${design?.header_color};
    }
      .new-product-prev:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
      .new-product-next:hover {
        color:  ${design?.text_color};
        background: ${design?.header_color};
    }
    .arrow-hov:hover .arrow {
      opacity:1;
      background: white;
    }
    .see {
        color:  ${design?.text_color};
        background:  ${design?.header_color};
    }
 `;

  const prevEl = "product-prev";
  const nextEl = "product-next";

  const store = useSelector((state: RootState) => state.appStore.store);
  const store_id = store?.id || null;

  const headerdata = useSelector((state: RootState) => state.home.headersetting);

  const { custom_design } = headerdata || {};
  const sectionHeadingData = custom_design?.product?.[0] || {};
  const { title = 'Default Title', title_color = '#000' } = sectionHeadingData || {};
  return (
    <div className="">
      <div className="sm:container px-5 sm:py-10 py-5">
        <style>{styleCss}</style>
        <div className="relative arrow-hov">
          <div className="text-center py-10 flex items-center justify-center">
            <p className="text-xl xl:text-2xl" style={{ color: title_color }}>
              {title || "Products"}
            </p>
          </div>

          <DefaultSlider
            prevEl={prevEl}
            nextEl={nextEl}
            loop={isLoop}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              980: {
                slidesPerView: 5,
                spaceBetween: 0,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 0,
              },
            }}
          >
            {product?.slice(0, 10).map((item: any) => (
              <SwiperSlide key={item?.id}>
                <div className="">
                  <Card63 item={item} design={design} store_id={store_id} />
                </div>
              </SwiperSlide>
            ))}
          </DefaultSlider>
        </div>
      </div>
    </div>
  );
};

export default ProductThirtySix;

// "use client";

// import { profileImg } from "@/site-settings/siteUrl";
// import Rate from "@/utils/rate";
// import { Tab } from "@headlessui/react";
// import moment from "moment";
// import Details from "./details-fortytwo";

// import { useEffect, useState } from "react";


// import FeatureProductInProductDetailsPage42 from "@/components/_homepage/feature-product/feature-product-in-details-forty-two";
// import Card72 from "@/components/card/card72";
// import { customizeSingleProductPage } from "@/utils/customizeDesign";

// const FortyTwo = ({ data, updatedData }: any) => {
//   const { design, store_id } = useTheme();

//   const singleProductPageData = customizeSingleProductPage.find(
//     (item) => item.id == store_id
//   );

//   const url = getDomain();

//   const [featureProduct, setFeatureProduct] = useState<any>([]);
//   const { data: productDetailsData, fetchStatus } = useQuery({
//     queryKey: ["pd-39"],
//     queryFn: () => getProductDetails(updatedData),
//     enabled: !!updatedData.slug && !!updatedData.store_id,
//   });

//   const { data: relatedProducts } = useQuery({
//     queryKey: ["rp-39"],
//     queryFn: () => getRelatedProducts(updatedData?.product_id),
//     enabled: !!updatedData.slug && !!updatedData.store_id,
//   });

//   const { data: reviews } = useQuery({
//     queryKey: ["rv-39"],
//     queryFn: () => getReviews(updatedData),
//     enabled: !!updatedData.slug && !!updatedData.store_id,
//   });

//   const { product, vrcolor, variant } = productDetailsData || {};

//   const {
//     data: featureProductData,
//     isLoading: featureLoading,
//     isSuccess: featureSuccess,
//   } = useGetSettingQuery({ domain: url, slug: "feature_product" });
//   useEffect(() => {
//     if (featureProductData) {
//       const getFeatureProductData = featureProductData?.data || [];
//       setFeatureProduct(getFeatureProductData);
//     }
//   }, [featureSuccess, featureProductData]);
//   return (
//     <div className="">
//       <div className="sm:container px-5">
//         <Details
//           fetchStatus={fetchStatus}
//           data={data}
//           product={product}
//           vrcolor={vrcolor}
//           variant={variant}
//         />

//         {/* Feature Products */}
//         <div>
//           <FeatureProductInProductDetailsPage42
//             feature_product={featureProduct}
//             design={design}
//             store_id={store_id}
//           />
//         </div>

//         {/* ************************ tab component start ***************************** */}
//         <div
//           className="bg-white"
//           style={
//             {
//               "--header-color": design?.header_color,
//               "--text-color": design?.text_color,
//             } as React.CSSProperties
//           }
//         >
//           <Tab.Group>
//             {/* Tab List */}
//             <Tab.List className="px-4 bg-[#DDDDDD] flex flex-col md:flex-row md:space-x-8">
//               <Tab
//                 className={({ selected }) =>
//                   selected
//                     ? "bg-[var(--header-color)] px-3 py-2 text-sm md:text-base lg:text-xl focus:outline-none underline-offset-4 border-hidden rounded md:rounded-none mb-2 md:mb-0"
//                     : "text-sm md:text-base lg:text-xl mb-2 md:mb-0"
//                 }
//               >
//                 Product Information
//               </Tab>
//               {singleProductPageData?.review_not_show ? (
//                 ""
//               ) : (
//                 <>
//                   <Tab
//                     className={({ selected }) =>
//                       selected
//                         ? "bg-[var(--header-color)] px-3 py-2 text-sm md:text-base lg:text-xl focus:outline-none underline-offset-4 border-hidden rounded md:rounded-none"
//                         : "text-sm md:text-base lg:text-xl"
//                     }
//                   >
//                     Customer Reviews
//                   </Tab>
//                 </>
//               )}
//             </Tab.List>

//             {/* Tab Panels */}
//             <Tab.Panels className="p-4 md:p-5">
//               {/* Product Information Panel */}
//               <Tab.Panel>
//                 <div>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: productDetailsData?.product?.description,
//                     }}
//                     className="apiHtml text-sm md:text-base leading-relaxed"
//                   ></div>
//                 </div>
//               </Tab.Panel>

//               {/* Customer Reviews Panel */}
//               <Tab.Panel>
//                 {reviews?.error ? (
//                   <div className="text-center text-red-500 text-sm md:text-base">
//                     {reviews?.error}
//                   </div>
//                 ) : (
//                   reviews?.map((item: any) => (
//                     <UserReview
//                       key={item?.id}
//                       review={item}
//                       className="mb-4 last:mb-0"
//                     />
//                   ))
//                 )}
//               </Tab.Panel>
//             </Tab.Panels>
//           </Tab.Group>
//         </div>
//         {/* ************************ tab component end ***************************** */}

//         {product && product?.video_link && (
//           <VideoPlayer videoUrl={product?.video_link} />
//         )}

//         <Related product={relatedProducts} />
//       </div>
//     </div>
//   );
// };

// export default FortyTwo;

// const UserReview = ({ review }: any) => {
//   return (
//     <div className=" bg-slate-50 p-5">
//       <div className="avatar">
//         <div className="w-20 h-20 rounded-full">
//           <img
//             src={profileImg + review?.image}
//             className="rounded-full h-full w-full"
//             alt=""
//           />
//         </div>
//       </div>
//       <Rate className="text-base" rating={review?.rating} />
//       <p className="text-xs font-semibold mt-2">{review?.name}</p>
//       <p className="text-sm font-light mt-2">
//         {moment(new Date(review?.cd)).format("DD/MM/YYYY")}
//       </p>
//       <p className="text-base font-semiBold mt-2">{review?.comment}</p>
//     </div>
//   );
// };

// const Related = ({ product }: any) => {
//   return (
//     <div className="py-5 sm:py-10">
//       <div>
//         <h1 className="text-2xl pb-3">RELATED PRODUCTS</h1>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-3 lg:grid-cols-5 xl:grid-cols-6 justify-center">
//         {product
//           ?.slice(0, 10)
//           .map((item: any, id: any) => <Card72 item={item} key={id} />)}
//       </div>
//     </div>
//   );
// };

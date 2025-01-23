"use client";
import { checkEasyNotUser } from "@/helpers/checkEasyNotUser";
import { getPrice } from "@/helpers/getPrice";
import { getFromLocalStorage } from "@/helpers/localStorage";
import useAuth from "@/hooks/useAuth";
import { clearCartList } from "@/redux/features/cart/cartSlice";
import { useUserPlaceOrderMutation } from "@/redux/features/checkOut/checkOutApi";
import { useGetModuleStatusQuery } from "@/redux/features/modules/modulesApi";
import { RootState } from "@/redux/store";
import { productImg } from "@/site-settings/siteUrl";
import { btnhover } from "@/site-settings/style";
import { grandTotal, subTotal } from "@/utils/_cart-utils/cart-utils";
import BDT from "@/utils/bdt";
import FileUploadModal from "@/utils/FileUploadModal";
import getReferral from "@/utils/getReferral";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckOutElevenOrder = ({
  couponDis,
  setCouponDis,
  coupon,
  selectAddress,
  selectPayment,
  setSelectPayment,
  shippingArea,
  couponResult,
  isButtonDisabled,
  setIsButtonDisabled,
}: any) => {
      const isAuthenticated = useAuth();
  
      const referral_code = getFromLocalStorage('referralCode');
  
      const [isAbleToOrder, setIsAbleToOrder] = useState<boolean>(false);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [tax, setTax] = useState<any>(0);
      const [isOpen, setIsOpen] = useState(false);
      const [files, setFiles] = useState([]);
      const [cartId, setCartId] = useState(null);
  
      const { checkoutFromData } = useSelector(
          (state: RootState) => state.checkout
      ); // Access updated Redux state
      const {
          name: userName,
          phone: userPhone,
          email: userEmail,
          address: userAddress,
      } = checkoutFromData || {};
  
      const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
      const store_id = store?.id || null;
  
      const home = useSelector((state: RootState) => state?.home);
      const { design, headersetting } = home || {};
  
      const { cartList } = useSelector((state: RootState) => state.cart);
      const { user } = useSelector((state: RootState) => state.auth);
  
      const router = useRouter();
      const dispatch = useDispatch();
  
      const formData = new FormData();
  
      const total = subTotal(cartList);
  
      const [userPlaceOrder] = useUserPlaceOrderMutation();
  
      if (
          total < parseInt(couponResult?.min_purchase) ||
          (parseInt(couponResult?.max_purchase) &&
              total > parseInt(couponResult?.max_purchase)) ||
          !couponDis
      ) {
          couponDis = 0;
      }
  
      const handleCouponRemove = () => {
          setCouponDis(0);
          toast.error('Coupon removed!');
      };
  
      const gTotal = grandTotal(total, tax, shippingArea, couponDis);
  
      const updatedCartList = cartList?.map((cart: any, index: any) => {
          if (files[index]) {
              return {
                  ...cart,
                  items: [files[index]], // Adding the new property 'items' with the product object from data
              };
          }
          return cart; // Return the cart as is if there's no corresponding product in data
      });
  
      const cart = updatedCartList?.map((item: any) => ({
          id: item?.id,
          quantity: item?.qty,
          discount:
              parseInt(item?.regular_price) -
              getPrice(
                  item?.regular_price,
                  item?.discount_price,
                  item?.discount_type
              )!,
          price: item?.price,
          variant_id: item?.variant_id,
          items: item?.items,
          referral_code: referral_code || '',
      }));
  
      for (let i = 0; i < cart?.length; i++) {
          if (cart[i]?.items) {
              for (let j = 0; j < cart[i]?.items.length; j++) {
                  if (cart[i]?.items[i]?.description) {
                      formData.append(
                          `product[${i}][items][${i}][description]`,
                          cart[i]?.items[i]?.description
                      );
                  }
                  if (cart[i].items[j]?.files?.length > 0) {
                      for (let k = 0; k < cart[i].items[j].files.length; k++) {
                          formData.append(
                              `product[${i}][items][${j}][files][${k}]`,
                              cart[i].items[j].files[k]
                          );
                      }
                  }
              }
          }
      }
  
      for (let i = 0; i < cart?.length; i++) {
          // Append all non-image properties of the cart item
          for (let key in cart[i]) {
              if (key !== 'items') {
                  formData.append(`product[${i}][${key}]`, cart[i][key]);
              }
          }
      }
  
      // Prepare data object
      const data = useMemo(
          () => ({
              product: cart,
              store_id,
              name: checkEasyNotUser(
                  store,
                  userName,
                  selectAddress?.name,
                  isAuthenticated
              ),
              phone: checkEasyNotUser(
                  store,
                  userPhone,
                  selectAddress?.phone,
                  isAuthenticated
              ),
              email: checkEasyNotUser(
                  store,
                  userEmail,
                  selectAddress?.email,
                  isAuthenticated
              ),
              address: checkEasyNotUser(
                  store,
                  userAddress,
                  selectAddress?.address,
                  isAuthenticated
              ),
              note: selectAddress?.note,
              district: selectAddress?.district,
              payment_type: selectPayment,
              subtotal: parseInt(total),
              shipping: parseInt(shippingArea),
              total: gTotal,
              discount: couponDis,
              tax,
              coupon: coupon || '',
              referral_code: referral_code || '', // Include referral code if available
          }),
          [
              cart,
              store_id,
              store,
              userName,
              userPhone,
              userEmail,
              userAddress,
              selectAddress,
              isAuthenticated,
              selectPayment,
              total,
              shippingArea,
              gTotal,
              couponDis,
              tax,
              coupon,
              referral_code,
          ]
      );
  
      // Prepare formData
      const appendFormData = (key: string, value: any) => {
          if (value !== undefined && value !== null) {
              formData.append(key, value.toString());
          }
      };
  
      // Append data to formData
      Object.entries({
          store_id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          note: selectAddress?.note,
          district: selectAddress?.district,
          payment_type: selectPayment,
          subtotal: data.subtotal,
          shipping: data.shipping,
          total: data.total,
          discount: data.discount,
          tax: data.tax,
          coupon: data.coupon,
          referral_code: data.referral_code,
      }).forEach(([key, value]) => appendFormData(key, value));
  
      const handleCheckout = async () => {
          if (!userAddress && !data.address) {
              toast.warning('Please Select The Address', {
                  toastId: userAddress,
              });
          }
          if (!userPhone && !user) {
              toast.warning('Please write your phone number', {
                  toastId: userPhone,
              });
          }
          if (!userName && !user) {
              toast.warning('Please write your name', { toastId: userName });
          }
          if (!data.payment_type) {
              toast.warning('Please Select Payment Method', {
                  toastId: data.payment_type,
              });
          }
  
          if (shippingArea === null) {
              toast.warning('Please Select Shipping Area', {
                  toastId: shippingArea,
              });
          }
  
          const placeOrder = () => {
              setIsLoading(true);
              userPlaceOrder(formData)
                  .unwrap()
                  .then(({ data, status }: any) => {
                      const { order, url } = data || {};
  
                      if (status) {
                          dispatch(clearCartList());
                          if (url) {
                              window.location.replace(url);
                          } else {
                              toast.success(
                                  `Your #${order?.reference_no} order complete successfully!`
                              );
                              setIsLoading(false);
                              router.push('/thank-you');
                          }
                      } else {
                          toast.error('Can not place order, please try again!');
                          setIsLoading(false);
                      }
                  })
                  .catch((error) => {
                      if ('data' in error) {
                          const errorData = error as any;
                          if (errorData?.status == 404) {
                              toast.error(errorData?.data?.message);
                          } else {
                              toast.error(
                                  'Something went wrong! Please try again.'
                              );
                          }
                      }
                      setIsLoading(false);
                  });
          };
  
          if (isAbleToOrder) {
              placeOrder();
          }
      };
  
      useEffect(() => {
          if (headersetting?.tax) {
              const tax = (parseInt(headersetting?.tax) / 100) * total;
              setTax(tax);
          }
      }, [headersetting?.tax, total]);
  
      useEffect(() => {
          if (
              data?.total &&
              data?.payment_type &&
              data?.product &&
              data?.name &&
              (data?.phone || data?.email) &&
              data?.address &&
              shippingArea !== null
          ) {
              setIsAbleToOrder(true);
          } else {
              setIsAbleToOrder(false);
          }
      }, [data, shippingArea]);
  const styleCss = `

    .cart-btn {
        color: ${design?.text_color};
        background:  ${design?.header_color};
        border: 2px solid  ${design?.header_color};
    }
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid  ${design?.header_color};
    }
  `;

  // facebook pixel
  // useEffect(() => {
  //   Purchase(parseInt(total + tax), "BDT");
  //   AddToCart();
  // }, [total, tax]);

  return (
    <div className="bg-gray-100 sm:rounded-md">
      <style>{styleCss}</style>
      {/* {error && <SnackBar open={true} msg={error} />} */}
      <h3 className="text-base text-black bg-[#FAEBD7] p-5">Products</h3>
      {cartList ? (
        <>
          <div className="my-5">
            <div className=" flex flex-col justify-between pt-5">
              {/* Replace with your content */}
              <div className="px-2 h-2/3 overflow-y-auto">
                {cartList?.map((item: any, index: any) => (
                  <div key={index} onClick={() => setCartId(item?.cartId)}>
                    <Single
                      files={files}
                      cartId={item?.cartId}
                      item={item}
                      setIsOpen={setIsOpen}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <h3 className="text-center font-semibold text-lg text-black">
            No Products Found
          </h3>
        </div>
      )}

      <div className="my-5 text-gray-500 px-5" style={{ fontWeight: 500 }}>
        <div className="flex justify-between items-center">
          <p>Sub Total</p>
          <p>
            <BDT price={parseInt(total)} />
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p>Discount</p>
          <p>{<BDT price={couponDis} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Tax</p>
          <p>{<BDT price={parseInt(tax)} />}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Estimated Shipping</p>
          {shippingArea === "--Select Area--" ? (
            <p>
              <BDT /> 0
            </p>
          ) : (
            <p>
              <BDT price={shippingArea ? shippingArea : 0} />
            </p>
          )}
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-400 mt-4 mb-2"></div>
      <div className="flex justify-between items-center text-black font-semibold px-5">
        <p>Total</p>
        {shippingArea === "--Select Area--" || shippingArea === null ? (
          <p>{<BDT price={parseInt(total + tax) - couponDis} />}</p>
        ) : (
          <p>
            {
              <BDT
                price={parseInt(total + tax) + parseInt(shippingArea) - couponDis}
              />
            }
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="w-full px-5 py-3 overflow-hidden">
          <button
            className={`font-semibold tracking-wider rounded-full cart-btn border border-gray-300 w-full py-3 ${btnhover}`}
          >
            Loading
          </button>
        </div>
      ) : (
        <div className="w-full px-5 py-3 overflow-hidden">
          <button
            className={`font-semibold tracking-wider my-1 rounded-full border cart-btn border-gray-300 w-full py-3 ${btnhover}`}
            onClick={() => handleCheckout()}
          >
            {" "}
            Place Order{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOutElevenOrder;

const Single = ({ item, setIsOpen, files, cartId, setFiles, isOpen, design }: any) => {
  const module_id = 104;
  
      const { store } = useSelector((state: any) => state.appStore); // Access updated Redux state
      const store_id = store?.id || null;
  
      const {
          data: moduleIdDetailsData,
          isLoading: moduleIdDetailLoading,
          isError: moduleIdDetailError,
          isSuccess: moduleIdDetailSuccess,
      } = useGetModuleStatusQuery({ store_id, module_id });
      const activeModule = moduleIdDetailsData?.status || false;
  
      function openModal() {
          setIsOpen(true);
      }
  
      const dispatch = useDispatch();
  
      const file = files.some((i: any) => i.cartId === cartId);

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row justify-start sm:justify-between space-x-1 border-b-2 border-gray-300 py-2 "
    >
      <div className="flex gap-2">
        <div className="w-20 relative">
          <img className="w-20 h-20" src={productImg + item.image[0]} alt="" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex justify-center items-center">
            <p>{item?.qty}</p>
          </div>
        </div>
        <div className="flex flex-col gap-x-2 gap-y-1 pl-2 justify-start">
          <h3 className="text-black text-md  font-normal">
            <Link href={"/product/" + item?.id + "/" + item?.slug}>
              {item?.name.slice(0, 15)}
              {item?.name?.length > 15 && "..."}
            </Link>
          </h3>
          {/* <p className='text-sm'>&#2547; {parseInt(item?.price)} * {item?.qty} </p> */}
          <div className="flex items-center mt-1">
            {item?.color ? (
              <div className="flex items-center gap-2 pr-2">
                <p className="font-semibold text-sm">Color: </p>
                <p
                  style={{ backgroundColor: item?.color }}
                  className="w-4 h-4 rounded-full ring-1 ring-offset-2 ring-gray-600"
                ></p>
              </div>
            ) : null}
            {item?.size ? (
              <p className="font-semibold text-sm">
                Size: <span className="font-normal text-sm">{item?.size}</span>
              </p>
            ) : null}
            {item?.unit ? (
              <p className="font-semibold text-sm">
                Unit:{" "}
                <span className="font-normal text-sm">
                  {item?.volume + " " + item?.unit}
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-x-2 items-center justify-end">
       <FileUploadModal
                           files={files}
                           setFiles={setFiles}
                           isOpen={isOpen}
                           design={design}
                           setIsOpen={setIsOpen}
                           cartId={cartId}
                       />
        <div className="text-md font-semibold">
          <BDT price={item?.price * item?.qty} />
        </div>
      </div>
    </div>
  );
};

"use client";

import { RootState } from "@/redux/store";
import Link from "next/link";
import { TiTickOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

const ThankYou = () => {
  const home = useSelector((state: RootState) => state?.home);
const { design } = home || {};

  const styleCss = `
  .order-info {
      background:  ${design?.header_color};
      color:  ${design?.text_color};
  }
`;

  return (
    <div className="flex flex-col gap-3 justify-center items-center font-bold h-screen">
      <style>{styleCss}</style>
      <TiTickOutline className="text-green-500 text-6xl" />
      <p className="text-2xl lg:text-3xl">Thank you for your order</p>
      <Link href="/profile/order">
        <button className="order-info py-2 px-4 text-base rounded-md">
          Order Info
        </button>
      </Link>
      <Link href="/shop">
        <button className="text-base rounded-md underline text-[#f1593a]">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default ThankYou;

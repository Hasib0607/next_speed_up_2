'use client'

import { btnhover } from "@/site-settings/style";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

const Loading = () => {
  const home = useSelector((state: any) => state?.home);
  const { design } = home || {};

  return (
    <>
    <div
      className={`flex items-center justify-center space-x-2 py-3 px-8 w-full rounded-md text-gray-400 ${btnhover}`}
      style={{
        backgroundColor: design?.header_color,
        color: design?.text_color,
      }}
    >
      <RotatingLines width="25" strokeColor="#6495ED" strokeWidth="6" />
      <p className={`text-left  font-sans font-bold tracking-wider`}>Loading</p>
    </div>
    </>
  );
};

export default Loading;

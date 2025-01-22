"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { imgUrl } from "@/site-settings/siteUrl";
import { btnhover } from "@/site-settings/style";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useLogInMutation } from "@/redux/features/auth/authApi";
import { useGetModuleStatusQuery } from "@/redux/features/modules/modulesApi";
import Loading from "../loaders/loading";

export const cls =
  "w-full text-black rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ";

const LoginTwentyNine = ({design}: any) => {
  const module_id = 120;
  const home = useSelector((state: RootState) => state?.home);
  const { headersetting } = home || {};

  const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
  const store_id = store?.id || null;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState("login");

  const router = useRouter();

  const [logIn] = useLogInMutation();

  const {
      data: moduleIdDetailsData,
      isLoading: moduleIdDetailLoading,
      isError: moduleIdDetailError,
      isSuccess: moduleIdDetailSuccess,
  } = useGetModuleStatusQuery({ store_id, module_id });
  const activeModule = moduleIdDetailsData?.status || false;

  useEffect(() => {
      if (moduleIdDetailError) {
          toast.error('Failed to fetch module data. Please try again.');
      }
  }, [moduleIdDetailError]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
      setLoading(true);

      logIn({ ...data, store_id })
          .unwrap()
          .then(({ status, token, verify, message }: any) => {
              if (status) {
                  if (verify) {
                      if (token) {
                          toast.success(message || 'Login Successful');
                          router.push('/profile');
                      } else {
                          toast.warning(
                              message || 'Please Verify Your Accouct First'
                          );
                          router.push('/login');
                          setLoading(false);
                      }
                  }
              }
          })
          .catch((error: any) => {
              if (error?.status === 404) {
                  toast.error(
                      error?.data?.message || `Credential Doesn"t Match`
                  );
              }
              if (error?.status === 422) {
                  toast.error(error?.data?.message || `Try again!`);
              }
              setLoading(false);
          });
  };
  const styleCss = `
    .cart-btn:hover {
        color:  ${design?.header_color};
        background: transparent;
        border: 2px solid ${design?.header_color};
    }
    .cart-btn {
        color:  ${design?.text_color};
        background: ${design?.header_color};
        border: 2px solid ${design?.header_color};
    }
    .text-color {
        color:  ${design?.header_color};
    }
   
      `;
  return (
    <div className="border mt-32 max-w-2xl mx-auto py-5 rounded-lg shadow-2xl">
      <style>{styleCss}</style>
      <div className="">
        {headersetting?.logo === null ? (
          <Link href="/">
            <p className="text-xl uppercase">{headersetting?.website_name}</p>
          </Link>
        ) : (
          <Link href="/">
            <img
              className="h-auto max-w-[160px] overflow-hidden mx-auto"
              src={imgUrl + headersetting?.logo}
              alt="logo"
            />
          </Link>
        )}
      </div>

      <div>
        <div className="mx-14 grid grid-cols-2 gap-6 pt-5 border-b">
          <div
            onClick={() => setSelect("login")}
            className="w-full text-center md:lg:cursor-pointer"
          >
            <div
              className={`text-lg font-medium capitalize  ${
                select === "login" ? "border-b-2 border-red-500 pb-4 " : ""
              }`}
            >
              Login
            </div>
          </div>
          <div
            onClick={() => setSelect("signup")}
            className="w-full text-center md:lg:cursor-pointer"
          >
            <div
              className={`text-lg font-medium capitalize ${
                select === "signup" ? "border-b-2 border-red-500 pb-4" : ""
              }`}
            >
              Registration
            </div>
          </div>
        </div>
        <div className="">
          {select === "login" && (
            <div>
              <section className="mb-10">
                <div className="">
                  <div className="flex flex-wrap ">
                    <div className="w-full px-4">
                      <div className="w-full mx-auto text-center rounded-lg relative overflow-hidden py-16 sm:px-10">
                        <div className="mb-10 md:mb-6 text-center">
                          <Link href="/" className="inline-block">
                            <h2 className="text-xl font-bold mt-2 uppercase">
                              Login
                            </h2>
                          </Link>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          {store?.auth_type === "phone" ||
                          store?.auth_type === "EasyOrder" ? (
                            <div className="mb-6">
                              <input
                                autoComplete="tel"
                                type="Number"
                                placeholder="Phone"
                                {...register("phone", { required: true })}
                                className={cls}
                              />
                            </div>
                          ) : (
                            <div className="mb-6">
                              <input
                                autoComplete="tel"
                                type="email"
                                placeholder="Email"
                                {...register("phone", { required: true })}
                                className={cls}
                              />
                            </div>
                          )}
                          {/* <div className="mb-6">
                                                    <input
                                                        autoComplete='tel'
                                                        type="Number"
                                                        placeholder="Phone"
                                                        {...register("phone", { required: true })}
                                                        className={cls}
                                                    />
                                                </div> */}
                          <div className="mb-6 relative">
                            <input
                              type={`${show ? "text" : "password"}`}
                              placeholder="Password"
                              {...register("password", { required: true })}
                              className={cls}
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[2] lg:cursor-pointer">
                              {show ? (
                                <BsEye
                                  onClick={() => setShow(!show)}
                                  className="text-black"
                                />
                              ) : (
                                <BsEyeSlash
                                  onClick={() => setShow(!show)}
                                  className="text-black"
                                />
                              )}
                            </div>
                          </div>
                          <div className="mb-10">
                            {loading ? (
                              <Loading />
                            ) : (
                              <input
                                type="submit"
                                value="Sign In"
                                className={`w-full font-bold tracking-wider rounded-md py-3 px-5 cart-btn text-base lg:cursor-pointer transition ${btnhover}`}
                              />
                            )}
                          </div>
                        </form>

                        <Link
                          href="/forgot-password"
                          className="text-base inline-block mb-2 text-[#adadad] hover:underline hover:text-primary"
                        >
                          Forgot Password?
                        </Link>
                        {(store?.auth_type !== "EasyOrder" || activeModule) && (
                          <p className="text-base text-[#adadad]">
                            Don&apos;t Have an Account?
                            <Link
                              onClick={() => setSelect("signup")}
                              href="/login"
                              className="text-primary hover:underline text-color"
                            >
                              Sign Up
                            </Link>
                          </p>
                        )}
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center w-full">
                  {/* <LoginWith /> */}
                </div>
              </section>
            </div>
          )}
          {select === "signup" && (
            <div>
              {/* <RegisterFive />{" "} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginTwentyNine;

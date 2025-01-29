"use client";

import { useForgotUserPasswordMutation, useForgotVerifyUserPasswordMutation, useResetUserPasswordMutation } from "@/redux/features/user/userApi";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotOne = () => {
  const [user, setUser] = useState({});
  const [page, setPage] = useState("find");

  return (
    <>
      <div className="container mx-auto">
        <section className="flex justify-center">
          <div className="max-w-md">
            {page === "otp" ? (
              <Verifying setPage={setPage} setUser={setUser} user={user} />
            ) : page === "find" ? (
              <Finding setPage={setPage} setUser={setUser} />
            ) : (
              <Changeing setUser={setUser} setPage={setPage} user={user} />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ForgotOne;

const Finding = ({ setPage, setUser }: any) => {
  const home = useSelector((state: RootState) => state?.home);
  const { design } = home || {};

  const { store } = useSelector((state: RootState) => state.appStore); // Access updated Redux state
  const store_id = store?.id || null;

  const [loading, setLoading] = useState(false);

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm();

  const [forgotUserPassword] = useForgotUserPasswordMutation();

  const onSubmit = (data: any) => {
      setLoading(true);
      if (data?.phone) {
          forgotUserPassword({ phone: data?.phone, store_id })
              .unwrap()
              .then((res: any) => {
                  // console.log(res);
                  if (res?.user_id) {
                      setPage('otp');
                      setUser(res);
                      setLoading(false);
                  }
              })
              .catch((error) => {
                  toast.error('Try Again!');
                  setPage('find');
                  setUser({});
                  setLoading(false);
              });
      } else {
          setLoading(false);
      }
  };

  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Find Your Account
      </h4>
      {store?.auth_type === "phone" || store?.auth_type === "EasyOrder" ? (
        <input
          {...register("phone", { required: true })}
          type="number"
          placeholder="Phone number"
          className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
        />
      ) : (
        <input
          {...register("phone", { required: true })}
          type="email"
          placeholder="Your email"
          className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
        />
      )}

      {errors.phone?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      {loading ? (
        <h1
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-600 text-white hover:bg-red-800 hover:text-gray-200`}
        >
          Loading....
        </h1>
      ) : (
        <input
          type="submit"
          value="Find"
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-600 text-white hover:bg-red-800 hover:text-gray-200`}
        />
      )}
    </form>
  );
};
const Verifying = ({ setPage, setUser, user }: any) => {
     const [loading, setLoading] = useState(false);
     const {
         register,
         handleSubmit,
         formState: { errors },
     } = useForm();
 
     const [forgotVerifyUserPassword] = useForgotVerifyUserPasswordMutation();
 
     const onSubmit = (data: any) => {
         if (data.otp) {
             setLoading(true);
             data['user_id'] = user?.user_id;
 
             forgotVerifyUserPassword(data)
                 .unwrap()
                 .then(({ error, verify, success, user_id }: any) => {
                     if (success) {
                         toast.success(success);
                     }
                     if (error) {
                         toast.error(error);
                     }
                     if (verify) {
                         setPage('cng');
                         setUser({ user_id });
                     }
                     setLoading(false);
                 })
                 .catch((error) => {
                     setLoading(false);
                 });
         }
     };
     
  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Verify Your Account
      </h4>
      <input
        {...register("otp", { required: true })}
        type="tel"
        placeholder="Your OTP"
        className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
      />
      {errors.otp?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}

      {loading ? (
        <h1
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
        >
          Loading....
        </h1>
      ) : (
        <input
          type="submit"
          value="Verify"
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
        />
      )}
    </form>
  );
};

const Changeing = ({ setPage, setUser, user }: any) => {
      const [loading, setLoading] = useState(false);
      const router = useRouter();
  
      const {
          register,
          handleSubmit,
          formState: { errors },
      } = useForm();
  
      const [resetUserPassword] = useResetUserPasswordMutation();
  
      const onSubmit = (data: any) => {
          setLoading(true);
          if (data.password === data.confirm_password) {
              resetUserPassword({ ...data, user_id: user?.user_id })
                  .unwrap()
                  .then(({ error, success }: any) => {
                      if (success) {
                          toast.success(success);
  
                          router.push('/login');
                          setLoading(false);
  
                          setPage('find');
                          setUser({});
                      }
                      if (error) {
                          toast.error(error);
                          setLoading(false);
                      }
                      setLoading(false);
                  })
                  .catch((error) => {
                      setLoading(false);
                      if ('data' in error) {
                          const errorData = error as any;
                          if (errorData?.status == 422) {
                              toast.error(errorData?.data?.message);
                              const err = errorData?.data?.errors || {};
                              toast.error(err?.password && err?.password[0]);
                              toast.error(
                                  err?.confirm_password &&
                                      err?.confirm_password[0]
                              );
                          }
                          if (errorData?.status == 401) {
                              toast.error(errorData?.data?.message);
                          }
                      }
                  });
          } else {
              toast.warning("your password dosen't match");
              setLoading(false);
          }
      };

  return (
    <form
      className="bg-white border border-gray-300 rounded-2xl p-6 md:m-14 flex flex-col space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className="text-3xl font-semibold my-3 text-black text-center">
        Change Your Password
      </h4>
      <input
        {...register("password", { required: true, minLength: 4 })}
        type="password"
        placeholder="Passoword"
        className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
      />
      {errors.password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      <input
        type={"password"}
        {...register("confirm_password", { required: true, minLength: 4 })}
        placeholder="Confirm Password"
        className="py-3 px-4 border border-gray-300 rounded-md placeholder:text-gray-500 text-sm focus:outline-0"
      />

      {errors.confirm_password?.type === "required" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          The field is required!
        </p>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <p className="text-red-300 font-sans font-semibold mt-0">
          {" "}
          You Must Give 8 character
        </p>
      )}

      {loading ? (
        <h1
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
        >
          Loading....
        </h1>
      ) : (
        <input
          type="submit"
          value="Submit"
          className={`text-center py-2 px-8 rounded-md  font-sans font-bold tracking-wider bg-red-700 text-white hover:bg-red-900 hover:text-gray-200`}
        />
      )}
    </form>
  );
};

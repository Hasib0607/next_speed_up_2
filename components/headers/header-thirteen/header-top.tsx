"use client";

import {
  ShoppingBagIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { LogoutIcon } from "@/assets/svgComp";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import { removeFromLocalStorage } from "@/helpers/localStorage";
import { REDUX_PERSIST } from "@/consts";


const HeaderTop = ({ headersetting,design }: any) => {

const router = useRouter();
    const isAuthenticated = useAuth();

    const [logOut] = useLogOutMutation();

    const handleLogOut = () => {
        logOut({});
        removeFromLocalStorage(REDUX_PERSIST);
        router.push('/');
    };


  return (
    <div
      style={{
        backgroundColor: design?.header_color,
        color: design?.text_color,
      }}
    >
      <div className="sm:container px-5 flex justify-between items-center">
        <div className="flex items-center justify-start">
          <p>Welcome to {headersetting?.website_name} !</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={"/profile"}>
            <SigleIcon Icon={UserGroupIcon} text={"my account"} design={design}/>
          </Link>
          <Link href={"/checkout"}>
            <SigleIcon Icon={ShoppingBagIcon} text={"Checkout"} design={design} />
          </Link>
          {isAuthenticated ? (
            <SigleIcon
              onClick={handleLogOut}
              Icon={LogoutIcon}
              text={"Logout"} design={design}
            />
          ) : (
            <Link href={"/login"}>
              <SigleIcon Icon={UserIcon} text={"Login"} design={design} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


export default HeaderTop


const SigleIcon = ({ onClick, Icon, text,design }: any) => {
    const [show, setShow] = useState(false);
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={`flex gap-1 items-center  py-2  ${
          show ? "bg-red-500 px-4 py-2" : "px-1"
        } transition-all duration-500 ease-linear`}
      >
        <Icon
          className="h-6 w-6"
          color={show ? design?.header_color : design?.text_color}
        />
        <p
          className={`capitalize text-white ${
            show ? "visible opacity-100 flex" : "invisible opacity-0 hidden"
          } transition-all duration-200 ease-linear`}
        >
          {text}
        </p>
      </div>
    );
  };
import dynamic from "next/dynamic";

export const login_pages: any = {
  default: dynamic(() => import("@/components/sign-in/signin-eleven")),
//   one: dynamic(() => import("@/components/sign-in/signin-one")),
//   two: dynamic(() => import("@/components/sign-in/signin-four")),
//   three: dynamic(() => import("@/components/sign-in/signin-seven")),
//   four: dynamic(() => import("@/components/sign-in/signin-four")),
//   five: dynamic(() => import("@/components/sign-in/signin-five")),
//   seven: dynamic(() => import("@/components/sign-in/signin-seven")),
//   eight: dynamic(() => import("@/components/sign-in/signin-five")),
  eleven: dynamic(() => import("@/components/sign-in/signin-eleven")),
//   fourteen: dynamic(() => import("@/components/sign-in/signin-seven")),
//   fifteen: dynamic(() => import("@/components/sign-in/signin-seven")),
//   sixteen: dynamic(() => import("@/components/sign-in/signin-four")),
//   seventeen: dynamic(() => import("@/components/sign-in/signin-four")),
//   eighteen: dynamic(() => import("@/components/sign-in/signin-five")),
//   nineteen: dynamic(() => import("@/components/sign-in/signin-seven")),
//   twenty: dynamic(() => import("@/components/sign-in/signin-seven")),
//   twentyone: dynamic(() => import("@/components/sign-in/signin-twentyone")),
  twentytwo: dynamic(() => import("@/components/sign-in/signin-eleven")),
//   twentythree: dynamic(() => import("@/components/sign-in/signin-twentyone")),
//   twentyfour: dynamic(() => import("@/components/sign-in/signin-twentyone")),
//   twentyfive: dynamic(() => import("@/components/sign-in/signin-seven")),
//   twentysix: dynamic(() => import("@/components/sign-in/signin-twentyone")),
//   twentyseven: dynamic(() => import("@/components/sign-in/signin-twentyone")),
//   twentyeight: dynamic(() => import("@/components/sign-in/signin-twentyone")),
//   twentynine: dynamic(() => import("@/components/sign-in/signin-twentynine")),
//   thirty: dynamic(() => import("@/components/sign-in/signin-twentynine")),
//   thirtyone: dynamic(() => import("@/components/sign-in/signin-twentynine")),
//   thirtyfive: dynamic(() => import("@/components/sign-in/signin-twentynine")),
};




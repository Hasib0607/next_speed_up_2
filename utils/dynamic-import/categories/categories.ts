'use client';

import dynamic from 'next/dynamic';

export const categories: any = {
  default: dynamic(
    () => import('@/components/_category-page/category-seven-new'),
    { ssr: false }
  ),
  one: dynamic(() => import("@/components/_category-page/category-one"),
    { ssr: false }
  ),
  two: dynamic(() => import("@/components/_category-page/category-two"),
    { ssr: false }
  ),
  three: dynamic(
    () => import('@/components/_category-page/category-three'),
    { ssr: false }
  ),
  four: dynamic(() => import("@/components/_category-page/category-four"),
    { ssr: false }
  ),
  five: dynamic(() => import("@/components/_category-page/category-five"),
    { ssr: false }
  ),
  six: dynamic(() => import("@/components/_category-page/category-six"),
    { ssr: false }
  ),
  seven: dynamic(
    () => import('@/components/_category-page/category-seven-new'),
    { ssr: false }
  ),
  eight: dynamic(
    () => import("@/components/_category-page/category-eight"),
    { ssr: false }
  ),
  nine: dynamic(() => import("@/components/_category-page/category-nine"),
    { ssr: false }
  ),
  ten: dynamic(() => import("@/components/_category-page/category-ten"),
    { ssr: false }
  ),
  eleven: dynamic(
    () => import("@/components/_category-page/category-eleven"),
    { ssr: false }
  ),
  twelve: dynamic(
    () => import("@/components/_category-page/category-twelve"),
    { ssr: false }
  ),
  thirteen: dynamic(
    () => import("@/components/_category-page/category-thirteen"),
    { ssr: false }
  ),
  fourteen: dynamic(
    () => import("@/components/_category-page/category-fourteen"),
    { ssr: false }
  ),
  // sixteen: dynamic(
  //   () => import("@/components/_category-page/category-sixteen"),
  //   { ssr: false }
  // ),
  seventeen: dynamic(
    () => import("@/components/_category-page/category-seventeen"),
    { ssr: false }
  ),
  eighteen: dynamic(
    () => import("@/components/_category-page/category-eighteen"),
    { ssr: false }
  ),
  nineteen: dynamic(
    () => import("@/components/_category-page/category-nineteen"),
    { ssr: false }
  ),
  twenty: dynamic(
    () => import("@/components/_category-page/category-twenty"),
    { ssr: false }
  ),
  twentyone: dynamic(
    () => import("@/components/_category-page/category-twentyone"),
    { ssr: false }
  ),
  twentytwo: dynamic(
    () => import("@/components/_category-page/category-twentytwo"),
    { ssr: false }
  ),
  twentythree: dynamic(
    () => import("@/components/_category-page/category-twentythree"),
    { ssr: false }
  ),
  twentyfour: dynamic(
    () => import("@/components/_category-page/category-twentyfour"),
    { ssr: false }
  ),
  twentyfive: dynamic(
    () => import("@/components/_category-page/category-twentyfive"),
    { ssr: false }
  ),
  twentysix: dynamic(
    () => import("@/components/_category-page/category-twentysix"),
    { ssr: false }
  ),
  twentyseven: dynamic(
    () => import("@/components/_category-page/category-twentyseven"),
    { ssr: false }
  ),
  twentyeight: dynamic(
    () => import("@/components/_category-page/category-twentyeight"),
    { ssr: false }
  ),
  twentynine: dynamic(
    () => import("@/components/_category-page/category-twentynine"),
    { ssr: false }
  ),
  thirty: dynamic(
    () => import("@/components/_category-page/category-thirty"),
    { ssr: false }
  ),
  thirtyone: dynamic(
    () => import("@/components/_category-page/category-thirty"),
    { ssr: false }
  ),
  thirtythree: dynamic(
    () => import("@/components/_category-page/category-thirtythree"),
    { ssr: false }
  ),
  thirtyfour: dynamic(
    () => import("@/components/_category-page/category-thirtyfour"),
    { ssr: false }
  ),
  thirtyfive: dynamic(
    () => import("@/components/_category-page/category-thirtyfive"),
    { ssr: false }
  ),
  thirtysix: dynamic(
    () => import("@/components/_category-page/category-thirtysix"),
    { ssr: false }
  ),
  thirtyseven: dynamic(
    () => import("@/components/_category-page/category-thirtyseven"),
    { ssr: false }
  ),
  thirtyeight: dynamic(
    () => import("@/components/_category-page/category-thirtyeight"),
    { ssr: false }
  ),
  thirtynine: dynamic(
    () => import("@/components/_category-page/category-thirtynine"),
    { ssr: false }
  ),
  forty: dynamic(
    () => import("@/components/_category-page/category-forty"),
    { ssr: false }
  ),
  fortyone: dynamic(
    () => import("@/components/_category-page/category-fortyone"),
    { ssr: false }
  ),
};

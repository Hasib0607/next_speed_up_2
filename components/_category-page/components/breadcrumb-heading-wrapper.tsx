import Link from "next/link";
import React from "react";
import '../category-four.css';

const BreadcrumbHeadingWrapper = ({ category, children }: any) => {
  return (
    <>
      <div className="sm:container px-5 sm:py-10 py-5 bg-white">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li className="font-bold tracking-wider ">{category?.name}</li>
          </ul>
        </div>
      </div>
      <div className="divider divi text-black font-bold text-xl tracking-wider md:mb-20">
        {category?.name}
      </div>
      <div className="" style={{ minHeight: "70vh" }}>
        <div className="flex justify-center">{children}</div>
      </div>
    </>
  );
};

export default BreadcrumbHeadingWrapper;

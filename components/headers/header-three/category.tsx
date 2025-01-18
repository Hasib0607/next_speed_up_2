'use client';

import {
    useGetCategoryQuery,
    useGetSubCategoryQuery,
} from '@/redux/features/category/categoryApi';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Category = ({ menu, design }: any) => {
    const { data: categoryData } = useGetCategoryQuery({});
    const { data: subCategoryData } = useGetSubCategoryQuery({});

    const category = categoryData?.data || [];
    const subCategory = subCategoryData?.data || [];

    const bgColor = design?.header_color;

    const styleCss = `
    .menu-hover:hover {
      color:  ${bgColor};
  }

  .menu-border {
    border-bottom: 4px solid transparent;
  } 
  .menu-border:hover {
    border-bottom: 4px solid ${bgColor};
  } 
    `;

    return (
        <nav>
            <style>{styleCss}</style>
            <ul className="lg:flex lg:flex-row lg:gap-10 lg:justify-center  ">
                <li className="py-7 font-bold flex items-center text-sm justify-between">
                    <Link href="/" className="menu-border ">
                        <h1>Home</h1>
                    </Link>
                </li>
                {category?.slice(0, 4).map((item: any, i: any) => (
                    <div key={item.id} className="group relative">
                        <li className="py-7">
                            <Link href={'/category/' + item?.id}>
                                <h1
                                    className={`pb-0 flex menu-border group justify-between items-center group font-bold text-sm `}
                                >
                                    {item.name}
                                </h1>
                            </Link>
                            {subCategory.map(
                                (dataId: any, idx: any) =>
                                    item.id === Number(dataId.parent) && (
                                        <ChevronDownIcon
                                            key={idx}
                                            className="h-4 group-hover:rotate-180 transition-all duration-500  ease-linear lg:cursor-pointer absolute top-8 -right-5 "
                                        />
                                    )
                            )}
                        </li>

                        <li className="absolute z-50 bg-white w-[250px] ">
                            {subCategory.map((subItem: any, j: any) => (
                                <div key={subItem.id}>
                                    <div className="relative group-hover:block hidden">
                                        {item.id === Number(subItem.parent) && (
                                            <div className="px-6 py-2 border-b-2">
                                                <Link
                                                    href={
                                                        '/category/' +
                                                        subItem?.id
                                                    }
                                                >
                                                    <h1 className="hover:pl-2 duration-500 capitalize">
                                                        {subItem.name}{' '}
                                                    </h1>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </li>
                    </div>
                ))}

                <li className="relative group menu-seven py-7 flex items-center justify-between">
                    <Link href="" className="menu-border font-bold text-sm">
                        <h1>
                            Pages{' '}
                            <span>
                                <ChevronDownIcon className="h-4 group-hover:rotate-180 rotate-0 transition-all duration-500 ease-linear lg:cursor-pointer inline " />
                            </span>
                        </h1>
                    </Link>
                    <div className="absolute z-50 group-hover:block hidden bg-white w-[250px] top-[75px] left-[-50%] lg:cursor-pointer">
                        {menu?.slice(0, 6)?.map(
                            (menuItem: any) =>
                                menuItem?.status == 1 && (
                                    <div
                                        key={menuItem.id}
                                        className="relative "
                                    >
                                        <div className="px-6 py-2 border-b-2 ">
                                            <Link
                                                href={
                                                    menuItem?.custom_link ||
                                                    (menuItem?.url
                                                        ? `/${menuItem.url}`
                                                        : '/')
                                                }
                                            >
                                                <h1 className=" hover:pl-2 duration-500">
                                                    {menuItem.name}{' '}
                                                </h1>
                                            </Link>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Category;

'use client';

import { RootState } from '@/redux/store';
import { iconImg } from '@/site-settings/siteUrl';
import { customizeMobileNavThree } from '@/utils/customizeDesign';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useSelector } from 'react-redux';

interface SubCategory {
    id: string;
    icon?: string;
    name: string;
}

interface Category {
    id: string;
    icon?: string;
    name: string;
    cat?: SubCategory[];
}

interface SingleCatProps {
    item: Category;
    open: boolean;
    setOpen: (open: boolean) => void;
    design:any;
}

export const SingleCat: React.FC<SingleCatProps> = ({
    item,
    open,
    setOpen,
    design
}) => {
    const [show, setShow] = useState(false);
    const store_id = design?.store_id || null;
    
    const mobileNavThreeIcon = customizeMobileNavThree.find(
        (item) => item.id == store_id
    );
    
    return (
        <>
            <div className="w-full flex justify-between py-3 lg:cursor-pointer">
                <Link href={`/category/${item.id}`} passHref>
                    <span
                        onClick={() => setOpen(!open)}
                        className="flex-1 flex items-center gap-x-2 text-sm text-gray-900 font-medium w-max"
                    >
                        {/* this condition for lotus bloem which store_id is 9501 */}
                        {!mobileNavThreeIcon?.category_icon_not_show && (
                            <img
                                src={`${iconImg}${item?.icon}`}
                                alt={item.name}
                                className="h-5"
                            />
                        )}
                        <p>{item.name}</p>
                    </span>
                </Link>
                {item?.cat && (
                    <div className="px-4 h-full">
                        {show ? (
                            <IoIosArrowUp
                                onClick={() => setShow(!show)}
                                className="text-gray-800"
                            />
                        ) : (
                            <IoIosArrowDown
                                onClick={() => setShow(!show)}
                                className="text-gray-800"
                            />
                        )}
                    </div>
                )}
            </div>

            {show && (
                <div className="ml-8">
                    {item.cat?.map((sub: any) => (
                        <div className="py-2" key={sub.id}>
                            <Link href={`/category/${sub.id}`} passHref>
                                <span
                                    onClick={() => setOpen(!open)}
                                    className="flex items-center gap-x-2 pb-2"
                                >
                                    {/* this condition for lotus bloem which store_id is 9501 */}
                                    {!mobileNavThreeIcon?.category_icon_not_show && (
                                        <img
                                            src={`${iconImg}${sub.icon}`}
                                            alt={sub.name}
                                            className="h-5"
                                        />
                                    )}
                                    <p className="text-sm text-gray-500">
                                        {sub.name}
                                    </p>
                                </span>
                            </Link>
                            <div className="pr-4">
                                <div className="h-[1px] bg-gray-200 w-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

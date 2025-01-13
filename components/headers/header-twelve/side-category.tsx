'use client';

import Link from 'next/link';
import React from 'react';

const SideCategory = ({ open, setOpen, menu }: any) => {
    return (
        <nav>
            <ul className="flex flex-col gap-6 font-twelve text-[13px]">
                {menu?.slice(0, 6)?.map(
                    (item: any) =>
                        item.status == 1 && (
                            <div key={item?.id} className="relative">
                                <li className="group relative flex items-center justify-between ">
                                    <Link
                                        onClick={() => setOpen(!open)}
                                        href={
                                            item?.custom_link ||
                                            (item?.url ? `/${item?.url}` : '/')
                                        }
                                    >
                                        <h1
                                            className={`menu-hover flex items-center group`}
                                        >
                                            {item?.name}
                                        </h1>
                                    </Link>
                                </li>
                            </div>
                        )
                )}
            </ul>
        </nav>
    );
};

export default SideCategory;

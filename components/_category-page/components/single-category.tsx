import Link from "next/link";
import { useState } from "react";

import {
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

const SingleCategory = ({ item }: any) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <div className="w-full flex py-3 lg:cursor-pointer">
                <Link
                    onClick={() => setShow(!show)}
                    href={'/category/' + item.id}
                    className="flex-1 text-sm text-gray-900 font-medium"
                >
                    <p>{item.name}</p>
                </Link>
                {item?.cat ? (
                    <div onClick={() => setShow(!show)} className="px-4 h-full">
                        {show ? (
                            <MinusIcon className="h-4 w-4 text-gray-800" />
                        ) : (
                            <PlusIcon className="h-4 w-4 text-gray-800" />
                        )}
                    </div>
                ) : null}
            </div>

            {show && (
                <>
                    <div className="ml-8">
                        {item?.cat?.map((sub: any) => (
                            <div className="py-2" key={sub.id}>
                                <Link href={'/category/' + sub?.id}>
                                    <p className="pb-2 text-sm text-red-500">
                                        {sub?.name + 1}
                                    </p>
                                </Link>
                                <div className="pr-4">
                                    <div className="h-[1px] bg-gray-200 w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};


export default SingleCategory
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // const [errorMsg,setErrorMsg] = useState('')

    // useEffect(() => {
    //     // Log the error to an error reporting service
    //     setErrorMsg(error)
    //   }, [error])

    return (
        <>
            <div className="h-screen w-full flex-col center bg-[#1A2238]">
                <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tight">
                    There was an error!
                </h1>
                <div className="absolute bg-[#FF6A3D] px-2 text-sm rounded rotate-12">
                        Please Try again.
                </div>
                <div className="flex gap-4">
                    <Link href="/">
                        <div className="mt-5">
                            <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                                <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                                <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                    Go Home
                                </span>
                            </div>
                        </div>
                    </Link>
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                        className="mt-5"
                    >
                        <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                                Try again
                            </span>
                        </div>
                    </button>
                </div>
                <p className="text-[#FF6A3D]"></p>
            </div>
        </>
    );
}

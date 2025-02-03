'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // Log the error to an error reporting service
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <div className="h-screen w-full flex-col center bg-[#1A2238]">
                <div className="relative w-52 z-30">
                    <div className="absolute bg-[#FF6A3D] px-2 text-lg rounded rotate-12 -top-6 left-10">
                        Please Try again.
                    </div>
                </div>
                <div className="bg-white w-full shadow-md rounded-lg p-8 relative max-w-md z-20">
                    <p className="font-extrabold tracking-tight text-gray-700 mb-6">
                        {error.message}
                    </p>
                    {error.digest && (
                        <div className="mt-4 text-sm text-gray-500">
                            Error ID: {error.digest}
                        </div>
                    )}
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

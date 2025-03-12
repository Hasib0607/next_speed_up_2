import Link from 'next/link';
import React from 'react';

const CopyrightAll = ({ headersetting }: any) => {
    const date = new Date().getFullYear();

    return (
        <div className="space-x-2">
            <span>© {date} All Rights Received</span>
            <Link href="/" className="font-semibold text-red-700">
                {headersetting?.website_name}
            </Link>
            <span>|</span>
            <span>Developed by</span>
            <Link
                href="https://ebitans.com/"
                target="_blank"
                // rel="noopener noreferrer"
                className="font-semibold text-red-700"
            >
                eBitans
            </Link>
        </div>
    );
};

export default CopyrightAll;

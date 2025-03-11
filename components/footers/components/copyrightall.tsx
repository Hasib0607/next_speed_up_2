import Link from 'next/link';
import React from 'react';

const CopyrightAll = ({ headersetting }: any) => {
    const date = new Date().getFullYear();

    return (
<<<<<<< HEAD
        <div className="">
            © {date} All Rights Received{' '}
            <Link href="/" className="font-semibold text-red-700">
                {headersetting?.website_name}
            </Link>
            | Developed by{' '}
            <a
=======
        <div className="space-x-2">
            <span>© {date} All Rights Received</span>
            <Link href="/" className="font-semibold text-red-700">
                {headersetting?.website_name}
            </Link>
            <span>|</span>
            <span>Developed by</span>
            <Link
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
                href="https://ebitans.com/"
                target="_blank"
                // rel="noopener noreferrer"
                className="font-semibold text-red-700"
            >
                eBitans
<<<<<<< HEAD
            </a>
=======
            </Link>
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
        </div>
    );
};

export default CopyrightAll;

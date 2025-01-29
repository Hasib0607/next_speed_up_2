'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MotionLink = ({ text, href, className }: any) => {
    return (
        <motion.li
            whileHover={{
                x: 8,
                transition: { duration: 0.5 },
                color: '#f27820',
            }}
            exit={{
                x: 0,
                transition: { duration: 0.5 },
            }}
        >
            <Link
                href={href}
                className={className ? className : 'text-gray-600'}
            >
                {text}
            </Link>
        </motion.li>
    );
};

export default MotionLink;

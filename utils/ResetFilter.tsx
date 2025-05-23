'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/redux/features/filters/filterSlice';

const ResetFilter = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const prevPathname = useRef(pathname); // Store previous path

    useEffect(() => {
        const isCategoryPage = pathname === '/category'; // category page
        const isShopPage = pathname === '/shop'; // Shop page

        if (isCategoryPage || isShopPage) {
            dispatch(resetFilters());
        }

        prevPathname.current = pathname; // Update previous path
    }, [pathname, dispatch]);

    return null;
};
export default ResetFilter;

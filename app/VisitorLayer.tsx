'use client';

import { getFromLocalStorage } from '@/helpers/localStorage';
import { numberParser } from '@/helpers/numberParser';
import { initializeVisitorTracking } from '@/lib/tracking';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function VisitorLayer() {
    const pathname = usePathname();
    const previousPath = useRef<string | null>(null);

    useEffect(() => {
        // Initialize tracking on mount
        initializeVisitorTracking();

        // Track page changes
        if (previousPath.current !== pathname) {
            initializeVisitorTracking();
            previousPath.current = pathname;
        }

        // // Cleanup
        // return () => {
        //     clearTimeout(numberParser(getFromLocalStorage('trackingTimer')));
        // };
    }, [pathname]);

    return null;
}

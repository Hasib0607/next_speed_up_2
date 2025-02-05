'use client'

import { MobileNavProps } from '@/types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const mobile_navs: { [key: string]: ComponentType<MobileNavProps> } = {
    one: dynamic(() => import('@/components/mobileNavs/one/mobileNavOne'), {
        ssr: false,
    }),
    two: dynamic(() => import('@/components/mobileNavs/two/mobileNavTwo'), {
        ssr: false,
    }),
    three: dynamic(
        () => import('@/components/mobileNavs/three/mobileNavThree'),
        {
            ssr: false,
        }
    ),
    four: dynamic(() => import('@/components/mobileNavs/four/mobileNavFour'), {
        ssr: false,
    }),
    five: dynamic(() => import('@/components/mobileNavs/five/mobileNavFive'), {
        ssr: false,
    }),
};

import { MobileNavProps } from '@/types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const mobile_navs: { [key: string]: ComponentType<MobileNavProps> } = {
    one: dynamic(() => import('@/components/mobileNavs/one/mobileNavOne')),
    two: dynamic(() => import('@/components/mobileNavs/two/mobileNavTwo')),
    three: dynamic(
        () => import('@/components/mobileNavs/three/mobileNavThree')
    ),
    four: dynamic(() => import('@/components/mobileNavs/four/mobileNavFour')),
    five: dynamic(() => import('@/components/mobileNavs/five/mobileNavFive')),
};

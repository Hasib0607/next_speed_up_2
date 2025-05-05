import { DEFAULT, FORTY_THREE, ONE } from '@/consts';
import dynamic from 'next/dynamic';

export const brand_sections: any = {
    [DEFAULT]: dynamic(() => import('@/components/_homepage/brand/brand-default')),
    [ONE]: dynamic(() => import('@/components/_homepage/brand/brand-one')),
    [FORTY_THREE]: dynamic(() => import('@/components/_homepage/brand/brand-fortythree')),
};

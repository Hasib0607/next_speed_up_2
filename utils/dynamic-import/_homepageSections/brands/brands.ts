import { FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const brand_sections: any = {
    default: dynamic(() => import('@/components/_homepage/brand/brand-default')),
    [FORTY_THREE]: dynamic(() => import('@/components/_homepage/brand/brand-fortythree')),
};

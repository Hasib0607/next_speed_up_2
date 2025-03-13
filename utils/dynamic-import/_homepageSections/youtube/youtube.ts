import { FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const you_tube: any = {
    default: dynamic(() => import('@/components/you-tube/youtube-default')),
    [FORTY_THREE]: dynamic(() => import('@/components/you-tube/youtube-fortythree')),
};

import { DEFAULT } from '@/consts';
import dynamic from 'next/dynamic';

export const brand_sub_pages: any = {
    [DEFAULT]: dynamic(
        () => import('@/components/_brand-sub-page/sub-brand-default')
    ),
};
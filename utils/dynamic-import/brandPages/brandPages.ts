import { DEFAULT } from '@/consts';
import dynamic from 'next/dynamic';

export const brand_pages: any = {
    [DEFAULT]: dynamic(
        () => import('@/components/_brand-page/category-two')
    ),
};
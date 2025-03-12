import { DEFAULT } from '@/consts';
import dynamic from 'next/dynamic';

export const contact_pages: any = {
    [DEFAULT]: dynamic(
        () => import('@/components/contact-page/contact-default')
    ),
}
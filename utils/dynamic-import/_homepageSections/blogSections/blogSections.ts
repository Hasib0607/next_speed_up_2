import { FORTY_THREE } from '@/consts';
import dynamic from 'next/dynamic';

export const blog_sections: any = {
    default: dynamic(
        () => import('@/components/_homepage/blog/blog-section-default')
    ),
    [FORTY_THREE]: dynamic(
        () => import('@/components/_homepage/blog/blogSectionFortyThree/blog-section-fortythree')
    ),
    
};

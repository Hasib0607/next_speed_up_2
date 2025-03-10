import dynamic from 'next/dynamic';

export const blog_sections: any = {
    default: dynamic(
        () => import('@/components/_homepage/blog/blog-section-default')
    ),
    // one: dynamic(() => import('@/components/footers/footer-one')),
};

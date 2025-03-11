import dynamic from 'next/dynamic';

export const you_tube: any = {
    default: dynamic(() => import('@/components/you-tube/youtube-default')),
    // one: dynamic(() => import('@/components/footers/footer-one')),
};

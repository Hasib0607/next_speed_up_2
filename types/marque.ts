import { ReactNode } from 'react';
import { MarqueeProps } from 'react-fast-marquee';

export type AnimateMarqueeProps = MarqueeProps & {
    children: ReactNode;
    rest?: MarqueeProps;
};

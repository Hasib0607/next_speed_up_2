import { AnimateMarqueeProps } from '@/types/marque';
import Marquee from 'react-fast-marquee';

const AnimateMarquee = ({
    speed = 50,
    pauseOnHover = true,
    children,
    ...rest
}: AnimateMarqueeProps) => {
    return (
        <Marquee speed={speed} pauseOnHover={pauseOnHover} {...rest}>
            {children}
        </Marquee>
    );
};

export default AnimateMarquee;

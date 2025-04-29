import { StaticImageData } from 'next/image';

export interface DynamicImageProps {
    src: string | StaticImageData;
    alt?: string;
    width?: number | '100%' | 'auto';
    height?: number | '100%' | 'auto';
    className?: string;
}

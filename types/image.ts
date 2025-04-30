import { StaticImageData } from 'next/image';
import { ImageProps } from 'next/image';

export interface DynamicImageProps {
    src: string | StaticImageData;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

export type MasterImageProps = ImageProps & {
    className?: string;
};
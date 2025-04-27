import { StaticImageData } from "next/image";

export interface DynamicImageProps {
    src: string | StaticImageData;
    alt?: string;
    width: number;
    height: number;
    className?: string;
}

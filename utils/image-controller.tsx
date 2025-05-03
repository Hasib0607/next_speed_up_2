import { DynamicImageProps, MasterImageProps } from '@/types/image';
import Image from 'next/image';

export const DynamicImage: React.FC<DynamicImageProps> = ({
    src,
    alt = '',
    width,
    height,
    className,
}) => {
    // Convert number to px string, otherwise pass through
    const resolvedWidth = typeof width === 'number' ? `${width}px` : width;
    const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

    return (
        // <div
        // // className={clsx(className,`w-[${resolvedWidth}] h-[${resolvedHeight}]`)}
        // className={className}
        // >
        <Image
            src={src}
            alt={alt}
            // placeholder="blur"
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G4vAgABqwEGEzLyIQAAAABJRU5ErkJggg=="
            fill
            style={{ objectFit: 'cover' }}
            className={className}
            // sizes={`${typeof width === 'number' ? `(max-width: ${width}px) 100vw, (max-width: ${width * 2 - (width * 2 > 336 ? 336 : 0)}px) 50vw, 33vw` : '100vw'}`}
        />
        // </div>
    );
};
{
    /* {backdrop && <div className="absolute inset-0 blackout-1"></div>} */
}

// components/MasterImage.tsx

export const MasterImage = ({
    src,
    alt,
    className = 'relative object-cover object-center rounded-md',
}: MasterImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            className={className}
            fill
            loading="lazy"
            // placeholder="blur"
            // blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G4vAgABqwEGEzLyIQAAAABJRU5ErkJggg=="}
            // sizes={`${typeof width === 'number' ? `(max-width: ${width}px) 100vw, (max-width: ${width * 2 - (width * 2 > 336 ? 336 : 0)}px) 50vw, 33vw` : '100vw'}`}
        />
    );
};

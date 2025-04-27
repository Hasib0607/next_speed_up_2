import { DynamicImageProps } from '@/types/image';
import Image from 'next/image';

export const DynamicImage: React.FC<DynamicImageProps> = ({
    src,
    alt = '',
    width,
    height,
    className = '',
}) => {
    return (
        <div
            style={{ width, height, position: 'relative' }}
            className={className}
        >
            <Image
                src={src}
                alt={alt}
                // placeholder="blur"
                // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk4G4vAgABqwEGEzLyIQAAAABJRU5ErkJggg=="
                fill
                style={{ objectFit: 'cover' }}
                sizes={`(max-width: ${width}px) 100vw, (max-width: ${width * 2 - (width * 2 > 336 ? 336 : 0)}px) 50vw, 33vw`}
            />
            {/* {backdrop && <div className="absolute inset-0 blackout-1"></div>} */}
        </div>
    );
};

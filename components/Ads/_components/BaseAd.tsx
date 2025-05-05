import { dymmyImgBaseUrl } from '@/site-settings/siteUrl';
import { BaseAdProps } from '@/types/ads';
import { MasterImage } from '@/utils/image-controller';

const BaseAd = ({
    adContent = {
        title: 'Summer Sale!',
        description: 'Get up to 50% off on selected items. Limited time offer!',
        imageUrl: dymmyImgBaseUrl,
        cta: 'Learn More',
    },
    width,
    height,
    showInfo,
}: BaseAdProps) => {
    const isDummyImg = adContent.imageUrl
        .toString()
        .includes(dymmyImgBaseUrl.substring(8));

    const adTitle = adContent.title ?? '';
    const adDescription = adContent.description ?? '';
    const adImageUrl = isDummyImg
        ? `${adContent.imageUrl}/${width}x${height}`
        : adContent.imageUrl;
    const adCta = adContent.cta ?? '';

    const outerStyle =
        'bg-slate-100 rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow';

    return (
        <div
            className={outerStyle}
            style={{ width, height, position: 'relative' }}
        >
            <div className="relative flex flex-col h-full">
                <MasterImage src={adImageUrl} alt={adTitle} />
                {showInfo && !isDummyImg && (
                    <div className="absolute p-4 flex flex-col gap-1 bottom-2 z-20">
                        {adTitle.length > 0 && (
                            <h3 className="text-md lg:text-lg font-semibold">
                                {adTitle}
                            </h3>
                        )}
                        {adDescription.length > 0 && (
                            <p className="text-gray-600 text-wrap">
                                {adDescription}
                            </p>
                        )}
                        {adCta.length > 0 && (
                            <button className="bg-[var(--header-color)] text-[var(--text-color)] px-1 py-[2px] text-xs md:px-2 md:py-1 md:text-sm xl:px-3 xl:py-2 xl:text-base rounded-sm hover:bg-[rgba(var(--header-color-rgb),90%)] transition-opacity ease-in-out self-start">
                                {adCta}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// const BaseAd = ({
//     adContent = {
//         title: 'Summer Sale!',
//         description: 'Get up to 50% off on selected items. Limited time offer!',
//         imageUrl: `${bgImg.src}`,
//         cta: 'Learn More',
//     },
//     sizeClasses,
// }: BaseAdProps) => {
//     const adTitle = adContent.title ?? '';
//     const adDescription = adContent.description ?? '';
//     const adImageUrl = adContent.imageUrl ?? `${bgImg.src}`;
//     const adCta = adContent.cta ?? '';

//     return (
//         <div
//             className={classNames(
//                 'bg-slate-100 rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow',
//                 sizeClasses
//             )}
//         >
//             <div className="relative flex flex-col h-full">
//                 <div className="relative aspect-[4/9]">
//                     <Image
//                         src={adImageUrl}
//                         alt={adTitle}
//                        fill
//                         className="object-cover"
//                         // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />
//                 </div>
//                 <div className="absolute p-4 flex flex-col bottom-2 z-20">
//                     {adTitle.length > 0 && (
//                         <h3 className="text-md lg:text-lg font-semibold mb-2">
//                             {adTitle}
//                         </h3>
//                     )}
//                     {adDescription.length > 0 && (
//                         <p className="text-gray-600 mb-4 flex-grow">
//                             {adDescription}
//                         </p>
//                     )}
//                     {adCta.length > 0 && (
//                         <button className="bg-[var(--header-color)] text-[var(--text-color)] px-1 py-[2px] text-xs md:px-2 md:py-1 md:text-sm xl:px-3 xl:py-2 xl:text-base rounded-sm hover:bg-[rgba(var(--header-color-rgb),90%)] transition-opacity ease-in-out self-start">
//                             {adCta}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

export default BaseAd;

import { getAdDimensions, getContainerMaxWidth } from '@/helpers/adSizeUtils';
import { AdSectionProps, AdSizes } from '@/types/ads';
import { FC } from 'react';
import BaseAd from '@/components/Ads/_components/BaseAd';

const AdSlot: FC<AdSectionProps> = (props: AdSectionProps) => {
    const [width, height] = getAdDimensions(props.size);
    const showAd = getContainerMaxWidth(props.size);
    const showInfo = props.size !== AdSizes.LEADERBOARD && props.adInfo;

    return (
        <div className={showAd}>
            <BaseAd
                adContent={props.adContent}
                width={width}
                height={height}
                showInfo={showInfo}
            />
        </div>
    );
};

export default AdSlot;

import { getAdDimensions } from '@/helpers/adSizeUtils';
import { AdSectionProps, AdSizes } from '@/types/ads';
import { FC } from 'react';
import BaseAd from '@/components/Ads/_components/BaseAd';

const AdSlot: FC<AdSectionProps> = (props: AdSectionProps) => {
    const [width, height] = getAdDimensions(props.size);
    const showInfo = props.size !== AdSizes.LEADERBOARD && props.adInfo;

    return (
        <BaseAd
            adContent={props.adContent}
            width={width}
            height={height}
            showInfo={showInfo}
        />
    );
};

export default AdSlot;
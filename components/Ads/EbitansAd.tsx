import { AdSectionProps } from '@/types/ads';
import AdSlot from '@/components/Ads/_components/AdSlot';

const EbitansAd = (props: AdSectionProps) => {
    return (
        <div className={props.className}>
            <AdSlot {...props} />
        </div>
    );
};

export default EbitansAd;
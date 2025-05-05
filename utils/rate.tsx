'use client';

import StarRatings from 'react-star-ratings';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';
import { customizedRating } from '@/utils/customizeDesign';

const Rate = ({ rating, className, rate_color }: any) => {
    const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    const { store_id } = headerSettingData?.data || {};

    const isListed =
        store_id &&
        customizedRating.some((item: any) => item.id == parseInt(store_id));

    return isListed ? (
        <div></div>
    ) : (
        <div className={className}>
            <StarRatings
                rating={rating}
                starRatedColor={rate_color ?? '#FBC029'}
                numberOfStars={5}
                starDimension="16px"
                starSpacing="2px"
            />
        </div>
    );
};

export default Rate;

'use client';

import StarRatings from 'react-star-ratings';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';

const Rate = ({ rating, className }: any) => {
    const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    const { store_id } = headerSettingData?.data || {};

    return store_id && parseInt(store_id) === 10218 ? (
        <div></div>
    ) : (
        <div className={className}>
            <StarRatings
                rating={rating}
                starRatedColor="#FBC029"
                numberOfStars={5}
                starDimension="16px"
                starSpacing="2px"
            />
        </div>
    );
};

export default Rate;

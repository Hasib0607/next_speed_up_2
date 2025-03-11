'use client';
<<<<<<< HEAD

import StarRatings from 'react-star-ratings';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';

const Rate = ({ rating, className }: any) => {
    const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    const { store_id } = headerSettingData?.data || {};

=======

import StarRatings from 'react-star-ratings';
import { useGetHeaderSettingsQuery } from '@/redux/features/home/homeApi';

const Rate = ({ rating, className, rate_color }: any) => {
    const { data: headerSettingData } = useGetHeaderSettingsQuery({});
    const { store_id } = headerSettingData?.data || {};
    // console.log("rate_color",rate_color);
    
>>>>>>> 667c500c5d5597c12a9f45aec3ed22520d56dd2b
    return store_id && parseInt(store_id) === 10218 ? (
        <div></div>
    ) : (
        <div className={className}>
            <StarRatings
                rating={rating}
                starRatedColor={rate_color ?? "#FBC029"}
                numberOfStars={5}
                starDimension="16px"
                starSpacing="2px"
            />
        </div>
    );
};

export default Rate;

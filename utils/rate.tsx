'use client'
import { RootState } from '@/redux/store';
import StarRatings from 'react-star-ratings';
import { useAppSelector } from '@/redux/features/rtkHooks/rtkHooks';

const Rate = ({ rating, className }: any) => {
    const store_id = useAppSelector(
        (store: RootState) => store.products.storeId
    );

    return (
        store_id !== 10218 && (
            <div className={className}>
                <StarRatings
                    rating={rating}
                    starRatedColor="#FBC029"
                    numberOfStars={5}
                    starDimension="16px"
                    starSpacing="2px"
                />
            </div>
        )
    );
};

export default Rate;

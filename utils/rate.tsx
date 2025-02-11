import StarRatings from 'react-star-ratings';

const Rate = ({ rating, className }: any) => {
    return (
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

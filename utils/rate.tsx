import StarRatings from 'react-star-ratings';

const Rate = ({ rating }: any) => {
    return (
        <StarRatings
            rating={rating}
            starRatedColor="#FBC029"
            numberOfStars={5}
            starDimension="18px"
            starSpacing="2px"
        />
    );
};

export default Rate;

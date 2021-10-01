import { useState, useEffect } from 'react';
import Rating from 'react-rating';
import { useSubscription, useQuery, gql } from '@apollo/client';

import { ProductStyles, Title, Summary, AverageRatingStyles, Divider, List, Subtitle, ListItem } from './styles/ProductStyles';
import Button from './styles/Button';
import { calculateAverageRating } from '../Utils';

const AverageRating = ({ rating }) => {
  return (
    <AverageRatingStyles>
      <p className="average">{rating}</p>
      <Rating
        emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
        fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
        initialRating={rating}
        readonly
      />
    </AverageRatingStyles>
  )
};

const Review = ({ review }) => {
  return (
    <ListItem>
      <span className="stars">
        <Rating
          emptySymbol={<img src="assets/star-grey.png" alt="empty star" className="stars" />}
          fullSymbol={<img src="assets/star-gold.png" alt="filled star" className="stars" />}
          initialRating={review.rating}
          readonly
        />
      </span>
      <p className="num">{review.rating}</p>
      <p className="text">, {review.text}</p>
    </ListItem>
  )
};

const GET_PRODUCT_REVIEWS = gql`
  query {
    reviews {
      id
      text
      rating
    }
  }
`;

const GET_NEW_REVIEW = gql`
  subscription {
    newReview {
      id
      text
      rating
    }
  }
`;


function ProductView() {
  const [rating, setRating] = useState(1);
  const [reviews, setReviews] = useState([]);

  const { loading, error, data } = useQuery(GET_PRODUCT_REVIEWS);

  useSubscription(GET_NEW_REVIEW, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newReview = subscriptionData.data.newReview;
      setReviews([...reviews, newReview]);
      setRating(calculateAverageRating([...reviews, newReview]));
    }
  });

  useEffect(() => {
    if (data) {
      setReviews(data.reviews);
      setRating(calculateAverageRating(data.reviews));
    }

    if (error) {
      console.log(error);
    }

    if (loading) {
      console.log('loading');
    }

    return () => {
      console.log('unsubscribe');
    };

  }, [data, error, loading]);


  return (
    <ProductStyles>
      <div className="content">
        <Title>The Minimalist Entrepreneur</Title>
        <Summary>
          <div className="average-rating">
            <AverageRating rating={rating} />
          </div>
          <Button>Add Review</Button>
        </Summary>

        <Divider />

        <div className="reviews">
          <Subtitle>Reviews</Subtitle>

          <List>
            {reviews.map(review => <Review key={review.id} review={review} />)}
          </List>
        </div>
      </div>
    </ProductStyles>
  );
}

export default ProductView;
